import streamlit as st
import pickle
import codecs
import hashlib
from components.matplotlib_figure import matplotlib_figure
from components.tensorboard_sessions import tensorboard_session_viewer
from components.graph_filter import win_rate_by_adv_steps_graph_filter
from components.dtale_table import dtale_table_and_go_board
from components.data_loader import data_loader

# Hack to suppress warning in UI because streamlit is silly:
# https://github.com/streamlit/streamlit/issues/4538#issuecomment-1242559770
from streamlit.elements.utils import _shown_default_value_warning

_shown_default_value_warning = True  # noqa: F811

PW_STATE = "pw"
PW_HASH_STATE = "pw_hash"
FIRST_PASS_STATE = "first_pass"

MAX_DISPLAY_ROWS = 100
# TODO: Don't be vulnerable to dictionary attack
HASH = b"i\x0b\xe8:\xf2\x9ft\xa7\x95\xc2}v\x1du\xf9\xb8\xed\xfd\xb3\x8e\xa5\x08z\x1e4\x96\xe3g*\xff\x8e\xc2\xe27r\xca\x8d\xcb8Z\n\x04\x89\xbb\x94\x1d\x08\xc6\x18G0\xeb]G\xb4\xb0x\xd4\xe3\xbc\xc4\x07\x1e\x85"

state = st.session_state

st.set_page_config(layout="wide")
st.title("KataGo Attack Data Visualizer")


def verify():
    """Authenticate with secret password"""
    state[PW_HASH_STATE] = hashlib.scrypt(
        str.encode(state[PW_STATE]), salt=b"salt", n=2048, r=8, p=1
    )


if state.get(PW_HASH_STATE) != HASH:
    password = st.text_input(
        "Password", type="password", on_change=verify, key=PW_STATE
    )
    if st.button("Submit"):
        st.error("Wrong password")
    st.stop()

# Establish if this is the first pass, and if so read url parameters into state
if FIRST_PASS_STATE not in state and "state" in st.experimental_get_query_params():
    url_encoded_state = st.experimental_get_query_params()["state"][0]
    restored_state = pickle.loads(codecs.decode(url_encoded_state.encode(), "base64"))
    for key in restored_state:
        state[key] = restored_state[key]
state[FIRST_PASS_STATE] = False

# Main app components
df, tbparse_reader = data_loader()
tensorboard_session_viewer()
if not df.empty or tbparse_reader:
    selected_presets, matplotlib_code = matplotlib_figure(df, tbparse_reader)
if not df.empty:
    lower_step, upper_step = win_rate_by_adv_steps_graph_filter(df)
    dtale_table_and_go_board(df, lower_step, upper_step)

# Save app state in URL. Use base64 encoding to read and write python obects directly.
if st.button("Update url (for sharing)"):
    new_query_params = {k: v for k, v in state.items() if not k.startswith("temp")}
    new_query_params.pop(FIRST_PASS_STATE, None)
    new_query_params.pop(PW_STATE, None)
    new_query_params.pop(PW_HASH_STATE, None)
    url_encoded_state = codecs.encode(pickle.dumps(new_query_params), "base64").decode()
    st.experimental_set_query_params(state=url_encoded_state)
