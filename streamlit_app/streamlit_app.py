import streamlit as st
import pickle
import codecs
from components.matplotlib_figure import matplotlib_figure
from components.tensorboard_sessions import tensorboard_session_viewer
from components.graph_filter import win_rate_by_adv_steps_graph_filter
from components.dtale_table import dtale_table_and_go_board
from components.data_loader import data_loader

# Hack to suppress warning in UI because streamlit is silly:
# https://github.com/streamlit/streamlit/issues/4538#issuecomment-1242559770
from streamlit.elements.utils import _shown_default_value_warning

_shown_default_value_warning = True  # noqa: F811

FIRST_PASS_STATE = "first_pass"

MAX_DISPLAY_ROWS = 100

state = st.session_state

st.set_page_config(layout="wide")
st.title("KataGo Attack Data Visualizer")

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
    url_encoded_state = codecs.encode(pickle.dumps(new_query_params), "base64").decode()
    st.experimental_set_query_params(state=url_encoded_state)
