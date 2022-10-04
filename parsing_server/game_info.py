"""Module to extract game information from SGF files."""

import os
import pathlib
import re
from typing import Any, Dict, Sequence, Union
from itertools import chain
import multiprocessing
from pathlib import Path
import warnings
import functools

MOUNT_DIR, READ_DIR = Path(os.environ["MOUNT_DIR"]), Path(os.environ["READ_DIR"])


def find_sgf_files(
    root: pathlib.Path, max_scan_length: int = 10000
) -> Sequence[pathlib.Path]:
    """Finds all SGF files in `root` (recursively).

    Args:
        root: The root directory to search.
        max_scan_length: The maximum number of directories to search.
    """
    sgf_paths = []
    directories_scanned = 0
    for dirpath, dirnames, filenames in os.walk(root):
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
    paths: Sequence[pathlib.Path], fast_parse: bool = False, processes: int = 128
) -> Sequence[Dict[str, Any]]:
    """Returns concatenated contents of all files in `paths`."""
    read_and_parse_file_partial = functools.partial(
        read_and_parse_file, fast_parse=fast_parse
    )
    with multiprocessing.Pool(processes=max(processes, 1)) as pool:
        parsed_games = pool.map(read_and_parse_file_partial, paths)
    combined_parsed_games = list(chain.from_iterable(parsed_games))
    return combined_parsed_games


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
    rule_str = extract_prop("RU", sgf_str)
    comment_str = extract_prop("C", sgf_str)
    board_size = extract_prop("SZ", sgf_str)
    whb = "0"
    if "whb" in rule_str:
        whb = extract_re(r"whb([A-Z0-9\-]+)", rule_str)
    board_size = (extract_prop("SZ", sgf_str),)
    b_name = extract_prop("PB", sgf_str)
    w_name = extract_prop("PW", sgf_str)
    result = extract_prop("RE", sgf_str)
    komi = float(extract_prop("KM", sgf_str))
    win_color = result[0].lower() if result else None
    assert (
        "victim" in b_name or "victim" in w_name or "adv" in b_name or "adv" in w_name
    ), f"Game doesn't have victim: path={READ_DIR / Path(path).relative_to(MOUNT_DIR)}, line_number={line_number}"

    adv_color = "b" if "victim" in w_name or "adv" in b_name else "w"
    adv_name = b_name if adv_color == "b" else w_name
    victim_name = b_name if adv_color == "w" else w_name
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
    adv_visits = extract_param("v", adv_rank) or 1
    victim_visits = extract_param("v", victim_rank)
    if win_color is None:
        adv_minus_victim_score = 0
    else:
        win_score = float(result.split("+")[-1])
        adv_minus_victim_score = win_score if adv_color == win_color else -win_score
    adv_steps = extract_re(r"\-s([0-9]+)\-", adv_name) or 0
    adv_samples = extract_re(r"\-d([0-9]+)", adv_name) or 0
    adv_komi = komi * {"w": 1, "b": -1}[adv_color]

    parsed_info = {
        "adv_win": adv_color == win_color,
        "adv_minus_victim_score": adv_minus_victim_score,
        "board_size": board_size,
        "adv_steps": adv_steps,
        "victim_steps": victim_steps,
        "victim_visits": victim_visits
        if victim_visits
        else int(str(victim_rank).lstrip("v"))
        if victim_rank
        else 1,
        "adv_visits": adv_visits,
        "victim_rsym": extract_param("rsym", victim_rank),
        "adv_rsym": extract_param("rsym", adv_rank),
        "victim_algo": extract_param("algo", victim_rank),
        "adv_algo": extract_param("algo", adv_rank),
        "start_turn_idx": extract_param("startTurnIdx", comment_str),
        "komi": komi,
        "adv_komi": adv_komi,
        "handicap": extract_prop("HA", sgf_str),
        "num_moves": len(semicolon_pattern.findall(sgf_str)) - 1,
        "ko_rule": extract_re(r"ko([A-Z]+)", rule_str),
        "score_rule": extract_re(r"score([A-Z]+)", rule_str),
        "tax_rule": extract_re(r"tax([A-Z]+)", rule_str),
        "sui_legal": extract_re(r"sui([0-9])", rule_str) == "1",
        "has_button": "button1" in rule_str,
        "whb": whb,
        "fpok": "fpok" in rule_str,
        "victim_color": "b" if b_name == "victim" else "w",
        "adv_color": adv_color,
        "win_color": win_color,
        "adv_samples": adv_samples,
        "adv_minus_victim_score_wo_komi": adv_minus_victim_score - adv_komi,
        "init_turn_num": extract_param("initTurnNum", comment_str),
        "used_initial_position": extract_param("usedInitialPosition", comment_str) == 1,
        "sgf_path": path,
        "sgf_line": line_number,
        "adv_name": adv_name,
        "victim_name": victim_name,
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
        parsed_info["b_name"] = b_name
        parsed_info["w_name"] = w_name

    return parsed_info
