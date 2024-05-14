// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "home": {
        "title": "Home",
        "description": [
            "We found <a target=\"_blank\" href=\"https://goattack.far.ai\">in previous work</a> that superhuman Go AIs such as <a target=\"_blank\" href=\"https://github.com/lightvector/KataGo\">KataGo</a> are vulnerable to opponents playing simple adversarial strategies. In particular, we trained an adversary <code>base-adversary</code> that defeats KataGo with a <a target=\"_blank\" href=\"https://goattack.far.ai/adversarial-policy-katago\">\"cyclic\" attack</a>. This showed that superhuman average-case capabilities may not lead to satisfactory worst-case robustness. Go AIs were never designed with security in mind, however, raising the question: can simple defenses make KataGo robust?",
            "We test three natural defenses: <a href=\"positional-adversarial-training#contents\">adversarial training on hand-constructed positions</a>, <a href=\"iterated-adversarial-training#contents\">iterated adversarial training</a>, and <a href=\"vit#contents\">changing the network architecture</a>. We find these methods provide a partial defense, but discover several qualitatively distinct adversarial strategies that continue to beat our defended agents. Our results suggest that achieving robustness is challenging even in narrow domains such as Go.",
          "Click on the different sections above to view attacks against each of the defenses."
        ],
        "content": []
    },
    "positional-adversarial-training": {
        "title": "Positional adversarial training",
        "description": [
            "In December 2022, KataGo's main training run began incorporating adversarial training against hand-written adversarial positions based on cyclic attacks. We attack the strongest KataGo network checkpoint from December 2023, <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>kata1-b18c384nbt-s8526915840-d3929217702</code></a>, which we dub <code>dec23-victim</code>."
        ],
        "content": [
            {
                "title": "Cyclic attack",
                "dir_name": "defense/dec23-vs-continuous",
                "_path_comment": "Computed by /shared/match/paper-robustness/katago-adversarial-training/continuous-adversary/vary-victim-visits/v8192/sample-sgfs.sh",
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
                "dir_name": "defense/dec23-vs-gift",
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
                "description": ["We also find a new non-cyclic attack, which we call the \"gift attack\", that defeats <code>dec23-victim</code> at 512 visits of search in 91% of games. In this attack, for no valid reason, the victim gifts the adversray two stones and needs to capture one back. However, the victim's recapture is blocked by <a target=\"_blank\" href=\"https://senseis.xmp.net/?PositionalSuperko\">positional superko</a> rules. The adversary sets this up to have the resurrection of one of its dead groups at stake, leading to a disaster for the victim. Although this attack does not scale up to high visits, it demonstrates that there are other unforeseen vulnerabilities in KataGo besides cyclic attacks."]
            },
            {
                "title": "Human replica of gift attack",
                "dir_name": "defense/dec23-vs-human-gift",
                "paths": ["/shared/match/paper-robustness/website-games/human-gift-vs-b18-v1.sgf"],
                "max_games": 10,
                "adversary": "Kellin Pelrine",
                "victim": "<code>dec23-victim</code>, 1 visit",
                "description": ["todo: description"]
            }
        ]
    },
    "iterated-adversarial-training": {
        "title": "Iterated adversarial training",
        "description": [
            "Perhaps we can create a fully robust agent by repeatedly defending against new attacks until the space of possible attacks is exhausted. We designed an iterated adversarial training procedure that alternately trains a victim and an adversary. After nine iterations, we still find that our final victim <code>v</code><sub><code>9</code></sub> is vulnerable to attack."
        ],
        "content": [
            {
                "title": "Validation attack",
                "dir_name": "defense/v9-vs-validation",
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
                    "We train an new adversary from scratch and find that it is able to defeat <code>v</code><sub><code>9</code></sub> at 512 visits of search in 81% of games. The win rate drops to 4% at 4096 visits, but the result still demonstrates that our victim is easily attacked until it uses high amounts of search."
                ]
            },
            {
                "title": "Iterated attack",
                "dir_name": "defense/v9-vs-a9",
                "paths_with_line_num": [
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/03F28E342701AE52.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/CD5DBA4F76D28FBF.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/E5953CE2249E9081.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/E6340579256B3120.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v65k/sgfs/EEEA3A054135D352.sgfs",
                        "line": 1
                    }
                ],
                "max_games": 10,
                "adversary": "<code>a</code><code>9</code>",
                "victim": "<code>v</code><sub><code>9</code></sub>, 65536 visits",
                "description": [
                    "We fine-tune the final adversary <code>a</code><sub><code>8</code></sub> that <code>v</code><sub><code>9</code></sub> was trained against and produce an adversary <code>a</code><sub><code>9</code></sub>. We find that this adversary is able to defeat <code>v</code><sub><code>9</code></sub> even at 65536 visits in XXX% of games, showing that there is still surface area to attack <code>v</code><sub><code>9</code></sub> at high visits."
                ]
            }
        ]
    },
    "vit": {
        "title": "Vision transformer",
        "description": [
            "Cyclic attacks work not only against KataGo but also against a range of other superhuman Go AIs, including <a target=\"_blank\" href=\"https://online-go.com/game/51321265\">ELF OpenGo</a>, <a target=\"_blank\" href=\"https://online-go.com/game/51356405\">Leela Zero</a>, <a target=\"_blank\" href=\"https://online-go.com/game/51375020\">Sai</a>, <a target=\"_blank\" href=\"https://www.bilibili.com/video/BV1Ls4y147Es/?share_source=copy_web&t=97\">Golaxy</a>, and <a target=\"_blank\" href=\"https://h5.foxwq.com/txwqshare/index.html?chessid=1676910620010001365&boardsize=19\">FineArt</a>. While it is possible that each of these systems is vulnerable to the cyclic attack for a different reason, it seems more likely that shared properties cause their shared vulnerability. We think two shared properties are the most relevant: AlphaZero-style self-play training and the convolutional neural network (CNN) backbone.",
            "We trained an AlphaZero-style Go AI with a vision transformer (ViT) backbone. We estimate our ViT Go AI <code>ViT-victim</code> to be superhuman at 32768 visits, yet it is still vulnerable to cyclic attacks. This rules out CNN backbones as the root cause of the cyclic vulnerability."
        ],
        "content": [
            {
                "title": "Original cyclic attack",
                "dir_name": "defense/vit-vs-base-adversary",
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
                    "Our original cyclic adversary <code>base-adversary</code> with no additional training already beats our ViT Go model in 2.5% of games at 512 visits of search."
                ]
            },
            {
                "title": "Fine-tuned cyclic attack",
                "dir_name": "defense/vit-vs-vit-adversary",
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
                    "We fine-tune the cyclic adversary to get an adversary that defeats our ViT model in 78% of games at 65536 visits of search, so the ViT model still fails defend against cyclic attacks when using superhuman settings."
                ]
            }
        ]
    },
    "iterated-adversarial-training-per-iteration": {
        "title": "Per-iteration adversarial training progress",
        "description": [
            "Here we show games from each iteration of our <a href=\"iterated-adversarial-training\">iterated adversarial training</a> procedure. At each iteration, the victim <code>v</code><sub><code>n</code></sub> is generated by fine-tuning the previous victim <code>v</code><sub><code>n-1</code></sub> against the previous adversary <code>a</code><sub><code>n-1</code></sub>, and the adversary <code>a</code><sub><code>n</code></sub> is generated by fine-tuning the previous adversary <code>a</code><sub><code>n-1</code></sub> against the victim <code>v</code><sub><code>n</code></sub>. The initial victim <code>v</code><sub><code>0</code></sub> is KataGo network checkpoint <a target=\"_blank\" href=\"https://katagotraining.org/networks/\"><code>b40c256-s11840935168-d2898845681</code></a>, the network we attacked with our <a target=\"_blank\" href=\"https://goattack.far.ai/adversarial-policy-katago\">original cyclic adversary</a> (<code>base-adversary</code>). The initial adversary <code>a</code><sub><code>0</code></sub> is the original cyclic adversary."
        ],
        "content": [
                      {"title": "<code>a</code><sub><code>0</code></sub> vs. <code>v</code><sub><code>0</code></sub>", "dir_name": "defense/per-iteration-v0-vs-a0", "max_games": 10, "adversary": "<code>a</code><sub><code>0</code></sub>", "victim": "<code>v</code><sub><code>0</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>0</code></sub>, <code>a</code><sub><code>0</code></sub> achieves win rates of 100% at 16 victim visits, 99% at 256 visits, and 99% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/4EFC9AA2D9C7BBF3.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/120525E2C90EF923.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/36FC2C0BA2BE872F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/2B4D01662058256D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/06E507C58720C382.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/C2559FD2B335D75C.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/E0F9037BDE204A4F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/89ADADC5A4A79AE1.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/99675C0351BC533D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/D9C5B54D86CC00F5.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>0</code></sub> vs. <code>v</code><sub><code>1</code></sub>", "dir_name": "defense/per-iteration-v1-vs-a0", "max_games": 10, "adversary": "<code>a</code><sub><code>0</code></sub>", "victim": "<code>v</code><sub><code>1</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>1</code></sub>, <code>a</code><sub><code>0</code></sub> achieves win rates of 13% at 16 victim visits, 1% at 256 visits, and 1% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/7D78301BEA6333AA.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/2474F5856EC31BE3.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/3DCBC8CABD4E8252.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/489FC7EC6867A115.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/570608DD47F353DA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/614DD3FC98EE8559.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/C5DD72A0278C8764.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/3CD3983B5E602647.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/125E16287685A141.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-0/sgfs/660A06CB5F4586FF.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>1</code></sub> vs. <code>v</code><sub><code>1</code></sub>", "dir_name": "defense/per-iteration-v1-vs-a1", "max_games": 10, "adversary": "<code>a</code><sub><code>1</code></sub>", "victim": "<code>v</code><sub><code>1</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>1</code></sub>, <code>a</code><sub><code>1</code></sub> achieves win rates of 99% at 16 victim visits, 86% at 256 visits, and 69% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D63518155E4D1140.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/71687B09D260613B.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/11F1B41662712C77.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D63518155E4D1140.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/16672F73DA0F68E2.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/9E4CEBCD5782ABE3.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/7A3688D2F789BFE4.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/C349FBB9BD6BBC31.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/DC3B665FF5211B3E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/18E01F9BDFC8377B.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>1</code></sub> vs. <code>v</code><sub><code>2</code></sub>", "dir_name": "defense/per-iteration-v2-vs-a1", "max_games": 10, "adversary": "<code>a</code><sub><code>1</code></sub>", "victim": "<code>v</code><sub><code>2</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>2</code></sub>, <code>a</code><sub><code>1</code></sub> achieves win rates of 34% at 16 victim visits, 4% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/C7E1C7A7D1C5B140.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/66D0C13A1C2B7BBF.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/1E2467A04CE8038A.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/A17C47986D2CDEB1.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/21450757B79878A8.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/BA011D6CB4EC06D9.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/6C3CDC24CBECED64.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D4B9DAC686223D30.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/6FD0ED35D4E3A4A5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-2/sgfs/D9D138B36F17451C.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>2</code></sub> vs. <code>v</code><sub><code>2</code></sub>", "dir_name": "defense/per-iteration-v2-vs-a2", "max_games": 10, "adversary": "<code>a</code><sub><code>2</code></sub>", "victim": "<code>v</code><sub><code>2</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>2</code></sub>, <code>a</code><sub><code>2</code></sub> achieves win rates of 99% at 16 victim visits, 95% at 256 visits, and 56% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/3C253DDCFE49CC76.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/D65983A38D00CE96.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/CB7357DA460C0914.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/2A8EBF96ADCEE276.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C836858A5745095B.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/6A4045B62F99EC3F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/42521A9A57E51E0F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C873BBF301233778.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/75B9B93CD00FD5A9.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/B163BAAAAD8BBF1D.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>2</code></sub> vs. <code>v</code><sub><code>3</code></sub>", "dir_name": "defense/per-iteration-v3-vs-a2", "max_games": 10, "adversary": "<code>a</code><sub><code>2</code></sub>", "victim": "<code>v</code><sub><code>3</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>3</code></sub>, <code>a</code><sub><code>2</code></sub> achieves win rates of 13% at 16 victim visits, 4% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/F99B14FA5BDBB889.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C2DA88684A584D10.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/8B16BAC7505DC435.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/C6CC69A891F4AE86.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/1395E093D2BB70C5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/ABB6B0D3CD047D8E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/CCEA0157B7BFD07F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/0B92E6A880FA1707.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/9F3F1745CFB486E2.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-4/sgfs/95F7DE08807ECCF2.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>3</code></sub> vs. <code>v</code><sub><code>3</code></sub>", "dir_name": "defense/per-iteration-v3-vs-a3", "max_games": 10, "adversary": "<code>a</code><sub><code>3</code></sub>", "victim": "<code>v</code><sub><code>3</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>3</code></sub>, <code>a</code><sub><code>3</code></sub> achieves win rates of 88% at 16 victim visits, 67% at 256 visits, and 33% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/4A8BA13314F3BD06.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/2A68C28E6E1CB261.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/06BB05D37AA435D7.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/4010381120F0E862.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/4C684E9151545F8A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/CBFE473544B146BA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/7B67901F5927EBC7.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/3D3971386B000621.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/755DA350D823C095.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/1FF513DCC4F7EEA6.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>3</code></sub> vs. <code>v</code><sub><code>4</code></sub>", "dir_name": "defense/per-iteration-v4-vs-a3", "max_games": 10, "adversary": "<code>a</code><sub><code>3</code></sub>", "victim": "<code>v</code><sub><code>4</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>4</code></sub>, <code>a</code><sub><code>3</code></sub> achieves win rates of 18% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/AF3E934303F371AB.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/B0C7824966C38E73.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/C29432193A55BD5A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/118C6DB7BB209AFB.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/7A95121ED6C6152D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/5B8C7B9F3555A5F8.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/7EC4B2DA130227BE.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/F0904010BBA7B60E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/A22B0FB32A7F55D6.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-6/sgfs/43CB61A59B8AD3DF.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>4</code></sub> vs. <code>v</code><sub><code>4</code></sub>", "dir_name": "defense/per-iteration-v4-vs-a4", "max_games": 10, "adversary": "<code>a</code><sub><code>4</code></sub>", "victim": "<code>v</code><sub><code>4</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>4</code></sub>, <code>a</code><sub><code>4</code></sub> achieves win rates of 94% at 16 victim visits, 54% at 256 visits, and 25% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/975176619F708512.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/6E20172C59705101.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/698F2F12B420C729.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/811602F8252040CF.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/ACA03E85C9494C17.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/E900A4A43C2B661A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/968929B396A48A79.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/371FCE52EEC92E4D.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/AA4480FF398F18BC.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-8/sgfs/9B123218F7726421.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>4</code></sub> vs. <code>v</code><sub><code>5</code></sub>", "dir_name": "defense/per-iteration-v5-vs-a4", "max_games": 10, "adversary": "<code>a</code><sub><code>4</code></sub>", "victim": "<code>v</code><sub><code>5</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>5</code></sub>, <code>a</code><sub><code>4</code></sub> achieves win rates of 9% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/8902EA8946B1D903.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/361C4B618D5A779F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/64ED904BCD12F606.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/EC296EDFBDCCF3FC.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/ED3723BAFA879816.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/A81E7443E64C77C1.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/D22DC3666EB317F5.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/7FB38088A53D1EC6.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/179E47EDD69F411D.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-9/sgfs/5A263C6B7B7D7108.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>5</code></sub> vs. <code>v</code><sub><code>5</code></sub>", "dir_name": "defense/per-iteration-v5-vs-a5", "max_games": 10, "adversary": "<code>a</code><sub><code>5</code></sub>", "victim": "<code>v</code><sub><code>5</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>5</code></sub>, <code>a</code><sub><code>5</code></sub> achieves win rates of 51% at 16 victim visits, 3% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/8449E6E3D8E0064D.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/2FBC904E44EAA2F5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/15B06BD90C8708F0.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/3FA5F4309B78F7DB.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/1655A0824F75467A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/92AA0E0C9C967AD0.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/52674506FF770695.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/BFDD747EF84193E9.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/045576DEC85448AC.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/10ABF9E134278663.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>5</code></sub> vs. <code>v</code><sub><code>6</code></sub>", "dir_name": "defense/per-iteration-v6-vs-a5", "max_games": 10, "adversary": "<code>a</code><sub><code>5</code></sub>", "victim": "<code>v</code><sub><code>6</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>6</code></sub>, <code>a</code><sub><code>5</code></sub> achieves win rates of 10% at 16 victim visits, 1% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/854A91C831D46EAF.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/01EB924FA172A87F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/81CE1CA4B86D26FD.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/39F28A8038CF6715.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/91BE1E6FBF145784.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/DF28E8B051148A62.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/10ABF9E134278663.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/12F174F1EB7E2502.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/AC806CAD8F6D93F2.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-11/sgfs/9095BA007654132A.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>6</code></sub> vs. <code>v</code><sub><code>6</code></sub>", "dir_name": "defense/per-iteration-v6-vs-a6", "max_games": 10, "adversary": "<code>a</code><sub><code>6</code></sub>", "victim": "<code>v</code><sub><code>6</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>6</code></sub>, <code>a</code><sub><code>6</code></sub> achieves win rates of 38% at 16 victim visits, 9% at 256 visits, and 2% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/AC36175C2191FBCA.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/C66E5B6B3A6B3DB5.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/B64D41E277431F24.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/004364303ED13623.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/DCBEA80AE2F587D0.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/F6D046B08FFFED52.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/990DC98682B44418.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/704E290B30E68E94.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/113C791728B6BBFE.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/E1F032B289B08367.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>6</code></sub> vs. <code>v</code><sub><code>7</code></sub>", "dir_name": "defense/per-iteration-v7-vs-a6", "max_games": 10, "adversary": "<code>a</code><sub><code>6</code></sub>", "victim": "<code>v</code><sub><code>7</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>7</code></sub>, <code>a</code><sub><code>6</code></sub> achieves win rates of 26% at 16 victim visits, 1% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/75B9E05F6102CD79.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/1DE63AF31CFD1E0F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/78E7367D97CF83CA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/8C7C5D12898876F6.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/30C37B70F1B4E599.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/90DA612F22605ABE.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/42A916C63EA9F461.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/AC36175C2191FBCA.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/5F6B9EFE8AE46309.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-13/sgfs/13EB4A4760B53C91.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>7</code></sub> vs. <code>v</code><sub><code>7</code></sub>", "dir_name": "defense/per-iteration-v7-vs-a7", "max_games": 10, "adversary": "<code>a</code><sub><code>7</code></sub>", "victim": "<code>v</code><sub><code>7</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>7</code></sub>, <code>a</code><sub><code>7</code></sub> achieves win rates of 94% at 16 victim visits, 47% at 256 visits, and 32% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/EEAD801B974ACD44.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/C18E58F48A699859.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/DFF8797A7934B24C.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/AC3759864E30802F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/755B7066F607561B.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/E33BE112E04EC2E7.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/C4610A9A74C5C7D3.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/DCE49D2CF5A1D565.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/17EA08B6B670B600.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/78933D2A6C6DD8D3.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>7</code></sub> vs. <code>v</code><sub><code>8</code></sub>", "dir_name": "defense/per-iteration-v8-vs-a7", "max_games": 10, "adversary": "<code>a</code><sub><code>7</code></sub>", "victim": "<code>v</code><sub><code>8</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>8</code></sub>, <code>a</code><sub><code>7</code></sub> achieves win rates of 16% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/AA5C6A09CED55F2E.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/81AC786866DFF468.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/F7AADFDC00F814BD.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/17D8BF560B424A65.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/353E42637073CF2A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/93E6B769253FAABA.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/665FAB768F1E8D34.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/C8092255933CE7B4.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/9655A9589D998A5C.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-15/sgfs/96577F41E45168FA.sgfs", "line": 1}]},
            {"title": "<code>a</code><sub><code>8</code></sub> vs. <code>v</code><sub><code>8</code></sub>", "dir_name": "defense/per-iteration-v8-vs-a8", "max_games": 10, "adversary": "<code>a</code><sub><code>8</code></sub>", "victim": "<code>v</code><sub><code>8</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>8</code></sub>, <code>a</code><sub><code>8</code></sub> achieves win rates of 24% at 16 victim visits, 0% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/94B037B815C9CF77.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/426E5CFC0DE8463E.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/DC2874EDC3158EC6.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/42A6439671392090.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/7BF33252D12A04B8.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/270153DA7CD888FF.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/43876C2678B91E1F.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/C7E2066E0F58B075.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/9D5780E0BC263C54.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/FBBF697588A7D95B.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>8</code></sub> vs. <code>v</code><sub><code>9</code></sub>", "dir_name": "defense/per-iteration-v9-vs-a8", "max_games": 10, "adversary": "<code>a</code><sub><code>8</code></sub>", "victim": "<code>v</code><sub><code>9</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>9</code></sub>, <code>a</code><sub><code>8</code></sub> achieves win rates of 6% at 16 victim visits, 2% at 256 visits, and 0% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/0AFBA7E0CF56F4BB.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/4956EEF3F4E7FD7C.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/3BCBB9546553B984.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/6CABCB9EB5262249.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/66FFB1641B453C8F.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/E87F2294A5741C24.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/188135058732BD2D.sgfs", "line": 1}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/4744FD269CBFE7F2.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/364E7286A7898B8A.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/job-v16-17/sgfs/450B34335246FA63.sgfs", "line": 2}]},
            {"title": "<code>a</code><sub><code>9</code></sub> vs. <code>v</code><sub><code>9</code></sub>", "dir_name": "defense/per-iteration-v9-vs-a9", "max_games": 10, "adversary": "<code>a</code><sub><code>9</code></sub>", "victim": "<code>v</code><sub><code>9</code></sub>, 16 visits", "description": ["Against victim <code>v</code><sub><code>9</code></sub>, <code>a</code><sub><code>9</code></sub> achieves win rates of 99% at 16 victim visits, 94% at 256 visits, and 59% at 4096 visits."], "paths_with_line_num": [{"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/B87409AEEEF8285C.sgfs", "line": 4}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/8281F8C5F4220E15.sgfs", "line": 5}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/1FC27827ACB494C9.sgfs", "line": 21}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/4C6D9949429E752C.sgfs", "line": 2}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/CEA58DB33732E9C6.sgfs", "line": 3}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/39AA9B9375BD153D.sgfs", "line": 5}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/4D0B2F5125B49CF1.sgfs", "line": 6}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/E17694C785D22632.sgfs", "line": 5}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/B9D610839FD4DABC.sgfs", "line": 12}, {"path": "/shared/match/paper-robustness/iterated-adversarial-training/rs-vs-hs/r9-vs-h9/v1-to-v4k/sgfs/C753CAA3A2DA2A2C.sgfs", "line": 1}]}
        ]
    }
}
