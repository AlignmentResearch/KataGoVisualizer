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
                "title": "Human replication of cyclic attack",
                "dir_name": "dec23-vs-human-cyclic",
                "paths": ["/shared/sgf-viewer-games/b18-v512-vs-human-cyclic.sgf"],
                "max_games": 1,
                "adversary": "Kellin Pelrine (author)",
                "victim": "<code>dec23-victim</code>, 512 visits",
                "description": [
                    "TODO kellin"
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
                    "Nonetheless, after these moves the game remained close. The most deciding move was that White should have played <a class='clickable' onclick='setMove(`vit-vs-yang`, 66)'>66</a> directly below white's leftmost stone, to probe how black connects the two stones above. If black plays the best, empty triangle connection, then a complicated ko situation may develop but the game remains only marginally favored for black, whereas other connections will tilt the game in white's favor. But after <a class='clickable' onclick='setMove(`vit-vs-yang`, 66)'>66</a> in the game, black threatens to cut off a stone with <a class='clickable' onclick='setMove(`vit-vs-yang`, 67)'>67</a>, and the timing to probe the connection on the left is lost. In the end, with <a class='clickable' onclick='setMove(`vit-vs-yang`, 92)'>92</a> white is able to live, but black's position on the outside is better and black has a decent advantage.",
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
            },
            {
                "title": "Human replication of cyclic attack",
                "dir_name": "vit-vs-human-cyclic",
                "paths": ["/shared/sgf-viewer-games/vit-vs-human-cyclic.sgf"],
                "max_games": 1,
                "adversary": "Kellin Pelrine (author)",
                "victim": "<code>ViT-victim</code>, 65536 visits, 64 search threads",
                "description": [
                    "A Go expert (Kellin Pelrine) was also able to use a cyclic attack to beat our ViT-victim. The game is shown below. Through <a class='clickable' onclick='setMove(`vit-vs-human-cyclic`, 56)'>move 56</a>, White (Kellin) sets up a loosely surrounded square group destined to be the inside of the cyclic group. This follows the shape used in some of the wins of our original cyclic adversary against this victim. In subsequent moves, white gradually surrounds the cyclic group, with a particular focus on making sure the surrounding groups have lots of liberties so that black will have to see its group is in danger early on to save it. Beginning around <a class='clickable' onclick='setMove(`vit-vs-human-cyclic`, 176)'>move 176</a>, white fills in the cyclic group's liberties, as well as pressing black to make the last connections that complete the cyclic shape. Finally, after <a class='clickable' onclick='setMove(`vit-vs-human-cyclic`, 208)'>208</a>, black's fate is sealed. Black plays on several more moves hoping for white to make a mistake, but ultimately resigns."
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
