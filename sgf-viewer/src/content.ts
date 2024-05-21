// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "home": {
        "title": "Home",
        "summary": "Examples and analysis of superhuman Go AI systems beaten by adversarial attacks",
        "description": [
            "We discovered simple adversarial strategies that <a target=\"_blank\" href=\"https://far.ai/post/2023-07-superhuman-go-ais/\">beat superhuman Go AIs</a>, and find that <a target=\"_blank\" href=\"https://far.ai/post/2024-05-go-defense/\">adding defenses</a> helps but does not eliminate the problem. Our <a href=\"/game-analysis#contents\">cyclic adversary</a> beats the state-of-the-art KataGo AI <a href=\"/adversarial-policy-katago#4096_visits_hardened\">more than 97% of the time at superhuman settings</a>. This strategy is simple enough to be <a href=\"/human-evaluation#human_vs_kata100k\">replicated by an amateur human player</a> and <a href=\"/transfer#contents\">transfers to other superhuman Go AIs</a>. We find that although <a href=\"/positional-adversarial-training#contents\">positional</a> and <a href=\"/iterated-adversarial-training#contents\">iterated</a> adversarial training protect against the original cyclic adversary, they can still be exploited by new adversaries. We also train a new Go AI based on <a href=\"/vit#contents\">vision transformers</a> rather than convolutional neural networks, only to find it remains vulnerable to the cyclic attack.",
            "The <a href=\"/game-analysis#contents\">original cyclic adversary</a> (below, playing as white) works by forming an inside group of stones that the victim Go AI surrounds. The adversary then re-encircles this group. Despite numerous opportunities to save its group, the victim fails to see the danger and remains <a href=\"/game-analysis#win-rate\">confident of victory</a>, even many moves after it has irreversibly lost. For more details on this attack, see our <a target=\"_blank\" href=\"https://far.ai/post/2023-07-superhuman-go-ais/\">blog post</a>, ICML 2023 <a target=\"_blank\" href=\"https://slideslive.com/39006680/adversarial-policies-beat-superhuman-go-ais\">presentation</a>, or <a target=\"_blank\" href=\"https://arxiv.org/abs/2211.00241\">paper</a>.",
            "<img src=\"/images/cyclic-example.svg\" alt=\"Cyclic Attack\" class=\"medium-width\" style=\"aspect-ratio: 1; display: block; margin: 0.75rem auto;\"/>",
            "<div class=\"text-center\" style=\"margin-top: -0.75rem;\">An example of the original cyclic attack in action.</div>",
            "Since Go AIs were never designed with security in mind, we wondered whether simple defenses could make KataGo robust. In this work, we test three natural defenses (illustrated below): <a href=\"/positional-adversarial-training#contents\">positional adversarial training</a> on hand-constructed board positions, <a href=\"/iterated-adversarial-training#contents\">iterated adversarial training</a> against successively stronger adversaries, and changing the network architecture to a <a href=\"/vit#contents\">vision transformer</a>.",
            "<img src=\"/images/defense-summary.svg\" alt=\"Summary of defenses\" style=\"aspect-ratio: 306/121; display: block; margin: 0.75rem auto;\"/>",
            "Variants of the cyclic attack continue to beat all three defenses. Furthermore, we discover two qualitatively new adversarial strategies. First, the positional adversarially trained agent is vulnerable to a <a href=\"/positional-adversarial-training#dec23-vs-gift\">\"gift\" attack</a> that sets up a \"sending-two-receiving-one\" situation where, for no valid reason, the victim gifts the adversary two stones and then needs to capture one back. Second, the iterated adversarially trained agent is vulnerable to a <a href=\"/iterated-adversarial-training#v9-vs-validation\">\"validation\"</a> attack that induces the victim to set up a large cyclic group incorporating \"bamboo joints\" which the adversary then threatens to split.",
          "Our results suggest that achieving robustness is challenging, even in narrow domains such as Go. For more information on defenses, check out our latest <a target=\"_blank\" href=\"https://far.ai/post/2024-05-go-defense/\">blog post</a> or <a target=\"_blank\" href=\"https://www.overleaf.com/read/smjxdnfxfzvw#5f0eb1\">paper</a>."
        ],
        "content": []
    },
    "undefended-agent-faq": {
        "title": "FAQ",
        "summary": "Frequently asked questions about the \"cyclic attack\" against Go AI systems",
        "description": [
            "<b>Q: Would this exploit work on AlphaZero?</b>",
            "It's extremely likely the cyclic vulnerability exists in AlphaZero. It exists in KataGo, LeelaZero, and ELF (we've won games with it), all of which are based on AlphaZero, with the latter two self-describing as reimplementations of AlphaZero. It also likely exists in FineArt and Golaxy (we are still in the process of getting access to play them, but others have shown these networks also misevaluate positions involving cyclic groups). And it's also very likely that multiple of these systems are now substantially stronger than AlphaZero ever was. So in short, although AlphaZero is unfortunately closed source and not available to test directly, there's no evidence we are aware of that it would be immune, and quite a lot of evidence that it would be vulnerable.",
            "<b>Q: Did the adversary algorithm include any initial knowledge or human guidance to find a weakness?</b>",
            "No, the adversary was trained from scratch (random initialization) and learned only through playing games. To construct the cyclic adversary, we actually help the victim by patching the pass-based attack, which forces the adversary to find a different attack. But we do not give the adversary any information or hints towards what it should find. More details can be found in Section 4 of our paper.",
            "<b>Q: I saw some games you mark as wins, but I play Go and they don’t look like wins to me. What’s going on?</b>",
            "You are probably referring to our <a target=\"_blank\" href=\"/pass-based-attack#contents\">pass-based attack</a>, which is the first attack we found. This attack works in a specific ruleset, based on the Tromp-Taylor rules which are widely used for computer Go. KataGo is trained with this ruleset (among others), and therefore should know how to play them correctly &mdash; though this work showed otherwise. After we patched this vulnerability, we then found other attacks which work in all standard rulesets and agree with standard human evaluation of game results.",
            "<b>Q: I’ve played Go AIs myself and seen them make mistakes. How is the vulnerability you found different?</b>",
            "While Go AIs do already have known weaknesses, for instance the common “ladder” tactic, there are 3 key factors here whose confluence makes this vulnerability different. First, this affects top AIs, including when they have a very large amount of search. Second, the attack works consistently to produce a game-winning advantage. Third, this consistency does not require repeating exact sequences or board positions.",
            "<b>Q: Now that this vulnerability and its severity is known, is it easy to fix? Can we just show the AI a few examples?</b>",
            "It is not straightforward. KataGo is currently training with numerous positions from games our adversary algorithm played. There are clear improvements, but so far it is still vulnerable. The process is not complete, so it may just need more time (and computation), but already this shows it is not as easy as one might hope to fix an issue like this.",
            "<b>Q: Where can I learn more?</b>",
            "Aside from the rest of this website and the links at the top of the page, there is a YouTube video of a talk and demo given by Tony and Kellin <a target=\"_blank\" href=\"https://www.youtube.com/watch?v=CNo3lOT1NYA&ab_channel=CrossLabsAI\">here</a>."
        ],
        "content": []
    },
    "adversarial-policy-katago": {
        "title": "Cyclic attack",
        "summary": "Examples of the \"cyclic attack\" that defeats a variety of superhuman Go AI systems.",
        "description": [
            "This section showcases games our cyclic adversary played against <a target=\"_blank\" href=\"https://github.com/lightvector/KataGo\">KataGo</a>. We primarily attack KataGo network checkpoint <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>b40c256-s11840935168-d2898845681</code></a>, which we dub <code>Latest</code> since it is the latest confidently rated KataGo network at the time of conducting our experiments."
        ],
        "content": [
            {
                "title": "KataGo without search (top-100 European player level)",
                "dir_name": "no_search_hardened",
                "_path_comment": "Computed by `grep -n cp505h-v1 /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/* | shuf | head -n 6 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/C240D2DE4B3BBBE6.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/F14B57FB4A3522EE.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/A36354486923B9BE.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/0C9084416E51D058.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/FA57EC5F966F7D15.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/4F13E50A81714B91.sgfs",
                        "line": 2
                    }
                ],
                "max_games": 10,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, no search",
                "description": [
                    "Without tree search, Katago's <code>Latest</code> network plays at the <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#subsection.E.1\">strength of a top-100 European professional</a>. We trained an adversary that wins 100% of the time over 1000 games against this victim<sup>1</sup>. Our adversary (which we refer to as the \"cyclic adversary\") gets the victim to form a large circular structure, and then tricks the victim into allowing the circular structure to be killed. See the <a href=\"/game-analysis#contents\">\"Game Analysis\"</a> tab for a more in depth analysis of this adversarial strategy.",
                    "<sup>[1]</sup> The games below are actually against a version of <code>Latest</code> that was patched to be immune to a simpler <a href=\"/pass-based-attack#contents\">pass-based attack</a>. We applied this patch to the victim to force our adversary to learn a more interesting attack. The patch is a hardcoded defense that forbids the victim from passing until it has no more legal moves outside its territory. We call the patched victim <code>Latest</code><sub><code>def</code></sub>. Because we limit the victim's passing, games are usually played out to the end, <a href=\"https://archive.ph/xmPrw#:~:text=(if%20SelfPlayOpts%20is%20Enabled)\">terminating automatically</a> once all points belong to a pass-alive-group or pass-alive-territory."
                ],
                "_comment": "Snapshot at archive.ph is from https://lightvector.github.io/KataGo/rules.html -- using in case rules change semantics in future versions of KataGo"
            },
            {
                "title": "KataGo with 4096 visits (superhuman)",
                "dir_name": "4096_visits_hardened",
                "_path_comment": "Computed by `grep -n cp505h-v4096 /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/* | shuf | head -n 10 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/732A09F13C043EC6.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/3D34AB2A44801730.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/E5C30F15C197A9F4.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/2BC0E7D645F8DB6F.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/FF58AF83EF1F6A88.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/4FD7720AD7C8F513.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/680F95F38A4872F1.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/A5CD644B3E2E4719.sgfs",
                        "line": 12
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/ADE19CD52436A275.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-eval-main-adv-20230117-235520/sgfs/3C8D77BF0F673F1C.sgfs",
                        "line": 12
                    }
                ],
                "max_games": 10,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits",
                "description": ["With 4096 visits, KataGo's <code>Latest</code> network <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#subsection.E.2\">plays at a superhuman level</a>. Nonetheless, our adversary still achieves a 97.3% win rate against <code>Latest</code> and a 95.7% win rate against the defended victim <code>Latest</code><sub><code>def</code></sub>. Games against <code>Latest</code><sub><code>def</code></sub> are shown below."]
            },
            {
                "title": "KataGo with 10,000,000 visits",
                "dir_name": "10mil_visits",
                "paths": [
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-0.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-1.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-2.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-3.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-4.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-5.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-6.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/ttseng-v10mil-20230123-233145/cleaned-sgfs/game-7.sgf"
                ],
                "max_games": 8,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code>, 10,000,000 visits, 1024 search threads",
                "description": ["Our adversary with 600 visits still achieves a 72% win rate against <code>Latest</code> with 10,000,000 visits, demonstrating that large amounts of search is not a practical defense against the adversary."]
            }
        ]
    },
    "game-analysis": {
        "title": "Game analysis",
        "summary": "Detailed analysis of how the \"cyclic attack\" tricks Go AIs.",
        "content": [
            {
                "title": "Qualitative analysis of adversary behavior",
                "dir_name": "qualitative",
                "paths": [
                    "/shared/nas-data/ttseng/go_attack/backup/sgf-viewer-sgfs/kellin-analysis-game-fixed.sgf"
                ],
                "max_games": 10,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 1600 visits",
                "description": [
                    "An expert-level (6 dan) human player on our team (Kellin Pelrine) analyzed the following game. It shows typical behavior and outcomes with an adversary trained on and playing a pass-hardened KataGo victim: the victim gains an early and soon seemingly insurmountable lead. The adversary sets a trap that would be easy for a human to see and avoid. But the victim is oblivious and collapses.",
                    "The adversary plays non-standard, subpar moves right from the beginning. The victim's estimate of its winrate is over 90% by <a class='clickable' onclick='setMove(`qualitative`, 9)'>move 9</a>, and a human in a high-level match would likewise hold a large advantage from this position.",
                    "On <a class='clickable' onclick='setMove(`qualitative`, 20)'>move 20</a>, the adversary initiates a tactic we see consistently, to produce a 'dead' (at least, according to normal judgment) square 4 group in one quadrant of the board. Elsewhere, the adversary plays low, mostly second and third line moves. This is also common in its games, and leads to the victim turning the rest of the center into its sphere of influence. We suspect this helps the adversary later play moves in that area without the victim responding directly, because the victim is already strong in that area and feels confident ignoring a number of moves.",
                    "On <a class='clickable' onclick='setMove(`qualitative`, 74)'>move 74</a>, the adversary begins mobilizing its 'dead' stones to set up an encirclement. Over the next 100+ moves, it gradually surrounds the victim in the top left. A key pattern here is that it leads the victim into forming an isolated group that loops around and connects to itself (a group with a cycle instead of tree structure). David Wu, creator of KataGo, suggested Go-playing agents like the victim struggle to accurately judge the status of such groups, but they are normally very rare. This adversary seems to produce them consistently.",
                    "Until the adversary plays <a class='clickable' onclick='setMove(`qualitative`, 189)'>move 189</a>, the victim could still save that cycle group, and in turn still win by a huge margin. There are straightforward moves to do so that would be trivial to find for any human playing at the victim's normal level. Even a human who has only played for a few months or less might find them. For instance, on 189 it could have instead played at the place marked 'A.' But after 189, it is impossible to escape, and the game is reversed. The victim seems to have been unable to detect the danger. Play continues for another 109 moves but there is no chance for the victim (nor would there be for a human player) to get out of the massive deficit it was tricked into."
                ]
            },
            {
                "title": "How the victim's predicted win rate varies over time",
                "dir_name": "win-rate",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/s545mil-vs-cp505-v4096-20230117/games.sgfs",
                        "line": 877
                    }
                ],
                "max_games": 1,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code>, 4096 visits",
                "description": [
                    "In this game, we find the victim's predicted win rate oscillates several times before the victim's group is captured at <a class='clickable' onclick='setMove(`win-rate`, 273)'>move 273</a>. At <a class='clickable' onclick='setMove(`win-rate`, 248)'>move 248</a>, the victim predicted it would win with 91% confidence, yet at its next turn at <a class='clickable' onclick='setMove(`win-rate`, 250)'>move 250</a> it has gone down to a <1% win rate prediction. At <a class='clickable' onclick='setMove(`win-rate`, 254)'>move 254</a>, it jumps back to a >99% win rate prediction. A few moves later, the victim's win rate prediction again fluctuates dramatically, hitting <1% at <a class='clickable' onclick='setMove(`win-rate`, 266)'>move 266</a>, 99% at <a class='clickable' onclick='setMove(`win-rate`, 268)'>move 268</a>, and <1% at <a class='clickable' onclick='setMove(`win-rate`, 272)'>move 272</a>.  After the capture on the following turn, the victim (correctly) predicts a <1% win rate until the end of the game."
                ]
            },
            {
                "title": "Positions analyzed with varying visits",
                "dir_name": "position-analysis",
                "paths": [
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/D21A3637ED1950A3F5E2ECBD067192D3.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/A4F97F173E7FFD4DA8EA0B44CC498217.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/BAE6EE5C6A92A349F5C3F40A5A749D3D.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/9769802A41A0936FFC3F49F567F4E27E.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/B303C7624A8D43C86218D8A090A89432.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/EED83A03FE5ADA6488362D70B4652B74.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/F60F14F76A3EC9374AEC037F61DF35ED.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/3EEF60B71376DF13DCFC585958F7AA97.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/8A7C8591E9B7308CF65E0F1EDC3160E7.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/35271149C9656EBEACC462C78885E17C.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/D7D74BD8D0B17EB04E9DC856D4EE46AB.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/8E68B87F7316905795CF27C1904E5C7D.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/667CF02E24A2FD141A82C5D1755A2AE2.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/F15A82698AC1537184C30E2A2D1A4603.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/9BD1667E79D20D46FB261E22A2478C4F.sgf",
                    "/shared/nas-data/ttseng/go_attack/backup/position-analysis/0107B1AE44B5395A6EAABFBEC119E664.sgf"
                ],
                "max_games": 16,
                "sort_games": false,
                "adversary": "498 million training steps, 600 visits",
                "victim": "<code>Latest</code><sub><code>def</code></sub>, 1600 visits",
                "description": [
                    "We make available here the full game records for the positions analyzed with different levels of visits in the <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#appendix.H\">paper appendix discussing the role of search in robustness</a>. For details, please refer to the appendix."
                ]
            },
            {
                "title": "Positions analyzed with 1 billion visits",
                "dir_name": "position-analysis-1b",
                "paths": [
                    "/shared/nas-data/sgf-viewer-games/position-analysis-1b/17C295C81D606485.sgf",
                    "/shared/nas-data/sgf-viewer-games/position-analysis-1b/410B1AA59B8501F3.sgf",
                    "/shared/nas-data/sgf-viewer-games/position-analysis-1b/517ACE2F2CF6A19C.sgf",
                    "/shared/nas-data/sgf-viewer-games/position-analysis-1b/6E4A22DAD4680325.sgf",
                    "/shared/nas-data/sgf-viewer-games/position-analysis-1b/9E85957D1FD7E400.sgf"
                ],
                "max_games": 5,
                "sort_games": false,
                "adversary": "545 million training steps, 600 visits",
                "victim": "<code>Latest</code>, 1 million visits",
                "description": [
                    "The following game records correspond to positions that were analyzed with 1 billion visits, where the victim still failed to find the correct move. The original victim that played the games had 1 million visits. For details, please refer to the <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#appendix.H\">paper appendix discussing the role of search in robustness</a>."
                ]
            }
        ]
    },
    "human-evaluation": {
        "title": "Human games",
        "summary": "Examples of humans exploiting nominally superhuman Go systems, as well as beating (weak) adversaries.",
        "content": [
            {
                "title": "Human amateur beats cyclic adversary",
                "dir_name": "amateur_vs_advh_545mil",
                "paths": [
                    "/shared/nas-data/sgf-viewer-games/amateur_vs_advh_545mil/tony-b-def-adv505h-s545m-w-anon.sgf",
                    "/shared/nas-data/sgf-viewer-games/amateur_vs_advh_545mil/tony-w-def-adv505h-s545m-b-anon.sgf"
                ],
                "max_games": 10,
                "adversary": "Cyclic adversary, 545 million training steps, 600 visits",
                "victim": "Tony Wang (Author)",
                "description": [
                    "Our <a target=\"_blank\" href=\"/adversarial-policy-katago#contents\">strongest adversarial policy</a> (trained against <code>Latest</code><sub><code>def</code></sub>) is able to reliably beat KataGo at superhuman strength settings. However, a member of our team (Tony Wang) who is a novice Go player managed to convincingly beat this same adversary. This confirms that our adversarial policy is not generally capable, despite it beating victim policies that can themselves beat top human professionals. Instead, our victim policy harbors a subtle vulnerability.",
                    "Our evaluation is imperfect in one significant way: the adversary was not playing with an accurate model of its human opponent (rather it modeled Tony as <code>Latest</code> with 1 visit). However, given the poor transferability of our adversary to different KataGo checkpoints (see <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#figure.caption.3\">Figure 5.1 of the paper</a>), we predict that the adversary would not win even if it had access to an accurate model of its human opponent."
                ]
            },
            {
                "title": "Human amateur beats pass adversary",
                "dir_name": "amateur_vs_adv",
                "paths": [
                    "/shared/nas-data/ttseng/go_attack/backup/sgf-viewer-sgfs/tony-black.sgfs",
                    "/shared/nas-data/ttseng/go_attack/backup/sgf-viewer-sgfs/tony-white.sgfs"
                ],
                "max_games": 10,
                "adversary": "Pass adversary, 34.1 million training steps, 600 visits",
                "victim": "Tony Wang (Author)",
                "description": [
                    "The same Go novice (Tony Wang) also managed to beat our pass adversary by a large margin of over 250 points. This demonstrates our pass adversary is also not generally capable."
                ]
            },
            {
                "title": "Human exploits KataGo",
                "dir_name": "human_vs_kata100k",
                "paths": [
                    "/shared/nas-data/sgf-viewer-games/human_vs_kata100k/humanattack-KataGo-100kvisits.sgfs"
                ],
                "max_games": 10,
                "adversary": "Kellin Pelrine (Author)",
                "victim": "KataGo, 100K visits",
                "description": ["A Go expert (Kellin Pelrine) was able to learn and apply the cyclic adversary's strategy to attack multiple types and configurations of AI Go systems. In this example they exploited KataGo with 100K visits, which would normally be strongly superhuman. Besides previously studying our adversary's game records, no algorithmic assistance was used in this or any of the following examples. The KataGo network and weights used here were b18c384nbt-uec, which is a newly released version the author of KataGo (David Wu) trained for a tournament. This network should be as strong or stronger than <code>Latest</code>."]
            },
            {
                "title": "Human exploits Leela Zero",
                "dir_name": "human_vs_lz100k",
                "paths": [
                    "/shared/nas-data/sgf-viewer-games/human_vs_lz100k/humanattack-LZ-100kvisits.sgfs"
                ],
                "max_games": 10,
                "adversary": "Kellin Pelrine (Author)",
                "victim": "Leela Zero, 100K visits",
                "description": ["The same Go expert (Kellin Pelrine) also exploited Leela Zero with 100K visits, which would likewise normally be superhuman."]
            },
            {
                "title": "Human exploits Leela Zero 2",
                "dir_name": "human_vs_lz4096",
                "paths": [
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-1.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-2.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-3.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-4.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-5.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-6.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-7.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-8.sgfs",
                    "/shared/nas-data/k8/go-attack/humanatk-lz4096/humanatk-LZ-4096visits-9.sgfs"
                ],
                "max_games": 10,
                "adversary": "Kellin Pelrine (Author)",
                "victim": "Leela Zero, 4096 visits",
                "description": ["Kellin Pelrine also played 9 games against Leela Zero with 4096 visits, winning 6."]
            },
            {
                "title": "Human exploits a top KGS bot",
                "dir_name": "human_vs_jbxkata005",
                "paths": [
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005//corners-JBXKata005-2.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-3.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-4.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-5.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-6.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-7.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-8.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005-9.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/JBXKata005-corners.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/JBXKata005-corners-2.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/JBXKata005-corners-3.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/JBXKata005-corners-4.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/JBXKata005-corners-5.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/JBXKata005-corners-6.sgfs",
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005/corners-JBXKata005.sgfs"
                ],
                "max_games": 15,
                "adversary": "Kellin Pelrine (Author)",
                "victim": "JBXKata005, 9 dan on KGS",
                "description": ["Playing under standard human conditions on the online Go server KGS, the same Go expert (Kellin Pelrine) successfully exploited the bot JBXKata005 in 14/15 games. In the remaining game, the cyclic group attack still led to a successful capture, but the victim had enough points remaining to win. This bot uses a custom KataGo implementation, and at the time of the games was the strongest bot available to play on KGS."]
            },
            {
                "title": "Human exploits top KGS bot with large handicap",
                "dir_name": "human_vs_jbxkata005_handicap",
                "paths": [
                    "/shared/nas-data/sgf-viewer-games/human_vs_jbxkata005_handicap/corners-JBXKata005-9stones.sgfs"
                ],
                "max_games": 10,
                "adversary": "Kellin Pelrine (Author)",
                "victim": "JBXKata005, 9 dan on KGS, with 9 stone handicap",
                "description": ["In this last example, the same Go expert (Kellin Pelrine) exploited JBXKata005 while giving it a huge initial advantage through a 9 stone handicap. A top level human player with this much advantage would have a virtually 100% win rate against any opponent, human or algorithmic."]
            }
        ]
    },
    "transfer": {
        "title": "Transfer",
        "summary": "The adversarial strategy learned against KataGo transfers to other open-source Go AIs.",
        "description": [
            "Our adversary apparently exploits a weakness common across several Go AI systems. We find that the attack transfers zero-shot against ELF OpenGo and Leela Zero, two other open-source Go AI systems that can play at a superhuman level."
        ],
        "content": [
            {
                "title": "ELF OpenGo",
                "dir_name": "elf",
                "paths": [
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-8.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread3/sgfs/game-6.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-0.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-1.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-2.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-3.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-4.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-elf/20230119-194538/thread0/sgfs/game-5.sgf"
                ],
                "max_games": 8,
                "adversary": "545 million training steps, 600 visits",
                "victim": "ELF OpenGo, final network, 80,000 rollouts per move",
                "description": ["We pit our adversary against ELF OpenGo playing with its <a href=\"https://github.com/pytorch/ELF/releases/tag/pretrained-go-19x19-v2\">final network</a> and 80,000 rollouts per move. The <a href=\"https://arxiv.org/pdf/1902.04522.pdf#subsection.4.1\">authors of ELF found</a> that this number of rollouts was sufficient with to consistently beat several top-30 Go players even using a weaker network. Our adversary achieves a win rate of 3.5% against ELF. (The games displayed are non-randomly selected to show the wins achieved by the adversary.)"]
            },
            {
                "title": "Leela Zero",
                "dir_name": "leela",
                "paths": [
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-16.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-23.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-0.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-1.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-2.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-3.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-4.sgf",
                    "/shared/nas-data/ttseng/go_attack/transfer/s545mil-vs-elf-leela-20230119/cleaned/katago-vs-leela/20230119-194553/thread1/sgfs/game-5.sgf"
                ],
                "max_games": 8,
                "adversary": "545 million training steps, 600 visits",
                "victim": "Leela Zero, final network, max 40,000 visits per move",
                "description": ["We pit our adversary against Leela Zero OpenGo playing with its final network (hash 0e9ea880 on the <a href=\"https://zero.sjeng.org/\">Leela training website</a>), no time limit, and a maximum of 40,000 visits per move. Our adversary achieves a win rate of 6.1%. (The games displayed are non-randomly selected to show the wins achieved by the adversary.)"]
            }
        ]
    },
    "pass-based-attack": {
        "title": "Pass attack",
        "summary": "Weak KataGo agents defeated using the degenerate 'pass-attack'.",
        "description": [
            "Our initial attempts at attacking KataGo resulted in adversaries that exploited KataGo's passing behavior. These pass-based adversaries trick KataGo into passing when it shouldn't. While this attack is effective against victims which do not use tree search, it stops working once victims are able to use even a small amount of tree search. We developed the pass-hardening defense so that our adversaries would not get stuck learning this pass-exploit. This worked surprisingly well &mdash; training against pass-hardened victims resulted in our adversaries learning <a href=\"/adversarial-policy-katago#contents\">an alternate strategy that works even in the high search regime.</a>"
        ],
        "content": [
            {
                "title": "KataGo without search (top-100 European player level)",
                "dir_name": "no_search",
                "_path_comment": "Computed by `grep -n cp505-v1 /nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/* | shuf | head -n 6 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/68970420A37B288E.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/9900E1AA3223E803.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/F73C301340CB2C94.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/8A89BB10D44F759F.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/04541438A78DF265.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/training-checkpoint-sweep/ttseng-eval-20221130-210105/sgfs/7E2F2D69066744F8.sgfs",
                        "line": 5
                    }
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 600 visits",
                "victim": "<code>Latest</code>, no search",
                "description": [
                    "Without tree search, Katago's <code>Latest</code> network plays at the <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#subsection.E.1\">strength of a top-100 European professional</a>. Our pass-based adversary achieves a 99% win rate against this victim by playing a counterintuitive strategy. The adversary stakes out a minority territory in the corner, allowing KataGo to stake the complement, and placing weak stones in KataGo’s stake.",
                    "KataGo predicts a high win probability for itself and, in a way, it’s right—it would be simple to capture most of the adversary’s stones in KataGo’s stake, achieving a decisive victory. However, KataGo plays a pass move before it has finished securing its territory, allowing the adversary to pass in turn and end the game. This results in a win for the adversary under the standard <a href=\"https://tromp.github.io/go.html\">Tromp-Taylor</a> ruleset for computer Go, as the adversary gets points for its corner territory (devoid of victim stones) whereas the victim does not receive points for its unsecured territory because of the presence of the adversary’s stones."
                ]
            },
            {
                "title": "KataGo with 8 visits",
                "dir_name": "8_visits",
                "_path_comment": "Computed by `grep -n cp505-v8] /nas/ucb/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/* | shuf | head -n 10 | cut -f1,2 -d:`",
                "paths_with_line_num": [
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/5157F816018CB4D4.sgfs",
                    "line": 1
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/F6DBA08D32F3161D.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/2D7B37D38A30BFF5.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/8EEBABA9C5B3A7FC.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/4876135715F8EF63.sgfs",
                    "line": 1
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/DC2248371CC26E2A.sgfs",
                    "line": 1
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/81BFB902057EAD6B.sgfs",
                    "line": 4
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/255D65B54C80B63C.sgfs",
                    "line": 2
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/9472DACCBBF272FB.sgfs",
                    "line": 4
                  },
                  {
                    "path": "/shared/nas-data/k8/go-attack/match/ttseng-unhardened-paper-eval-221130/ttseng-victim-v-sweep-amcts-r-20221130-210359/sgfs/A262DF8E9F1DB313.sgfs",
                    "line": 1
                  }
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 200 visits, recursive modeling",
                "victim": "<code>Latest</code>, 8 visits",
                "description": ["A search budget of 8 visits / move is around the <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#subsection.F.3\">limit of what our pass-based adversary can exploit</a>. We achieve a win rate of 87.8% against this victim by modeling the victim perfectly during the adversary's search. The adversary wins by the same strategy of staking out a corner. The adversary loses when the victim plays the game out to the end, resulting in a very full board."]
            }
        ]
    },
    "baseline-attack": {
        "title": "Baseline attacks",
        "summary": "Simple baselines occasionally defeat weaker Go AI systems.",
        "description": ["In this section we examine simple, no-learning attacks. These test the robustness of KataGo to some types of unsophisticated but likely out-of-distribution play. We find these attacks are generally ineffective against KataGo playing with search and against the hardened version of KataGo, although the mirror Go attack still gets some wins at low visits. Overall, to find consistent weaknesses, a learning-based approach like ours seems necessary."],
        "content": [
            {
                "title": "Edge attack against KataGo",
                "dir_name": "edge_vs_cp505",
                "_path_comment": "The games in each of these .sgfs files were run sequentially, so sampling lines from these files in order is OK.",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-B-vs-edge.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v1-W-vs-edge.sgfs",
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
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-W-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-W-vs-edge.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-B-vs-edge.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-pass-hardened-20230117-154153/rescored/cp505h-v1-B-vs-edge.sgfs",
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
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 37
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 102
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 122
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-W-vs-mirror.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-W-vs-mirror.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/baseline-attack/ttseng-katago-raw-20230113-163611/rescored/cp505-v32-B-vs-mirror.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 6,
                "adversary": "Mirror Go",
                "victim": "<code>Latest</code>, 32 visits",
                "description": ["Another hard-coded strategy we test is Mirror Go, a classic strategy in which the mirroring player plays the opponent's last move reflected about the diagonal. Mirror Go wins a few games against <code>Latest</code> as well, with a win rate of about 1.7% against <code>Latest</code> with 32 visits. (The games displayed are non-randomly selected to show the wins achieved by Mirror Go.)"]
            }
        ]
    },
    "training-sample": {
        "title": "Training sample games",
        "summary": "Games played by our adversary against KataGo throughout training.",
        "description": ["In this section we present samples of games showing the training process of our adversary. In particular, we sample 5 games against each of 4 victims approximately every 10% of training steps up to 545 million steps. All victims are defended against the <a href=\"/pass-based-attack#contents\">pass-based attack</a>. We see the adversary implementing other attacks before discovering and ultimately consistently using the cyclic attack. This progression is analyzed in more detail in <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#subsection.I.3\">the paper appendix</a>."],
        "_content_comment": "Generated by/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/sample-sgfs.sh",
        "content": [
            {"title": "10% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games1_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/E344356A040B00BF.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/4EF9D42E887F0EE3.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/E9D2C9D4666A7124.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/B002FCEF7FE1BE79.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/675C1FD94D5025EC.sgfs", "line": 2}], "max_games": 5, "adversary": "50 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "10% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games1_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/5F48E0B1B978265B.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/A224A8A85D233AA5.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/CF0D50AB892070A3.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/472FE601A19EDE32.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/D0D45ED2B4B00C6B.sgfs", "line": 7}], "max_games": 5, "adversary": "50 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "10% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games1_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/AADAF38E5D018FCA.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/E5C6C27787FCB95C.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/0088EC06DD4552A3.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/5586FAB9455A29EC.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/812302D93A460DC1.sgfs", "line": 5}], "max_games": 5, "adversary": "50 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "10% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games1_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/ED4B9A0FCB77519E.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/0B1336BED112111A.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/587E240F40B8BFFB.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/C60E76AEA9C0C9A1.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-0-to-8-20230117-235636/sgfs/BA18A6E741104260.sgfs", "line": 1}], "max_games": 5, "adversary": "50 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "20% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games2_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/A17801D6C3CDC988.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/E84DA16BA79FC3CE.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/98D436F2D06BBD0E.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/F94443212C2461D8.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/5F09CD75100F7CC1.sgfs", "line": 1}], "max_games": 5, "adversary": "111 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "20% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games2_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/3751BE0052A60ACD.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/8CFEB4977349B365.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/40342F6F809B1797.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/9BD9496CA5703A8B.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/9397A4F56393D5C2.sgfs", "line": 6}], "max_games": 5, "adversary": "111 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "20% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games2_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/FD4D9600149A5BB5.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/2A905AA2E50E97AF.sgfs", "line": 13}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/90B8AED608AF6E82.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/9FED6A0AFEE57712.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/778C0713F6FA771B.sgfs", "line": 3}], "max_games": 5, "adversary": "111 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "20% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games2_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/11CB571E6D38F5EA.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/876A25F2C8A38FDE.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/B0CDDF2C815EC16F.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/629FE64B53C857BB.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-8-to-16-20230117-235638/sgfs/C898D3DB29953D4E.sgfs", "line": 4}], "max_games": 5, "adversary": "111 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "30% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games3_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/DC2C3357DADD97A7.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/1EC36CD6A821592D.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/F39D93C072DFF254.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/50594C5C3E1E48C2.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/839E25DCBCD7856A.sgfs", "line": 1}], "max_games": 5, "adversary": "160 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "30% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games3_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/6963D2A8831B136B.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/CDBE5907FDB923BE.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/18ED5DB060C6E782.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/364F70455F04F64D.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/5F90249FE264DAE5.sgfs", "line": 4}], "max_games": 5, "adversary": "160 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "30% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games3_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/B2946F436AD551F3.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/0EBBAEC15573B463.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/45BF0533F69972D7.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/7A3BF34A4FE4F2C9.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/9094B747B9D87DF0.sgfs", "line": 5}], "max_games": 5, "adversary": "160 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "30% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games3_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/D2BD654174A02F17.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/E4FA565E60B3B8C1.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/92B7D64D72E97C14.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/45BF0533F69972D7.sgfs", "line": 11}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/4232E5BEA7CD262D.sgfs", "line": 1}], "max_games": 5, "adversary": "160 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "40% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games4_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/98079B261A6B0029.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/B5D3DFF8209D965D.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/0D212A78B5C5DAEE.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/04B241EAB970A507.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/A489C6D02BC07606.sgfs", "line": 1}], "max_games": 5, "adversary": "220 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "40% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games4_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/670A8658962793FF.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/E7641C8BAB07E716.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/1F01BCD18F80E253.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/9616518762E4E3FF.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/C85987178933476D.sgfs", "line": 4}], "max_games": 5, "adversary": "220 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "40% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games4_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/8A225CBB41609283.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/CCE631A75ED461FE.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/A8F3BE8792916101.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/FC4E770BDA185C8F.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/201B01715F19CC4D.sgfs", "line": 8}], "max_games": 5, "adversary": "220 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "40% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games4_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/295E5F1A945AA9AD.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/3976750A169CEE4F.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/6963D2A8831B136B.sgfs", "line": 7}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/1EC36CD6A821592D.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-16-to-24-20230117-235641/sgfs/E29FB4A60319DD07.sgfs", "line": 13}], "max_games": 5, "adversary": "220 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "50% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games5_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/6066B180F46F60CF.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/08F0DC4AB66B2932.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/753E92328E2A9A2B.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/08F0DC4AB66B2932.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/537191C6A2D81BA9.sgfs", "line": 1}], "max_games": 5, "adversary": "272 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "50% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games5_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/5AACC361A142C390.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/8FA751E6CBB526D7.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/CEDEC12B19C109D2.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/5AACC361A142C390.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/69E25B134B688446.sgfs", "line": 8}], "max_games": 5, "adversary": "272 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "50% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games5_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/79330CE30F7F2B57.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/8538DCA39BCE6F64.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/9BBA4D16BB9FCAD0.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/878B869D38EDA2ED.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/2B9E5E858C31E366.sgfs", "line": 7}], "max_games": 5, "adversary": "272 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "50% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games5_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/55EED040863B1FBF.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/537191C6A2D81BA9.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/8BA7691E8B5D35B3.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/6EF5E430D16E06CB.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-24-to-32-20230117-235644/sgfs/CFB6D35F9055EAA0.sgfs", "line": 6}], "max_games": 5, "adversary": "272 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "60% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games6_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/4D70FC30C5DB28B9.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/D8E365B2C99A1C7C.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/122D484D9624EFFB.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/23B85D68140C0F0A.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/AC655721EBF59AFA.sgfs", "line": 2}], "max_games": 5, "adversary": "323 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "60% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games6_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/9E4E6F07DBCB8391.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/2B7BF1F974E9C66D.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/B7AB89C1D7779EAB.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/4CF4817097B0290C.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/DBF0F50737F64068.sgfs", "line": 5}], "max_games": 5, "adversary": "323 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "60% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games6_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/2FB355B052D8E673.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/57F3B5E3ABC67E49.sgfs", "line": 7}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/C37EF9E239A0B869.sgfs", "line": 12}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/5B2D99A9E2B5AD9B.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/4076075111F4D825.sgfs", "line": 1}], "max_games": 5, "adversary": "323 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "60% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games6_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/39A3E5DDAB616F98.sgfs", "line": 11}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/0CC9EDD5C8C76DE4.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/122D484D9624EFFB.sgfs", "line": 10}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/1E5F06792EE0334D.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/0FA84FED6DB39861.sgfs", "line": 2}], "max_games": 5, "adversary": "323 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "70% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games7_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/D329884F4D3F877C.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/83E710A580237AE4.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/6300FB68C5691A54.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/35261A1623D6BC29.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/6AB1D120D3ED0082.sgfs", "line": 3}], "max_games": 5, "adversary": "384 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "70% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games7_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/F17754CA13ABB52E.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/539EF7009399A3B4.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/E5B8A71C8B5EB9E0.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/6261041DAD562C27.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/D8E365B2C99A1C7C.sgfs", "line": 3}], "max_games": 5, "adversary": "384 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "70% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games7_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/60BAACA0856AFEEC.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/B4D90474A06F4421.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/B20CD1ECE3158510.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/C3022BCABCD09879.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/5FDCDA9BD359ADA0.sgfs", "line": 4}], "max_games": 5, "adversary": "384 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "70% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games7_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/224D334F9D9E74BA.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/23B85D68140C0F0A.sgfs", "line": 9}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/2833A26D0F6C2E6F.sgfs", "line": 11}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/01063C5C0DD171DC.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-32-to-40-20230117-235647/sgfs/67E3E1D8D75FF171.sgfs", "line": 3}], "max_games": 5, "adversary": "384 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "80% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games8_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/91EB3E0C8FE3A168.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/6CC0667160D8E655.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/563F5DF0F7983335.sgfs", "line": 9}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/D238A55111AC81BE.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/FED9ECDB49CC28F9.sgfs", "line": 5}], "max_games": 5, "adversary": "434 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "80% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games8_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/5C3DF3C59968979C.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/A5295EA7314A3C25.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/DD53DA80710F20BB.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/6029B79171991364.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/BEEF55D4FC43D8C1.sgfs", "line": 4}], "max_games": 5, "adversary": "434 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "80% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games8_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/EBCF27E96D2ADCBD.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/4277FF30113D73F4.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/55E5152EBDA5A9CE.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/2BD56AF94BBBCC3E.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/450EBD64FD700D2B.sgfs", "line": 1}], "max_games": 5, "adversary": "434 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "80% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games8_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/254EA0A23C0A8B41.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/BE5FAA16B3AB86EC.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/CA611B2251288245.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/78B1AE896AE6F6EF.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-40-to-48-20230117-235649/sgfs/87842FFCCC189EB3.sgfs", "line": 2}], "max_games": 5, "adversary": "434 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "90% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games9_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/DAB931072CC08D3D.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/5F5C53629B537657.sgfs", "line": 10}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/9183B13F8A97FAEE.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/4799EB3719E12099.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/B793189C76238F6A.sgfs", "line": 9}], "max_games": 5, "adversary": "494 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "90% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games9_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/6A7AAEEB85F60990.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/7B16335F4697D0E2.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/59A890C5C2A6AF92.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/9892E271E72A7F82.sgfs", "line": 13}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/C2D40749A37CCE7E.sgfs", "line": 4}], "max_games": 5, "adversary": "494 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "90% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games9_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/A8C3B2C9FE08C741.sgfs", "line": 7}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/861CC72CE0B5B7A3.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/9D4AE7AF860B994A.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/1529D9FAFB020AA6.sgfs", "line": 16}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/4AE7FDCF8F1DEE73.sgfs", "line": 16}], "max_games": 5, "adversary": "494 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "90% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games9_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/A291373531C39693.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/2DAB1168926BD0FA.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/C88AF456C8F13A48.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/A8C3B2C9FE08C741.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/B1DC56234CFF4988.sgfs", "line": 3}], "max_games": 5, "adversary": "494 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []},
            {"title": "100% vs. <code>cp39</code>, no search", "dir_name": "training_sample_games10_cp39h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/205215B3B142E81A.sgfs", "line": 13}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/A8C3B2C9FE08C741.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/6A49FEEFEB1EE2A9.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/1D8C7566FC729978.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/139E1B70759B3557.sgfs", "line": 1}], "max_games": 5, "adversary": "545 million training steps, 600 visits", "victim": "<code>cp39</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "100% vs. <code>cp127</code>, no search", "dir_name": "training_sample_games10_cp127h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/063F3CC213A35519.sgfs", "line": 1}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/DEAD0B5C46928C75.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/1D20AD4A72A24110.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/CA3B08241E88ED64.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/1529D9FAFB020AA6.sgfs", "line": 11}], "max_games": 5, "adversary": "545 million training steps, 600 visits", "victim": "<code>cp127</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "100% vs. <code>Latest</code>, no search", "dir_name": "training_sample_games10_cp505h-v1", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/6C799DC8B9CF47D5.sgfs", "line": 4}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/8472071DAD568C7D.sgfs", "line": 2}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/300D19B57CFA0D57.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/B8F378B85EF63DB8.sgfs", "line": 5}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/1F87750F7DF8A39E.sgfs", "line": 4}], "max_games": 5, "adversary": "545 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, no search", "description": []},
            {"title": "100% vs. <code>Latest</code>, 4096 visits", "dir_name": "training_sample_games10_cp505h-v4096", "_path_comment": "Sampled using sample_training_games.py", "paths_with_line_num": [{"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/A3235D3F37F3549E.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/2BE0EE6FA67CE3D0.sgfs", "line": 8}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/E5637DACDFC22C28.sgfs", "line": 3}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/4F74D51B2572A264.sgfs", "line": 6}, {"path": "/shared/nas-data/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-s545mil-20230117/ttseng-checkpoints-48-to-56-20230117-235652/sgfs/0273BF36E295C5FE.sgfs", "line": 1}], "max_games": 5, "adversary": "545 million training steps, 600 visits", "victim": "<code>Latest</code><sub><code>def</code></sub>, 4096 visits", "description": []}
        ]
    },
    "adversarial-training": {
        "title": "Early adversarial training",
        "summary": "Games played by an updated adversary that defeats an adversarially trained version of KataGo.",
        "description": [
            "David Wu (lightvector), the creator and primary developer of KataGo, has incorporated adversarial training against the cyclic exploit into the official self-play training run of KataGo since December 2022. The adversarial training consists of starting a small fraction (~0.1%) of self-play games in positions where the cyclic exploit is being executed, with the remainder of games being regular self-play games. This adversarial training has been partially successful in that the adversarially trained networks are able to beat our original cyclic adversary. However, we are able to fine-tune our original adversary to defeat these updated networks. This suggests that it is non-trivial to defend against the cyclic exploit, unlike the pass exploit which we were able to manually patch. Developing techniques to train agents that are immune to this attack while maintaining high Go strength remains an interesting open problem.",
            "This page shows our results against the KataGo network <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>kata1-b60c320-s7701878528-d3323518127</code></a>, abbreviated to <code>b60-s7702m</code> and released in May 2023. These results are superseded by <a href=\"/positional-adversarial-training#contents\">our results against a December 2023 network</a>, but we preserve them here since they are linked in <a target=\"_blank\" href=\"https://arxiv.org/abs/2211.00241\">our first paper</a>."
        ],
        "content": [
            {
                "title": "Original cyclic adversary loses to no-search <code>b60-s7702m</code>",
                "dir_name": "cyclic_orig_vs_b60_s7702m_v1",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/A9E8412E9BEE3604.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/C036A8303267F1E9.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/97EBB13B75DAAE33.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/11508EB8669E4E37.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/9D142D0D3CB86046.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/EFA8DF2610703829.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/067B361FD7189DB9.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/k8/go-attack/match/tony-adv-v-kata-v2.3.2/tony-victims-0-to-0-2-20230517-152837/sgfs/00CAD65CF575B46D.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 8,
                "adversary": "Cyclic adversary, 545 million training steps, 600 visits",
                "victim": "<code>b60-s7702m</code>, no search",
                "description": [ "<code>b60-s7702m</code> has had several months of adversarial training and defeats the original cyclic adversary in 1882/2000 = 94.1% of games even when <code>b60-s7702m</code> plays without search. <code>b60-s7702m</code> is stronger at defending the cyclic group. (The games displayed are non-randomly selected to show the wins achieved by the adversary.)" ]
            },
            {
                "title": "Fine-tuned cyclic adversary vs. 4096-visit <code>b60-s7702m</code>",
                "dir_name": "cyclic_fine_tune_vs_b60_s7702m_v4096",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/424E64C3B6BCE08A.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/54C163115050FACB.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/FC58ED569039897A.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/A73717E4B13981F5.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/0AD004CD5AB00448.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/DF333976A76E07CD.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/9EF24D68CD91CF01.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-20230529-190938/sgfs/2F41D81801BBE779.sgfs",
                        "line": 2
                    }
                ],
                "max_games": 8,
                "adversary": "Cyclic adversary, 168 million fine-tuning steps, 600 visits",
                "victim": "<code>b60-s7702m</code>, 4096 visits",
                "description": [ "After 168 million fine-tuning training steps, the cyclic adversary achieves a win rate of 188/400 = 47% against <code>b60-s7702m</code> with 4096 victim visits. The attack is still a cyclic attack, though the placement of the cyclic group has moved from the corner of the board to the center of one side of the board." ]
            },
            {
                "title": "Fine-tuned cyclic adversary vs. 100,000-visit <code>b60-s7702m</code>",
                "dir_name": "cyclic_fine_tune_vs_b60_s7702m_v100k",
                "paths_with_line_num": [
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/F41D8751F1D694BF.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/18B4EEE9EE860AA8.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/B3E03288FA1A7D6E.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/5629CE2276D63236.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/407A3A2F3598178D.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/A3A73164DFEAD4EA.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/669501844B765636.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/nas-data/ttseng/go_attack/backup/tony-ft-vs-b60-v1e5-20230529-192608/sgfs/0D1446FE5B9035E7.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 8,
                "adversary": "Cyclic adversary, 168 million fine-tuning steps, 600 visits",
                "victim": "<code>b60-s7702m</code>, 100,000 visits, 10 search threads",
                "description": [ "The fine-tuned cyclic adversary also beats <code>b60-s7702m</code> using 100,000 victim visits with a win rate of 7/40 = 17.5%. (The games displayed are non-randomly selected to show the wins achieved by the adversary.)" ]
            }
        ]
    },
    "activation-plots": {
        "title": "Activation plots",
        "summary": "Visualizations of the activations of the KataGo network in adversarially created board states.",
        "description": ["In this page we share interactive plots visualizing activations over the 41 layers of KataGo models in cyclic situations. These correspond to the discussion in <a target=\"_blank\" href=\"https://arxiv.org/pdf/2211.00241.pdf#subsection.K.1\">Appendix K</a> of the paper (coming soon)."],
        "content": [
            {
                "title": "Effect of adversarial training",
                "dir_name": "realgame2_cp505_vs_advtrained",
                "description": [
                    "The figure below shows the difference in activations between <code>Latest</code> and cp580 in a realgame cyclic position (Figure K.2a) that the former misjudges but the latter judges correctly."
                ],
                "figure": "figures/cp505_realgame2_A_vs_b40_1286_realgame2_A.html"
            },
            {
                "title": "Effect of breaking the cycle",
                "dir_name": "realgame2_cp505_vs_cp505",
                "description": [
                    "The figure below shows the difference in activations for <code>Latest</code> between a realgame cyclic position (Figure K.2a, as in the plot above) and a minimally perturbed version where the cycle is broken but the position is otherwise unchanged (Figure K.2b)."
                ],
                "figure": "figures/cp505_realgame2_A_vs_cp505_realgame2_B.html"
            },
            {
                "title": "Effect of breaking the cycle 2",
                "dir_name": "manual_cp505_vs_cp505",
                "description": [
                    "The figure below shows the difference in activations for <code>Latest</code> between a manually-constructed cyclic position (Figure K.1a) and a minimally perturbed version of it where the cycle is broken (Figure K.1b)."
                ],
                "figure": "figures/cp505_position_A_vs_cp505_position_B.html"
            },
            {
                "title": "Effect of breaking the cycle 3",
                "dir_name": "realgame3_cp505_BvD",
                "description": [
                    "The figure below shows the difference in activations for <code>Latest</code> between a realgame cyclic position (Figure K.3a) and a minimally perturbed version of it where the cycle is broken (Figure K.3b). Unlike previous cases where the group perturbed is dead, here it is currently alive and safe."
                ],
                "figure": "figures/cp505_realgame3_B_vs_cp505_realgame3_D.html"
            },
            {
                "title": "Effect of no-cycle perturbation",
                "dir_name": "realgame3_cp505_EvF",
                "description": [
                    "The figure below shows the difference in activations for <code>Latest</code> between a position which has a broken near-cycle (Figure K.4a), and a minimally perturbed version of it which likewise has a broken near-cycle (Figure K.4b). I.e., it shows the effect of a minimal change to the board when there is no completed or completeable cycle involved."
                ],
                "figure": "figures/cp505_realgame3_E_vs_cp505_realgame3_F.html"
            }
        ]
    },
    "positional-adversarial-training": {
        "title": "Positional adversarial training",
        "summary": "Adversaries that defeat an adversarially trained version of KataGo.",
        "description": [
            "In December 2022, KataGo's main training run began to incorporate adversarial training using hand-written positions derived from cyclic attacks. We target the strongest KataGo network checkpoint from December 2023, <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>kata1-b18c384nbt-s8526915840-d3929217702</code></a>, which we dub <code>dec23-victim</code>. Our analysis identified two styles of attack: a <a href=\"#dec23-vs-continuous\">fine-tuned variant</a> of our original cyclic attack, and a qualitatively distinct <a href=\"#dec23-vs-gift\">\"gift\" attack</a> that inexplicably leads the victim to gift the adversary two stones."
        ],
        "content": [
            {
                "title": "Cyclic attack",
                "dir_name": "dec23-vs-continuous",
                "_path_comment": "Computed by /shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/sample-sgfs.sh",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/2AA99D7D5D195D86.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/E61F14B35A2F4C18.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/32234108DFCBA27B.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/0BD4B0BBA4122227.sgfs",
                        "line": 6
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/C3224EDB24EE96AB.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/75E9879182E9E4D4.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/EE4765DDC4C3CEC8.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/E4594730BD4B463B.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/6FF122FC255F5F85.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v16k-to-v65k/sgfs/2CA4C0F541303AFC.sgfs",
                        "line": 3
                    }
                ],
                "max_games": 10,
                "adversary": "<code>continuous-adversary</code>",
                "victim": "<code>dec23-victim</code>, 65536 visits",
                "description": [
                    "We fine-tuned a cyclic adversary to defeat <code>dec23-victim</code> at 4096 visits of search with a 65% win rate and at 65536 visits with a 27% win rate, showing that KataGo's adversarial training is insufficient to defend against cyclic attacks. Explore randomly sampled games below.",
                    "For example, in the first game, the adversary stakes out a sizable group in the center, around which the victim will form the cyclic group. We can see the outline of this group formed around <a class='clickable' onclick='setMove(`dec23-vs-continuous`, 65)'>move 65</a>, and the victim completes a loose encirclement—the eventual cyclic group—around <a class='clickable' onclick='setMove(`dec23-vs-continuous`, 98)'>move 98</a>. At <a class='clickable' onclick='setMove(`dec23-vs-continuous`, 122)'>move 122</a>, the inside shape is completed with a double cut formation. This inside shape is distinctive of this adversary. In subsequent moves, the victim completes the cyclic group and the adversary begins to surround it. Move <a class='clickable' onclick='setMove(`dec23-vs-continuous`, 210)'>210</a> is the last chance for the victim to escape (for example, by connecting where the adversary plays 211). After that the cyclic group is doomed, culminating in its final capture on <a class='clickable' onclick='setMove(`dec23-vs-continuous`, 217)'>move 217</a>."
                ]
            },
            {
                "title": "Gift attack",
                "dir_name": "dec23-vs-gift",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/86CC6B69BD6A48EB.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/69B1CE76A02E7F94.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/A6508A2FA55183D8.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/7B2841E33DC94115.sgfs",
                        "line": 6
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/D86D4196ABB29167.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/D505DB926A58C941.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/7904F641B0F49C15.sgfs",
                        "line": 8
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/5ECE47A6452033B6.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/6B78E25C43C0230E.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/gift-adversary/vary-victim-visits/sgfs/2AD4B59995282AC9.sgfs",
                        "line": 3
                    }
                ],
                "max_games": 10,
                "adversary": "<code>gift-adversary</code>",
                "victim": "<code>dec23-victim</code>, 512 visits",
                "description": [
                    "We also discovered a new non-cyclic attack, which we call the \"gift attack\", that defeats <code>dec23-victim</code> at 512 visits of search in 91% of games. In this attack, the adversary sets up a \"<a target=\"_blank\" href=\"https://senseis.xmp.net/?SendingTwoReturningOne\">sending-two-receiving-one</a>\" situation where, for no valid reason, the victim gifts the adversary two stones and then needs to capture one back. However, the victim's recapture is blocked by <a target=\"_blank\" href=\"https://senseis.xmp.net/?PositionalSuperko\">positional superko</a> rules. The adversary sets up the position to have the resurrection of one of its dead groups at stake, leading to a disaster for the victim. Although this attack does not scale up to high visits, it reveals additional unforeseen vulnerabilities in KataGo besides cyclic attacks. Explore randomly sampled games below.",
                    "In the first game, for example, we see a typical game unfold for the first 100+ moves. The victim takes an early lead, reaching 98% internal win probability by <a class='clickable' onclick='setMove(`dec23-vs-gift`, 24)'>move 24</a>, so the adversary is playing many moves that would normally be considered subpar. There is otherwise little overt evidence of anything suspicious happening at this stage. Gradually, we see the adversary playing some incursions into the victim’s territory, notably at moves <a class='clickable' onclick='setMove(`dec23-vs-gift`, 117)'>117</a> and <a class='clickable' onclick='setMove(`dec23-vs-gift`, 127)'>127</a>. With correct play, these and nearby stones will eventually be captured.",
                    "At <a class='clickable' onclick='setMove(`dec23-vs-gift`, 206)'>move 206</a>, we see the first instance of the victim offering two stones, though in this position it is not yet dangerous. This happens repeatedly over the following moves, both at this location and on the left side. After <a class='clickable' onclick='setMove(`dec23-vs-gift`, 263)'>move 263</a> though, when the adversary forms an eye at the top, any further gifts will lead to the victim inadvertently resurrecting the adversary’s entire group. This happens at <a class='clickable' onclick='setMove(`dec23-vs-gift`, 344)'>move 344</a>. After the adversary captures two stones at <a class='clickable' onclick='setMove(`dec23-vs-gift`, 345)'>345</a>, the victim would like to recapture one stone but is barred by the positional superko rule. Thus, the adversary secures two eyes with <a class='clickable' onclick='setMove(`dec23-vs-gift`, 347)'>move 347</a>, saving its group that should have died. This is a significant reversal, though the victim still appears to be winning. But then, at <a class='clickable' onclick='setMove(`dec23-vs-gift`, 366)'>move 366</a>, the same scenario unfolds on the left side, tipping the scales decisively in favor of the adversary."
                ]
            },
            {
                "title": "Human replication of gift attack",
                "dir_name": "dec23-vs-human-gift",
                "paths": ["/shared/match/paper-robustness/website-games/human-gift-vs-b18-v1.sgf"],
                "max_games": 10,
                "adversary": "Kellin Pelrine",
                "victim": "<code>dec23-victim</code>, 1 visit",
                "description": [
                    "A Go expert (Kellin Pelrine) was able to learn and apply the gift attack to beat KataGo. This confirms a variety of attacks, and not just the <a href=\"/human-evaluation#human_vs_kata100k\">original cyclic attack</a>, can be replicated by humans. In the game below, Kellin (white) takes control of the left and bottom sides, while the KataGo victim (black) takes the top and right. It was relatively straightforward for Kellin to take control of the left and bottom since KataGo is in the lead due to controlling more of the center. Because of this, KataGo does not fight too hard for more territory, though Kellin still had to make sure the score difference would not get too extreme (some prior attempts failed due to insufficient points, even after receiving a \"gift\").",
                    "Beginning on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 70)'>move 70</a>, Kellin (white) starts to set up a position to receive a gift. In moves <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 100)'>100</a> through <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 142)'>142</a>, white pushes further into black’s territory, making sure that the gift will result in a very large swing in points. Then starting on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 154)'>move 154</a>, white sets up another place for a gift. Black offers a gift on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 177)'>move 177</a>, but white does not accept yet because black threatens to capture four stones on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 179)'>move 179</a>. Note that this is the only place where black has a threat; white is careful to play very solidly and minimize potential threats, to be able to capitalize on the gift (noting that if there are lots of threats, the victim can use them to prevent a repeated board position and save themselves from the positional superko rule).",
                    "White finally sets up a third potential place for a gift starting on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 186)'>move 186</a>. This was intended to maximize the chances. Normally all three of these groups would be dead, but on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 193)'>move 193</a>, we see one instance of the attack succeed, with black sending two stones for no benefit and letting white resurrect their group. This happens again, with white’s largest “dead” group, on <a class='clickable' onclick='setMove(`dec23-vs-human-gift`, 215)'>move 215</a>. This completes the reversal, giving white a large lead, and black resigns shortly after.",
                    "We note, however, that this was completed at 1 victim visit. With more search, the attack seems much harder for humans (as well as our AI adversary); several human attempts at 256 and 512 visits failed. In particular, there was no issue establishing positions ready to receive a gift, as well as a stable gamestate on the rest of the board, but no gift was offered. We hypothesize that in addition to the key visible components of the attack (minimizing victim score lead, adversary positions that don’t have many threats against them, and setting up the shapes to receive gifts), there is a more opaque component of balancing value of moves across the board in the victim’s perception, such that it does not see much more valuable moves and offers the gift, but also does not search so much in the local area to see the disaster about to happen afterwards. This requires increasing precision at higher visits, and is difficult for humans to learn."
                ]
            }
        ]
    },
    "iterated-adversarial-training": {
        "title": "Iterated adversarial training",
        "summary": "Adversaries that defeat a Go AI model that was repeatedly adversarially trained.",
        "description": [
            "We performed an iterated adversarial training procedure that alternately trains a victim <code>v</code><sub><code>n</code></sub> and an adversary <code>a</code><sub><code>n</code></sub>. After nine iterations, our final victim <code>v</code><sub><code>9</code></sub> remains vulnerable both to a freshly trained <a href=\"#v9-vs-validation\">\"validation\" attack</a> and the <a href=\"#v9-vs-a9\">\"iterated\" attack</a> <code>a</code><sub><code>9</code></sub>. These attacks are described in the following sections. You can also explore games from <a href=\"/iterated-adversarial-training-per-iteration#contents\">intermediate steps of the iterated adversarial training</a>."
        ],
        "content": [
            {
                "title": "Validation attack",
                "dir_name": "v9-vs-validation",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/147E190062D1616F.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/DFEEA2847479F135.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/3E4580A2FB63FB7C.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/E832B6F3E9EB4AB8.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/E072045FBED6E55D.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/A9B48ACB4695A1F0.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/986D7E8D77E6C64D.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/ECC2FC288F065439.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/815D7DF9DF8D8A72.sgfs",
                        "line": 6
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/attack-h9/vary-victim-visits/1/sgfs/911BA3AD2AC30F34.sgfs",
                        "line": 8
                    }
                ],
                "max_games": 10,
                "adversary": "<code>validation-adversary</code>",
                "victim": "<code>v</code><sub><code>9</code></sub>, 512 visits",
                "description": [
                    "We trained a new adversary by fine-tuning from an early adversarial checkpoint. It was able to defeat <code>v</code><sub><code>9</code></sub> at 512 visits of search in 81% of games, but the win rate drops to 4% at 4096 visits. This demonstrates that our victim is easily attacked until it uses high amounts of search. Explore randomly sampled games below.",
                    "This adversary starts by inducing the victim to form bamboo joints: pairs of stone separated by two empty spaces. In normal games, these are often efficient shapes due to their strong connections. In the first game here, the first bamboo joint is formed on <a class='clickable' onclick='setMove(`v9-vs-validation`, 24)'>move 24</a> between that white stone, the one next to it, and the two below those. Additional joints are formed on <a class='clickable' onclick='setMove(`v9-vs-validation`, 28)'>move 28</a> and <a class='clickable' onclick='setMove(`v9-vs-validation`, 52)'>52</a>. By <a class='clickable' onclick='setMove(`v9-vs-validation`, 102)'>move 102</a>, a large cyclic group emerges, another hallmark of this adversary’s strategy. For over 100 moves, the adversary systematically encloses the cyclic group. Throughout, this adversary often leaves many stones \"in atari\" in Go terminology, what might be called hanging pieces in chess – stones that could be instantly captured if the victim opts to. At <a class='clickable' onclick='setMove(`v9-vs-validation`, 217)'>move 217</a>, the attack enters the final phase: the adversary threatens to split the bamboo joints. The victim connects at <a class='clickable' onclick='setMove(`v9-vs-validation`, 218)'>218</a> and <a class='clickable' onclick='setMove(`v9-vs-validation`, 220)'>220</a>, each move reducing the overall group’s liberties. A fatal mistake is committed at <a class='clickable' onclick='setMove(`v9-vs-validation`, 222)'>move 222</a>, allowing the adversary to capture everything with <a class='clickable' onclick='setMove(`v9-vs-validation`, 223)'>move 223</a>."
                ]
            },
            {
                "title": "Iterated attack",
                "dir_name": "v9-vs-a9",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/53AF1F092374B024.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/A94F7F5D055B966F.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/9086CD55B4C2AB55.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/09369F890E8F571A.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/919474FB7AAC68E1.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/C693F03DDB590297.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/CA5D94924BCB7614.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/835C6CBEB7B8A0D8.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/D3CA84C12B1833EE.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/B9EA07EF14A6252F.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 10,
                "adversary": "<code>a</code><code>9</code>",
                "victim": "<code>v</code><sub><code>9</code></sub>, 65536 visits",
                "description": [
                    "We fine-tune the final adversary <code>a</code><sub><code>8</code></sub> that <code>v</code><sub><code>9</code></sub> was trained against and produce an adversary <code>a</code><sub><code>9</code></sub>. This adversary defeats <code>v</code><sub><code>9</code></sub> even at 65536 visits in 42% of games, indicating a substantial attack surface area remains for <code>v</code><sub><code>9</code></sub> at high visit counts. Explore randomly sampled games below.",
                    "In the first game, on <a class='clickable' onclick='setMove(`v9-vs-a9`, 39)'>move 39</a>, we see the adversary complete a diamond, \"ponnuki\"-like shape of 4 stones in the center. This will become the center of the cyclic group, and is a distinctive shape of this adversary. In the subsequent moves, we see it play around that area, letting the victim separate off and surround the diamond. By <a class='clickable' onclick='setMove(`v9-vs-a9`, 80)'>move 80</a>, the cyclic part of the victim's group is completed. After that, the adversary slows down, letting the victim expand the cyclic group and only gradually surrounding it. Eventually, on <a class='clickable' onclick='setMove(`v9-vs-a9`, 193)'>move 193</a>, the adversary completes the encirclement. At this point the cyclic group is already lost, though the final capture takes place later on <a class='clickable' onclick='setMove(`v9-vs-a9`, 231)'>move 231</a>."
                ]
            }
        ]
    },
    "vit": {
        "title": "Vision transformer",
        "summary": "A new ViT Go AI model is still vulnerable to adversarial attacks.",
        "description": [
            "Cyclic attacks work not only against KataGo but also against a range of other superhuman Go AIs, including <a target=\"_blank\" href=\"https://online-go.com/game/51321265\">ELF OpenGo</a>, <a target=\"_blank\" href=\"https://online-go.com/game/51356405\">Leela Zero</a>, <a target=\"_blank\" href=\"https://online-go.com/game/51375020\">Sai</a>, <a target=\"_blank\" href=\"https://www.bilibili.com/video/BV1Ls4y147Es/?share_source=copy_web&t=97\">Golaxy</a>, and <a target=\"_blank\" href=\"https://h5.foxwq.com/txwqshare/index.html?chessid=1676910620010001365&boardsize=19\">FineArt</a>. While it is possible that each system has unique vulnerabilities to the cyclic attack, it seems more likely that shared properties cause their common vulnerability. One key shared property is that all systems use a convolutional neural network (CNN) backbone.",
            "To investigate whether CNNs are responsible for the vulnerability, we trained an AlphaZero-style Go AI with a vision transformer (ViT) backbone instead of a CNN. We estimate our ViT Go AI <code>ViT-victim</code> is just shy of superhuman performance at 32768 visits. Despite this, it remains vulnerable to the <a href=\"#vit-vs-base-adversary\">original cyclic attack</a> and consistently loses to a <a href=\"#vit-vs-vit-adversary\">fine-tuned variant</a> of the cyclic attack. This rules out CNN backbones as the root cause of the cyclic vulnerability.",
          "We validate the strength of our ViT model by playing against KataGo, playing against members of the public on KGS, and commissioning professional games. Our games against KataGo (<a target=\"_blank\" href=\"http://example.com/paper.pdf#subsection.F.1\">Appendix F.1</a>) give an estimated <a target=\"_blank\" href=\"https://www.goratings.org/en/\">goratings.org Elo</a> of 3877 at 32,768 visits, comparable to the strongest professional players. We also deployed the ViT bot <code>ViTKata001</code> on the KGS Go server, ranking as <a target=\"_blank\" href=\"https://www.gokgs.com/graphPage.jsp?user=ViTKata001\">one of the top players</a>, including <a target=\"_blank\" href=\"https://web.archive.org/web/20240521155255/https://www.gokgs.com/top100.jsp\">beating several KataGo bots</a>. Finally, our ViT bot won two out of three games commissioned against Go professionals.",
          "In particular, we commissioned the 7-dan professional <a target=\"_blank\" href=\"https://senseis.xmp.net/?YangYilun\">Yilun Yang</a> to play one game and the 4-dan professional <a target=\"_blank\" href=\"https://senseis.xmp.net/?RyanLi\">Ryan Li</a> play two games. Our ViT bot <a href=\"#vit-vs-yang\">beat Yilun Yang</a>. However, our ViT bot <a href=\"#vit-vs-li-flying-dagger\">lost the first game to Ryan Li</a> when it took a disadvantage early in a complicated corner pattern that has been a weakness of other Go AIs. The ViT bot then <a href=\"#vit-vs-li-rematch\">won the rematch</a> where Li agreed to avoid this pattern. This indicates the ViT model has some gaps but generally plays at a strong professional level. We discuss the games in more detail in the following sections."
        ],
        "content": [
            {
                "title": "Professional game: Yilun Yang",
                "dir_name": "vit-vs-yang",
                "paths": ["/shared/sgf-viewer-games/vit-vs-yang.sgf"],
                "max_games": 1,
                "adversary": "Yilun Yang",
                "victim": "<code>ViT-victim</code>, 65536 visits, 64 search threads",
                "description": [
                    "After a close early game between ViT (black) and Yang (white), a complicated fight develops on the left side and center, starting around <a class='clickable' onclick='setMove(`vit-vs-yang`, 52)'>move 52</a>. According to KataGo, this move would have been better as a cap two lines to the right of black's stone on the middle of the left side, or one line below the cap. If so, the game would remain even, even slightly advantageous for white. Also, black <a class='clickable' onclick='setMove(`vit-vs-yang`, 55)'>55</a> was a mistake and should have been the cut where white played <a class='clickable' onclick='setMove(`vit-vs-yang`, 56)'>56</a>; if now instead of connecting at <a class='clickable' onclick='setMove(`vit-vs-yang`, 56)'>56</a> white pressures black's stones above by playing one line above and to the left of the connection, white will again have a very slight advantage.",
                    "Nonetheless, after these moves the game remained close. The most deciding move was that White should have played <a class='clickable' onclick='setMove(`vit-vs-yang`, 65)'>65</a> directly below white's leftmost stone, to probe how black connects the two stones above. If black plays the best, empty triangle connection, then a complicated ko situation may develop but the game remains only marginally favored for black, whereas other connections will tilt the game in white's favor. But after <a class='clickable' onclick='setMove(`vit-vs-yang`, 67)'>67</a>, black threatens to cut off a stone with <a class='clickable' onclick='setMove(`vit-vs-yang`, 68)'>68</a>, and the timing to probe the connection on the left is lost. In the end, with <a class='clickable' onclick='setMove(`vit-vs-yang`, 92)'>92</a> white is able to live, but black's position on the outside is better and black has a decent advantage.",
                    "After that, some very slightly suboptimal moves on the lower side reinforced black's lead. Black <a class='clickable' onclick='setMove(`vit-vs-yang`, 107)'>107</a> was a mistake, as black should have played a diagonal move on the third line from the stone below it. But white's clamp at <a class='clickable' onclick='setMove(`vit-vs-yang`, 108)'>108</a> failed to punish it; white should have played the turn on the 3-4 point, though the game would still have been very hard. After this, there were essentially no opportunities for white to recover."
                ]
            },
            {
                "title": "Professional game: Ryan Li – opening corner pattern",
                "dir_name": "vit-vs-li-flying-dagger",
                "paths": ["/shared/sgf-viewer-games/vit-vs-li-0.sgf"],
                "max_games": 1,
                "adversary": "Ryan Li",
                "victim": "<code>ViT-victim</code>, 65536 visits, 64 search threads",
                "description": [
                    "Moves <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 8)'>8</a> through <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 12)'>12</a> from black (Li) initiate the <a target=\"_blank\" href=\"https://senseis.xmp.net/?FlyingKnifeJoseki\">\"flying dagger\"</a> joseki (opening corner pattern). This is a very complicated joseki that has been a known weakness of past AIs. KataGo trained on manually constructed positions to fix this weakness, which are not included in our training data. It appears this weakness emerged in our ViT system as well. Through <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 33)'>move 33</a>, white (ViT) plays some slight inaccuracies, leading to a small advantage for black. According to KataGo, <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 34)'>move 34</a> is a more substantial mistake; white should have captured black's single stone instead. <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 36)'>36</a> is also a mistake; white had several better options including the same capture. So is <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 38)'>38</a>, as white should have played one space below, or even better given up the left and played for the outside with a cap two spaces to the right of black's top stone on the left. After the left side of the board is stabilized with black <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 61)'>61</a>, black has a considerable advantage.",
                    "After this, white recovers slightly in the lower right, but black maintains a solid lead. At <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 104)'>104</a>, white again misses several better options. Through <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 130)'>130</a>, white captures four stones but loses the top right corner, which does not help white catch up. With <a class='clickable' onclick='setMove(`vit-vs-li-flying-dagger`, 134)'>134</a>, white attempts to live in black's area on the top part of the board, but black plays accurately and white dies, sealing the game."
                ]
            },
            {
                "title": "Professional game: Ryan Li – rematch",
                "dir_name": "vit-vs-li-rematch",
                "paths": ["/shared/sgf-viewer-games/vit-vs-li-1.sgf"],
                "max_games": 1,
                "adversary": "Ryan Li",
                "victim": "<code>ViT-victim</code>, 65536 visits, 64 search threads",
                "description": [
                    "After ViT's big loss in the flying dagger joseki in the preceding game, Li agreed to play a game where he would avoid that pattern. In this game, on <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 11)'>move 11</a>, black (ViT) offers a chance to initiate the flying dagger pattern, but white (Li) declines by playing at <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 12)'>12</a>, leading to a much less complicated pattern which is fairly balanced but very slightly worse than the flying dagger according to KataGo.",
                    "The game then remains balanced for many moves, with both sides playing well and fighting back and forth over narrow margins. On <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 71)'>move 71</a>, black should have continued in the top right but makes a significant mistake by playing on the bottom side. This allows white to guarantee the safety of the top right through <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 76)'>76</a>, giving a reasonable though not tremendous advantage. However, at <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 100)'>move 100</a>, white should have played at <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 102)'>102</a> directly; exchanging 100 for <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 101)'>101</a> lost some options, and the game becomes closer again. Still, white maintains the advantage.",
                    "Over the following moves, black gradually reduces white's advantage, and then on <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 118)'>move 118</a> white misses some opportunities on the lower side and center, making the game virtually even again. <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 131)'>Move 131</a> is a nice tesuji and the only way for black to save the corner cleanly. White begins to develop a small lead again step-by-step, but loses it with <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 152)'>152</a>, which misses the timing to reduce the center after black reinforces with <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 153)'>153</a>. Finally, <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 164)'>164</a> misses a chance to play a complicated sequence of reducing moves on the bottom and center. With <a class='clickable' onclick='setMove(`vit-vs-li-rematch`, 165)'>165</a>, black fixes the largest remaining gap in the center. Thus, after a long game where white was sometimes even and sometimes favored, black was able to close the game in the end."
                ]
            },
            {
                "title": "Original cyclic attack",
                "dir_name": "vit-vs-base-adversary",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/79A74F8CF1BBDAEC.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/381B76457CE87AD6.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/9CE5565A69FE9645.sgfs",
                        "line": 8
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/DE5762193920444D.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/717E91CA11E80106.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/9F4A7F8CFF8174CF.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/9C1FD8B63B8691DD.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/original-cyclic/3/sgfs/CBA1F16B36498E8A.sgfs",
                        "line": 3
                    }
                ],
                "max_games": 10,
                "adversary": "<code>base-adversary</code>",
                "victim": "<code>ViT-victim</code>, 512 visits",
                "description": [
                    "Our original cyclic adversary <code>base-adversary</code>, with no additional training, already beats our ViT Go model in 2.5% of games at 512 visits of search. Explore games below, sampled to be equally balanced between wins and losses. For a more detailed description of how this attack works, please see our <a href=\"/game-analysis#contents\">original results</a>."
                ]
            },
            {
                "title": "Fine-tuned cyclic attack",
                "dir_name": "vit-vs-vit-adversary",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/37D86C6B695F63C8.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/8BCE190982338B60.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/CAD4C0DAED91A51E.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/074849101B44B932.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/46C2879DA94D0D10.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/A53F05A7B6C17A09.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/DA3295A310114B0D.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/700DE5C22124458D.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/5B3F5521E58C2E3D.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/vit/attack-vit/vary-victim-visits/vit/attack-vit/sgfs/B482D8F109C2FA65.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 10,
                "adversary": "<code>ViT-adversary</code>",
                "victim": "<code>ViT-victim</code>, 65536 visits",
                "description": [
                    "We fine-tuned the cyclic adversary, resulting in an adversary that defeats our ViT model in 78% of games at 65536 visits of search. This confirms the ViT model fails to defend against cyclic attacks even at superhuman settings. Explore randomly sampled games below.",
                    "In the first game, the adversary stakes out the center on <a class='clickable' onclick='setMove(`vit-vs-vit-adversary`, 17)'>move 17</a>, for constructing its group inside the cyclic group, which is fully formed by <a class='clickable' onclick='setMove(`vit-vs-vit-adversary`, 49)'>move 49</a>. After that, the victim surrounds that central group, completing the cyclic group on <a class='clickable' onclick='setMove(`vit-vs-vit-adversary`, 248)'>move 248</a>, while the adversary surrounds it from the outside. This leads to a very dense board, with adversary stones positioned low around the edges, and the victim controlling a huge center, mostly filled by the cyclic group and its encirclement. This pattern is typical for this adversary. On <a class='clickable' onclick='setMove(`vit-vs-vit-adversary`, 255)'>move 255</a>, the victim captures the inside group, but after that the adversary reenters the space and establishes a new inside group. Although not universal, this behavior mirrors tactics also observed with the original cyclic adversary. Finally, at <a class='clickable' onclick='setMove(`vit-vs-vit-adversary`, 283)'>move 283</a>, the victim is doomed, and the cyclic group is taken off the board at <a class='clickable' onclick='setMove(`vit-vs-vit-adversary`, 335)'>move 335</a>."
                ]
            }
        ]
    },
    "iterated-adversarial-training-per-iteration": {
        "title": "Per-iteration adversarial training progress",
        "summary": "Games from each iteration of repeated adversarial training against the \"cyclic attack\"",
        "description": [
            "Here we show games from each iteration of our <a href=\"iterated-adversarial-training#contents\">iterated adversarial training</a> procedure. At each iteration, the victim <code>v</code><sub><code>n</code></sub> is generated by fine-tuning the previous victim <code>v</code><sub><code>n-1</code></sub> against the previous adversary <code>a</code><sub><code>n-1</code></sub>, and the adversary <code>a</code><sub><code>n</code></sub> is generated by fine-tuning the previous adversary <code>a</code><sub><code>n-1</code></sub> against the victim <code>v</code><sub><code>n</code></sub>. The initial victim <code>v</code><sub><code>0</code></sub> is KataGo network checkpoint <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>b40c256-s11840935168-d2898845681</code></a>, the network we attacked with our <a href=\"/adversarial-policy-katago#contents\">original cyclic adversary</a> (<code>base-adversary</code>). The initial adversary <code>a</code><sub><code>0</code></sub> is the original cyclic adversary."
        ],
        "content": [
                      {"title": "<code>a</code><sub><code>0</code></sub> vs. <code>v</code><sub><code>0</code></sub>", "dir_name": "per-iteration-v0-vs-a0", "max_games": 10, "adversary": "<code>a</code><sub><code>0</code></sub>", "victim": "<code>v</code><sub><code>0</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>0</code></sub>, <code>a</code><sub><code>0</code></sub> achieves win rates of 100% at 16 victim visits, 99% at 256 visits, and 99% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/4EFC9AA2D9C7BBF3.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/120525E2C90EF923.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/36FC2C0BA2BE872F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/2B4D01662058256D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/06E507C58720C382.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/C2559FD2B335D75C.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/E0F9037BDE204A4F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/89ADADC5A4A79AE1.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/99675C0351BC533D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/D9C5B54D86CC00F5.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>0</code></sub> vs. <code>v</code><sub><code>1</code></sub>", "dir_name": "per-iteration-v1-vs-a0", "max_games": 10, "adversary": "<code>a</code><sub><code>0</code></sub>", "victim": "<code>v</code><sub><code>1</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>1</code></sub>, <code>a</code><sub><code>0</code></sub> achieves win rates of 13% at 16 victim visits, 1% at 256 visits, and 1% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/7D78301BEA6333AA.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/2474F5856EC31BE3.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/3DCBC8CABD4E8252.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/489FC7EC6867A115.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/570608DD47F353DA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/614DD3FC98EE8559.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/C5DD72A0278C8764.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/3CD3983B5E602647.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/125E16287685A141.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/660A06CB5F4586FF.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>1</code></sub> vs. <code>v</code><sub><code>1</code></sub>", "dir_name": "per-iteration-v1-vs-a1", "max_games": 10, "adversary": "<code>a</code><sub><code>1</code></sub>", "victim": "<code>v</code><sub><code>1</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>1</code></sub>, <code>a</code><sub><code>1</code></sub> achieves win rates of 99% at 16 victim visits, 86% at 256 visits, and 69% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D63518155E4D1140.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/71687B09D260613B.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/11F1B41662712C77.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D63518155E4D1140.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/16672F73DA0F68E2.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/9E4CEBCD5782ABE3.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/7A3688D2F789BFE4.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/C349FBB9BD6BBC31.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/DC3B665FF5211B3E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/18E01F9BDFC8377B.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>1</code></sub> vs. <code>v</code><sub><code>2</code></sub>", "dir_name": "per-iteration-v2-vs-a1", "max_games": 10, "adversary": "<code>a</code><sub><code>1</code></sub>", "victim": "<code>v</code><sub><code>2</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>2</code></sub>, <code>a</code><sub><code>1</code></sub> achieves win rates of 34% at 16 victim visits, 4% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/C7E1C7A7D1C5B140.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/66D0C13A1C2B7BBF.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/1E2467A04CE8038A.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/A17C47986D2CDEB1.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/21450757B79878A8.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/BA011D6CB4EC06D9.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/6C3CDC24CBECED64.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D4B9DAC686223D30.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/6FD0ED35D4E3A4A5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D9D138B36F17451C.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>2</code></sub> vs. <code>v</code><sub><code>2</code></sub>", "dir_name": "per-iteration-v2-vs-a2", "max_games": 10, "adversary": "<code>a</code><sub><code>2</code></sub>", "victim": "<code>v</code><sub><code>2</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>2</code></sub>, <code>a</code><sub><code>2</code></sub> achieves win rates of 99% at 16 victim visits, 95% at 256 visits, and 56% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/3C253DDCFE49CC76.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/D65983A38D00CE96.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/CB7357DA460C0914.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/2A8EBF96ADCEE276.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C836858A5745095B.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/6A4045B62F99EC3F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/42521A9A57E51E0F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C873BBF301233778.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/75B9B93CD00FD5A9.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/B163BAAAAD8BBF1D.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>2</code></sub> vs. <code>v</code><sub><code>3</code></sub>", "dir_name": "per-iteration-v3-vs-a2", "max_games": 10, "adversary": "<code>a</code><sub><code>2</code></sub>", "victim": "<code>v</code><sub><code>3</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>3</code></sub>, <code>a</code><sub><code>2</code></sub> achieves win rates of 13% at 16 victim visits, 4% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/F99B14FA5BDBB889.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C2DA88684A584D10.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/8B16BAC7505DC435.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C6CC69A891F4AE86.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/1395E093D2BB70C5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/ABB6B0D3CD047D8E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/CCEA0157B7BFD07F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/0B92E6A880FA1707.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/9F3F1745CFB486E2.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/95F7DE08807ECCF2.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>3</code></sub> vs. <code>v</code><sub><code>3</code></sub>", "dir_name": "per-iteration-v3-vs-a3", "max_games": 10, "adversary": "<code>a</code><sub><code>3</code></sub>", "victim": "<code>v</code><sub><code>3</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>3</code></sub>, <code>a</code><sub><code>3</code></sub> achieves win rates of 88% at 16 victim visits, 67% at 256 visits, and 33% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/4A8BA13314F3BD06.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/2A68C28E6E1CB261.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/06BB05D37AA435D7.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/4010381120F0E862.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/4C684E9151545F8A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/CBFE473544B146BA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/7B67901F5927EBC7.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/3D3971386B000621.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/755DA350D823C095.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/1FF513DCC4F7EEA6.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>3</code></sub> vs. <code>v</code><sub><code>4</code></sub>", "dir_name": "per-iteration-v4-vs-a3", "max_games": 10, "adversary": "<code>a</code><sub><code>3</code></sub>", "victim": "<code>v</code><sub><code>4</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>4</code></sub>, <code>a</code><sub><code>3</code></sub> achieves win rates of 18% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/AF3E934303F371AB.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/B0C7824966C38E73.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/C29432193A55BD5A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/118C6DB7BB209AFB.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/7A95121ED6C6152D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/5B8C7B9F3555A5F8.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/7EC4B2DA130227BE.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/F0904010BBA7B60E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/A22B0FB32A7F55D6.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/43CB61A59B8AD3DF.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>4</code></sub> vs. <code>v</code><sub><code>4</code></sub>", "dir_name": "per-iteration-v4-vs-a4", "max_games": 10, "adversary": "<code>a</code><sub><code>4</code></sub>", "victim": "<code>v</code><sub><code>4</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>4</code></sub>, <code>a</code><sub><code>4</code></sub> achieves win rates of 94% at 16 victim visits, 54% at 256 visits, and 25% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/975176619F708512.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/6E20172C59705101.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/698F2F12B420C729.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/811602F8252040CF.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/ACA03E85C9494C17.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/E900A4A43C2B661A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/968929B396A48A79.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/371FCE52EEC92E4D.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/AA4480FF398F18BC.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/9B123218F7726421.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>4</code></sub> vs. <code>v</code><sub><code>5</code></sub>", "dir_name": "per-iteration-v5-vs-a4", "max_games": 10, "adversary": "<code>a</code><sub><code>4</code></sub>", "victim": "<code>v</code><sub><code>5</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>5</code></sub>, <code>a</code><sub><code>4</code></sub> achieves win rates of 9% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/8902EA8946B1D903.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/361C4B618D5A779F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/64ED904BCD12F606.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/EC296EDFBDCCF3FC.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/ED3723BAFA879816.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/A81E7443E64C77C1.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/D22DC3666EB317F5.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/7FB38088A53D1EC6.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/179E47EDD69F411D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/5A263C6B7B7D7108.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>5</code></sub> vs. <code>v</code><sub><code>5</code></sub>", "dir_name": "per-iteration-v5-vs-a5", "max_games": 10, "adversary": "<code>a</code><sub><code>5</code></sub>", "victim": "<code>v</code><sub><code>5</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>5</code></sub>, <code>a</code><sub><code>5</code></sub> achieves win rates of 51% at 16 victim visits, 3% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/8449E6E3D8E0064D.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/2FBC904E44EAA2F5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/15B06BD90C8708F0.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/3FA5F4309B78F7DB.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/1655A0824F75467A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/92AA0E0C9C967AD0.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/52674506FF770695.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/BFDD747EF84193E9.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/045576DEC85448AC.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/10ABF9E134278663.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>5</code></sub> vs. <code>v</code><sub><code>6</code></sub>", "dir_name": "per-iteration-v6-vs-a5", "max_games": 10, "adversary": "<code>a</code><sub><code>5</code></sub>", "victim": "<code>v</code><sub><code>6</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>6</code></sub>, <code>a</code><sub><code>5</code></sub> achieves win rates of 10% at 16 victim visits, 1% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/854A91C831D46EAF.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/01EB924FA172A87F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/81CE1CA4B86D26FD.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/39F28A8038CF6715.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/91BE1E6FBF145784.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/DF28E8B051148A62.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/10ABF9E134278663.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/12F174F1EB7E2502.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/AC806CAD8F6D93F2.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/9095BA007654132A.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>6</code></sub> vs. <code>v</code><sub><code>6</code></sub>", "dir_name": "per-iteration-v6-vs-a6", "max_games": 10, "adversary": "<code>a</code><sub><code>6</code></sub>", "victim": "<code>v</code><sub><code>6</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>6</code></sub>, <code>a</code><sub><code>6</code></sub> achieves win rates of 38% at 16 victim visits, 9% at 256 visits, and 2% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/AC36175C2191FBCA.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/C66E5B6B3A6B3DB5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/B64D41E277431F24.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/004364303ED13623.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/DCBEA80AE2F587D0.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/F6D046B08FFFED52.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/990DC98682B44418.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/704E290B30E68E94.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/113C791728B6BBFE.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/E1F032B289B08367.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>6</code></sub> vs. <code>v</code><sub><code>7</code></sub>", "dir_name": "per-iteration-v7-vs-a6", "max_games": 10, "adversary": "<code>a</code><sub><code>6</code></sub>", "victim": "<code>v</code><sub><code>7</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>7</code></sub>, <code>a</code><sub><code>6</code></sub> achieves win rates of 26% at 16 victim visits, 1% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/75B9E05F6102CD79.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/1DE63AF31CFD1E0F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/78E7367D97CF83CA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/8C7C5D12898876F6.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/30C37B70F1B4E599.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/90DA612F22605ABE.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/42A916C63EA9F461.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/AC36175C2191FBCA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/5F6B9EFE8AE46309.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/13EB4A4760B53C91.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>7</code></sub> vs. <code>v</code><sub><code>7</code></sub>", "dir_name": "per-iteration-v7-vs-a7", "max_games": 10, "adversary": "<code>a</code><sub><code>7</code></sub>", "victim": "<code>v</code><sub><code>7</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>7</code></sub>, <code>a</code><sub><code>7</code></sub> achieves win rates of 94% at 16 victim visits, 47% at 256 visits, and 32% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/EEAD801B974ACD44.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/C18E58F48A699859.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/DFF8797A7934B24C.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/AC3759864E30802F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/755B7066F607561B.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/E33BE112E04EC2E7.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/C4610A9A74C5C7D3.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/DCE49D2CF5A1D565.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/17EA08B6B670B600.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/78933D2A6C6DD8D3.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>7</code></sub> vs. <code>v</code><sub><code>8</code></sub>", "dir_name": "per-iteration-v8-vs-a7", "max_games": 10, "adversary": "<code>a</code><sub><code>7</code></sub>", "victim": "<code>v</code><sub><code>8</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>8</code></sub>, <code>a</code><sub><code>7</code></sub> achieves win rates of 16% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/AA5C6A09CED55F2E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/81AC786866DFF468.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/F7AADFDC00F814BD.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/17D8BF560B424A65.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/353E42637073CF2A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/93E6B769253FAABA.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/665FAB768F1E8D34.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/C8092255933CE7B4.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/9655A9589D998A5C.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/96577F41E45168FA.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>8</code></sub> vs. <code>v</code><sub><code>8</code></sub>", "dir_name": "per-iteration-v8-vs-a8", "max_games": 10, "adversary": "<code>a</code><sub><code>8</code></sub>", "victim": "<code>v</code><sub><code>8</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>8</code></sub>, <code>a</code><sub><code>8</code></sub> achieves win rates of 24% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/94B037B815C9CF77.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/426E5CFC0DE8463E.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/DC2874EDC3158EC6.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/42A6439671392090.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/7BF33252D12A04B8.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/270153DA7CD888FF.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/43876C2678B91E1F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/C7E2066E0F58B075.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/9D5780E0BC263C54.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/FBBF697588A7D95B.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>8</code></sub> vs. <code>v</code><sub><code>9</code></sub>", "dir_name": "per-iteration-v9-vs-a8", "max_games": 10, "adversary": "<code>a</code><sub><code>8</code></sub>", "victim": "<code>v</code><sub><code>9</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>9</code></sub>, <code>a</code><sub><code>8</code></sub> achieves win rates of 6% at 16 victim visits, 2% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/0AFBA7E0CF56F4BB.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/4956EEF3F4E7FD7C.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/3BCBB9546553B984.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/6CABCB9EB5262249.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/66FFB1641B453C8F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/E87F2294A5741C24.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/188135058732BD2D.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/4744FD269CBFE7F2.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/364E7286A7898B8A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/450B34335246FA63.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>9</code></sub> vs. <code>v</code><sub><code>9</code></sub>", "dir_name": "per-iteration-v9-vs-a9", "max_games": 10, "adversary": "<code>a</code><sub><code>9</code></sub>", "victim": "<code>v</code><sub><code>9</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>9</code></sub>, <code>a</code><sub><code>9</code></sub> achieves win rates of 99% at 16 victim visits, 94% at 256 visits, and 59% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/B87409AEEEF8285C.sgfs", "line": 4}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/8281F8C5F4220E15.sgfs", "line": 5}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/1FC27827ACB494C9.sgfs", "line": 21}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/4C6D9949429E752C.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/CEA58DB33732E9C6.sgfs", "line": 3}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/39AA9B9375BD153D.sgfs", "line": 5}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/4D0B2F5125B49CF1.sgfs", "line": 6}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/E17694C785D22632.sgfs", "line": 5}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/B9D610839FD4DABC.sgfs", "line": 12}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/C753CAA3A2DA2A2C.sgfs", "line": 1}]}
        ]
    }
}
