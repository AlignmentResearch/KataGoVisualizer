// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "adversarial-policy-katago": {
        "title": "Adversarially Exploiting KataGo",
        "description": [
            "ICML reviewers: an updated version of our paper, as discussed in our review responses, is available <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf\">here</a>.",
            "We attack <a target=\"_blank\" href=\"https://github.com/lightvector/KataGo\">KataGo</a>, a state-of-the-art Go AI system, by training adversarial policies that play against frozen KataGo victims. Our attack achieves a 100% win rate over 1000 games when KataGo <a href=\"#no_search_hardened\">uses no tree-search</a>, and a &gt;97% win rate when KataGo <a href=\"#4096_visits_hardened\">uses enough search to be superhuman</a>. Notably, our adversaries do not win by learning to play Go better than KataGo &mdash; in fact, our adversaries are easily <a href=\"/human-evaluation#amateur_vs_advh_545mil\">beaten by a human amateur</a>. Instead, our adversaries win by tricking KataGo into making serious blunders. Our results demonstrate that even superhuman AI systems may harbor surprising failure modes.",
            "All games are randomly selected unless otherwise specified. We primarily attack KataGo network checkpoint <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>b40c256-s11840935168-d2898845681</code></a>, which we dub <code>Latest</code> since it is the latest confidently rated KataGo network at the time of writing."
        ],
        "content": [
            {
                "title": "KataGo without search (top-100 European player level)",
                "dir_name": "no_search_hardened",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505h-v1 /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/* | shuf | head -n 6 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/C240D2DE4B3BBBE6.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/F14B57FB4A3522EE.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/A36354486923B9BE.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/0C9084416E51D058.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/FA57EC5F966F7D15.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/4F13E50A81714B91.sgfs",
                        "line": 2
                    }
                ],
                "max_games": 10,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, no search",
                "description": [
                    "Without tree-search, Katago's <code>Latest</code> network plays at the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#subsection.E.1\">strength of a top-100 European professional</a>. We trained an adversary that wins 100% of the time over 1000 games against this victim<sup>1</sup>. Our adversary gets the victim to form a large circular structure, and then tricks the victim into allowing the circular structure to be killed. See the <a href=\"/game-analysis#contents\">\"Game Analysis\"</a> tab for a more in depth analysis of this adversarial strategy.",
                    "<sup>[1]</sup> The games below are actually against a version of <code>Latest</code> that was patched to be immune to a simpler <a href=\"/pass-based-attack#contents\">pass-based attack</a>. We applied this patch to the victim to force our adversary to learn a more interesting attack. The patch is a hardcoded defense that forbids the victim from passing until it has no more legal moves outside its territory. We call the patched victim <code>Latest</code><sub><code>def</code></sub>. Because we limit the victim's passing, games are usually played out to the end, <a href=\"https://archive.ph/xmPrw#:~:text=(if%20SelfPlayOpts%20is%20Enabled)\">terminating automatically</a> once all points belong to a pass-alive-group or pass-alive-territory."
                ],
                "_comment": "Snapshot at archive.ph is from https://lightvector.github.io/KataGo/rules.html -- using in case rules change semantics in future versions of KataGo"
            },
            {
                "title": "KataGo with 4096 visits (superhuman)",
                "dir_name": "4096_visits_hardened",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505h-v4096 /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/* | shuf | head -n 10 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/732A09F13C043EC6.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/3D34AB2A44801730.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/E5C30F15C197A9F4.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/2BC0E7D645F8DB6F.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/FF58AF83EF1F6A88.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/4FD7720AD7C8F513.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/680F95F38A4872F1.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/A5CD644B3E2E4719.sgfs",
                        "line": 12
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/ADE19CD52436A275.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/3C8D77BF0F673F1C.sgfs",
                        "line": 12
                    }
                ],
                "max_games": 10,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits",
                "description": ["With 4096 visits, KataGo's <code>Latest</code> network <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#subsection.E.2\">plays at a superhuman level</a>. Nonetheless, our adversary still achieves a 97.3% win rate against <code>Latest</code> and a 95.7% win rate against the defended victim <code>Latest</code><sub><code>def</code></sub>. Games against <code>Latest</code><sub><code>def</code></sub> are shown below."]
            },
            {
                "title": "KataGo with 10,000,000 visits",
                "dir_name": "10mil_visits",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-0.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-1.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-2.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-3.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-4.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-5.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-6.sgf",
                    "/nas/ucb/ttseng/go_attack/backup/ttseng-v10mil-20230113-130256/cleaned-sgfs/game-7.sgf"
                ],
                "max_games": 8,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code>, 10,000,000 visits, 1,024 search threads",
                "description": ["Our adversary with 600 visits still achieves a 76.7% win rate against <code>Latest</code> with 10,000,000 visits, demonstrating that large amounts of search is not a practical defense against the adversary. We enabled resignation for these games to shorten them since such high visit counts are computationally expensive."]
            }
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
                    "/nas/ucb/ttseng/go_attack/backup/sgf-viewer-sgfs/kellin-analysis-game-fixed.sgf"
                ],
                "max_games": 10,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 1600 visits",
                "description": [
                    "An expert-level (6 dan) human player on our team (anonymous author) analyzed the following game. It shows typical behavior and outcomes with an adversary trained on and playing a pass-hardened KataGo victim: the victim gains an early and soon seemingly insurmountable lead. The adversary sets a trap that would be easy for a human to see and avoid. But the victim is oblivious and collapses.",
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
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/ttseng/go_attack/backup/s545mil-vs-cp505-v4096-20230117/games.sgfs",
                        "line": 877
                    }
                ],
                "max_games": 1,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code>, 4096 visits",
                "description": [
                    "In this game, we find the victim's predicted win rate oscillates several times before the victim's group is captured at <a onclick='setMove(`win-rate`, 273)'>move 273</a>. At <a onClick='setMove(`win-rate`, 248)'>move 248</a>, the victim predicted it would win with 91% confidence, yet at its next turn at <a onClick='setMove(`win-rate`, 250)'>move 250</a> it has gone down to a <1% win rate prediction. At <a onClick='setMove(`win-rate`, 254)'>move 254</a>, it jumps back to a >99% win rate prediction. A few moves later, the victim's win rate prediction again fluctuates dramatically, hitting <1% at <a onClick='setMove(`win-rate`, 266)'>move 266</a>, 99% at <a onClick='setMove(`win-rate`, 268)'>move 268</a>, and <1% at <a onClick='setMove(`win-rate`, 272)'>move 272</a>.  After the capture on the following turn, the victim (correctly) predicts a <1% win rate until the end of the game."
                ]
            },
            {
                "title": "Positions analyzed with varying visits",
                "dir_name": "position-analysis",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/kpelrine/position-analysis/D21A3637ED1950A3F5E2ECBD067192D3.sgf",
                    "/nas/ucb/kpelrine/position-analysis/A4F97F173E7FFD4DA8EA0B44CC498217.sgf",
                    "/nas/ucb/kpelrine/position-analysis/BAE6EE5C6A92A349F5C3F40A5A749D3D.sgf",
                    "/nas/ucb/kpelrine/position-analysis/9769802A41A0936FFC3F49F567F4E27E.sgf",
                    "/nas/ucb/kpelrine/position-analysis/B303C7624A8D43C86218D8A090A89432.sgf",
                    "/nas/ucb/kpelrine/position-analysis/EED83A03FE5ADA6488362D70B4652B74.sgf",
                    "/nas/ucb/kpelrine/position-analysis/F60F14F76A3EC9374AEC037F61DF35ED.sgf",
                    "/nas/ucb/kpelrine/position-analysis/3EEF60B71376DF13DCFC585958F7AA97.sgf",
                    "/nas/ucb/kpelrine/position-analysis/8A7C8591E9B7308CF65E0F1EDC3160E7.sgf",
                    "/nas/ucb/kpelrine/position-analysis/35271149C9656EBEACC462C78885E17C.sgf",
                    "/nas/ucb/kpelrine/position-analysis/D7D74BD8D0B17EB04E9DC856D4EE46AB.sgf",
                    "/nas/ucb/kpelrine/position-analysis/8E68B87F7316905795CF27C1904E5C7D.sgf",
                    "/nas/ucb/kpelrine/position-analysis/667CF02E24A2FD141A82C5D1755A2AE2.sgf",
                    "/nas/ucb/kpelrine/position-analysis/F15A82698AC1537184C30E2A2D1A4603.sgf",
                    "/nas/ucb/kpelrine/position-analysis/9BD1667E79D20D46FB261E22A2478C4F.sgf",
                    "/nas/ucb/kpelrine/position-analysis/0107B1AE44B5395A6EAABFBEC119E664.sgf"
                ],
                "max_games": 16,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code>, 1600 visits",
                "description": [
                    "We make available here the full game records for the positions analyzed with different levels of visits in the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#appendix.H\">paper appendix discussing the role of search in robustness</a>. For details, please refer to the appendix."
                ]
            }
        ]
    },
    "transfer": {
      "title": "Transfer to ELF/Leela",
      "description": [
          "Our adversary apparently exploits a weakness common across several Go AI systems. We find that the attack transfers zero-shot against ELF OpenGo and Leela Zero, two other open-source Go AI systems that can play at a superhuman level."
      ],
      "content": [
          {
              "title": "ELF OpenGo",
              "dir_name": "elf",
              "server": "dqn.ist.berkeley.edu",
              "paths": [
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-8.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread3/sgfs/game-6.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-0.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-1.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-2.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-3.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-4.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-5.sgf"
              ],
              "max_games": 8,
              "adversary": "545 million training steps, 600 visits",
              "victim": "ELF OpenGo, final network, 80,000 rollouts per move",
              "description": ["We pit our adversary against ELF OpenGo playing with its <a href=\"https://github.com/pytorch/ELF/releases/tag/pretrained-go-19x19-v2\">final network</a> and 80,000 rollouts per move. The <a href=\"https://arxiv.org/pdf/1902.04522.pdf#subsection.4.1\">authors of ELF found</a> that this number of rollouts was sufficient with to consistently beat several top-30 Go players even using a weaker network. Our adversary achieves a win rate of 3.5% against ELF. (The games displayed are non-randomly selected to show the wins achieved by the adversary.)"]
          },
          {
              "title": "Leela Zero",
              "dir_name": "leela",
              "server": "dqn.ist.berkeley.edu",
              "paths": [
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-16.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-23.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-0.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-1.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-2.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-3.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-4.sgf",
                  "/nas/ucb/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-5.sgf"
              ],
              "max_games": 8,
              "adversary": "545 million training steps, 600 visits",
              "victim": "Leela Zero, final network, max 40,000 visits per move",
              "description": ["We pit our adversary against Leela Zero OpenGo playing with its final network (hash 0e9ea880 on the <a href=\"https://zero.sjeng.org/\">Leela training website</a>), no time limit, and a maximum of 40,000 visits per move. Our adversary achieves a win rate of 6.1%. (The games displayed are non-randomly selected to show the wins achieved by the adversary.)"]
          }
      ]
    },
    "pass-based-attack": {
        "title": "Pass-based Attack",
        "description": [
            "Our initial attempts at attacking KataGo resulted in adversaries that exploited KataGo's passing behavior. These pass-based adversaries trick KataGo into passing when it shouldn't. While this attack is effective against victims which do not use tree-search, it stops working once victims are able to use even a small amount of tree-search. We developed the pass-hardening defense so that our adversaries would not get stuck learning this pass-exploit. This worked surprisingly well &mdash; training against pass-hardened victims resulted in our adversaries learning <a href=\"/adversarial-policy-katago#contents\">an alternate strategy that works even in the high search regime.</a>"
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
                    "Without tree-search, Katago's <code>Latest</code> network plays at the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#subsection.E.1\">strength of a top-100 European professional</a>. Our pass-based adversary achieves a 99% win rate against this victim by playing a counterintuitive strategy. The adversary stakes out a minority territory in the corner, allowing KataGo to stake the complement, and placing weak stones in KataGo’s stake.",
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
                "description": ["A search budget of 8 visits / move is around the <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#subsection.F.3\">limit of what our pass-based adversary can exploit</a>. We achieve a win rate of 87.8% against this victim by modeling the victim perfectly during the adversary's search. The adversary wins by the same strategy of staking out a corner. The adversary loses when the victim plays the game out to the end, resulting in a very full board."]
            }
        ]
    },
    "human-evaluation": {
        "title": "Human Evaluation",
        "content": [
            {
                "title": "Human amateur beats cyclic-adversary",
                "dir_name": "amateur_vs_advh_545mil",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/tony/go-attack/manual-games/tony-b-def-adv505h-s545m-w-anon.sgf",
                    "/nas/ucb/tony/go-attack/manual-games/tony-w-def-adv505h-s545m-b-anon.sgf"
                ],
                "max_games": 10,
                "adversary": "Cyclic-adversary, 545 million training steps, 600 visits",
                "victim": "Anonymous author",
                "description": [
                    "Our <a target=\"_blank\" href=\"/adversarial-policy-katago#contents\">strongest adversarial policy</a> (trained against <code>Latest</code><sub><code>def</code></sub>) is able to reliably beat KataGo at superhuman strength settings. However, a member of our team (anonymous author) who is a novice Go player managed to convincingly beat this same adversary. This confirms that our adversarial policy is not generally capable, despite it beating victim policies that can themselves beat top human professionals. Instead, our victim policy harbors a subtle vulnerability.",
                    "Our evaluation is imperfect in one significant way: the adversary was not playing with an accurate model of its human opponent (rather it modeled anonymous author as <code>Latest</code> with 1 visit). However, given the poor transferability of our adversary to different KataGo checkpoints (see <a target=\"_blank\" href=\"/pdfs/go_attack_paper.pdf#figure.caption.3\">Figure 3 of the paper</a>), we predict that the adversary would not win even if it had access to an accurate model of its human opponent."
                ]
            },
            {
                "title": "Human amateur beats pass-adversary",
                "dir_name": "amateur_vs_adv",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/ttseng/go_attack/backup/sgf-viewer-sgfs/tony-black.sgfs",
                    "/nas/ucb/ttseng/go_attack/backup/sgf-viewer-sgfs/tony-white.sgfs"
                ],
                "max_games": 10,
                "adversary": "Pass-adversary, 34.1 million training steps, 600 visits",
                "victim": "Anonymous author",
                "description": [
                    "The same Go novice (anonymous author) also managed to beat our pass-adversary by a large margin of over 250 points. This demonstrates our pass-adversary is also not generally capable."
                ]
            },
            {
                "title": "Human exploits KataGo",
                "dir_name": "human_vs_kata100k",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/kpelrine/humanatk/humanattack-KataGo-100kvisits.sgfs"
                ],
                "max_games": 10,
                "adversary": "Anonymous author",
                "victim": "KataGo, 100K visits",
                "description": ["A Go expert (anonymous author) was able to learn and apply the cyclic-adversary's strategy to attack multiple types and configurations of AI Go systems. In this example they exploited KataGo with 100K visits, which would normally be strongly superhuman. Besides previously studying our adversary's game records, no algorithmic assistance was used in this or any of the following examples. The KataGo network and weights used here were b18c384nbt-uec, which is a newly released version the author of KataGo (David Wu) trained for a tournament. This network should be as strong or stronger than <code>Latest</code>."]
            },
            {
                "title": "Human exploits Leela Zero",
                "dir_name": "human_vs_lz100k",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/kpelrine/humanatk/humanattack-LZ-100kvisits.sgfs"
                ],
                "max_games": 10,
                "adversary": "Anonymous author",
                "victim": "Leela Zero, 100K visits",
                "description": ["The same Go expert (anonymous author) also exploited Leela Zero with 100K visits, which would likewise normally be superhuman."]
            },
            {
                "title": "Human exploits a top KGS bot",
                "dir_name": "human_vs_jbxkata005",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-2.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-3.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-4.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-5.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-6.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-7.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-8.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005-9.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/JBXKata005-corners.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/JBXKata005-corners-2.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/JBXKata005-corners-3.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/JBXKata005-corners-4.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/JBXKata005-corners-5.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/JBXKata005-corners-6.sgfs",
                    "/nas/ucb/kpelrine/humanatk/vs-JBXKata005/corners-JBXKata005.sgfs"
                ],
                "max_games": 15,
                "adversary": "Anonymous author",
                "victim": "JBXKata005, 9 dan on KGS",
                "description": ["Playing under standard human conditions on the online Go server KGS, the same Go expert (anonymous author) successfully exploited the bot JBXKata005 in 14/15 games. In the remaining game, the cyclic group attack still led to a successful capture, but the victim had enough points remaining to win. This bot uses a custom KataGo implementation, and at the time of the games was the strongest bot available to play on KGS."]
            },
            {
                "title": "Human exploits top KGS bot with large handicap",
                "dir_name": "human_vs_jbxkata005_handicap",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/kpelrine/humanatk/corners-JBXKata005-9stones.sgfs"
                ],
                "max_games": 10,
                "adversary": "Anonymous author",
                "victim": "JBXKata005, 9 dan on KGS, with 9 stone handicap",
                "description": ["In this last example, the same Go expert (anonymous author) exploited JBXKata005 while giving it a huge initial advantage through a 9 stone handicap. A top level human player with this much advantage would have a virtually 100% win rate against any opponent, human or algorithmic."]
            }
        ]
    },
    "baseline-attack": {
        "title": "Baseline Attacks",
        "description": ["In this section we examine simple, no-learning attacks. These test the robustness of KataGo to some types of unsophisticated but likely out-of-distribution play. We find these attacks are generally ineffective against KataGo playing with search and against the hardened version of KataGo, although the mirror Go attack still gets some wins at low visits. Overall, to find consistent weaknesses, a learning-based approach like ours seems necessary."],
        "content": [
            {
                "title": "Edge attack against KataGo",
                "dir_name": "edge_vs_cp505",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "The games in each of these .sgfs files were run sequentially, so sampling lines from these files in order is OK.",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 4
                    }
                ],
                "max_games": 8,
                "adversary": "Edge attack",
                "victim": "<code>Latest</code>, no search",
                "description": ["We tested a hard-coded \"edge attack\" adversarial policy inspired by the behavior of our pass-based adversaries. The policy plays random legal moves in the outermost squares of the board, and passes if passing results in an instant win. It achieves a win rate of 45% against <code>Latest</code> when <code>Latest</code> is playing as black without search, but the win rate drops to 3.8% when <code>Latest</code> uses 4–32 visits. When <code>Latest</code> plays as white without search, the attack's win rate is only 2.7%, and the win rate is zero when <code>Latest</code> uses 4–32 visits."]
            },
            {
                "title": "Edge attack against hardened KataGo",
                "dir_name": "edge_vs_cp505h",
                "server": "dqn.ist.berkeley.edu",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-W-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-W-vs-edge.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-B-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-B-vs-edge.sgfs",
                        "line": 2
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
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 37
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 102
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 122
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-W-vs-mirror.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-W-vs-mirror.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 6,
                "adversary": "Mirror Go",
                "victim": "<code>Latest</code>, 32 visits",
                "description": ["Another hard-coded strategy we test is Mirror Go, a classic strategy in which the mirroring player plays the opponent's last move reflected about the diagonal. Mirror Go wins a few games against <code>Latest</code> as well, with a win rate of about 1.7% against <code>Latest</code> with 32 visits. (The games displayed are non-randomly selected to show the wins achieved by Mirror Go.)"]
            }
        ]
    }
}
