import os
from typing import final
import streamlit as st
import pandas as pd
import numpy as np
from pandas.api.types import is_numeric_dtype
import streamlit.components.v1 as components
import matplotlib.pyplot as plt
from streamlit_ace import st_ace
from st_aggrid import AgGrid, GridOptionsBuilder 
from st_aggrid.shared import GridUpdateMode
from multiprocessing.connection import Client
from directory_picker import st_directory_picker
from pathlib import Path
from urllib.parse import unquote, urlencode
import pickle
import codecs
from dtale.views import startup

st.set_page_config(layout="wide")
st.title('KataGo Attack Data Visualizer')


REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'
MAX_DISPLAY_ROWS = 100

if 'code' not in st.session_state:
    st.session_state.code = st.experimental_get_query_params().get('code', [''])[0]
if 'data_source_type' not in st.session_state:
    st.session_state.data_source_type = st.experimental_get_query_params().get('data_source_type', [REMOTE_DATA_SOURCE])[0]
if 'data_url' not in st.session_state:
    st.session_state.data_url = st.experimental_get_query_params().get('data_url', [''])[0]
if 'data_source' not in st.session_state:
    st.session_state.data_source = st.experimental_get_query_params().get('data_source', [''])[0]
if 'column_state' not in st.session_state:
    encoded_pickled_column_state =  st.experimental_get_query_params().get('column_state', [''])[0]
    st.session_state.column_state = pickle.loads(codecs.decode(encoded_pickled_column_state.encode(), "base64")) if encoded_pickled_column_state else ['']
if 'filter_model' not in st.session_state:
    encoded_pickled_filter_model =  st.experimental_get_query_params().get('filter_model', [''])[0]
    st.session_state.filter_model = pickle.loads(codecs.decode(encoded_pickled_filter_model.encode(), "base64")) if encoded_pickled_filter_model else ''
print('column state[0]: ', st.session_state.column_state[0], 'filter model:', st.session_state.filter_model)

@st.experimental_memo
def load_and_parse_data(is_remote, data_source):
    address = ('parsing-server', 6536)
    conn = Client(address, authkey=b'secret password')
    conn.send((is_remote, data_source))
    print(f'Sent request: is_remote={is_remote}, data_source={data_source}')
    error, raw_sgf_strs, df = conn.recv()
    conn.close()
    if error:
        raise error
    else:
        print(f'Received reply with {len(df.index)} rows')
    return raw_sgf_strs, df 

st.subheader('Data source')
data_source_type = st.radio('Load data from', [REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE], key='data_source_type')
if data_source_type == REMOTE_DATA_SOURCE:
    data_source = st.text_input('URL', key='data_url')
else:
    data_source = st_directory_picker(st, key='data_source')

col1, col2, col3 = st.columns([1, 1, 4])
if col1.button('Load data'):
    st.session_state.selected_data_source = data_source
    st.session_state.selected_data_source_type = data_source_type
if col2.button('Clear cache'):
    load_and_parse_data.clear()

selected_data_source_type = st.session_state.get('selected_data_source_type', data_source_type)
selected_data_source = st.session_state.get('selected_data_source', '')
raw_sgf_strs, df = load_and_parse_data(selected_data_source_type==REMOTE_DATA_SOURCE, selected_data_source)

df_unfiltered_len = len(df.index)
if df_unfiltered_len > 0:
    st.text(f'Loaded {df_unfiltered_len} games from {selected_data_source}')

# Iterate though each column of the dataframe
# st.sidebar.subheader('Filters')
# for col_name in df.columns:
#     unique_values = df[col_name].drop_duplicates()
#     if 1 < len(unique_values) < len(df.index):
#         if is_numeric_dtype(df[col_name]) and df[col_name].dtype != 'bool':
#             df_min, df_max = df[col_name].min().item(), df[col_name].max().item()
#             slider_min, slider_max = st.sidebar.slider(col_name, min_value=df_min, max_value=df_max,
#                                                        value=(df_min, df_max), key=col_name)
#             df = df[df[col_name].between(slider_min, slider_max)]
#         else:
#             col_value_choices = st.sidebar.multiselect(col_name, unique_values, key=col_name)
#             df = df if len(col_value_choices) < 1 else df[df[col_name].isin(col_value_choices)]

st.subheader('Matplotlib figure')
col1, col2, col3 = st.columns([1, 4, 1])
with col2:
    content = st_ace(st.session_state.code, language='python',
                    placeholder='Return a figure object called \'fig\'.\nAccess the filtered data in a pandas dataframe called \'df\'.',
                    key='code')

    fig = plt.figure()
    ax = plt.axes()
    exec(content)

    col2.pyplot(fig)

startup(data_id="1", data=df)
st.markdown(
    '<iframe src="/dtale/main/1" style="height: 700px;width: 100%"/>',
    unsafe_allow_html=True,
)
# grid_update_mode = GridUpdateMode.SELECTION_CHANGED | GridUpdateMode.VALUE_CHANGED | GridUpdateMode.FILTERING_CHANGED | GridUpdateMode.SORTING_CHANGED | GridUpdateMode.MODEL_CHANGED
# grid_options_builder = GridOptionsBuilder.from_dataframe(df)
# grid_options_builder.configure_selection(selection_mode='single')
# # grid_options_builder.configure_grid_options(rowModelType='infinite')
# grid_options_builder.configure_pagination(enabled=True, paginationAutoPageSize=False, paginationPageSize=MAX_DISPLAY_ROWS)
# grid_dict = AgGrid(df, columnState=st.session_state.column_state, filterModel=st.session_state.filter_model, gridOptions=grid_options_builder.build(), update_mode=grid_update_mode, theme='blue')
# selected_rows = grid_dict.get('selected_rows', [{}])
# url_encoded_column_state = codecs.encode(pickle.dumps(grid_dict.get('column_state', {})), "base64").decode()
# url_encoded_filter_model = codecs.encode(pickle.dumps(grid_dict.get('filter_model', {})), "base64").decode()

# game_to_view_index = st.selectbox('Select a game to view:', list(df.head(MAX_DISPLAY_ROWS).index.values))
# if game_to_view_index is not None:
    # print('game_to_view_index:', game_to_view_index, 'len(df):', len(df.index))
# if selected_rows:
#     game_to_view_path = selected_rows[0]['sgf_path']#df.loc[game_to_view_index]['sgf_path']
#     game_to_view_line = selected_rows[0]['sgf_line']#df.loc[game_to_view_index]['sgf_line']
#     if raw_sgf_strs:
#         game_to_view_str = raw_sgf_strs[game_to_view_line - 1]
#     else:
#         with open(game_to_view_path, "r") as f:
#             for i, line in enumerate(f):
#                 if i + 1 == game_to_view_line:
#                     game_to_view_str = line
#                     break
# else:
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

# print('column state[0]', grid_dict.get('column_state', [])[0])
# st.experimental_set_query_params(code=[content], data_source_type=data_source_type, data_source=data_source, filter_model=url_encoded_filter_model, column_state=url_encoded_column_state)
st.experimental_set_query_params(code=[content], data_source_type=data_source_type, data_source=data_source)
