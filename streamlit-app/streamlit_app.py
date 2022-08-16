import streamlit as st
import pandas as pd
import numpy as np
import streamlit.components.v1 as components
import matplotlib.pyplot as plt
from streamlit_ace import st_ace
from multiprocessing.connection import Client
from directory_picker import st_directory_picker
import pickle
import codecs
from dtale.app import get_instance
from dtale.views import startup
import dtale.global_state as global_state
from dtale.query import build_query, handle_predefined, run_query
from streamlit.scriptrunner import get_script_run_ctx
import hashlib

REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'
MAX_DISPLAY_ROWS = 100

def hash_string_to_int(s):
    return int.from_bytes(hashlib.sha1(s.encode('utf-8')).digest()[:4], 'little')

streamlit_session_id = hash_string_to_int(get_script_run_ctx().session_id)
dtale_instance = get_instance(streamlit_session_id)

st.set_page_config(layout="wide")
st.title('KataGo Attack Data Visualizer')

session_first_pass = False
if 'code' not in st.session_state:
    st.session_state.code = st.experimental_get_query_params().get('code', [''])[0]
if 'data_source_type' not in st.session_state:
    st.session_state.data_source_type = st.experimental_get_query_params().get('data_source_type', [REMOTE_DATA_SOURCE])[0]
if 'data_url' not in st.session_state:
    st.session_state.data_url = st.experimental_get_query_params().get('data_url', [''])[0]
if 'sgf_row' not in st.session_state:
    sgf_row_str = st.experimental_get_query_params().get('sgf_row', [None])[0]
    st.session_state.sgf_row = int(sgf_row_str) if sgf_row_str is not None and sgf_row_str.isdigit() else None 
if 'data_source' not in st.session_state:
    session_first_pass = True
    st.session_state.data_source = st.experimental_get_query_params().get('data_source', [''])[0]
if 'dtale_settings' not in st.session_state:
    encoded_pickled_dtale_settings =  st.experimental_get_query_params().get('dtale_settings', [''])[0]
    st.session_state.dtale_settings = pickle.loads(codecs.decode(encoded_pickled_dtale_settings.encode(), "base64")) if encoded_pickled_dtale_settings else ''

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
fast_parse = col2.checkbox('Fast parse', True)
if fast_parse:
    st.info("Fast parse does not include the columns 'num_b_pass', 'num_w_pass', 'num_adv_pass' and 'num_victim_pass'.")
if col1.button('Load data') or session_first_pass:
    st.session_state.selected_data_source = data_source
    st.session_state.selected_data_source_type = data_source_type
    st.session_state.selected_fast_parse = fast_parse
    if dtale_instance is not None:
        dtale_instance.cleanup()
        print('Cleaned up dtale instance')
        dtale_instance = None
if col3.button('Clear cache'):
    load_and_parse_data.clear()

selected_data_source_type = st.session_state.get('selected_data_source_type', data_source_type)
selected_data_source = st.session_state.get('selected_data_source', '')
selected_fast_parse = st.session_state.get('selected_fast_parse', True)
raw_sgf_strs, df = load_and_parse_data(selected_data_source_type==REMOTE_DATA_SOURCE, selected_data_source, fast_parse=selected_fast_parse)

df_unfiltered_len = len(df.index)
if df_unfiltered_len > 0:
    st.text(f'Loaded {df_unfiltered_len} games from {selected_data_source}')

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

# Use 1 dtale instace for each streamlit session
if dtale_instance is None and df_unfiltered_len > 0:
    dtale_instance = startup(data=df, data_id=streamlit_session_id, hide_shutdown=True, allow_cell_edits=False)
    print('starting new dtale instance, data_id:', dtale_instance._data_id)
    global_state.set_settings(streamlit_session_id, st.session_state.dtale_settings)

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
    html = f'<iframe src="/dtale/main/{dtale_instance._data_id}" style="height: 500px;width: 100%"/>'
    col, row = global_state.get_last_clicked_cell(dtale_instance._data_id) or (None, None)
    st.markdown(html, unsafe_allow_html=True)

    if st.button(f'View selected game') or session_first_pass:
        if session_first_pass:
            row = st.session_state.sgf_row
        if row is None:
            st.error('No game selected')
        else:
            curr_settings = global_state.get_settings(streamlit_session_id) or {}
            final_query = build_query(streamlit_session_id, curr_settings.get("query"))
            if final_query:
                df = run_query(
                    handle_predefined(streamlit_session_id),
                    final_query,
                    global_state.get_context_variables(streamlit_session_id),
                    ignore_empty=True,
                )
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
            st.session_state.sgf_str = game_to_view_str
            st.session_state.sgf_row = row

    if 'sgf_str' in st.session_state and 'sgf_row' in st.session_state:
        st.subheader(f'Viewing game on row {st.session_state.sgf_row - 1}')
        component_string = f"""
            <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.min.js"></script>
            <script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.player.min.js"></script>
            <link type="text/css" href="https://katago.s3.amazonaws.com/wgo.player.css" rel="stylesheet" />
            <div data-wgo="{st.session_state.sgf_str}" style="width: 700px">
            Sorry, your browser doesn't support WGo.js. Download SGF <a href="game.sgf">directly</a>.
            </div>
        """
        components.html(component_string, height=600)

if st.button('Update url (for sharing)'):
    dtale_settings = global_state.get_settings(streamlit_session_id) or {}
    url_encoded_dtale_settings = codecs.encode(pickle.dumps(dtale_settings), "base64").decode()
    st.experimental_set_query_params(code=[content], data_source_type=data_source_type, data_source=data_source, sgf_row=st.session_state.sgf_row, dtale_settings=url_encoded_dtale_settings)
