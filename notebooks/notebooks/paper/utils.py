"""Utility functions for plot notebooks."""

import os
import pathlib
import re
from typing import Dict, Iterable, List, Tuple, TypeVar

import matplotlib.pyplot as plt
import matplotlib.ticker
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
    return str(style_sheets_dir / f"{style_name}.mplstyle")


def import_plt_sty(sty_file: str) -> None:
    """Imports a LaTeX .sty file into plt, but wipes out any existing LaTeX preamble."""
    sty_file = pathlib.Path(sty_file)
    assert sty_file.exists()
    assert sty_file.suffix == ".sty"
    absolute_path_without_extension = sty_file.parent.resolve() / sty_file.stem
    preamble = rf"\usepackage{{{absolute_path_without_extension}}}"
    plt.rcParams.update(
        {
            "pgf.preamble": preamble,
            "text.latex.preamble": preamble,
        }
    )


def parse_for_match(df: pd.DataFrame, adv_name_regex: str = "adv") -> None:
    """Adds additional useful info to a dataframe of match SGFs."""
    adv_is_black = df.b_name.str.contains(adv_name_regex, regex=True)
    adv_is_white = df.w_name.str.contains(adv_name_regex, regex=True)
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

    df.adv_visits = df.adv_name.str.extract(r"-v(\d+)").astype(int)
    df.victim_visits = df.victim_name.str.extract(r"-v(\d+)").astype(int)


def parse_sgfs(
    paths: Iterable[str],
    no_victim_okay: bool = True,
) -> pd.DataFrame:
    """Parses a list of paths into a dataframe of SGFs."""
    game_infos = flatten_2d_list(
        [
            game_info.read_and_parse_all_files(
                game_info.find_sgf_files(pathlib.Path(path)),
                fast_parse=True,
                no_victim_okay=no_victim_okay,
            )
            for path in paths
        ]
    )
    df = pd.DataFrame(game_infos)
    return df


def get_victim_active_ranges(df: pd.DataFrame) -> Dict[str, Tuple[int, int]]:
    """Get victims' active ranges during training."""
    df = df[df.gtype == "normal"]
    df = df[df.board_size == 19]
    df["victim_name_v2"] = (
        df.victim_name.str.strip("kata1-").str.strip(".bin.gz").str.strip(".txt.gz")
        + "-v"
        + df.victim_visits.astype("str")
    )

    grouped_df = df[["victim_name_v2", "adv_steps"]].groupby("victim_name_v2")
    min_dict = grouped_df.adv_steps.min()
    max_dict = grouped_df.adv_steps.max()

    victim_ranges: Dict[str, Tuple[int, int]] = {}
    for v in df.victim_name_v2.unique():
        start = min_dict[v]
        end = max_dict[v]
        victim_ranges[v] = (start, end)
    victim_ranges = dict(sorted(victim_ranges.items(), key=lambda x: x[1][1]))
    return victim_ranges


def get_victim_active_ranges_allow_repeats(
    df: pd.DataFrame,
) -> List[Tuple[str, Tuple[int, int]]]:
    """Get victims' active ranges during training, allowing victim to appear multiple times.

    E.g., say victim A was active during steps 0 to 1mil and also 5mil to 10mil.
    get_victim_active_ranges() would return that victim A was active from 0 to 10mil,
    whereas get_victim_active_ranges_allow_repeats() would return that victim A was active
    from 0 to 1mil and 5mil to 10mil.
    """
    df = df[df.gtype == "normal"]
    df = df[df.board_size == 19]
    df["victim_name_v2"] = (
        df.victim_name.str.strip("kata1-").str.strip(".bin.gz").str.strip(".txt.gz")
        + "-v"
        + df.victim_visits.astype("str")
    )

    grouped_df = df[["victim_name_v2", "adv_steps"]].groupby("victim_name_v2")

    all_steps = sorted(df["adv_steps"].unique())
    step_to_index = {step: i for i, step in enumerate(all_steps)}
    # Get all steps a victim appears in.
    victim_active_steps = grouped_df.apply(lambda x: sorted(x["adv_steps"].unique()))

    def list_to_ranges(xs):
        """Converts int list l into a list of ranges of ints.
        e.g., input [1,2,3,5,7,8,9,14,15] -> output [(1,3),(5,5),(7,9),(14,15)]
        """
        ranges = []
        start = xs[0]
        end = xs[0]
        for i in range(1, len(xs)):
            if xs[i] == end + 1:
                end = xs[i]
            else:
                ranges.append((start, end))
                start = xs[i]
                end = xs[i]
        ranges.append((start, end))
        return ranges

    # Convert victims' steps into contiguous ranges.
    active_ranges = []
    for victim, steps in victim_active_steps.items():
        steps_indices = [step_to_index[step] for step in steps]
        victim_ranges_indices = list_to_ranges(steps_indices)
        for start, end in victim_ranges_indices:
            active_ranges.append((victim, (all_steps[start], all_steps[end])))
    active_ranges = sorted(active_ranges, key=lambda x: x[1])
    return active_ranges


def get_victim_change_steps(df: pd.DataFrame) -> List[int]:
    """Get steps at which victim changes during training."""
    return [r[0] for r in get_victim_active_ranges(df).values()]


def get_all_adversary_steps(training_path: pathlib.Path) -> list[int]:
    """Returns all adversary step values for the training run in ascending order."""
    adversary_dirs = training_path.glob("models/t0-s*-d*")
    STEP_REGEX = re.compile(r"t0-s([0-9]+)-d[0-9]+")
    steps = []
    for adversary_dir in adversary_dirs:
        steps_match = STEP_REGEX.match(adversary_dir.name)
        assert steps_match is not None
        steps.append(int(steps_match.group(1)))
    return sorted(steps)


def filter_x_minor_ticks(ax=None, threshold: float = 1):
    """Filters out x-axis minor ticks below the threshold value."""
    if ax is None:
        ax = plt.gca()

    # Courtesy ChatGPT-4 for the code.
    minor_locator = ax.xaxis.get_minor_locator()
    minor_ticks = minor_locator.tick_values(*ax.get_xlim())

    # Filter out minor ticks below the threshold
    filtered_minor_ticks = minor_ticks[minor_ticks >= threshold]

    # Create a new minor locator with the filtered tick locations
    new_minor_locator = matplotlib.ticker.FixedLocator(filtered_minor_ticks)

    # Set the new minor locator
    ax.xaxis.set_minor_locator(new_minor_locator)
