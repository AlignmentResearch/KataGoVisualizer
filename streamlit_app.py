from typing import List

import streamlit as st
import pandas as pd
from pandas.api.types import is_numeric_dtype
import numpy as np

import game_info
import streamlit.components.v1 as components
# import os
import matplotlib.pyplot as plt
import urllib.request

from streamlit_ace import st_ace

st.title('KataGo Attack Data Visualizer')

DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
            'streamlit-demo-data/uber-raw-data-sep14.csv.gz')

GAME_DATA_ROOT_PATH = "/Users/user/Documents/FAR/go_attack/tests/testdata/victimplay-truncated"
GAME_DATA_ROOT_PATH = "/Users/user/Documents/FAR/selfplay/random/sgfs"
REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'

if 'code' not in st.session_state:
    st.session_state.code = st.experimental_get_query_params().get('code', [''])[0]
if 'data_source_type' not in st.session_state:
    st.session_state.data_source_type = st.experimental_get_query_params().get('data_source_type', [REMOTE_DATA_SOURCE])[0]
if 'data_source' not in st.session_state:
    st.session_state.data_source = st.experimental_get_query_params().get('data_source', [''])[0]


st.subheader('Data source')
col1, col2 = st.columns([3, 1])
data_source_type = col2.radio('Load data from', [REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE], key='data_source_type')
data_source = col1.text_input('URL' if data_source_type == REMOTE_DATA_SOURCE else 'Path', key='data_source')


@st.experimental_memo
def load_and_parse_remote_file(url):
    if not url:
        return [], pd.DataFrame()
    data = urllib.request.urlopen(url)
    raw_sgf_strs = [line.decode('utf-8') for line in data]
    game_infos: List[game_info.GameInfo] = [game_info.parse_game_info(game_str) for game_str in raw_sgf_strs]
    df = pd.DataFrame([gi.to_dict() for gi in game_infos])
    return raw_sgf_strs, df


@st.experimental_memo
def load_and_parse_games(path):
    sgf_paths = game_info.find_sgf_files(path)
    raw_sgf_strs = game_info.read_and_concat_all_files(sgf_paths)
    # Parse the SGF files and return a list of GameInfo objects
    # game_infos: List[game_info.GameInfo] = process_map(
    #     game_info.parse_game_info,
    #     raw_sgf_strs,
    #     max_workers=64,
    #     chunksize=50,
    # )
    game_infos: List[game_info.GameInfo] = [game_info.parse_game_info(game_str) for game_str in raw_sgf_strs]
    df = pd.DataFrame([gi.to_dict() for gi in game_infos])
    return raw_sgf_strs, df


if data_source_type == REMOTE_DATA_SOURCE:
    raw_sgf_strs, df = load_and_parse_remote_file(data_source)
else:
    raw_sgf_strs, df = load_and_parse_games(data_source)

st.subheader('Training games')
df_unfiltered_len = len(df.index)

# Iterate though each column of the dataframe
st.sidebar.subheader('Filters')
for col_name in df.columns:
    unique_values = df[col_name].drop_duplicates()
    if 1 < len(unique_values) < len(df.index):
        if is_numeric_dtype(df[col_name]) and df[col_name].dtype != 'bool':
            df_min, df_max = df[col_name].min().item(), df[col_name].max().item()
            slider_min, slider_max = st.sidebar.slider(col_name, min_value=df_min, max_value=df_max,
                                                       value=(df_min, df_max), key=col_name)
            df = df[df[col_name].between(slider_min, slider_max)]
        else:
            col_value_choices = st.sidebar.multiselect(col_name, unique_values, key=col_name)
            df = df if len(col_value_choices) < 1 else df[df[col_name].isin(col_value_choices)]

st.text(f'Showing {len(df.index)} of {df_unfiltered_len} games')
st.dataframe(df)

st.subheader('Matplotlib figure')
content = st_ace(st.session_state.code, language='python',
                 placeholder='Return a figure object called \'fig\'.\nAccess the filtered data in a pandas dataframe called \'df\'.',
                 key='code')

fig = plt.figure()
ax = plt.axes()
exec(content)

st.pyplot(fig)

game_to_view = st.selectbox('Select a game to view:', list(df.index.values))

# html_file_strings = []
# script_dir = os.path.dirname(__file__)
# for html_file in ['wgo/wgo.min.js', 'wgo/wgo.player.min.js', 'wgo/wgo.player.css']:
#     with open(os.path.join(script_dir, html_file)) as f:
#         html_file_strings.append(f.read())
# wgo_min_js, wgo_player_min_js, wgo_player_css = html_file_strings
# with open(os.path.join(script_dir, 'A.sgfs')) as f:
#     sgf_file_string = f.read()
# component_string = f"""
#     <script>
#         {wgo_min_js}
#     </script>
#     <script>
#         {wgo_player_min_js}
#     </script>
#     <style>
#         {wgo_player_css}
#     </style>
#     <div data-wgo="{raw_sgf_strs[game_to_view]}" style="width: 700px">
#       Sorry, your browser doesn't support WGo.js. Download SGF <a href="game.sgf">directly</a>.
#     </div>
# """

component_string = f"""
    <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.min.js"></script>
    <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.player.min.js"></script>
    <link type="text/css" href="https://katago.s3.amazonaws.com/wgo.player.css" rel="stylesheet" />
    <div data-wgo="{raw_sgf_strs[game_to_view] if game_to_view is not None else ''}" style="width: 700px">
      Sorry, your browser doesn't support WGo.js. Download SGF <a href="game.sgf">directly</a>.
    </div>
"""
components.html(component_string, height=600)

st.experimental_set_query_params(code=[content], data_source_type=data_source_type, data_source=data_source)
