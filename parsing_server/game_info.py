"""Module to extract game information from SGF files."""

import os
import pathlib
import re
from typing import Any, Dict, Sequence, Union, Optional
from itertools import chain
import multiprocessing
import warnings
import functools


def get_game_str(path: pathlib.Path, line_num: int):
    """Return the string at a given path and line number."""
    with open(path, "r") as f:
        for i, line in enumerate(f):
            if i + 1 == line_num:
                return line


def find_sgf_files(
    root: pathlib.Path, max_scan_length: int = 10000
) -> Sequence[pathlib.Path]:
    """Finds all SGF files in `root` (recursively).

    Args:
        root: The root directory to search.
        max_scan_length: The maximum number of directories to search.

    Returns:
        List of sgf paths.
    """
    sgf_paths = []
    directories_scanned = 0
    for dirpath, _, filenames in os.walk(root):
        sgf_filenames = [x for x in filenames if x.endswith(".sgfs")]
        sgf_paths += [pathlib.Path(dirpath) / x for x in sgf_filenames]
        directories_scanned += 1
        if directories_scanned >= max_scan_length:
            warnings.warn(
                f"Reached max_scan_length, {max_scan_length}, while \
                scanning subdirectories in {root}. SGF files already found \
                will be returned."
            )
            break
    return sgf_paths


def read_and_parse_file(
    path: pathlib.Path, fast_parse: bool = False
) -> Sequence[Dict[str, Any]]:
    """Parse all lines of an sgf file to a list of dictionaries with game info."""
    parsed_games = []
    with open(path, "r") as f:
        for i, line in enumerate(f):
            parsed_games.append(
                parse_game_str_to_dict(
                    str(path), i + 1, line.strip(), fast_parse=fast_parse
                )
            )
    return parsed_games


def read_and_parse_all_files(
    paths: Sequence[pathlib.Path],
    fast_parse: bool = False,
    processes: Optional[int] = 128,
) -> Sequence[Dict[str, Any]]:
    """Returns concatenated contents of all files in `paths`."""
    if not processes:
        processes = min(128, len(paths) // 2)
    read_and_parse_file_partial = functools.partial(
        read_and_parse_file, fast_parse=fast_parse
    )
    with multiprocessing.Pool(processes=max(processes, 1)) as pool:
        parsed_games = pool.map(read_and_parse_file_partial, paths)
    return list(chain.from_iterable(parsed_games))


def extract_re(pattern: str, subject: Union[str, int]) -> Union[str, int, None]:
    """Extract first group matching `pattern` from `subject`."""
    match = re.search(pattern, str(subject))
    if match is not None:
        match_str = match.group(1)
        return int(match_str) if match_str.isdecimal() else match_str
    return None


def extract_prop(property_name: str, sgf_str: Union[str, int]) -> Union[str, int, None]:
    return extract_re(f"{property_name}\\[([^]]+)", sgf_str)


def extract_param(
    property_name: str, sgf_str: Union[str, int]
) -> Union[str, int, None]:
    return extract_re(f"{property_name}=([^,\\]]+)", sgf_str)


num_b_pass_pattern = re.compile("B\\[]")
num_w_pass_pattern = re.compile("W\\[]")
semicolon_pattern = re.compile(";")


def parse_game_str_to_dict(
    path: str, line_number: int, sgf_str: str, fast_parse: bool = False
) -> Dict[str, Any]:
    """Parse an sgf string to a dictionary containing game_info.

    Args:
        path: Path where this string was read from. We want to keep this
            information so that we can later retrieve the original string.
        line_number: Line number in the above path.
        sgf_str: The string to parse.
        fast_parse: Include additional fields that are slower to extract
            or generally less useful.

    Returns:
        Dictionary containing game_info.
    """
    rule_str = extract_prop("RU", sgf_str)
    comment_str = extract_prop("C", sgf_str)
    board_size = extract_prop("SZ", sgf_str)
    whb = "0"
    if rule_str and "whb" in rule_str:
        whb = extract_re(r"whb([A-Z0-9\-]+)", rule_str)
    b_name = extract_prop("PB", sgf_str)
    w_name = extract_prop("PW", sgf_str)
    result = extract_prop("RE", sgf_str)
    komi = float(extract_prop("KM", sgf_str))
    win_color = result[0].lower() if result else None
    assert (
        "victim" in b_name or "victim" in w_name or "adv" in b_name or "adv" in w_name
    ), f"Game doesn't have victim: path={path}, line_number={line_number}"

    victim_color = {b_name: "b", w_name: "w"}.get(
        "victim",
        "b" if ("victim" in b_name or "bot" in b_name or "adv" in w_name) else "w",
    )
    victim_name = {"b": b_name, "w": w_name}[victim_color]
    adv_color = {"b": "w", "w": "b"}[victim_color]
    adv_name = b_name if adv_color == "b" else w_name
    if victim_name in ["bot-cp127-v1", "bot-cp505-v2", "bot-cp505-v1"]:
        victim_steps = {
            "bot-cp127-v1": 5303129600,
            "bot-cp505-v2": 11840935168,
            "bot-cp505-v1": 11840935168,
        }[victim_name]
    else:
        victim_steps = extract_re("-s([^-]+?)-", victim_name) or 0
    adv_rank = (
        extract_prop("BR", sgf_str) if adv_color == "b" else extract_prop("WR", sgf_str)
    )
    victim_rank = (
        extract_prop("BR", sgf_str) if adv_color == "w" else extract_prop("WR", sgf_str)
    )
    b_meta = extract_prop("BR", sgf_str)
    w_meta = extract_prop("WR", sgf_str)
    b_visits = (
        extract_re(r"v([0-9]+)", b_meta) or extract_re(r"v=([0-9]+)", b_meta) or "-1"
        if b_meta
        else None
    )
    w_visits = (
        extract_re(r"v([0-9]+)", w_meta) or extract_re(r"v=([0-9]+)", w_meta) or "-1"
        if w_meta
        else None
    )
    victim_visits = {"b": b_visits, "w": w_visits}[victim_color]
    adv_visits = {"b": b_visits, "w": w_visits}[adv_color]
    if win_color is None:
        adv_minus_victim_score = 0
    else:
        win_score = float(result.split("+")[-1])
        adv_minus_victim_score = win_score if adv_color == win_color else -win_score
    adv_steps = extract_re(r"\-s([0-9]+)\-", adv_name) or 0
    adv_samples = extract_re(r"\-d([0-9]+)", adv_name) or 0
    adv_komi = komi * {"w": 1, "b": -1}[adv_color]

    parsed_info = {
        "b_name": b_name,
        "w_name": w_name,
        # Victim info
        "victim_color": victim_color,
        "victim_name": victim_name,
        "victim_visits": victim_visits
        if victim_visits
        else int(str(victim_rank).lstrip("v"))
        if victim_rank
        else 1,
        "victim_steps": victim_steps,
        "victim_rsym": extract_param("rsym", victim_rank),
        "victim_algo": extract_param("algo", victim_rank),
        # Adversary info
        "adv_color": adv_color,
        "adv_name": adv_name,
        "adv_visits": adv_visits,
        "adv_steps": adv_steps,
        "adv_samples": adv_samples,
        "adv_rsym": extract_param("rsym", adv_rank),
        "adv_algo": extract_param("algo", adv_rank),
        # Scoring info
        "win_color": win_color,
        "win_name": b_name if win_color == "b" else w_name,
        "lose_name": w_name if win_color == "b" else b_name,
        "adv_win": adv_color == win_color,
        "komi": komi,
        "adv_komi": adv_komi,
        "adv_minus_victim_score": adv_minus_victim_score,
        "adv_minus_victim_score_wo_komi": adv_minus_victim_score - adv_komi,
        # Other info
        "board_size": board_size,
        "start_turn_idx": extract_param("startTurnIdx", comment_str),
        "handicap": extract_prop("HA", sgf_str),
        "num_moves": len(semicolon_pattern.findall(sgf_str)) - 1,
        "ko_rule": extract_re(r"ko([A-Z]+)", rule_str),
        "score_rule": extract_re(r"score([A-Z]+)", rule_str),
        "tax_rule": extract_re(r"tax([A-Z]+)", rule_str),
        "sui_legal": extract_re(r"sui([0-9])", rule_str) == 1,
        "has_button": "button1" in rule_str,
        "whb": whb,
        "fpok": "fpok" in rule_str,
        "init_turn_num": extract_param("initTurnNum", comment_str),
        "used_initial_position": extract_param("usedInitialPosition", comment_str) == 1,
        "gtype": extract_param("gtype", comment_str),
        "is_continuation": False,
        # Parsing metadata
        "sgf_path": path,
        "sgf_line": line_number,
    }

    if not fast_parse:
        # findall() is much slower than extracting a single regex
        num_b_pass = (
            len(num_b_pass_pattern.findall(sgf_str))
            + (
                len(re.findall("B\\[tt]", sgf_str))
                if isinstance(board_size, int) and board_size <= 19
                else 0
            ),
        )
        num_w_pass = (
            len(num_w_pass_pattern.findall(sgf_str))
            + (
                len(re.findall("W\\[tt]", sgf_str))
                if isinstance(board_size, int) and board_size <= 19
                else 0
            ),
        )
        parsed_info["num_b_pass"] = num_b_pass
        parsed_info["num_w_pass"] = num_w_pass
        parsed_info["num_adv_pass"] = num_b_pass if adv_color == "b" else num_w_pass
        parsed_info["num_victim_pass"] = num_w_pass if adv_color == "b" else num_b_pass

    return parsed_info