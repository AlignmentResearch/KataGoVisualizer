# Getting started

To run locally:
1. install `npm` on your machine
2. navigate to `KataGoVisualizer/sgf-viewer`
3. `npm install`
4. `npm run dev`

Recommended dev environment is VSCode with the official Svelte extension.

# Preparing Data

The text content of the site is determined by the `pages` object in `src/content.ts`.
This object also specifies the path of `sgf` files on the CHAI `nas` filesystem.
To automatically download the files to the correct locations in `public`,
run the script `prepare_data/prepare_data.py` (see the script for full instructions).

You will first need to `pip install -e go_attack_utils` from the root of the repository.

One tip to make downloading files faster is to piggyback
off an existing ssh connection to `dqn`.
To enable piggybacking you can add the following lines to your `.ssh/config`:
```
host *
  ControlMaster auto
  ControlPath ~/.ssh/ssh_mux_%h_%p_%r
```
See https://stackoverflow.com/a/20410383/1337463 for details.

### 'Jump to' menu
For pages with many sections with similar names, you can have a 'Jump to' menu instead of contents at the top.
To do this, add a `jump_to` object with two attributes to any `page` object in `src/content.ts`.
The first attribute is `base` which is the Title of each section with all the variable components replaced by VAR.
The second attribute is `vars` which is an array of arrays of strings. There should be one array for each `VAR`in `base`.

example:
```
"jump_to": {
"base": "VAR vs. VAR",
"vars": [
      ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
      ["cp39h, no search", "cp127h, no search", "Latest, no search", "Latest, 2048 visits"]
  ]
},
```