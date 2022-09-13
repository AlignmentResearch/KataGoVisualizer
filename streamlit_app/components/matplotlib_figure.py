import streamlit as st
from components.subcomponents.matplotlib_presets import (
    TBPARSE_PRESET_NAME_MAP,
    PLOT_PRESET_NAME_MAP,
    ALL_PRESET_NAME_MAP,
    get_plot_preset,
)
import io
from streamlit_ace import st_ace

# Import these so they can be easily accessed by the user code
import matplotlib.pyplot as plt  # noqa: F401
import pandas as pd  # noqa: F401
import numpy as np  # noqa: F401

PLOT_PRESETS_STATE = "plot_presets"
CODE_PLACEHOLDER_TEXT = "A figure object called 'fig' will be rendered.\nAccess the unfiltered data in a pandas dataframe called 'df'.\nAccess the tbparse reader in an object called 'tbparse_reader'."
CODE_STATE = "code"

state = st.session_state


@st.experimental_memo(max_entries=10)
def plot_user_code(user_code):
    """
    Run the user code then render 'fig'.
    Cache the output image for better performance.
    """
    buf = io.BytesIO()
    loc = {}
    exec(user_code, globals(), loc)
    try:
        loc["fig"].savefig(buf, format="png")
    except NameError as e:
        raise Exception("User code must define a figure named 'fig'") from e
    return buf


def update_code_state_callback():
    state[CODE_STATE] = get_plot_preset(state[PLOT_PRESETS_STATE])


def matplotlib_figure(df_param, tbparse_reader_param):
    global df, tbparse_reader  # These need to be in globals() for exec() call on user code.
    df, tbparse_reader = df_param, tbparse_reader_param
    st.subheader("Matplotlib figure")
    _, col2, col3 = st.columns([1, 4, 1])
    if col3.button("Standard charts"):
        state[PLOT_PRESETS_STATE] = list(PLOT_PRESET_NAME_MAP.keys())
        state[CODE_STATE] = get_plot_preset(state.plot_presets)
    if col3.button("Tbparse charts"):
        state[PLOT_PRESETS_STATE] = list(TBPARSE_PRESET_NAME_MAP.keys())
        state[CODE_STATE] = get_plot_preset(state.plot_presets)
    if col3.button("All charts"):
        state[PLOT_PRESETS_STATE] = list(
            {**PLOT_PRESET_NAME_MAP, **TBPARSE_PRESET_NAME_MAP}.keys()
        )
        state[CODE_STATE] = get_plot_preset(state.plot_presets)
    selected_presets = col2.multiselect(
        "Presets",
        options=ALL_PRESET_NAME_MAP.keys(),
        key=PLOT_PRESETS_STATE,
        on_change=update_code_state_callback,
    )
    with col2:
        matplotlib_code = st_ace(
            value=state.get(CODE_STATE, ""),
            language="python",
            height="400px",
            placeholder=CODE_PLACEHOLDER_TEXT,
        )
        state[CODE_STATE] = matplotlib_code
    if (len(df.index) > 0 or tbparse_reader) and matplotlib_code:
        plot_img = plot_user_code(matplotlib_code)
        st.image(plot_img)
    return selected_presets, matplotlib_code
