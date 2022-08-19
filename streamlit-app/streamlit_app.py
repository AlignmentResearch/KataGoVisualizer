import streamlit as st
import uuid
import streamlit.components.v1 as components
import matplotlib.pyplot as plt
from streamlit_ace import st_ace
from multiprocessing.connection import Client
from directory_picker import st_directory_picker
import pickle
import codecs
from dtale.app import get_instance
from dtale.views import startup
from dtale.utils import sort_df_for_grid
import dtale.global_state as global_state
from dtale.query import build_query, handle_predefined, run_query
from matplotlib_presets import TBPARSE_PRESET_NAME_MAP, PLOT_PRESET_NAME_MAP, ALL_PRESET_NAME_MAP, get_plot_preset
from streamlit.scriptrunner import get_script_run_ctx
import hashlib
import pandas as pd
import numpy as np
import tbparse
import hashlib
import traceback

state = st.session_state
REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'
MAX_DISPLAY_ROWS = 100
HASH = b'i\x0b\xe8:\xf2\x9ft\xa7\x95\xc2}v\x1du\xf9\xb8\xed\xfd\xb3\x8e\xa5\x08z\x1e4\x96\xe3g*\xff\x8e\xc2\xe27r\xca\x8d\xcb8Z\n\x04\x89\xbb\x94\x1d\x08\xc6\x18G0\xeb]G\xb4\xb0x\xd4\xe3\xbc\xc4\x07\x1e\x85'

def hash_string_to_int(s):
    return int.from_bytes(hashlib.sha1(s.encode('utf-8')).digest()[:4], 'little')

streamlit_session_id = hash_string_to_int(get_script_run_ctx().session_id)
dtale_instance = get_instance(streamlit_session_id)

st.set_page_config(layout="wide")
st.title('KataGo Attack Data Visualizer')

# Authenticate with secret password
def verify(): state['hash'] = hashlib.scrypt(str.encode(state.pw), salt=b'salt', n=2048, r=8, p=1)
if state.get('hash') != HASH:
    password = st.text_input('Password', type='password', on_change=verify, key='pw')
    if st.button('Submit'): st.error('Wrong password')
    st.stop()

# Establish is this the first pass, and if so read url parameters into state 
session_first_pass = 'first_pass' not in state
state.first_pass = False
for key in ['code', 'data_source_type', 'data_url', 'fast_parse', 'sgf_row', 'data_source', 'plot_presets', 'dtale_settings']:
    if key not in state:
        query_params = st.experimental_get_query_params().get(key, [''])
        state[key] = query_params[0] if len(query_params) == 1 else query_params

state.data_source_type = state.data_source_type or LOCAL_DATA_SOURCE
if session_first_pass and isinstance(state.dtale_settings, str):
    if state.dtale_settings:
        state.dtale_settings = pickle.loads(codecs.decode(state.dtale_settings.encode(), "base64"))
    else:
        state.dtale_settings = {"columnFilters":{"board_size":{"value":[19], "operand":"=", "query":"`board_size` == 19"}}}
if session_first_pass:
    state.fast_parse = state.fast_parse == 'True' or 'fast_parse' not in st.experimental_get_query_params()
    if 'plot_presets' not in st.experimental_get_query_params():
        state.plot_presets = []

@st.experimental_memo
def load_and_parse_data(is_remote, data_source, fast_parse):
    address = ('parsing-server', 6536)
    conn = Client(address, authkey=b'secret password')
    conn.send((is_remote, data_source, fast_parse))
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

col1, col2, col3, col4 = st.columns([1, 1, 1, 2])
fast_parse = col2.checkbox('Fast parse', key='fast_parse')
if fast_parse:
    st.info("Fast parse does not include the columns 'num_b_pass', 'num_w_pass', 'num_adv_pass' and 'num_victim_pass'.")

raw_sgf_strs, df = None, None
data_load_args = {'is_remote': data_source_type == REMOTE_DATA_SOURCE, 'data_source': data_source, 'fast_parse': fast_parse}
if data_load_args != state.get('data_loaded_args') and dtale_instance is not None:
    dtale_instance.cleanup()
    print('Cleaned up dtale instance')
    dtale_instance = None
if col1.button('Load data') or data_load_args == state.get('data_loaded_args') or (session_first_pass and 'data_source' in st.experimental_get_query_params()):
    raw_sgf_strs, df = load_and_parse_data(**data_load_args)
    state.data_loaded_args = data_load_args
if col3.button('Clear cache'):
    load_and_parse_data.clear()

df_unfiltered_len = len(df.index) if df is not None else 0

if df_unfiltered_len > 0:
    st.text(f'Loaded {df_unfiltered_len} games from {data_source}')

    st.subheader('Matplotlib figure')
    col1, col2, col3 = st.columns([1, 4, 1])
    def change_preset_callback():
        state.st_ace_key = str(uuid.uuid4())
    if col3.button('Tbparse charts'):
        state.plot_presets = list(TBPARSE_PRESET_NAME_MAP.keys())
        change_preset_callback()
    if col3.button('Standard charts'):
        state.plot_presets = list(PLOT_PRESET_NAME_MAP.keys())
        change_preset_callback()
    selected_presets = col2.multiselect('Presets', options=ALL_PRESET_NAME_MAP.keys(), key='plot_presets', on_change=change_preset_callback)
    with col2:
        content = st_ace(state.code if session_first_pass else get_plot_preset(selected_presets, data_source),
                    language='python', height='400px',
                    placeholder='A figure object called \'fig\' will be rendered.\nAccess the filtered data in a pandas dataframe called \'df\'.',
                    key=state.st_ace_key if 'st_ace_key' in state else 'code')

    if df_unfiltered_len > 0 and content:
        fig = plt.figure()
        exec(content)
        st.pyplot(fig)

# Use 1 dtale instace for each streamlit session
if dtale_instance is None and df_unfiltered_len > 0:
    sort_dict  = {'sort': state.dtale_settings.get('sortInfo', [])}
    sorted_df = sort_df_for_grid(df, sort_dict).reset_index(drop=True)
    dtale_instance = startup(data=sorted_df, data_id=streamlit_session_id)
    print('starting new dtale instance, data_id:', dtale_instance._data_id)
    state.dtale_settings.update({'allow_cell_edits': False, 'hide_shutdown': True})
    global_state.set_settings(streamlit_session_id, state.dtale_settings)

    # Nasty hack to delete the dtale instance when the streamlit session (browser tab) closes
    # Extends an internal Streamlit function which is called when a session ends
    uploaded_file_mgr = get_script_run_ctx()._enqueue.__self__._uploaded_file_mgr
    prev_remove_session_files = uploaded_file_mgr.remove_session_files

    def custom_remove_sesion_files(session_id: str) -> None:
        prev_remove_session_files(session_id)

        curr_instance = get_instance(hash_string_to_int(session_id))
        if curr_instance is not None:
            curr_instance.cleanup()
            print('cleaned up dtale instance:', curr_instance._data_id)

    uploaded_file_mgr.remove_session_files = custom_remove_sesion_files

if dtale_instance is not None:
    df = dtale_instance.data
    html = f'<iframe src="/dtale/main/{dtale_instance._data_id}" style="height: 600px;width: 100%"/>'
    col, row = global_state.get_last_clicked_cell(dtale_instance._data_id) or (None, None)
    st.markdown(html, unsafe_allow_html=True)

    if st.button(f'View selected game') or session_first_pass:
        if session_first_pass and state.sgf_row:
            row = int(state.sgf_row)
        if not row:
            st.error('No game selected')
        else:
            curr_settings = global_state.get_settings(streamlit_session_id) or {}
            final_query = build_query(streamlit_session_id, curr_settings.get("query"))
            if final_query:
                df = run_query(handle_predefined(streamlit_session_id), final_query, global_state.get_context_variables(streamlit_session_id), ignore_empty=True)
            game_to_view_path = df.iloc[row-1]['sgf_path']
            game_to_view_line = df.iloc[row-1]['sgf_line']
            game_to_view_str = ''
            if raw_sgf_strs:
                game_to_view_str = raw_sgf_strs[game_to_view_line - 1]
            else:
                with open(game_to_view_path, "r") as f:
                    for i, line in enumerate(f):
                        if i + 1 == game_to_view_line:
                            game_to_view_str = line
                            break
            state.sgf_str = game_to_view_str
            state.sgf_row = row

    if 'sgf_str' in state and state.sgf_str and state.sgf_row:
        st.subheader(f'Viewing game on row {int(state.sgf_row) - 1}')
        component_string = f"""
            <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.min.js"></script>
            <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.player.min.js"></script>
            <link type="text/css" href="https://katago.s3.amazonaws.com/wgo.player.css" rel="stylesheet" />
            <div data-wgo="{state.sgf_str}" data-wgo-allowillegal="{True}" style="width: 700px">
            Sorry, your browser doesn't support WGo.js. Download SGF <a href="game.sgf">directly</a>.
            </div>
        """
        components.html(component_string, height=600)

    if st.button('Update url (for sharing)'):
        dtale_settings = global_state.get_settings(streamlit_session_id) or {}
        url_encoded_dtale_settings = codecs.encode(pickle.dumps(dtale_settings), "base64").decode()
        st.experimental_set_query_params(code=[content], data_source_type=data_source_type, data_source=data_source, fast_parse=fast_parse, sgf_row=state.sgf_row, plot_presets=state.plot_presets, dtale_settings=url_encoded_dtale_settings)
