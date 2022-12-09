
# KataGo Visualizer

This repo contains visualization tools for the paper ['Adversarial Policies Beat Professional-Level Go AIs'](https://goattack.alignmentfund.org/pdfs/go_attack_paper.pdf) ([website](https://goattack.alignmentfund.org/))


## Contents

 ### [go_attack_utils](go_attack_utils)
 Python package containing general tools used throughout the repo, in particular the code to parse sgf files.

 ### [notebooks](notebooks)
 Python notebooks used to produce figures for the paper.

 ### [sgf-viewer](sgf-viewer)
 Source for the [website](https://goattack.alignmentfund.org/) that accompanies the paper.

 ### [streamlit_app](streamlit_app)
 Source for a data visualization web app used internally to help with research and monitoring training runs.

## Directory Structure
```
KataGoVisualizer/
├── .circleci/
├── Dockerfile
├── go_attack_utils/
│   ├── src/
│   │   └── sgf_parser/
│   │       └── game_info.py
│   └── setup.py
├── notebooks/
│   ├── .devcontainer/
│   ├── notebooks/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── requirements.txt
├── sgf-viewer/
│   ├── prepare_data/
│   │   └── prepare_data.py
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.svelte
│   │   └── content.ts
│   ├── index.html
│   └── package.json
└── streamlit_app/
    ├── Pipfile
    ├── Pipfile.lock
    ├── requirements.txt
    ├── parsing_server.py
    ├── streamlit_app.py
    ├── tests/
    └── components/
        └── subcomponents/
```
[Generated here](https://tree.nathanfriend.io/?s=(%27optiHs!(%27fancy!true~fullPath!false~trailingSlash!true~rootDot!false)~F(%27F%27KataGoVisualiz83.circleci%2F3O3go_attack_utilsIsgf_pars8200game_infoBsetup.py3C.devcHtain82CO*dE8-Nose.yml53sgf-view827*07BpublicI420App.svelte*0cHtL.ts*index.html*package.jsH36MM.lE5*parsing_s8v8B6Btests24*0sub4%2F%27)~v8siH!%271%27)*300%20%202%2F*3%5Cn04NHLs5*JquiJmLs.txt6stJamlit_app7pJpaJ_data8er9fileB.py*Cnotebooks2EockFsource!HonI2src20JreLentM*Pip9NcompODE89%01ONMLJIHFECB987654320*)
