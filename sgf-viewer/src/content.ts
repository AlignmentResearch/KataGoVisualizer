// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "successful-attack": {
        "title": "Successful Attack",
        "description": "We attack <a href=\"https://arxiv.org/abs/1902.10565\">KataGo</a>, a state-of-the-art Go AI system, by training an adversarial policy against a frozen KataGo victim. We achieve a &gt;99% win rate against a KataGo victim <a href=\"#no_search\">playing without search</a>, which is comparable in strength to a top-100 European Go player. We achieve an &gt;80% win rate against a victim playing with <a href=\"#64_search\">64 visits</a>, which we estimate to have comparable strength to the best human Go players. Notably the games show that the adversarial policy does not win by playing a strong game of Go, but instead by tricking KataGo into ending the game prematurely at point favorable to the adversary. Indeed, our adversary is easily <a href=\"/human-attack#beats_adversary\">beaten by a human amateur</a>, despite being able to exploit policies that usually match or surpass the performance of the best human Go players. All games are randomly selected unless otherwise specified. For more information, see our <a href=\"TODO\">paper</a> and <a href=\"https://github.com/HumanCompatibleAI/go_attack\">GitHub</a>.",
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
                "victim": "Latest (cp505-v1-MCTS), no search",
                "description": [
                    "We start by attacking the strongest KataGo victim network playing without search, which is around the strength of a top-100 European professional. Our adversary achieves a 99% win rate against this victim by playing a counterintuitive strategy. We stake out a minority territory in the corner, allowing KataGo to stake the complement, and placing weak stones in KataGo’s stake.",
                    "KataGo predicts a high win probability for itself and, in a way, it’s right—it would be simple to capture most of the adversary’s stones in KataGo’s stake, achieving a decisive victory. However, KataGo plays a pass move before it has finished securing its territory, allowing the adversary to pass in turn and end the game. This results in a win for the adversary under the standard <a href=\"https://tromp.github.io/go.html\">Tromp-Taylor</a> ruleset for computer Go, as the adversary gets points for its corner territory (devoid of victim stones) whereas the victim does not receive points for its unsecured territory because of the presence of the adversary’s stones."
                ]
            },
            {
                "title": "KataGo with 64 visits (level of top world professionals)",
                "dir_name": "64_visits",
                "server": "dqn.ist.berkeley.edu",
                "_path_comment": "Computed by `grep -l v=1024 * | head -n 10` in /nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs, see https://www.notion.so/chaiberkeley/match-cp505-64-vs-adv-1_to_8192-39e0e303cd3f45199f4ce638c92556a5 for experiment log",
                "paths_8192": [
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
                "paths": [
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/00FB73C086F202A1.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/00909067ADE53F5A.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/02B74D9148F158A4.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/02BFDE5F2ABA9C17.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/02EC7837398A88A5.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/0BDC4333B1246AA1.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/0EB3ADD4EAD8FE3F.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/1F2744213F4A1059.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/2132D23369A7A7FF.sgfs",
                     "/nas/ucb/tony/go-attack/matches/cp505-v64-vs-adv-1-to-8192/sgfs/219DBF949E5229CB.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 200 visits",
                "victim": "Latest (cp505-v1-MCTS), 64 visits",
                "description": ["We attack KataGo searching for 64 visits, at which point it plays at the level of one of the top human professionals in the world. We achieve a win rate of 80% against this victim, by increasing the number of adversary visits to 1,024. The adversary wins by the same qualitative strategy of staking out a corner, but plays significantly more stones in the victim's territory. The adversary loses when the victim plays the game out to the end, resulting in a very full board."]
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
                "description": ["The adversarial policy is beaten by a huge margin by a Go novice, Tony Wang (first-author of this paper). This confirms that our adversarial policy is not generally capable, despite it beating victim policies that can themselves beat top human professionals. Instead, our victim policy harbors a subtle vulnerability; in the <a href=\"#amateur_vs_victim\">next section</a>, we attempt to mimic the adversarial policy to beat the victim."]
            },
            {
                "title": "Human amateur beats SOTA victim by mimicking adversarial policy",
                "dir_name": "amateur_vs_victim",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/josephmiller/tony-vs-victim/sgfs/tony-neuralz06.sgfs",
                ],
                "max_games": 10,
                "adversary": "Tony Wang (Author)",
                "victim": "NeuralZ06 (KataGo KGS bot playing without search)",
                "description": ["A Go novice, Tony Wang (first-author of this paper), is able to exploit the top-50 KGS bot <code>NeuralZ06</code> by mimicking the behavior of the adversarial policy. The bot plays with checkpoint <code>b40c256-s11101799168-d2715431527</code> that is comparable to (but slightly weaker) than the <code>Latest</code> checkpoint. However, the bot had the <code>friendlyPassOk</code> flag enabled, which makes it easier to exploit—we have not been able to win manually against a bot with this disabled. This suggests that the easily mimicable high-level strategy of our adversarial policy explains a considerable part, but by no means all, of the adversary's success."]
            }
        ]
    }
}