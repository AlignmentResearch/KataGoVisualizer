# Getting started

To run locally:
1. install `npm` on your machine
2. navigate to `KataGoVisualizer/sgf-viewer`
3. `npm install`
4. `npm run dev`

Recommended dev environment is VSCode with the official Svelte extension.

# Preparing Data

The text content of the site is determined by the `pages` object in `src/content.ts`.
This object also specifies the path of `sgf` files on the `go-attack` volume of
the `u-tom` namespace in Flamingo. The volume is assumed to be mounted at
`/shared`. To download the files to the correct locations in `public`, run the
script `prepare_data/prepare_data.py` from a devbox with the `go-attack` volume
mounted.

You will first need to `pip install -e go_attack_utils` from the root of the repository.
