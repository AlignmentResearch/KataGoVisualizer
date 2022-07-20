"""Module to extract game information from SGF files."""

import os
import pathlib
import re
from typing import Any, Dict, Sequence, Tuple
from itertools import chain
import multiprocessing
# import concurrent.futures

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
            break
    return sgf_paths

def read_and_parse_file(path: pathlib.Path) -> Sequence[Dict[str, Any]]:
    parsed_games = []
    with open(path, "r") as f:
        for i, line in enumerate(f):
            parsed_games.append(parse_game_str_to_dict(str(path), i+1, line.strip()))
    return parsed_games

def read_and_parse_all_files(paths: Sequence[pathlib.Path]) -> Sequence[Dict[str, Any]]:
    """Returns concatenated contents of all files in `paths`."""
    pool = multiprocessing.Pool()
    parsed_games = pool.map(read_and_parse_file, paths)
    # parsed_games = map(read_and_parse_file, paths)
    # with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
    #     parsed_games = list(executor.map(read_and_parse_file, paths))
    combined_parsed_games = list(chain.from_iterable(parsed_games))
    return combined_parsed_games

def extract_re(pattern: str, subject: str) -> str:
    """Extract first group matching `pattern` from `subject`."""
    match = re.search(pattern, subject)
    return match.group(1) if match is not None else None

def extract_prop(property_name: str, sgf_str: str) -> str:
    return extract_re(f"{property_name}\\[([^]]+?)]", sgf_str)

def extract_comment_prop(property_name: str, sgf_str: str) -> str:
    return extract_re(f"{property_name}=([^,]+?),", sgf_str)

num_b_pass_pattern = re.compile('B\\[]')
num_w_pass_pattern = re.compile('W\\[]')
semicolon_pattern = re.compile(';')

def parse_game_tuple_to_dict(sgf: Tuple[str, int, str]) -> Dict[str, Any]:
    return parse_game_str_to_dict(sgf[0], sgf[1], sgf[2])

def parse_game_str_to_dict(path:str, line_number:int, sgf_str: str) -> Dict[str, Any]:
    rule_str = extract_prop("RU", sgf_str)
    comment_str = extract_prop("C", sgf_str)
    board_size = int(extract_prop("SZ", sgf_str).split(":")[0])
    whb = "0"
    if "whb" in rule_str:
        whb = extract_re(r"whb([A-Z0-9\-]+)", rule_str)
    b_name=extract_prop("PB", sgf_str)
    w_name=extract_prop("PW", sgf_str)
    result = extract_prop("RE", sgf_str)
    win_color = result[0].lower() if result != '0' else None
    num_b_pass=len(num_b_pass_pattern.findall(sgf_str))
    # + (len(re.findall("B\\[tt]", sgf_str,)) if board_size <= 19 else 0),
    num_w_pass=len(num_w_pass_pattern.findall(sgf_str))
    # + (len(re.findall("W\\[tt]", sgf_str)) if board_size <= 19 else 0),
    assert b_name == 'victim' or w_name == 'victim'

    adv_color = 'b' if w_name == 'victim' else 'w'
    adv_raw_name = b_name if adv_color == 'b' else w_name
    adv_name = adv_raw_name.split("__victim")[0] if adv_color == 'b' else adv_raw_name.split("victim__")[1]
    if win_color is None:
        adv_minus_victim_score = 0
    else:
        win_score = float(result.split("+")[1])
        adv_minus_victim_score = win_score if adv_color == win_color else -win_score

    return {
        'board_size': board_size,
        'gtype': extract_comment_prop("gtype", comment_str),
        'start_turn_idx': int(extract_comment_prop("startTurnIdx", comment_str)),
        'init_turn_num': int(extract_comment_prop("initTurnNum", comment_str)),
        'used_initial_position': extract_comment_prop("usedInitialPosition", comment_str) == "1",
        'b_name': b_name,
        'w_name': w_name,
        'win_color': win_color,
        'komi': float(extract_prop("KM", sgf_str)),
        'handicap': int(extract_prop("HA", sgf_str)),
        'is_continuation': False,
        'num_moves': len(semicolon_pattern.findall(sgf_str)) - 1,
        'num_b_pass': num_b_pass,
        'num_w_pass': num_w_pass,
        'ko_rule': extract_re(r"ko([A-Z]+)", rule_str),
        'score_rule': extract_re(r"score([A-Z]+)", rule_str),
        'tax_rule': extract_re(r"tax([A-Z]+)", rule_str),
        'sui_legal': extract_re(r"sui([0-9])", rule_str) == "1",
        'has_button': "button1" in rule_str,
        'whb': whb,
        'fpok': "fpok" in rule_str,
        'victim_color': 'b' if b_name == 'victim' else 'w',
        'adv_color': adv_color,
        'adv_name': adv_name,
        'adv_steps': 0 if adv_name == "random" else int(extract_re(r"\-s([0-9]+)\-", adv_name)),
        'adv_win': adv_color == win_color,
        'adv_minus_victim_score': adv_minus_victim_score,
        'num_adv_pass': num_b_pass if adv_color == 'b' else num_w_pass,
        'num_victim_pass': num_w_pass if adv_color == 'b' else num_b_pass,
        'sgf_path': path,
        'sgf_line': line_number,
    }
