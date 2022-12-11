import streamlit as st
import pandas as pd
import tbparse
from components.dtale_table import delete_dtale_instance
from pathlib import Path
import os
from multiprocessing.connection import Client
from components.subcomponents.directory_picker import st_directory_picker
from tensorboard import manager as tb_manager

FAST_PARSE_STATE = "fast_parse"
DATA_LOAD_ARGS_STATE = "data_load_args"
TBPARSE_EVENT_TYPES_STATE = "tbparse_event_types_state"
TBPARSE_ARGS_STATE = "tbparse_args"
TBPARSE_EVENT_TYPES = [
    "scalars",
    "tensors",
    "histograms",
    "images",
    "audio",
    "hparams",
    "text",
]  # https://tbparse.readthedocs.io/en/latest/pages/api.html

MOUNT_DIR, READ_DIR = Path(os.environ["MOUNT_DIR"]), Path(os.environ["READ_DIR"])

state = st.session_state


@st.experimental_memo(max_entries=10)
def load_and_parse_data(data_source, fast_parse):
    """
    Send a request across the Docker netork to the parsing-server.
    Errors in the parsing-server will be sent in the response and displayed in the UI.
    """
    delete_dtale_instance()  # Each DataFrame has a new Dtale instance
    address = ("localhost", 6536)
    conn = Client(address, authkey=b"secret password")
    conn.send((data_source, fast_parse))
    print(f"Sent request: data_source={data_source}, fast_parse={fast_parse}")
    error, df = conn.recv()
    conn.close()
    if error:
        raise error
    else:
        print(f"Received reply with {len(df.index)} rows")
    return df


def data_loader():
    data_source = st_directory_picker(label="Data source")

    data_load_col_1, data_load_col_2, data_load_col_3, _ = st.columns([1, 1, 1, 2])
    data_load_col_2.checkbox("Fast parse", value=True, key=FAST_PARSE_STATE)
    if state[FAST_PARSE_STATE]:
        st.info(
            "Fast parse does not include the columns 'num_b_pass', 'num_w_pass', 'num_adv_pass', 'num_victim_pass', 'b_name' and 'w_name'."
        )

    df = pd.DataFrame()
    data_load_args = {"data_source": data_source, "fast_parse": state[FAST_PARSE_STATE]}
    if data_load_col_1.button("Load data"):
        state[DATA_LOAD_ARGS_STATE] = data_load_args
    if state.get(DATA_LOAD_ARGS_STATE):
        df = load_and_parse_data(**state.data_load_args)
    if data_load_col_3.button("Clear cache"):
        load_and_parse_data.clear()

    tb_col_1, tb_col_2 = st.columns([1, 3])
    state[TBPARSE_EVENT_TYPES_STATE] = (
        state.get(TBPARSE_EVENT_TYPES_STATE) or TBPARSE_EVENT_TYPES[0:1]
    )
    event_types = tb_col_2.multiselect(
        "Tbparse event types", TBPARSE_EVENT_TYPES, key=TBPARSE_EVENT_TYPES_STATE
    )
    load_tbparse_args = {"tb_source": data_source, "event_types": set(event_types)}

    @st.experimental_memo(max_entries=5)
    def load_tbparse_reader(tb_source, event_types):
        container_path = MOUNT_DIR / Path(tb_source).relative_to(READ_DIR)
        return tbparse.SummaryReader(container_path, event_types=event_types)

    tbparse_reader = None
    free_ports = set(range(6001, 6006)) - set(
        [sesh.port for sesh in tb_manager.get_all()]
    )
    port_limit = len(free_ports) < 1
    if tb_col_1.button(
        "Start Tensorboard here" + (" (max 5)" if port_limit else ""),
        disabled=port_limit,
    ):
        container_path = MOUNT_DIR / Path(data_source).relative_to(READ_DIR)
        tb_manager.start(
            [
                "--logdir",
                str(container_path),
                "--port",
                str(list(free_ports)[0]),
                "--host",
                "0.0.0.0",
            ]
        )

    df_unfiltered_len = len(df.index) if df is not None else 0
    if df_unfiltered_len > 0:
        st.markdown(
            f"Loaded {df_unfiltered_len} games from: `{state[DATA_LOAD_ARGS_STATE]['data_source']}`"
        )

    if tb_col_1.button("Parse Tensorboard Logs"):
        state[TBPARSE_ARGS_STATE] = load_tbparse_args
    if state.get(TBPARSE_ARGS_STATE):
        tbparse_reader = load_tbparse_reader(**state[TBPARSE_ARGS_STATE])
        server_path = READ_DIR / Path(tbparse_reader.log_path).relative_to(MOUNT_DIR)
        st.markdown(f"Tbparsed tensorboard logs in: `{server_path}`")

    return df, tbparse_reader
