# samples games over the training progression, to add to website and analyze
# output: prints json lines to stdout (for copying to content.ts)

from collections import defaultdict
import glob
import json
import random
import re

import numpy as np

random.seed(42)

GAMES_TO_SAMPLE = 5  # this many games per training step decile and per victim
ADV_PATTERN = re.compile("adv-s[0-9]+")
VICTIM_LIST = ["cp39h-v1", "cp127h-v1", "cp505h-v1", "cp505h-v2048"]


def get_victim(input_text_line):
    for victim in VICTIM_LIST:
        if victim in input_text_line:
            return victim

    raise Exception("Victim not identified")


# we will use this to find the nearest match (for which games are available) to the exact decile of training steps
def find_nearest(array, value):
    array = np.asarray(array)
    idx = (np.abs(array - value)).argmin()
    return array[idx]


if __name__ == "__main__":
    all_files = glob.glob(
        "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-match-*/sgfs/*.sgfs"
    )

    # structure of below dict will be {adv_train_steps : {victim : [(filename0, linenum0), (filename1, linenum1), ...]}}
    results_dict = defaultdict(lambda: defaultdict(list))
    for filename in all_files:
        with open(filename, "r") as f:
            for line_num, line in enumerate(f):
                adv = ADV_PATTERN.search(line)
                num_steps = int(adv.group(0).split("s")[1])
                victim = get_victim(line)
                results_dict[num_steps][victim].append(
                    {"path": filename, "line": line_num + 1}
                )

    last_step = np.max(
        list(results_dict.keys())
    )  # last training step for adversary, i.e. "strongest" one

    for decile in range(1, 11):
        decile_steps = decile * last_step / 10
        nearest_match = find_nearest(list(results_dict.keys()), decile_steps)
        for victim in VICTIM_LIST:
            assert victim in results_dict[nearest_match]

            victim_name = victim.split("-v")[0]

            assert victim_name[-1] == "h"
            if victim_name == "cp505h":
                victim_name_nocode = "Latest"
                victim_name = "<code>Latest</code><sub><code>def</code></sub>"
            else:
                victim_name_nocode = victim_name[:-1]
                victim_name = (
                    f"<code>{victim_name[:-1]}</code><sub><code>def</code></sub>"
                )

            victim_visits = victim.split("-v")[1]
            if victim_visits == "1":
                victim_visits = ", no search"
            else:
                victim_visits = f", {victim_visits} visits"

            sample_games = random.sample(
                results_dict[nearest_match][victim], GAMES_TO_SAMPLE
            )

            rounded_steps = str(nearest_match)[
                :-6
            ]  # round down to nearest million (remove last 6 digits)

            output_dict = {
                "title": str(decile * 10)
                + "% vs. "
                + victim_name_nocode
                + victim_visits
            }
            output_dict["dir_name"] = (
                "training_sample_games" + str(decile) + "_" + victim
            )
            output_dict["server"] = "dqn.ist.berkeley.edu"
            output_dict["_path_comment"] = "Sampled using sample_training_games.py"
            output_dict["paths_with_line_num"] = sample_games
            output_dict["max_games"] = GAMES_TO_SAMPLE
            output_dict[
                "adversary"
            ] = f"{rounded_steps} million training steps, 600 visits"
            output_dict["victim"] = victim_name + victim_visits
            output_dict["description"] = []

            if decile == 10 and victim == VICTIM_LIST[-1]:
                print(json.dumps(output_dict))
            else:
                print(json.dumps(output_dict) + ",")
