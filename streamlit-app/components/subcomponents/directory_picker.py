import os
import streamlit as st
from pathlib import Path

DIR_STATE = 'directory'
DIR_SELECT_STATE = 'directory_selectbox'
DIR_BACK_STATE = 'directory_back_button'
DIR_FORWARD_STATE = 'directory_forward_button'

MOUNT_DIR, READ_DIR = Path(os.environ['MOUNT_DIR']), Path(os.environ['READ_DIR'])

def change_dir(key, path):
    st.session_state[key] = str(path)

def st_directory_picker(label):
    session_path = Path(st.session_state[DIR_STATE]) if DIR_STATE in st.session_state else None
    if session_path is None:
        st.session_state[DIR_STATE] = str(READ_DIR)
    elif READ_DIR not in session_path.parents:
        st.session_state[DIR_STATE] = str(READ_DIR)
    session_path = Path(st.session_state[DIR_STATE])

    col1, col2, col3, col4 = st.columns([8, 1, 3, 1])

    with col3:
        session_path = Path(st.session_state[DIR_STATE])
        mounted_path = MOUNT_DIR / session_path.relative_to(READ_DIR)
        subdirectroies = [f.stem for f in mounted_path.iterdir() if f.is_dir()]
        st.selectbox("Subdirectories", sorted(subdirectroies), key=DIR_SELECT_STATE)

    with col2:
        if READ_DIR in session_path.parents:
            st.markdown("#")
            st.button("⬅️", on_click=change_dir, args=(DIR_STATE, session_path.parent))

    with col4:
        if st.session_state.get(DIR_SELECT_STATE):
            st.markdown("#")
            st.button("➡️", on_click=change_dir, args=(DIR_STATE, session_path / st.session_state[DIR_SELECT_STATE]))

    with col1:
        selected_path = st.text_input(label, key=DIR_STATE)
        selected_path = Path(selected_path)

    return selected_path.absolute()