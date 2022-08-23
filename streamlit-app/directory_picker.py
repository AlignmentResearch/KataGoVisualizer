import os
import streamlit as st
from pathlib import Path

def change_dir(key, path):
    st.session_state[key] = str(path)

def st_directory_picker(ui_parent, label, key=None):
    mount_dir, read_dir = Path(os.environ['MOUNT_DIR']), Path(os.environ['READ_DIR'])
    session_path = Path(st.session_state[key]) if key in st.session_state else None
    if session_path is None:
        st.session_state[key] = str(read_dir)
    elif read_dir not in session_path.parents:
        st.session_state[key] = str(read_dir)
    session_path = Path(st.session_state[key])

    col1, col2, col3, col4 = st.columns([8, 1, 3, 1])

    with col3:
        session_path = Path(st.session_state[key])
        mounted_path = mount_dir / session_path.relative_to(read_dir)
        subdirectroies = [f.stem for f in mounted_path.iterdir() if f.is_dir()]
        selected_dir = ui_parent.selectbox("Subdirectories", sorted(subdirectroies), key=key+'selectbox')
        st.session_state.new_dir = selected_dir

    with col2:
        if read_dir in session_path.parents:
            ui_parent.markdown("#")
            ui_parent.button("⬅️", on_click=change_dir, args=(key, session_path.parent), key=key+'back_button')

    with col4:
        if 'new_dir' in st.session_state and st.session_state['new_dir'] is not None:
            ui_parent.markdown("#")
            ui_parent.button("➡️", on_click=change_dir, args=(key, session_path / st.session_state.new_dir), key=key+'forward_button')

    with col1:
        selected_path = ui_parent.text_input(label, key=key)
        selected_path = Path(selected_path)

    return selected_path.absolute()