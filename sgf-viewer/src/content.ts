// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "successful-attack": {
        "title": "Successful Attack",
        "content": [
            {
                "title": ">99% Win Rate against KataGo without search",
                "dir_name": "99_win_rate",
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
                "description": "The adversarial policy beats the KataGo victim by playing a counterintuitive strategy: staking out a minority territory in the corner, allowing KataGo to stake the complement, and placing weak stones in KataGo’s stake. KataGo predicts a high win probability for itself and, in a way, it’s right—it would be simple to capture most of the adversary’s stones in KataGo’s stake, achieving a decisive victory. However, KataGo plays a pass move before it has finished securing its territory, allowing the adversary to pass in turn and end the game. This results in a win for the adversary under the standard ruleset for computer Go, Tromp-Taylor (Tromp, 2014), as the adversary gets points for its corner territory (devoid of victim stones) whereas the victim does not receive points for its unsecured territory because of the presence of the adversary’s stones. These games are randomly selected from an attack against Latest, the strongest policy network, playing without search."
            },
            {
                "title": "Adversarial Policy vs Latest with 32 visits",
                "dir_name": "32_visits",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/DA020F2D291799D3.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/461C2E139DEAD2FE.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/330C511928DDC842.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/EDF3AFF6EA3A0FF6.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/DBCE9ECDF5323510.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/8BAA34B9EE0FF756.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-ov1/sgfs/59222A59B39BF0B7.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 200 visits",
                "victim": "Latest (cp505-v1-MCTS), 32 visits",
                "description": "We find the win rate of A-MCTS-S drops to 80% at 32 visits. However, A-MCTS-S models the victim as having no search at both training and inference time."
            },
            {
                "title": "Full Victim modelling",
                "description": "We also test A-MCTS-R, which correctly models the victim at inference by performing an MCTS search at each victim node in the adversary’s tree. We find that A-MCTS-R performs somewhat better, obtaining a greater than 99% win rate against Latest with 32 visits, but performance drops below 10% at 128 visits.",
                "dir_name": "perfect_victim_model",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/tony/go-attack/matches/cp505-perfect-victim-modeling/sgfs/0AA3E7EE34CD544E.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-perfect-victim-modeling/sgfs/9E23FEA7FB435CE1.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-perfect-victim-modeling/sgfs/272613CA16B650E4.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-perfect-victim-modeling/sgfs/48A5FBA06D3A7141.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-perfect-victim-modeling/sgfs/417BA5EE45D1AB51.sgfs",
                    "/nas/ucb/tony/go-attack/matches/cp505-perfect-victim-modeling/sgfs/1F9951389ECDA295.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, perfect victim modeling, 200 visits",
                "victim": "Latest (cp505-v1-MCTS), 32 visits"
            }
        ]
    },
    "human-attack": {
        "title": "Human Attack",
        "content": [
            {
                "title": "Human ameteur vs Adversary",
                "dir_name": "ameteur_vs_adv",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
                    "/nas/ucb/josephmiller/tony-vs-adversary/sgfs/tony-black.sgfs",
                    "/nas/ucb/josephmiller/tony-vs-adversary/sgfs/tony-white.sgfs"
                ],
                "max_games": 10,
                "adversary": "34.1 million training steps, 600 visits",
                "victim": "Author",
                "description": "The adversarial policy is easily beaten by a human ameteur (an author of this paper), demonstrating the non-transitivity of the policy."
            }
        ]
    }
}