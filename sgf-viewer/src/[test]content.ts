// Careful! This file is read by prepare-data/prepare_data.py.
// Line 4 onwards should be valid JSON.
export const pages: object =
{
    "human-attack": {
        "title": "Human Attack",
        "content": [
            {
                "title": "Human ameteur vs Adversary",
                "dir_name": "tony_vs_adv",
                "server": "dqn.ist.berkeley.edu",
                "paths": [
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