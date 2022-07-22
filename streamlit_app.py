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

st.title('KataGo Attack Data Visualizer')

REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'
MAX_DISPLAY_ROWS = 100

if 'code' not in st.session_state:
    st.session_state.code = st.experimental_get_query_params().get('code', [''])[0]
if 'data_source_type' not in st.session_state:
    st.session_state.data_source_type = st.experimental_get_query_params().get('data_source_type', [REMOTE_DATA_SOURCE])[0]
if 'data_source' not in st.session_state:
    st.session_state.data_source = st.experimental_get_query_params().get('data_source', [''])[0]
if 'column_state' not in st.session_state:
    st.session_state.column_state = st.experimental_get_query_params().get('column_state', [''])[0]
if 'filter_model' not in st.session_state:
    st.session_state.filter_model = st.experimental_get_query_params().get('filter_model', [''])[0]

@st.experimental_memo
def load_and_parse_data(data_source_type, data_source):
    address = ('localhost', 6536)
    conn = Client(address, authkey=b'secret password')
    conn.send((data_source_type, data_source))
    print(f'Sent request: data_source_type={data_source_type}, data_source={data_source}')
    df = conn.recv()
    print(f'Received response with shape {df.shape}')
    conn.close()
    print(f'closing conn: {conn}')
    return df

st.subheader('Data source')
col1, col2 = st.columns([3, 1])
data_source_type = col2.radio('Load data from', [REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE], key='data_source_type')
data_source = col1.text_input('URL' if data_source_type == REMOTE_DATA_SOURCE else 'Path', key='data_source')

col1, col2 = st.columns([3, 1])
if col2.button('Reload data'):
    load_and_parse_data.clear()

df = load_and_parse_data(data_source_type, data_source)

df_unfiltered_len = len(df.index)
col1.text(f'Loaded {df_unfiltered_len} games')

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
content = st_ace(st.session_state.code, language='python',
                 placeholder='Return a figure object called \'fig\'.\nAccess the filtered data in a pandas dataframe called \'df\'.',
                 key='code')

fig = plt.figure()
ax = plt.axes()
exec(content)

st.pyplot(fig)

grid_update_mode = GridUpdateMode.SELECTION_CHANGED
grid_options_builder = GridOptionsBuilder.from_dataframe(df)
grid_options_builder.configure_selection(selection_mode='single')
grid_options_builder.configure_pagination(enabled=True, paginationAutoPageSize=False, paginationPageSize=MAX_DISPLAY_ROWS)
grid_dict = AgGrid(df, gridOptions=grid_options_builder.build(), update_mode=grid_update_mode, theme='blue')
selected_game = grid_dict.get('selected_rows', [{}])[0]
print(grid_dict)

# game_to_view_index = st.selectbox('Select a game to view:', list(df.head(MAX_DISPLAY_ROWS).index.values))
# if game_to_view_index is not None:
    # print('game_to_view_index:', game_to_view_index, 'len(df):', len(df.index))
if selected_game:
    game_to_view_path = selected_game['sgf_path']#df.loc[game_to_view_index]['sgf_path']
    game_to_view_line = selected_game['sgf_line']#df.loc[game_to_view_index]['sgf_line']
    with open(game_to_view_path, "r") as f:
        for i, line in enumerate(f):
            if i + 1 == game_to_view_line:
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
