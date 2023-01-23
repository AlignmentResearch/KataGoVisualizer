"""Utility functions for plot notebooks."""
import os
import pathlib
from typing import Iterable, List, TypeVar

import pandas as pd

from sgf_parser import game_info


T = TypeVar("T")


def flatten_2d_list(lists: Iterable[List[T]]) -> List[T]:
    """Flattens a 2D list into a 1D list."""
    return sum(lists, [])


def get_style(style_name: str) -> str:
    """Gets Matplotlib style sheet with a given name."""
    style_sheets_dir = (
        pathlib.Path(os.path.realpath(__file__)).parent / "matplotlib-style-sheets"
    )
    return str(style_sheets_dir / f"{style_name}.mlpstyle")


def parse_for_match(df: pd.DataFrame) -> None:
    """Adds additional useful info to a dataframe of match SGFs."""
    adv_is_black = df.b_name.str.contains("adv")
    adv_is_white = df.w_name.str.contains("adv")
    victim_is_black = ~adv_is_black
    victim_is_white = ~adv_is_white
    assert (~adv_is_black == adv_is_white).all()

    df.loc[adv_is_black, "adv_name"] = df.b_name[adv_is_black]
    df.loc[adv_is_white, "adv_name"] = df.w_name[adv_is_white]
    df.loc[adv_is_black, "adv_color"] = "b"
    df.loc[adv_is_white, "adv_color"] = "w"

    df.loc[victim_is_black, "victim_name"] = df.b_name[victim_is_black]
    df.loc[victim_is_white, "victim_name"] = df.w_name[victim_is_white]
    df.loc[victim_is_black, "victim_color"] = "b"
    df.loc[victim_is_white, "victim_color"] = "w"

    df.adv_win = df.adv_color == df.win_color

    df.victim_visits = df.victim_name.str.extract(r"-v(\d+)").astype(int)


def parse_sgfs(paths: Iterable[str]) -> pd.DataFrame:
    """Parses a list of paths into a dataframe of SGFs."""
    game_infos = flatten_2d_list(
        [
            game_info.read_and_parse_all_files(
                game_info.find_sgf_files(pathlib.Path(path)),
                fast_parse=True,
            )
            for path in paths
        ]
    )
    df = pd.DataFrame(game_infos)
    return df
