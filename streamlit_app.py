import streamlit as st
import pandas as pd
from pandas.api.types import is_numeric_dtype
import numpy as np
import game_info
import streamlit.components.v1 as components
import matplotlib.pyplot as plt
import urllib.request
from streamlit_ace import st_ace
# import multiprocessing

st.title('KataGo Attack Data Visualizer')

REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'
MAX_DISPLAY_ROWS = 10

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

# @st.experimental_memo
def load_and_parse_remote_file(url):
    if not url:
        return pd.DataFrame()
    data = urllib.request.urlopen(url)
    parsed_dicts = [game_info.parse_game_str_to_dict(line) for line in data]
    return pd.DataFrame(parsed_dicts)

# @st.experimental_memo
def load_and_parse_games(path):
    sgf_paths = game_info.find_sgf_files(path)
    parsed_dicts = game_info.read_and_parse_all_files(sgf_paths)
    return pd.DataFrame(parsed_dicts)

if data_source_type == REMOTE_DATA_SOURCE:
    df = load_and_parse_remote_file(data_source)
else:
    df = load_and_parse_games(data_source)

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
# Show first 1000 rows of df
st.dataframe(df.head(MAX_DISPLAY_ROWS))

st.subheader('Matplotlib figure')
content = st_ace(st.session_state.code, language='python',
                 placeholder='Return a figure object called \'fig\'.\nAccess the filtered data in a pandas dataframe called \'df\'.',
                 key='code')

fig = plt.figure()
ax = plt.axes()
exec(content)

st.pyplot(fig)

game_to_view_index = st.selectbox('Select a game to view:', list(df.head(MAX_DISPLAY_ROWS).index.values))
if game_to_view_index is not None:
    game_to_view_path = df.iloc[game_to_view_index]['sgf_path']
    game_to_view_line = df.iloc[game_to_view_index]['sgf_line']
    print('reading game:', game_to_view_path, game_to_view_line)
    with open(game_to_view_path, "r") as f:
        for i, line in enumerate(f):
            if i == game_to_view_line:
                game_to_view_str = line
                break
else:
    game_to_view_str = ''

component_string = f"""
    <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.min.js"></script>
    <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.player.min.js"></script>
    <link type="text/css" href="https://katago.s3.amazonaws.com/wgo.player.css" rel="stylesheet" />
    <div data-wgo="{game_to_view_str}" style="width: 700px">
      Sorry, your browser doesn't support WGo.js. Download SGF <a href="game.sgf">directly</a>.
    </div>
"""
components.html(component_string, height=600)

st.experimental_set_query_params(code=[content], data_source_type=data_source_type, data_source=data_source)
