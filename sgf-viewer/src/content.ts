// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "home": {
        "title": "Home",
        "description": [
            "<a target=\"_blank\" href=\"https://goattack.far.ai\">In previous work</a>, we found that superhuman Go AIs such as <a target=\"_blank\" href=\"https://github.com/lightvector/KataGo\">KataGo</a> are vulnerable to opponents playing simple adversarial strategies. In particular, we trained a adversary <code>base-adversary</code> that defeats KataGo with <a target=\"_blank\" href=\"https://goattack.far.ai/adversarial-policy-katago\">\"cyclic attacks\"</a>. This shows that superhuman average-case capabilities may not lead to satisfactory worst-case robustness. Go AIs were never designed with security in mind, however, raising the question: can simple defenses make KataGo robust?",
            "We test three natural defenses: adversarial training on hand-constructed positions, iterated adversarial training, and changing the network architecture. We find these methods provide a partial defense, but discover several qualitatively distinct adversarial strategies that continue to beat our defended agents. Our results suggest that achieving robustness is challenging even in narrow domains such as Go.",
          "Click on the different sections above to view attacks against each of the defenses."
        ],
        "content": []
    },
    "postional-adversarial-training": {
        "title": "Positional adversarial training",
        "description": [
            "In December 2022, KataGo's main training run began incorporating adversarial training against hand-written adversarial positions based on cyclic attacks. We attack the strongest KataGo network checkpoint from December 2023, <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>kata1-b18c384nbt-s8526915840-d3929217702</code></a>, which we dub <code>dec23-victim</code>."
        ],
        "content": [
            {
                "title": "Cyclic attack",
                "dir_name": "dec23-vs-continuous",
                "_path_comment": "Computed by /shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/sample-sgfs.sh",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/5A01DD4E71A5BBBF.sgfs",
                        "line": 8
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/A45BDE3B9D8964E7.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/A85188F8DEC98C13.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/0FA7A93030D755E0.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/A64B2F59F89A63A3.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/A45BDE3B9D8964E7.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/4A392658A2002C3C.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/C555DF5A8DFDD757.sgfs",
                        "line": 8
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/5E84E6C038439BA5.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sgfs/9689E59C2BE93D63.sgfs",
                        "line": 4
                    }
                ],
                "max_games": 10,
                "adversary": "<code>continuous-adversary</code>",
                "victim": "<code>dec23-victim</code>, 8192 visits",
                "description": [
                    "We are able to fine-tune a cyclic adversary to defeat <code>dec23-victim</code> at 8192 visits of search with a 62% win rate, showing that KataGo's adversarial training is not sufficient to defend against cyclic attacks."
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
                "description": ["We also find a new non-cyclic attack, which we call the \"gift attack\", that defeats <code>dec23-victim</code> at 512 visits of search in 91% of games. In this attack, for no valid reason, the victim gifts the adversray two stones and needs to capture one back. However, the victims recapture is blocked by positional superko rules. The adversary sets this up to have the resurrection of one of its dead groups at stake, leading to a disaster for the victim. Although this attack does not scale up to high visits, it demonstrates that there are other unforeseen vulnerabilities in KataGo besides cyclic attacks."]
            }
        ]
    }
}
