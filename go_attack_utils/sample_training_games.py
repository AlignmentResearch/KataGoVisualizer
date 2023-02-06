import re
import glob
import numpy as np
import random
import json

random.seed(42)

adv_pattern = re.compile("adv-s[0-9]+")
victim_list = ['cp39h-v1', 'cp127h-v1', 'cp505h-v1', 'cp505h-v2048']
def get_victim(input_text_line):
    for victim in victim_list: # go through possible victims
        if victim in input_text_line:
            return victim
        
    # if none found, something is wrong
    raise Exception('Victim not identified')
        

all_files = glob.glob(
    "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-match-*/sgfs/*.sgfs"
)

results_dict = (
    {}
)  # structure will be {adv_train_steps : {victim : [(filename0, linenum0), (filename1, linenum1), ...]}}
for filename in all_files:
    with open(filename, "r") as f:
        for line_num, line in enumerate(f.readlines()):
            adv = adv_pattern.search(line)
            num_steps = int(adv.group(0).split("s")[1])
            victim = get_victim(line)
            if num_steps in results_dict:
                if victim in results_dict[num_steps]:
                    results_dict[num_steps][victim].append({"path": filename, "line": line_num + 1})
                else:
                    results_dict[num_steps][victim] = [{"path": filename, "line": line_num + 1}]
            else:
                results_dict[num_steps] = {victim : [{"path": filename, "line": line_num + 1}]}


# we will use this to find the nearest match (for which games are available) to the exact decile of training steps
def find_nearest(array, value):
    array = np.asarray(array)
    idx = (np.abs(array - value)).argmin()
    return array[idx]


last_step = np.max(
    list(results_dict.keys())
)  # last training step for adversary, i.e. "strongest" one


for decile in range(1, 11):
    decile_steps = decile * last_step / 10
    nearest_match = find_nearest(list(results_dict.keys()), decile_steps)
    for victim in victim_list:
        assert victim in results_dict[nearest_match]

        victim_name = victim.split('-v')[0]
        victim_name_nocode = victim_name
        if victim_name == 'cp505' or victim_name == 'cp505h':
            victim_name = '<code>Latest</code>'
            victim_name_nocode = 'Latest'
        if victim_name[-1] == 'h':
            victim_name = victim_name[:-1]
        victim_visits = victim.split('-v')[1]
        if victim_visits == '1':
            victim_visits = ', no search'
        else:
            victim_visits = f', {victim_visits} visits'

        sample_games = random.sample(results_dict[nearest_match][victim], 5)

        rounded_steps = str(nearest_match)[:-6] # round down to nearest million (remove last 6 digits)

        output_dict = {'title' : str(decile*10) + '% vs. ' + victim_name_nocode + victim_visits}
        output_dict['dir_name'] = 'training_sample_games' + str(decile) + '_' + victim
        output_dict['server'] = 'dqn.ist.berkeley.edu'
        output_dict['path_comment'] = "Sampled using sample_training_games.py"
        output_dict['paths_with_line_num'] = sample_games
        output_dict['max_games'] = 5
        output_dict['adversary'] = f"{rounded_steps} million training steps, 600 visits"
        output_dict['victim'] = victim_name + victim_visits
        output_dict['description'] = []

        print(json.dumps(output_dict) + ',') # add comma for easier copy/paste to content.ts - remove the last one when pasting!
