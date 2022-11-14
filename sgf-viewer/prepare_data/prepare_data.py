#!/usr/bin/env python3

import subprocess
import json
import re
import csv
from pathlib import Path
from sgf_parser import game_info

"""
Prerequisites:
- Configure `~/.ssh/config` such that `ssh dqn.ist.berkeley.edu` run from a terminal connects without any user input.

Run:
- `python prepare_data.py` to run the script.
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
            server = section["server"]
            title = section["title"]
            max_games = section["max_games"]
            games_count = 0
            section_path = public_sgfs_path / section["dir_name"]
            run_cmd(["mkdir", "-p", str(section_path.resolve())])
            for path in section.get("paths", []):
                if games_count < max_games:
                    if ".sgf" in path:
                        run_cmd(
                            ["scp", f"{server}:{path}", f"{section_path.resolve()}"]
                        )
                        games_count += 1
                    else:
                        limit = max_games - games_count
                        command = ["ssh", server, "ls", path, "|", "head", f"-{limit}"]
                        files = run_cmd(command).strip().split("\n")
                        shell_cmd = [
                            f"scp -r {server}:{path}/\{{{','.join(files)}\}} {section_path.resolve()}"
                        ]
                        run_cmd(shell_cmd, shell=True, dry_run=False)
                        games_count += len(files)
            for path_with_line in section.get("paths_with_line_num", []):
                if games_count < max_games:
                    path = Path(path_with_line["path"])
                    line_num = path_with_line["line"]
                    assert path.suffix == ".sgfs"

                    line = run_cmd(
                        ["ssh", f"{server}", f"sed '{line_num}q;d' {path.resolve()}"]
                    )
                    new_path = section_path / (
                        path.stem + f"-L{line_num}" + path.suffix
                    )
                    with open(new_path, "w") as f:
                        f.write(line)
                    games_count += 1

            sgf_paths = game_info.find_sgf_files(section_path)
            parsed_games = game_info.read_and_parse_all_files(
                sgf_paths, fast_parse=True
            )

            # Sort games by adv_win and then victim_color
            sorted_paths_games = sorted(
                list(zip(sgf_paths, parsed_games)),
                key=lambda x: (x[1]["adv_win"], x[1]["victim_color"]),
                reverse=True,
            )
            parsed_games = [x[1] for x in sorted_paths_games]

            # Write game_infos.csv summary
            if len(parsed_games) > 0:
                keys = parsed_games[0].keys()
                with open(
                    (section_path / "game_infos.csv").resolve(), "w", newline=""
                ) as output_file:
                    dict_writer = csv.DictWriter(output_file, keys)
                    dict_writer.writeheader()
                    dict_writer.writerows(parsed_games)

            # Modify SGFs to be easier to interpret
            for path, game in sorted_paths_games:
                print(path, game["adv_win"])
                with open(path, "r+") as f:
                    text = f.read()
                    text = re.sub("BR\[[^]]*\]", "", text)
                    text = re.sub("WR\[[^]]*\]", "", text)
                    text = re.sub("P?C\[[^]]*\]", "", text)
                    color_to_names = {"b": "Victim", "w": "Adversary"}
                    b_name = color_to_names[game["victim_color"]]
                    w_name = color_to_names[game["adv_color"]]
                    text = re.sub("PB\[[^]]*\]", f"PB[{b_name}]", text)
                    text = re.sub("PW\[[^]]*\]", f"PW[{w_name}]", text)
                    f.seek(0)
                    f.write(text)
                    f.truncate()
