#!/usr/bin/env python3

import subprocess
import json
import re
import csv
from pathlib import Path
from sgf_parser import game_info

"""
Run:
- `python prepare_data/prepare_data.py`, from KataGoVisualizer/sgf-viewer directory, to run the script.
"""


def run_cmd(cmd, shell=False, dry_run=False):
    print(
        f"{'Would run' if dry_run else 'Running'} command (shell={shell}): {' '.join(cmd)}"
    )
    if not dry_run:
        res = subprocess.run(cmd, shell=shell, capture_output=True, text=True)
        if res.stderr:
            print("Error:", res.stderr)
        else:
            return res.stdout


if __name__ == "__main__":
    path_str = (Path(__file__).parent.parent / "src" / "content.ts").resolve()
    with open(path_str) as f:
        # Skip the first 3 lines
        next(f)
        next(f)
        next(f)
        pages = json.load(f)

    public_sgfs_path = Path(__file__).parent.parent / "public" / "sgfs"
    command = ["rm", "-rf", f"{public_sgfs_path.resolve()}"]
    run_cmd(command, shell=False)

    for page_path, page in pages.items():
        for section in page["content"]:
            title = section["title"]
            if all(key not in section for key in ["paths", "paths_with_line_num"]):
                print(f"Skipping section {title}: no games")
                continue

            max_games = section["max_games"]
            games_count = 0
            # Maps destination path to the original index of the source path in
            # section["paths"] or section["paths_with_line_num"].
            path_to_original_index = {}
            section_path = public_sgfs_path / section["dir_name"]
            run_cmd(["mkdir", "-p", str(section_path.resolve())])
            for i, path in enumerate(section.get("paths", [])):
                if games_count < max_games:
                    if ".sgf" in path:
                        run_cmd(["cp", f"{path}", f"{section_path.resolve()}"])
                        games_count += 1
                        path_to_original_index[Path(path).name] = i
                    else:
                        limit = max_games - games_count
                        command = ["ls", path, "|", "head", f"-{limit}"]
                        files = run_cmd(command).strip().split("\n")
                        shell_cmd = [
                            f"cp -r {path}/\{{{','.join(files)}\}} {section_path.resolve()}"
                        ]
                        run_cmd(shell_cmd, shell=True, dry_run=False)
                        games_count += len(files)
                        for f in files:
                            path_to_original_index[f] = i
            for i, path_with_line in enumerate(section.get("paths_with_line_num", [])):
                if games_count < max_games:
                    path = Path(path_with_line["path"])
                    line_num = path_with_line["line"]
                    assert path.suffix == ".sgfs"

                    line = run_cmd(
                        [f"sed '{line_num}q;d' {path.resolve()}"], shell=True
                    )
                    new_path = section_path / (
                        path.stem + f"-L{line_num}" + path.suffix
                    )
                    with open(new_path, "w") as f:
                        f.write(line)
                    games_count += 1
                    path_to_original_index[new_path.name] = i

            sgf_paths = game_info.find_sgf_files(section_path)
            parsed_games = game_info.read_and_parse_all_files(
                sgf_paths, fast_parse=True
            )
            if len(parsed_games) != games_count:
                print(
                    f"Warning: copied {games_count} but only parsed "
                    f"{len(parsed_games)}"
                )

            # Make paths not depend on where repo is cloned
            for parsed_game in parsed_games:
                # Take last 4 parts of path
                parsed_game["sgf_path"] = "/".join(
                    Path(parsed_game["sgf_path"]).parts[-4:]
                )

            if section.get("sort_games", True):
                # Sort games by adv_win, victim_color, -score_diff, sgf_path
                parsed_games = sorted(
                    parsed_games,
                    key=lambda x: (
                        x["adv_win"],
                        x["victim_color"],
                        (
                            0
                            if x["adv_minus_victim_score"] is None
                            else -int(x["adv_minus_victim_score"])
                        ),
                        x["sgf_path"],
                    ),
                    reverse=True,
                )
            else:
                # Preserve games' order in `section["paths"]` or
                # `section["paths_with_line_num"]`.
                parsed_games = sorted(
                    parsed_games,
                    key=lambda x: (
                        path_to_original_index[Path(x["sgf_path"]).name],
                        x["sgf_path"],
                        x["sgf_line"],
                    ),
                )

            for parsed_game in parsed_games:
                if parsed_game["is_resignation"]:
                    parsed_game["adv_minus_victim_score"] = "resignation"

            # Write game_infos.csv summary
            if len(parsed_games) > 0:
                keys = parsed_games[0].keys()
                with open(
                    (section_path / "game_infos.csv").resolve(), "w", newline=""
                ) as output_file:
                    dict_writer = csv.DictWriter(output_file, keys)
                    dict_writer.writeheader()
                    dict_writer.writerows(parsed_games)

            # Matches comments containing winrate, lossrate, tie rate, and score
            comment = (
                r"C\["
                + r"(\d+\.\d{1,2}) " * 3
                + r"(-?\d+\.\d{1,2})( v=[0-9]+)?( result=.+)?\]"
            )
            b_regex = re.compile(r"(B\[[a-z]{,2}\]) *" + comment)  # For black
            w_regex = re.compile(r"(W\[[a-z]{,2}\]) *" + comment)  # For white

            # Modify SGFs to be easier to interpret
            for game in parsed_games:
                with open(game["sgf_path"], "r+") as f:
                    text = f.read()
                    text = re.sub("BR\[[^]]*\]", "", text)
                    text = re.sub("WR\[[^]]*\]", "", text)

                    b_name = "Victim" if game["victim_color"] == "b" else "Adversary"
                    w_name = "Victim" if game["victim_color"] == "w" else "Adversary"
                    text = b_regex.sub(
                        r"\1C["
                        + b_name.lower()
                        + r" predicted win prob: \3 loss: \2 tie: \4, predicted score: -\5]",
                        text,
                    ).replace(
                        "--", ""
                    )  # Two negatives make a positive
                    text = w_regex.sub(
                        r"\1C["
                        + w_name.lower()
                        + r" predicted win prob: \2 loss: \3 tie: \4, predicted score: \5]",
                        text,
                    )

                    # Don't display the tie prob unless it's nonzero
                    text = text.replace(" tie: 0.00", "")
                    text = re.sub(r"C\[startTurnIdx.*gtype=normal\]", "", text)
                    text = re.sub("PB\[[^]]*\]", f"PB[{b_name}]", text)
                    text = re.sub("PW\[[^]]*\]", f"PW[{w_name}]", text)
                    f.seek(0)
                    f.write(text)
                    f.truncate()
