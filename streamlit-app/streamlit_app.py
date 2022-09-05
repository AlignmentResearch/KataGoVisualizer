import streamlit as st
import uuid
import streamlit.components.v1 as components
import matplotlib.pyplot as plt
import matplotlib
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
from pathlib import Path
import os
import plotly.express as px
from tensorboard import manager as tb_manager
import io
import signal

mount_dir, read_dir = Path(os.environ['MOUNT_DIR']), Path(os.environ['READ_DIR'])

state = st.session_state
REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'
MAX_DISPLAY_ROWS = 100
TBPARSE_EVENT_TYPES = {'scalars', 'tensors', 'histograms', 'images', 'audio', 'hparams', 'text'} # https://tbparse.readthedocs.io/en/latest/pages/api.html
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
for key in ['code', 'data_source_type', 'data_url', 'fast_parse', 'sgf_row', 'data_source', 'plot_presets', 'tensorboard_source', 'event_types', 'dtale_settings']:
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
    elif isinstance(state.plot_presets, str):
        state.plot_presets = [state.plot_presets]
    if 'event_types' not in st.experimental_get_query_params():
        state.event_types = ['scalars']
    elif isinstance(state.event_types, str):
        state.event_types = [state.event_types]
state.event_types = state.event_types or ['scalars']

@st.experimental_memo(max_entries=10)
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

data_source_type = st.radio('Load data from', [REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE], key='data_source_type')
if data_source_type == REMOTE_DATA_SOURCE:
    data_source = st.text_input('URL', key='data_url')
else:
    data_source = st_directory_picker(st, label='Data source', key='data_source')

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

st.markdown("#")
tensorboard_source = st_directory_picker(st, label='Tensorboard logs (local only)', key='tensorboard_source')
col1, col2 = st.columns([3, 1])
event_types = col1.multiselect('Tbparse event types', TBPARSE_EVENT_TYPES, key='event_types')
load_tbparse_args = {'tensorboard_source': tensorboard_source, 'event_types': set(event_types)}
@st.experimental_memo(max_entries=5)
def load_tbparse_reader(tensorboard_source, event_types):
    container_path = mount_dir / Path(tensorboard_source).relative_to(read_dir)
    return tbparse.SummaryReader(container_path, event_types=event_types)

tbparse_reader = None
free_ports = set(range(6001, 6006)) - set([sesh.port for sesh in tb_manager.get_all()])
port_limit = len(free_ports) < 1
if col2.button('Start Tensorboard here' + (' (max 5)' if port_limit else ''), disabled=port_limit):
    container_path = mount_dir / Path(tensorboard_source).relative_to(read_dir)
    tb_manager.start(['--logdir', str(container_path), '--port', str(list(free_ports)[0]), '--host', '0.0.0.0'])
if col2.button('Parse Tensorboard Logs') or load_tbparse_args == state.get('loaded_tbparse_args') or (session_first_pass and 'tensorboard_source' in st.experimental_get_query_params()):
    tbparse_reader = load_tbparse_reader(**load_tbparse_args)
    state.loaded_tbparse_args = load_tbparse_args
    st.text(f'Tbparsed tensorboard logs in: {tbparse_reader.log_path}')

st.subheader('Tensorboard sessions')
tb_sessions = tb_manager.get_all()
if tb_sessions:
    for col, header in zip(st.columns([5, 1, 5, 1]), ['**Directory**', '**Port**', '**SSH CMD**', '']):
        col.markdown(header)
    for sesh in tb_sessions:
        col1, col2, col3, col4 = st.columns([5, 1, 5, 1])
        server_path = read_dir / Path(sesh.logdir).relative_to(mount_dir)
        col1.text(str(server_path))
        col2.markdown(f'[{sesh.port}](http://localhost:{sesh.port})')
        col3.markdown(f'`ssh -L {sesh.port}:localhost:{sesh.port} name@dqn.ist.berkeley.edu`')
        if col4.button('Delet️e', key=sesh.cache_key):
            os.kill(sesh.pid, signal.SIGTERM)
    st.button('↻ Refresh')
else:
    st.text('No sessions running')

@st.experimental_memo(max_entries=10, suppress_st_warning=True)
def plot_user_code(user_code):
    buf = io.BytesIO()
    exec(user_code, globals())
    try:
        fig.savefig(buf, format="png")
    except NameError as e:
        raise Exception("User code must define a figure named 'fig'") from e
    return buf

if df_unfiltered_len > 0 or tbparse_reader:
    st.subheader('Matplotlib figure')
    col1, col2, col3 = st.columns([1, 4, 1])
    def change_preset_callback():
        state.st_ace_key = str(uuid.uuid4())
    if col3.button('Standard charts'):
        state.plot_presets = list(PLOT_PRESET_NAME_MAP.keys())
        change_preset_callback()
    if col3.button('Tbparse charts'):
        state.plot_presets = list(TBPARSE_PRESET_NAME_MAP.keys())
        change_preset_callback()
    selected_presets = col2.multiselect('Presets', options=ALL_PRESET_NAME_MAP.keys(), key='plot_presets', on_change=change_preset_callback)
    with col2:
        content = st_ace(state.code if session_first_pass else get_plot_preset(selected_presets),
                    language='python', height='400px',
                    placeholder="A figure object called 'fig' will be rendered.\nAccess the unfiltered data in a pandas dataframe called 'df'.\nAccess the tbparse reader in an object called 'tbparse_reader'.",
                    key=state.st_ace_key if 'st_ace_key' in state else 'code')

    if (df_unfiltered_len > 0 or tbparse_reader) and content:
        plot_img = plot_user_code(content)
        st.image(plot_img)

if df_unfiltered_len > 0:
    st.markdown('#')
    st.subheader('Filter by adversary training steps')
    win_rate_df = df[df.adv_color == "b"].groupby("adv_steps").mean()
    win_rate_df['adv = white'] = df[df.adv_color == "w"].groupby("adv_steps").mean()['adv_win']
    win_rate_df = win_rate_df.rename(columns={'adv_win': 'adv = black'})
    px_fig = px.line(win_rate_df, x=win_rate_df.index, y=['adv = black', 'adv = white'], title=None, markers=True, color_discrete_sequence=['blue', 'green'])
    px_fig.update_layout(xaxis_title='Adversary training steps', yaxis_title='Win rate')
    min_step, max_step = win_rate_df.index.min().item(), win_rate_df.index.max().item()
    default_range = [int(n) for n in st.experimental_get_query_params().get('adv_step_range', [min_step, max_step])]
    lower_step, upper_step = st.slider(label='', min_value=min_step, max_value=max_step, value=default_range, step=(max_step - min_step) // 100)
    px_fig.add_vrect(x0=lower_step, x1=upper_step, line_width=0, fillcolor="red", opacity=0.2)
    st.plotly_chart(px_fig, use_container_width=True, config={'staticPlot': True})

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
    state.dtale_settings = global_state.get_settings(streamlit_session_id)
    state.dtale_settings['columnFilters']['adv_steps'] = {'operand': '[]', 'min': lower_step, 'max': upper_step, 'query': f'`adv_steps` >= {lower_step} and `adv_steps` <= {upper_step}'}
    global_state.set_settings(streamlit_session_id, state.dtale_settings)
    df = dtale_instance.data
    col, row = global_state.get_last_clicked_cell(dtale_instance._data_id) or (None, None)
    # Append lower_step and upper_step to the url so that the iframe refreshes when they change
    components.iframe(f'/dtale/main/{dtale_instance._data_id}?{lower_step}+{upper_step}', height=700)

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

if (df_unfiltered_len > 0 or tbparse_reader) and st.button('Update url (for sharing)'):
    dtale_settings = global_state.get_settings(streamlit_session_id) or {}
    url_encoded_dtale_settings = codecs.encode(pickle.dumps(dtale_settings), "base64").decode()
    query_params = {
        'code': [content],
        'sgf_row': state.sgf_row,
        'plot_presets': state.plot_presets,
        'dtale_settings': url_encoded_dtale_settings
    }
    if df_unfiltered_len > 0:
        query_params['data_source_type'] = data_source_type
        query_params['data_source'] = data_source
        query_params['fast_parse'] = fast_parse
        query_params['adv_step_range'] = [lower_step, upper_step]
    if tbparse_reader:
        query_params['tensorboard_source'] = tensorboard_source
        query_params['event_types'] = event_types
    st.experimental_set_query_params(**query_params)
