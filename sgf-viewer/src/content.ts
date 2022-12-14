// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "adversarial-policy-katago": {
        "title": "Adversarially Exploiting KataGo",
        "description": [
            "We attack <a target=\"_blank\" href=\"https://github.com/lightvector/KataGo\">KataGo</a>, a state-of-the-art Go AI system, by training adversarial policies that play against frozen KataGo victims. Our attack achieves a &gt;99% win-rate when KataGo <a href=\"#no_search_hardened\">uses no tree-search</a>, and a &gt;77% win-rate when KataGo <a href=\"#2048_visits_hardened\">uses enough search to be superhuman</a>. Notably, our adversaries do not win by learning to play Go better than KataGo &mdash; in fact, our adversaries are easily <a href=\"/human-evaluation#amateur_vs_advh_497mil\">beaten by a human amateur</a>. Instead, our adversaries win by tricking KataGo into making serious blunders. Our results demonstrate that even superhuman AI systems may harbor surprising failure modes.",
            "All games are randomly selected unless otherwise specified. We primarily attack KataGo network checkpoint <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>b40c256-s11840935168-d2898845681</code></a>, which we dub <code>Latest</code> since it is the latest confidently rated KataGo network at the time of writing. For more information, see our <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf\">paper</a> and <a target=\"_blank\" href=\"https://github.com/HumanCompatibleAI/go_attack\">GitHub</a>."
        ],
        "content": [
            {
                "title": "KataGo without search (top-100 European player level)",
                "dir_name": "no_search_hardened",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505h-v1 /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/* | shuf | head -n 6 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/CDEA87E336954AF0.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/3AC0B3B4A652F8B4.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/82174235A50699C3.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/A9F0F3DF9A86AEB5.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/0793EAB13C28E292.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/1FF2A995D6DFD75E.sgfs",
                        "line": 6
                    }
                ],
                "max_games": 10,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, no search",
                "description": [
                    "Without tree-search, Katago's <code>Latest</code> network plays at the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#page=18\">strength of a top-100 European professional</a>. We trained an adversary that wins 99.8% of the time against this victim<sup>1</sup>. Our adversary gets the victim to form a large circular structure, and then tricks the victim into allowing the circular structure to be killed. See the <a href=\"/game-analysis#contents\">\"Game Analysis\"</a> tab for a more in depth analysis of this adversarial strategy.",
                    "<sup>[1]</sup> The games below are actually against a version of <code>Latest</code> that was patched to be immune to a simpler <a href=\"/pass-based-attack#contents\">pass-based attack</a>. We applied this patch to the victim to force our adversary to learn a more interesting attack. The patch is a hardcoded defense that forbids the victim from passing until it has no more legal moves outside its territory. We call the patched victim <code>Latest</code><sub><code>def</code></sub>."
                ]
            },
            {
                "title": "KataGo with 2048 visits (superhuman)",
                "dir_name": "2048_visits_hardened",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505h-v2048 /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/* | shuf | head -n 6 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/C67CEC1CBE0D110C.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/140B61E20958D34E.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/FDE67BC4EBF3B925.sgfs",
                        "line": 6
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/FB9CCDE8CFA30860.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/1699746B30810F31.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/7F4399AD734E5858.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/A1E32217EDBDA9B5.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/79F771D48B203E64.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/1D73164FB6B05D12.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-497mil-221115/ttseng-hard-s497m-eval-20221114-221825/sgfs/A90E6794DFA32722.sgfs",
                        "line": 2
                    }
                ],
                "max_games": 10,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 2048 visits",
                "description": ["With 2048 visits, KataGo's <code>Latest</code> network <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#page=19\">plays at a superhuman level</a>. Nonetheless, our adversary still achieves a 77.6% win rate against <code>Latest</code> and a 72.4\% win rate against <code>Latest</code><sub><code>def</code></sub>. Games against <code>Latest</code><sub><code>def</code></sub> are shown below."],
            },
        ]
    },
    "game-analysis": {
        "title": "Game Analysis",
        "content": [
            {
                "title": "Qualitative analysis of adversary behavior",
                "dir_name": "qualitative",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/norabelrose/kellin-analysis-game-fixed.sgf"
                ],
                "max_games": 10,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 1600 visits",
                "description": [
                    "An expert-level (6 dan) human player on our team (Kellin Pelrine) analyzed the following game. It shows typical behavior and outcomes with an adversary trained on and playing a pass-hardened KataGo victim: the victim gains an early and soon seemingly insurmountable lead. The adversary sets a trap that would be easy for a human to see and avoid. But the victim is oblivious and collapses.",
                    "The adversary plays non-standard, subpar moves right from the beginning. The victim's estimate of its winrate is over 90% by <a onclick='setMove(`qualitative`, 9)'>move 9</a>, and a human in a high-level match would likewise hold a large advantage from this position.",
                    "On <a onclick='setMove(`qualitative`, 20)'>move 20</a>, the adversary initiates a tactic we see consistently, to produce a 'dead' (at least, according to normal judgment) square 4 group in one quadrant of the board. Elsewhere, the adversary plays low, mostly second and third line moves. This is also common in its games, and leads to the victim turning the rest of the center into its sphere of influence. We suspect this helps the adversary later play moves in that area without the victim responding directly, because the victim is already strong in that area and feels confident ignoring a number of moves.",
                    "On <a onclick='setMove(`qualitative`, 74)'>move 74</a>, the adversary begins mobilizing its 'dead' stones to set up an encirclement. Over the next 100+ moves, it gradually surrounds the victim in the top left. A key pattern here is that it leads the victim into forming an isolated group that loops around and connects to itself (a group with a cycle instead of tree structure). David Wu, creator of KataGo, suggested Go-playing agents like the victim struggle to accurately judge the status of such groups, but they are normally very rare. This adversary seems to produce them consistently.",
                    "Until the adversary plays <a onclick='setMove(`qualitative`, 189)'>move 189</a>, the victim could still save that cycle group, and in turn still win by a huge margin. There are straightforward moves to do so that would be trivial to find for any human playing at the victim's normal level. Even a human who has only played for a few months or less might find them. For instance, on 189 it could have instead played at the place marked 'A.' But after 189, it is impossible to escape, and the game is reversed. The victim seems to have been unable to detect the danger. Play continues for another 109 moves but there is no chance for the victim (nor would there be for a human player) to get out of the massive deficit it was tricked into."
                ]
            },
            {
                "title": "How the victim's predicted win rate varies over time",
                "dir_name": "win-rate",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/tony/go-attack/manual-games/nora-analysis-13B12C1F869DEB8C-cleaned-fixed.sgf"
                ],
                "max_games": 10,
                "adversary": "494 million training steps, 200 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 1600 visits",
                "description": [
                    "In this game, we find the victim's predicted win rate oscillates several times before the victim's group is captured at <a onclick='setMove(`win-rate`, 207)'>move 207</a>. At <a onClick='setMove(`win-rate`, 196)'>move 196</a>, the victim predicted it would win with 88% confidence, yet at its next turn at <a onClick='setMove(`win-rate`, 198)'>move 198</a> it has gone down to a 2% win rate prediction. It grows more optimistic by <a onClick='setMove(`win-rate`, 202)'>move 202</a>, predicting a 17% win rate, and by <a onclick='setMove(`win-rate`, 204)'>move 204</a>, the victim predicts it will win with an impressive 98% confidence. Yet at its next turn on <a onClick='setMove(`win-rate`, 206)'>move 206</a>, its predicted win rate has dropped to less than 1%. After the capture on the following turn, the victim (correctly) predicts a <1% win rate until the end."
                ]
            }
        ]
    },
    "pass-based-attack": {
        "title": "Pass-based Attack",
        "description": [
            "Our initial attempts at attacking KataGo resulted in adversaries that exploited KataGo's passing behavior. These pass-based adversaries trick KataGo into passing when it shouldn't. While this attack is effective against victims which do not use tree-search, it stops working once victims are able to use even a small amount of tree-search. We developed the pass-hardening defense so that our adversaries would not get stuck learning this pass-exploit. This worked surprisingly well &mdash; training against pass-hardened victims resulted in our adversaries learning <a href=\"/adversarial-policy-katago#contents\">an alternate strategy that works even in the high search regime.</a>",
        ],
        "content": [
            {
                "title": "KataGo without search (top-100 European player level)",
                "dir_name": "no_search",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505-v1 /nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/* | shuf | head -n 6 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/68970420A37B288E.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/9900E1AA3223E803.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/F73C301340CB2C94.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/8A89BB10D44F759F.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/04541438A78DF265.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/7E2F2D69066744F8.sgfs",
                        "line": 5
                    }
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 600 visits",
                "victim": "<code>Latest</code>, no search",
                "description": [
                    "Without tree-search, Katago's <code>Latest</code> network plays at the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#page=18\">strength of a top-100 European professional</a>. Our pass-based adversary achieves a 99% win rate against this victim by playing a counterintuitive strategy. The adversary stakes out a minority territory in the corner, allowing KataGo to stake the complement, and placing weak stones in KataGo’s stake.",
                    "KataGo predicts a high win probability for itself and, in a way, it’s right—it would be simple to capture most of the adversary’s stones in KataGo’s stake, achieving a decisive victory. However, KataGo plays a pass move before it has finished securing its territory, allowing the adversary to pass in turn and end the game. This results in a win for the adversary under the standard <a href=\"https://tromp.github.io/go.html\">Tromp-Taylor</a> ruleset for computer Go, as the adversary gets points for its corner territory (devoid of victim stones) whereas the victim does not receive points for its unsecured territory because of the presence of the adversary’s stones."
                ]
            },
            {
                "title": "KataGo with 8 visits",
                "dir_name": "8_visits",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505-v8] /nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/* | shuf | head -n 10 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/5157F816018CB4D4.sgfs",
                    "line": 1
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/F6DBA08D32F3161D.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/2D7B37D38A30BFF5.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/8EEBABA9C5B3A7FC.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/4876135715F8EF63.sgfs",
                    "line": 1
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/DC2248371CC26E2A.sgfs",
                    "line": 1
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/81BFB902057EAD6B.sgfs",
                    "line": 4
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/255D65B54C80B63C.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/9472DACCBBF272FB.sgfs",
                    "line": 4
                  },
                  {
                    "path": "/nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/A262DF8E9F1DB313.sgfs",
                    "line": 1
                  }
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 200 visits, recursive modeling",
                "victim": "<code>Latest</code>, 8 visits",
                "description": ["A search budget of 8 visits / move is around the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#page=23\">limit of what our pass-based adversary can exploit</a>. We achieve a win rate of 87.8% against this victim by modeling the victim perfectly during the adversary's search. The adversary wins by the same strategy of staking out a corner. The adversary loses when the victim plays the game out to the end, resulting in a very full board."]
            }
        ]
    },
    "human-evaluation": {
        "title": "Human Evaluation",
        "content": [
            {
                "title": "Human amateur beats adversary (hardened)",
                "dir_name": "amateur_vs_advh_497mil",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/ttseng/go_attack/misc/tony-b-def-dragonslayer-s497mil-w-anon.sgfs",
                    "/nas/ucb/ttseng/go_attack/misc/tony-w-def-dragonslayer-s497mil-b-anon.sgfs"
                ],
                "max_games": 10,
                "adversary": "498 million training steps, 600 visits",
                "victim": "Tony Wang (Author)",
                "description": [
                    "Our <a target=\"_blank\" href=\"/adversarial-policy-katago#contents\">strongest adversarial policy</a> (trained against <code>Latest</code><sub><code>def</code></sub>) is able to reliably beat KataGo at superhuman strength settings. However, a member of our team (Tony Wang) who is a novice Go player managed to convincingly beat this same adversary. This confirms that our adversarial policy is not generally capable, despite it beating victim policies that can themselves beat top human professionals. Instead, our victim policy harbors a subtle vulnerability.",
                    "Our evaluation is imperfect in one significant way: the adversary was not playing with an accurate model of its human opponent (rather it modeled Tony as <code>Latest</code> with 1 visit). However, given the poor transferability of our adversary to different KataGo checkpoints (see <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#page=7\">Figure 3 of the paper</a>), we predict that the adversary would not win even if it had access to an accurate model of its human opponent."
                ]
            },
            {
                "title": "Human amateur beats pass-based adversary",
                "dir_name": "amateur_vs_adv",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/josephmiller/tony-vs-adversary/sgfs/tony-black.sgfs",
                    "/nas/ucb/josephmiller/tony-vs-adversary/sgfs/tony-white.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 600 visits",
                "victim": "Tony Wang (Author)",
                "description": [
                    "The same Go novice (Tony Wang) also managed to beat our pass-based adversary by a large margin of over 250 points. This demonstrates our pass-based adversary is also not generally capable. In the <a href=\"#amateur_vs_victim\">next section</a>, we attempt to mimic the adversarial policy to exploit the victim."
                ]
            },
            {
                "title": "Manually mimicking the pass-based adversary",
                "dir_name": "amateur_vs_victim",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/josephmiller/tony-vs-victim/sgfs/tony-neuralz06.sgfs"
                ],
                "max_games": 10,
                "adversary": "Tony Wang (Author)",
                "victim": "NeuralZ06 (KataGo KGS bot playing without search)",
                "description": ["The same Go novice (Tony Wang) was able to exploit the top-50 KGS bot <code>NeuralZ06</code> by mimicking the behavior of our adversarial policy. The bot plays with checkpoint <code>b40c256-s11101799168-d2715431527</code> that is comparable to (but slightly weaker) than the <code>Latest</code> checkpoint. However, the bot has the <code>friendlyPassOk</code> flag enabled, which makes it easier to exploit—we have not been able to win manually against a bot with this disabled. This suggests that the easily mimicable high-level strategy of our adversarial policy explains a considerable part of the adversary's success, but by no means all of it.  We score the game under <a target=\"_blank\" href=\"https://tromp.github.io/go.html\">Tromp-Taylor</a> rules as the rulesets supported by KGS cannot be automatically evaluated."]
            }
        ]
    },
    "baseline-attack": {
        "title": "Baseline Attacks",
        "description": ["In this section we examine simple, no-learning attacks. These test the robustness of KataGo to some types of unsophisticated but likely out-of-distribution play. We find these attacks are generally ineffective against the hardened version of KataGo, although the mirror go attack still gets some wins at low visits. Overall, to find consistent weaknesses, a learning-based approach like ours seems necessary."],
        "content": [
            {
                "title": "Edge attack against KataGo",
                "dir_name": "edge_vs_cp505",
                "server": "dqn.ist.berkeley.edu",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-b-vs-edge.sgfs",
                        "line": 70
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-b-vs-edge.sgfs",
                        "line": 96
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-b-vs-edge.sgfs",
                        "line": 32
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-b-vs-edge.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-w-vs-edge.sgfs",
                        "line": 88
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-w-vs-edge.sgfs",
                        "line": 117
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-w-vs-edge.sgfs",
                        "line": 21
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v8-w-vs-edge.sgfs",
                        "line": 123
                    }
                ],
                "max_games": 8,
                "adversary": "Edge attack",
                "victim": "<code>Latest</code>, 8 visits",
                "description": ["We tested a hard-coded \"edge attack\" adversarial policy inspired by the behavior of our pass-based adversaries. The policy plays random legal moves in the outermost squares of the board, and passes if passing results in an instant win. It is able to achieve a win rate of about 50% against <code>Latest</code> when <code>Latest</code> is playing as black with at most 8 visits, and a win rate of 13.8% against <code>Latest</code> playing as black with 32 visits. When <code>Latest</code> plays as white with at most 8 visits, the attack's win rate drops to about 5%."]
            },
            {
                "title": "Edge attack against hardened KataGo",
                "dir_name": "edge_vs_cp505h",
                "server": "dqn.ist.berkeley.edu",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505h-v1-w-vs-edge.sgfs",
                        "line": 83
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505h-v1-w-vs-edge.sgfs",
                        "line": 34
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505h-v1-b-vs-edge.sgfs",
                        "line": 42
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505h-v1-b-vs-edge.sgfs",
                        "line": 154
                    }
                ],
                "max_games": 4,
                "adversary": "Edge attack",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, no search",
                "description": ["The edge attack no longer works against <code>Latest</code><sub><code>def</code></sub> which has the pass-alive defense applied, even when <code>Latest</code><sub><code>def</code></sub> plays with no search."]
            },
            {
                "title": "Mirror Go against KataGo",
                "dir_name": "mirror_vs_cp505",
                "server": "dqn.ist.berkeley.edu",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v1-b-vs-mirror.sgfs",
                        "line": 34
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v1-b-vs-mirror.sgfs",
                        "line": 124
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v1-b-vs-mirror.sgfs",
                        "line": 10
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v1-b-vs-mirror.sgfs",
                        "line": 158
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v1-b-vs-mirror.sgfs",
                        "line": 101
                    },
                    {
                        "path": "/nas/ucb/ttseng/go_attack/baseline-attack/20221122-rescored/renamed/cp505-v1-b-vs-mirror.sgfs",
                        "line": 83
                    }
                ],
                "max_games": 6,
                "adversary": "Mirror Go",
                "victim": "<code>Latest</code>, no search",
                "description": ["Another hard-coded strategy we test is Mirror Go, a classic novice strategy for white in which white plays the opponent's last move reflected about the diagonal. Mirror Go wins a few games against <code>Latest</code> as well, with a 7.5% win rate against <code>Latest</code> with no search and a 1.9% win rate against <code>Latest</code> with 32 visits."]
            }
        ]
    }
}
