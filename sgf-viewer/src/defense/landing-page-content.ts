export const title: string[] = ["The challenges of training", "adversarially robust Go AIs"];

export const authors: [string, string[], string | undefined][] = [
    ["Tom Tseng", ["far"]],
    ["Kellin Pelrine", ["far", "mila"]],
    ["Euan McLean", ["far"]],
    ["Tony Wang", ["mit"], "*"],
    ["Adam Gleave", ["far"], "*"],
];

export const cards: Array<any> =
[
    {
        image: "/images/go-defense-paper.svg",
        imageName: "arxiv",
        description: "Paper",
        url: "https://www.overleaf.com/project/654eac3d52dffeb1a092ab18",
        color: "rgb(0,0,0,0.5)",
        border: true,
    },
    {
        image: "/images/far-logo.png",
        imageName: "blog",
        description: "Blog",
        url: "https://docs.google.com/document/d/1wcLUZLXejtuCHNCSPFfDVM0peLmV85046dmYsPeYhw4/edit",
        color: "rgb(70,205,206,0.5)",
        border: false,
    },
    {
        image: "/images/github-mark.svg",
        imageName: "github",
        description: "GitHub",
        url: "https://github.com/AlignmentResearch/go_attack",
        color: "rgb(36,41,46,0.5)",
        border: false,
    }
];

export const citation: string = `@misc{tseng2024challenges,
  title={The challenges of training adversarially robust Go AIs},
  author={Tseng, Tom and Pelrine, Kellin and McLean, Euan and Wang, Tony T. and Gleave, Adam},
  year={2024},
  eprint={2405.NNNNN},
  archivePrefix={arXiv},
  primaryClass={cs.LG}
}`;
