import streamlit as st
from dtale.app import get_instance
from dtale.views import startup
from dtale.utils import sort_df_for_grid
import dtale.global_state as global_state
from dtale.query import build_query, handle_predefined, run_query
import streamlit.components.v1 as components
from streamlit.scriptrunner import get_script_run_ctx
from components.subcomponents.go_board import go_board
import hashlib

SGF_ROW_STATE = "sgf_row"
DTALE_SETTINGS_STATE = "dtale_settings"
DTALE_DEFAULT_SETTINGS_ADJUST = {
    "allow_cell_edits": False,
    "hide_shutdown": True,
    "columnFilters": {
        "board_size": {"value": [19], "operand": "=", "query": "`board_size` == 19"}
    },
}

state = st.session_state


def hash_string_to_int(s):
    """
    This function is used to deterministically map streamlit session_ids to an integer which
    is used as the Dtale data_id. We require this because the Streamlit server main thread needs
    to cleanup the Dtale session (see next function). But we can't pass any variables to
    this callback, so it needs to be able to deduce the Dtale data_id using only the
    Streamlit session_id.
    """
    return int.from_bytes(hashlib.sha1(s.encode("utf-8")).digest()[:4], "little")


def kill_dtale_session_on_session_end():
    """
    Nasty hack to delete the Dtale instance when the streamlit session (browser tab) closes.
    An internal Streamlit function which is called when a session ends is extended to also
    cleanup the Dtale session. This is the only way I could find to effectively run a callback
    when the session ends.
    """
    uploaded_file_mgr = get_script_run_ctx()._enqueue.__self__._uploaded_file_mgr
    prev_remove_session_files = uploaded_file_mgr.remove_session_files

    def custom_remove_session_files(session_id: str) -> None:
        prev_remove_session_files(session_id)

        curr_instance = get_instance(hash_string_to_int(session_id))
        if curr_instance is not None:
            curr_instance.cleanup()
            print("cleaned up dtale instance:", curr_instance._data_id)

    uploaded_file_mgr.remove_session_files = custom_remove_session_files


def delete_dtale_instance():
    """
    This function is called by data_loader.py, somewhat breaking the rule that components
    shouldn't modify other components state. Therefore the dtale_table_and_go_board() component
    in this module does not assume anything about the initial DTALE_SETTINGS_STATE.
    """
    streamlit_session_id = hash_string_to_int(get_script_run_ctx().session_id)
    dtale_instance = get_instance(streamlit_session_id)
    if dtale_instance:
        dtale_instance.cleanup()
        del state[DTALE_SETTINGS_STATE]
        print("Cleaned up dtale instance")


def dtale_table_and_go_board(df, lower_step, upper_step):
    dtale_data_id = hash_string_to_int(get_script_run_ctx().session_id)
    dtale_instance = get_instance(dtale_data_id)

    # Use 1 Dtale instance for each streamlit session
    if dtale_instance is None:
        # Start new Dtale instance, align streamlit state with Dtale state
        sort_dict = {"sort": state.get(DTALE_SETTINGS_STATE, {}).get("sortInfo", [])}
        sorted_df = sort_df_for_grid(df, sort_dict).reset_index(drop=True)
        dtale_instance = startup(data=sorted_df, data_id=dtale_data_id)
        print("starting new dtale instance, data_id:", dtale_instance._data_id)
        if not state.get(DTALE_SETTINGS_STATE):
            state[DTALE_SETTINGS_STATE] = global_state.get_settings(dtale_data_id)
            state[DTALE_SETTINGS_STATE].update(DTALE_DEFAULT_SETTINGS_ADJUST)
        global_state.set_settings(dtale_data_id, state[DTALE_SETTINGS_STATE])
        kill_dtale_session_on_session_end()

    # Apply adv_steps filter (set by user on graph slider)
    state[DTALE_SETTINGS_STATE] = global_state.get_settings(dtale_data_id)
    state[DTALE_SETTINGS_STATE]["columnFilters"]["adv_steps"] = {
        "operand": "[]",
        "min": lower_step,
        "max": upper_step,
        "query": f"`adv_steps` >= {lower_step} and `adv_steps` <= {upper_step}",
    }
    global_state.set_settings(dtale_data_id, state[DTALE_SETTINGS_STATE])

    df = dtale_instance.data
    _, row = global_state.get_last_clicked_cell(dtale_instance._data_id) or (None, None)
    # Append lower_step and upper_step to the url so that the iframe refreshes when they change
    components.iframe(
        f"/dtale/main/{dtale_instance._data_id}?{lower_step}+{upper_step}", height=700
    )

    if st.button("View selected game"):
        state[SGF_ROW_STATE] = row

    if state.get(SGF_ROW_STATE):  # Rows are 1-indexed
        curr_settings = global_state.get_settings(dtale_data_id) or {}
        final_query = build_query(dtale_data_id, curr_settings.get("query"))
        if final_query:
            df = run_query(
                handle_predefined(dtale_data_id),
                final_query,
                global_state.get_context_variables(dtale_data_id),
                ignore_empty=True,
            )
        if state[SGF_ROW_STATE] <= len(df.index):
            game_to_view_path = df.iloc[state[SGF_ROW_STATE] - 1]["sgf_path"]
            game_to_view_line = df.iloc[state[SGF_ROW_STATE] - 1]["sgf_line"]
            game_to_view_str = ""
            with open(game_to_view_path, "r") as f:
                for i, line in enumerate(f):
                    if i + 1 == game_to_view_line:
                        game_to_view_str = line
                        break

            st.subheader(f"Viewing game on row {int(state[SGF_ROW_STATE]) - 1}")
            go_board(game_to_view_str)
