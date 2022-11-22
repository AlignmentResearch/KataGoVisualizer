import pathlib

import matplotlib.pyplot as plt
import pandas as pd

from sgf_parser import game_info


flatten_2d_list = lambda lists: sum(lists, [])


def set_plot_formatting():
    plt.rcParams.update(
        {
            "pgf.texsystem": "pdflatex",
            "font.family": "serif",
            "font.serif": ["Times"],
            "text.usetex": True,
            "pgf.rcfonts": False,
            "font.size": 10,
            "font.weight": "medium",
        }
    )
    plt.style.use("tableau-colorblind10")


def parse_for_match(df: pd.DataFrame, victim_name_prefix="cp505-v"):
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

    df.victim_visits = df.victim_name.str.slice(start=len(victim_name_prefix)).astype(
        int
    )


def parse_sgfs(paths):
    game_infos = flatten_2d_list(
        [
            game_info.read_and_parse_all_files(
                game_info.find_sgf_files(pathlib.Path(path)), fast_parse=True
            )
            for path in paths
        ]
    )
    df = pd.DataFrame(game_infos)
    return df
