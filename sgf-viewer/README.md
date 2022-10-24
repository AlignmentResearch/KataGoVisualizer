# Getting started

To run locally:
1. install `npm` on your machine
2. navigate to `KataGoVisualizer/sgf-viewer`
3. `npm install`
4. `npm run dev`

Recommended dev environment is VSCode with the offcial Svelte extension.

# Preparing Data

The text content of the site is determined by the `pages` object in `src/content.ts`. This object also specifies the path of `sgf` files on the CHAI `nas` filesystem. To automatically download the files to the correct locations in `public`, run the script `prepare-data/prepare_data.py` (see the script for full instructions).
