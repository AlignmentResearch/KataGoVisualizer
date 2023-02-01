import re
import glob
import numpy as np
import random
import json

pattern = re.compile('adv-s[0-9]+')

all_files = glob.glob('/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-match-*/sgfs/*.sgfs')
#filename = '/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-match-0-to-6-20221115-223912/sgfs/8102A3F381C550A0.sgfs'

results_dict = {} # structure will be {adv_train_steps : [(filename0, linenum0), (filename1, linenum1), ...]}
for filename in all_files:
    with open(filename, 'r') as f:
        for line_num, line in enumerate(f.readlines()):
            result = pattern.search(line)
            num_steps = int(result.group(0).split('s')[1])
            if num_steps in results_dict:
                results_dict[num_steps].append({"path":filename, "line":line_num+1})
            else:
                results_dict[num_steps] = [{"path":filename, "line":line_num+1}]


# we will use this to find the nearest match (for which games are available) to the exact decile of training steps
def find_nearest(array, value):
    array = np.asarray(array)
    idx = (np.abs(array - value)).argmin()
    return array[idx]

last_step = np.max(list(results_dict.keys())) # last training step for adversary, i.e. "strongest" one

for decile in range(1,11):
    decile_steps = decile * last_step / 10
    nearest_match = find_nearest(list(results_dict.keys()), decile_steps)
    print(type(results_dict[nearest_match]))
    sample_games = random.sample(results_dict[nearest_match], 10)
    print(decile, nearest_match)
    for i in sample_games:
        print(json.dumps(i))



