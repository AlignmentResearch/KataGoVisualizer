// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "adversarial-policy-katago": {
        "title": "Adversarially Exploiting KataGo",
        "description": [
            "We attack <a href=\"https://arxiv.org/abs/1902.10565\">KataGo</a>, a state-of-the-art Go AI system, by training an adversarial policy against a frozen KataGo victim. We achieve a &gt;99% win rate against a KataGo victim <a href=\"#no_search\">playing without search</a>, which is comparable in strength to a top-100 European Go player. We achieve a &gt;48% win rate against a victim playing with <a href=\"#64_visits\">64 visits</a>, which we estimate to have comparable strength to the best human Go players. Notably the games show that the adversarial policy does not win by playing a strong game of Go, but instead by tricking KataGo into ending the game prematurely at point favorable to the adversary. Indeed, our adversary is easily <a href=\"/human-evaluation#amateur_vs_adv\">beaten by a human amateur</a>, despite being able to exploit policies that usually match or surpass the performance of the best human Go players.",
            "All games are randomly selected unless otherwise specified. We attack the <a href=\"https://katagotraining.org/networks/\"><code>b40c256-s11840935168-d2898845681</code></a> network which we dub <code>Latest</code> since it is the latest confidently rated victim network at the time of writing. For more information, see our <a href=\"https://arxiv.org/abs/2211.00241\">paper</a> and <a href=\"https://github.com/HumanCompatibleAI/go_attack\">GitHub</a>."],
        "content": [
            {
                "title": "KataGo without search (level of top 100 European player)",
                "dir_name": "no_search",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/ttseng/go_attack/match/adv-checkpoints/33-extra/sgfs/2782FF00582288C8.sgfs",
                    "/nas/ucb/ttseng/go_attack/match/adv-checkpoints/33-extra/sgfs/2797913CD0AAD6C1.sgfs",
                    "/nas/ucb/ttseng/go_attack/match/adv-checkpoints/33-extra/sgfs/27A3CFF58C2E44BE.sgfs",
                    "/nas/ucb/ttseng/go_attack/match/adv-checkpoints/33-extra/sgfs/282923DD52BC6029.sgfs",
                    "/nas/ucb/ttseng/go_attack/match/adv-checkpoints/33-extra/sgfs/298DA53FEAF14D4B.sgfs",
                    "/nas/ucb/ttseng/go_attack/match/adv-checkpoints/33-extra/sgfs/2A02D8CCF5291DAB.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 600 visits",
                "victim": "Latest, no search",
                "description": [
                    "Even without search, Katago's <code>Latest</code> network plays at the <a href=\"https://arxiv.org/pdf/2211.00241.pdf#page=16\">strength of a top-100 European professional</a>. Yet our adversary achieves a 99% win rate against this victim by playing a counterintuitive strategy. The adversary stakes out a minority territory in the corner, allowing KataGo to stake the complement, and placing weak stones in KataGo’s stake.",
                    "KataGo predicts a high win probability for itself and, in a way, it’s right—it would be simple to capture most of the adversary’s stones in KataGo’s stake, achieving a decisive victory. However, KataGo plays a pass move before it has finished securing its territory, allowing the adversary to pass in turn and end the game. This results in a win for the adversary under the standard <a href=\"https://tromp.github.io/go.html\">Tromp-Taylor</a> ruleset for computer Go, as the adversary gets points for its corner territory (devoid of victim stones) whereas the victim does not receive points for its unsecured territory because of the presence of the adversary’s stones."
                ]
            },
            {
                "title": "KataGo with 64 visits (level of top world professionals)",
                "dir_name": "64_visits",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -l v=8192 * | head -n 10` in /nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs, see https://www.notion.so/chaiberkeley/match-cp505-64-vs-adv-1_to_8192-39e0e303cd3f45199f4ce638c92556a5 for experiment log",
                "paths": [
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/033FE05C5431ED13.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/048A6592BB515609.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/0FF3484FD5147146.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/14F7EEBACD86547C.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/16E93C54A1C3773E.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/187A346B3CC632E1.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/1CEF0F7800D4E196.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/1DF2F4ED5B859942.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/1EEA60F118BBB86C.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/2172599E22680D06.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 8192 visits",
                "victim": "Latest, 64 visits",
                "description": ["With 64 visits, KataGo's <code>Latest</code> network plays at the level of a  <a href=\"https://arxiv.org/pdf/2211.00241.pdf#page=17\">top-20 human professional</a>. We achieve a win rate of 48% against this victim simply by increasing the number of adversary visits to 8192. The adversary wins by the same qualitative strategy of staking out a corner, but plays significantly more stones in the victim's territory. The adversary loses when the victim plays the game out to the end, resulting in a very full board."]
            },
            {
                "title": "Hardened KataGo without search (level of top 100 European player)",
                "dir_name": "no_search_hardened",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505h-v1 * | shuf | head -n 6 | cut -f1,2 -d:` in /nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs/BEB88CB5DC883E28.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs/699C18B496BE1116.sgfs",
                        "line": 6
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs/BDEA7D5310AB3A4A.sgfs",
                        "line": 7
                    },
                    {   "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs/88F51AE755AD0B72.sgfs",
                        "line": 5
                    },
                    {   "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs/F23AA96ACE3D6889.sgfs",
                        "line": 8
                    },
                    {   "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-checkpoint-sweep-20221108/43-extra/sgfs/B510F069013F3D36.sgfs",
                        "line": 2
                    }
                ],
                "max_games": 10,
                "adversary": "349 million training steps, 600 visits",
                "victim": "Latest, no search, pass-alive defense",
                "description": ["We hardcode a defense for KataGo by making the victim not pass until it has no more legal moves outside its territory. With more training, we are able to find another attack against the victim, achieving a win rate of 98.9%. The adversary gets the victim to form a <a href=\"https://senseis.xmp.net/?Dragon\">dragon</a> and then kills it."]
            },
            {
                "title": "Hardened KataGo with 32 visits (level of top 250 world professional)",
                "dir_name": "32_visits_hardened",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -n cp505-v32 * | grep v8192 | shuf | head -n 12 | cut -f1,2 -d:` in /nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs",
                "paths_with_line_num": [
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/0C2F063568842B71.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/42263600CB454546.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/E318D7E225EA8B7C.sgfs",
                        "line": 5
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/361F2BB5A2A318AA.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/831BCBEC68B177F9.sgfs",
                        "line": 4
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/14CB8A31767E5004.sgfs",
                        "line": 9
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/B7D6357FEDFCF405.sgfs",
                        "line": 6
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/AA80F7E036798F19.sgfs",
                        "line": 7
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/2A01A2EA997969AC.sgfs",
                        "line": 3
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/852B0BDBEAC031C9.sgfs",
                        "line": 1
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/FEA0C28F2F450E4F.sgfs",
                        "line": 2
                    },
                    {
                        "path": "/nas/ucb/k8/go-attack/match/ttseng-hard-adv-v-sweep-v16-v32-20221109-102538/sgfs/C2B031C087437008.sgfs",
                        "line": 2
                    }
                ],
                "max_games": 12,
                "adversary": "349 million training steps, 8192 visits",
                "victim": "Latest, no search, pass-alive defense",
                "description": ["With 32 visits, KataGo's <code>Latest</code> network plays at the level of a top-250 human professional. After adding the hardcoded defense to the victim and boosting the number of adversary visits to 8192, we achieve a win rate of 28% against the victim."]
            }
        ]
    },
    "human-evaluation": {
        "title": "Human Evaluation",
        "content": [
            {
                "title": "Human amateur beats adversary",
                "dir_name": "amateur_vs_adv",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/josephmiller/tony-vs-adversary/sgfs/tony-black.sgfs",
                    "/nas/ucb/josephmiller/tony-vs-adversary/sgfs/tony-white.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 600 visits",
                "victim": "Tony Wang (Author)",
                "description": ["Our adversarial policy can easily be beaten by a huge margin even by a Go novice. Tony Wang, the first-author of this paper, wins by over 250 points despite having never studied Go prior to this research project. This confirms that our adversarial policy is not generally capable, despite it beating victim policies that can themselves beat top human professionals. Instead, our victim policy harbors a subtle vulnerability; in the <a href=\"#amateur_vs_victim\">next section</a>, we attempt to mimic the adversarial policy to exploit the victim."]
            },
            {
                "title": "Human amateur beats SOTA victim by mimicking adversarial policy",
                "dir_name": "amateur_vs_victim",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/josephmiller/tony-vs-victim/sgfs/tony-neuralz06.sgfs"
                ],
                "max_games": 10,
                "adversary": "Tony Wang (Author)",
                "victim": "NeuralZ06 (KataGo KGS bot playing without search)",
                "description": ["The same Go novice, Tony Wang, is able to exploit the top-50 KGS bot <code>NeuralZ06</code> by mimicking the behavior of our adversarial policy. The bot plays with checkpoint <code>b40c256-s11101799168-d2715431527</code> that is comparable to (but slightly weaker) than the <code>Latest</code> checkpoint. However, the bot has the <code>friendlyPassOk</code> flag enabled, which makes it easier to exploit—we have not been able to win manually against a bot with this disabled. This suggests that the easily mimicable high-level strategy of our adversarial policy explains a considerable part of the adversary's success, but by no means all of it.  We score the game under <a href=\"https://tromp.github.io/go.html\">Tromp-Taylor</a> rules as the rulesets supported by KGS cannot be automatically evaluated."]
            },
            {
                "title": "Human amateur beats adversary (hardened)",
                "dir_name": "amateur_vs_advh_349mil",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/tony/go-attack/manual-games/tony-def-dragonslayer-349mil.sgfs"
                ],
                "max_games": 10,
                "adversary": "349 million training steps, 600 visits",
                "victim": "Tony Wang (Author)",
                "description": ["The first-author of this paper (a Go novice) also managed to beat the adversary that was trained against our hardened victim, which had a pass-alive defense. The author was able to win with a small margin, demonstrating that this alternate version of our adversary is also not generally capable."]
            }
        ]
    }
}
