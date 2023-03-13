import collections
import json
import math
import os
import subprocess
import time
from threading import Thread
import sgfmill
import sgfmill.sgf
import sgfmill.boards
import sgfmill.ascii_boards
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

PLOTS_PATH = "generated_plots"  # path to output plots
SGFS_PATH = "sgfs"  # path to input positions
KATAGO_PATH = "/engines/KataGo-raw/cpp/katago"  # path to compiled KataGo
MODELS_PATH = "/go_attack/victim_models/"  # path to models to be tested


def get_model_name_for_plotting(input_model_path):
    """
    Adjust this to get the part of the model name that you want to appear on the plots.
    E.g., remove extension, remove prefixes all the models have, etc.
    """
    return input_model_path.split("/")[-1].split(".bin")[0]


config = """
logDir = analysis_logs
reportAnalysisWinratesAs = SIDETOMOVE
maxVisits = 200
numAnalysisThreads = 1
numSearchThreadsPerAnalysisThread = 1
nnMaxBatchSize = 16
nnCacheSizePowerOfTwo = 18
nnMutexPoolSizePowerOfTwo = 15
nnRandomize = true
rootNumSymmetriesToSample = 8
"""


# stuff for plotting winrates
WR_Y_TICKS = [
    (0.01, "1%"),
    (0.02, "2%"),
    (0.03, "3%"),
    (0.05, "5%"),
    (0.07, "7%"),
    (0.10, "10%"),
    (0.15, "15%"),
    (0.20, "20%"),
    (0.30, "30%"),
    (0.50, "50%"),
    (0.70, "70%"),
    (0.80, "80%"),
    (0.85, "85%"),
    (0.90, "90%"),
    (0.93, "93%"),
    (0.95, "95%"),
    (0.97, "97%"),
    (0.98, "98%"),
    (0.99, "99%"),
]
POWER = 2.0


def ytoplot(y):
    z = 2.0 * (y - 0.5)
    return 0.5 * math.copysign(1.0, z) * (abs(z) ** POWER) + 0.5


def set_plot_labels(input_ax, x_model_names, y_label):
    input_ax.legend()
    input_ax.set_xticklabels(x_model_names)

    input_ax.set_xlabel("Model")
    input_ax.set_ylabel(y_label)

    input_ax.set_ylim([0, 1])

    yticks = WR_Y_TICKS
    input_ax.set_yticks(
        [ytoplot(tick[0]) for tick in yticks], [tick[1] for tick in yticks]
    )

    for model_name in x_model_names:
        input_ax.axvline(x=model_name, linestyle="-", color="lightgray", alpha=0.5)
    for (y, _label) in yticks:
        input_ax.axhline(y=ytoplot(y), linestyle="-", color="lightgray", alpha=0.5)


def sgfmill_to_str(coord):
    if coord is None or coord == "pass":
        return "pass"
    (y, x) = coord
    return "ABCDEFGHJKLMNOPQRSTUVWXYZ"[x] + str(y + 1)


class KataGo:
    def __init__(self, name, katago_path, config_path, model_path):
        self.name = name
        self.query_counter = 0
        katago = subprocess.Popen(
            [katago_path, "analysis", "-config", config_path, "-model", model_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        self.katago = katago

        def printforever():
            while katago.poll() is None:
                data = katago.stderr.readline()
                time.sleep(0)
                if data:
                    print("KataGo: ", data.decode(), end="")
            data = katago.stderr.read()
            if data:
                print("KataGo: ", data.decode(), end="")

        self.stderrthread = Thread(target=printforever)
        self.stderrthread.start()

    def close(self):
        self.katago.stdin.close()

    def query(self, initial_board, moves, komi, max_visits=None):
        query = {}

        query["id"] = str(self.query_counter)
        self.query_counter += 1

        query["moves"] = moves
        query["initialStones"] = []
        for y in range(initial_board.side):
            for x in range(initial_board.side):
                color = initial_board.get(y, x)
                if color:
                    query["initialStones"].append((color, sgfmill_to_str((y, x))))
        query["rules"] = "Chinese"
        query["komi"] = komi
        query["boardXSize"] = initial_board.side
        query["boardYSize"] = initial_board.side
        query["includePolicy"] = True
        if max_visits is not None:
            query["maxVisits"] = max_visits

        self.katago.stdin.write((json.dumps(query) + "\n").encode())
        self.katago.stdin.flush()

        # print(json.dumps(query))

        line = ""
        while line == "":
            if self.katago.poll():
                time.sleep(1)
                raise Exception("Unexpected katago exit")
            line = self.katago.stdout.readline()
            line = line.decode().strip()
            # print("Got: " + line)
        response = json.loads(line)

        # print(response)
        return response


def process_sgf_file(filename, func):
    with open(filename, "r") as f:
        game = sgfmill.sgf.Sgf_game.from_string(f.read())
        size = game.get_size()
        board = sgfmill.boards.Board(size)
        moves_since_setup = []
        komi = game.get_komi()
        walk_game_tree(
            filename,
            game.get_root(),
            board.copy(),
            board.copy(),
            moves_since_setup,
            komi,
            func,
        )


def walk_game_tree(
    filename, node, board_at_setup, board, moves_since_setup, komi, func
):
    board = board.copy()
    ab, aw, ae = node.get_setup_stones()
    if ab or aw or ae:
        is_legal = board.apply_setup(ab, aw, ae)
        assert is_legal
        board_at_setup = board.copy()
        moves_since_setup = []
    color, raw = node.get_raw_move()
    if color:
        move = sgfmill.sgf_properties.interpret_go_point(raw, board.side)
        if move:
            (row, col) = move
            try:
                board.play(row, col, color)
            except ValueError:
                print(sgfmill.ascii_boards.render_board(board))
                print(raw, move, color)
                raise ValueError()
        moves_since_setup = moves_since_setup + [(color, sgfmill_to_str(move))]

    if node.has_property("C"):
        if node.find_property("C").strip() == "START":
            correct_moves = []
            wrong_moves = []
            target_winner = None
            for child in node:
                if (
                    child.has_property("C")
                    and child.find_property("C").strip() == "CORRECT"
                ):
                    childcolor, childraw = child.get_raw_move()
                    childmove = sgfmill.sgf_properties.interpret_go_point(
                        childraw, board.side
                    )
                    correct_moves.append((childcolor, childmove))
                if (
                    child.has_property("C")
                    and child.find_property("C").strip() == "WRONG"
                ):
                    childcolor, childraw = child.get_raw_move()
                    childmove = sgfmill.sgf_properties.interpret_go_point(
                        childraw, board.side
                    )
                    wrong_moves.append((childcolor, childmove))

            func(
                filename,
                board_at_setup,
                moves_since_setup,
                komi,
                correct_moves,
                wrong_moves,
                target_winner,
            )
        elif node.find_property("C").strip() == "BLACKWIN":
            target_winner = "b"
            func(
                filename, board_at_setup, moves_since_setup, komi, [], [], target_winner
            )
        elif node.find_property("C").strip() == "WHITEWIN":
            target_winner = "w"
            func(
                filename, board_at_setup, moves_since_setup, komi, [], [], target_winner
            )

    for child in node:
        walk_game_tree(
            filename, child, board_at_setup, board, moves_since_setup, komi, func
        )


if __name__ == "__main__":
    os.makedirs(PLOTS_PATH, exist_ok=True)
    config_path = "analysis_config.cfg"
    with open(config_path, "w") as f:
        f.write(config)
    models = []
    for model_path in sorted(os.listdir(MODELS_PATH)):
        models.append(
            (
                os.path.join(MODELS_PATH, model_path),
                get_model_name_for_plotting(model_path),
            )
        )
        print(f"Model: {model_path}")

    katagos = []
    for model_path, model_name in models:
        katagos.append(KataGo(model_name, KATAGO_PATH, config_path, model_path))

    def get_policy_and_search_mass(board_at_setup, response, moves):
        policy_mass = 0.0
        weight_total = 0.0
        weight_sum = 0.0

        for move_info in response["moveInfos"]:
            weight_total += move_info["weight"]

        for (_, coord) in moves:
            if coord is None:
                pos = board_at_setup.side * board_at_setup.side  # pass
            else:
                (y, x) = coord
                pos = x + board_at_setup.side * (board_at_setup.side - 1 - y)
            policy_mass += response["policy"][pos]
            for move_info in response["moveInfos"]:
                if move_info["move"] == sgfmill_to_str(coord):
                    weight_sum += move_info["weight"]

        weight_prop = weight_sum / (1e-30 + weight_total)
        return (policy_mass, weight_prop)

    correct_policy_masses = collections.defaultdict(dict)
    correct_search_masses = collections.defaultdict(dict)
    raw_winrate = collections.defaultdict(dict)
    search_winrate = collections.defaultdict(dict)

    def process(
        filename,
        board_at_setup,
        moves_since_setup,
        komi,
        correct_moves,
        wrong_moves,
        target_winner,
    ):
        for katago in katagos:
            response = katago.query(board_at_setup, moves_since_setup, komi)

            modelname = os.path.basename(filename)
            if len(correct_moves) > 0:
                assert target_winner is None
                assert len(wrong_moves) == 0

                correct_policy_mass, correct_search_mass = get_policy_and_search_mass(
                    board_at_setup, response, correct_moves
                )
                correct_policy_masses[modelname][katago.name] = correct_policy_mass
                correct_search_masses[modelname][katago.name] = correct_search_mass

            if len(wrong_moves) > 0:
                assert target_winner is None
                assert len(correct_moves) == 0

                wrong_policy_mass, wrong_search_mass = get_policy_and_search_mass(
                    board_at_setup, response, wrong_moves
                )
                correct_policy_masses[modelname][katago.name] = 1.0 - wrong_policy_mass
                correct_search_masses[modelname][katago.name] = 1.0 - wrong_search_mass

            if target_winner is not None:
                assert len(correct_moves) == 0
                assert len(wrong_moves) == 0

            search_winrate[modelname][katago.name] = response["rootInfo"]["winrate"]

            response = katago.query(
                board_at_setup, moves_since_setup, komi, max_visits=1
            )
            raw_winrate[modelname][katago.name] = response["rootInfo"]["winrate"]

    series_names = []
    for sgf_file in os.listdir(SGFS_PATH):
        print(sgf_file, flush=True)
        process_sgf_file(f"{SGFS_PATH}/{sgf_file}", process)
        series_names.append(sgf_file)

    print(correct_policy_masses)

    def plot_policy(plotfilename, ylabel, series_names, data):
        data = {
            series_name: data[series_name]
            for series_name in sorted(data.keys())
            if series_name in series_names
        }
        model_names = [model_name for model_path, model_name in models]

        colors = sns.color_palette("husl", n_colors=len(series_names))

        fig, ax = plt.subplots(figsize=(12.5, 8.2))
        for (series_name, series_data), color in zip(data.items(), colors):
            policy_values = [series_data[model_name] for model_name in model_names]
            ax.plot(
                model_names, policy_values, label=series_name, color=color, marker="o"
            )

        ax.legend()
        ax.set_xticklabels(model_names)

        ax.set_xlabel("Model")
        ax.set_ylabel(ylabel)

        ax.set_yscale("symlog", linthresh=1e-3, linscale=(1.0 / math.log(10)))
        ax.set_ylim([0, 1])
        ax.yaxis.set_major_formatter(
            plt.FuncFormatter(lambda y, _: "%.3g%%" % (y * 100.0))
        )

        for model_name in model_names:
            ax.axvline(x=model_name, linestyle="-", color="lightgray", alpha=0.5)
        for y in [0.001, 0.01, 0.1, 1.0]:
            ax.axhline(y=y, linestyle="-", color="lightgray", alpha=0.5)
        for y in [y * 0.0001 for y in range(1, 10)]:
            ax.axhline(y=y, linestyle="-", color="lightgray", alpha=0.2)
        for y in [y * 0.001 for y in range(2, 10)]:
            ax.axhline(y=y, linestyle="-", color="lightgray", alpha=0.2)
        for y in [y * 0.01 for y in range(2, 10)]:
            ax.axhline(y=y, linestyle="-", color="lightgray", alpha=0.2)
        for y in [y * 0.1 for y in range(2, 10)]:
            ax.axhline(y=y, linestyle="-", color="lightgray", alpha=0.2)

        fig.savefig(plotfilename, dpi=90)

    def plot_winrate(
        plotfilename, ylabel, series_names, data, global_accumulate_winrate=None
    ):
        data = {
            series_name: data[series_name]
            for series_name in sorted(data.keys())
            if series_name in series_names
        }
        model_names = [model_name for model_path, model_name in models]

        colors = sns.color_palette("husl", n_colors=len(series_names) + 1)
        avg_color = colors[0]
        colors = colors[1:]

        fig, ax = plt.subplots(figsize=(12.5, 8.2))
        accumulate_data_of_type = (
            None  # add up each individual position output for the current type
        )
        accumulate_data_of_type_denom = (
            0  # denominator to average over individual positions of current type
        )
        for (series_name, series_data), color in zip(data.items(), colors):
            winrate_values = [
                ytoplot(series_data[model_name]) for model_name in model_names
            ]
            print("WINRATE_VALUES", winrate_values)
            ax.plot(
                model_names, winrate_values, label=series_name, color=color, marker="o"
            )
            accumulate_data_of_type_denom += 1
            if accumulate_data_of_type is None:
                accumulate_data_of_type = np.array(winrate_values)
            else:
                accumulate_data_of_type += np.array(winrate_values)
        print(accumulate_data_of_type)
        accumulate_data_of_type = (
            accumulate_data_of_type / accumulate_data_of_type_denom
        )
        ax.plot(
            model_names,
            accumulate_data_of_type,
            label="AVERAGE",
            color=avg_color,
            marker="o",
            linewidth=3,
        )

        set_plot_labels(ax, model_names, ylabel)

        fig.savefig(plotfilename, dpi=90)

        if global_accumulate_winrate is None:
            global_accumulate_winrate = accumulate_data_of_type
        else:
            global_accumulate_winrate += accumulate_data_of_type
        return global_accumulate_winrate

    def plot_average_winrate(plotfilename, raw_wr, search_wr):
        # for plotting the final, overall average wr
        model_names = [model_name for model_path, model_name in models]

        colors = sns.color_palette("husl", n_colors=2)

        fig, ax = plt.subplots(figsize=(12.5, 8.2))
        ax.plot(model_names, raw_wr, label="Raw", color=colors[0], marker="o")
        ax.plot(model_names, search_wr, label="Search", color=colors[1], marker="o")

        set_plot_labels(ax, model_names, "Average Winwrate")

        fig.savefig(plotfilename, dpi=90)

    def plot_wr_wrapper(save_name_firstpart, series_names_var):
        global global_accumulate_winrate_raw, global_accumulate_winrate_search, global_accumulate_winrate_denom
        global_accumulate_winrate_raw = plot_winrate(
            os.path.join(PLOTS_PATH, f"{save_name_firstpart}-rawwinrate.png"),
            "Raw Winrate",
            series_names_var,
            raw_winrate,
            global_accumulate_winrate=global_accumulate_winrate_raw,
        )
        global_accumulate_winrate_search = plot_winrate(
            os.path.join(PLOTS_PATH, f"{save_name_firstpart}-searchwinrate.png"),
            "Search Winrate",
            series_names_var,
            search_winrate,
            global_accumulate_winrate=global_accumulate_winrate_search,
        )
        global_accumulate_winrate_denom += 1

    def plot_policy_and_wr_wrapper(
        save_name_firstpart, series_names_var, y_axis_mass_label_firstpart="Correct"
    ):
        plot_policy(
            os.path.join(PLOTS_PATH, f"{save_name_firstpart}-raw.png"),
            f"{y_axis_mass_label_firstpart} Raw Policy",
            series_names_var,
            correct_policy_masses,
        )
        plot_policy(
            os.path.join(PLOTS_PATH, f"{save_name_firstpart}-search.png"),
            f"{y_axis_mass_label_firstpart} Search Mass",
            series_names_var,
            correct_search_masses,
        )

        plot_wr_wrapper(save_name_firstpart, series_names_var)

    global_accumulate_winrate_raw = None
    global_accumulate_winrate_search = None
    global_accumulate_winrate_denom = 0

    race_series_names = [
        key for key in series_names if key.startswith("race") and "already" not in key
    ]
    plot_policy_and_wr_wrapper("race", race_series_names)

    # raceeye_series_names = [key for key in series_names if key.startswith("raceeye") and "already" not in key]
    # plot_policy_and_wr_wrapper('raceeye', raceeye_series_names)

    racealready_series_names = [
        key for key in series_names if key.startswith("race") and "already" in key
    ]
    plot_policy_and_wr_wrapper(
        "racealready", racealready_series_names, y_axis_mass_label_firstpart="Non-Wrong"
    )

    escape_series_names = [key for key in series_names if key.startswith("escape")]
    plot_policy_and_wr_wrapper("escape", escape_series_names)

    # escapeeye_series_names = [key for key in series_names if key.startswith("escapeeye") and "eye" in key]
    # plot_policy_and_wr_wrapper('escapeeye', escapeeye_series_names)

    distraction_series_names = [
        key for key in series_names if key.startswith("distraction")
    ]
    plot_policy_and_wr_wrapper("distraction", distraction_series_names)

    # distractioneye_series_names = [key for key in series_names if key.startswith("distractioneye") and "eye" in key]
    # plot_policy_and_wr_wrapper('distractioneye', distractioneye_series_names)

    eyelive_series_names = [
        key for key in series_names if key.startswith("eye") and "live" in key
    ]
    plot_policy_and_wr_wrapper("eyelive", eyelive_series_names)

    eyekill_series_names = [
        key for key in series_names if key.startswith("eye") and "kill" in key
    ]
    plot_policy_and_wr_wrapper("eyekill", eyekill_series_names)

    inevitable_series_names = [
        key for key in series_names if key.startswith("inevitable")
    ]
    plot_wr_wrapper("inevitable", inevitable_series_names)

    statusdead_series_names = [
        key for key in series_names if key.startswith("statusdead")
    ]
    plot_wr_wrapper("statusdead", statusdead_series_names)

    statusalive_series_names = [
        key for key in series_names if key.startswith("statusalive")
    ]
    plot_wr_wrapper("statusalive", statusalive_series_names)

    global_accumulate_winrate_raw = (
        global_accumulate_winrate_raw / global_accumulate_winrate_denom
    )
    global_accumulate_winrate_search = (
        global_accumulate_winrate_search / global_accumulate_winrate_denom
    )
    plot_average_winrate(
        os.path.join(PLOTS_PATH, "00_overall-winrate.png"),
        global_accumulate_winrate_raw,
        global_accumulate_winrate_search,
    )

    print("Done")
    for katago in katagos:
        katago.close()
