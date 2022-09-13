import streamlit as st
import os
from pathlib import Path
import signal
from tensorboard import manager as tb_manager

MOUNT_DIR, READ_DIR = Path(os.environ["MOUNT_DIR"]), Path(os.environ["READ_DIR"])


def tensorboard_session_viewer():
    """
    Tensorboard sessions are not tied to Streamlit sessions (because I couldn't figure out
    a similar hack to the one used to link Streamlit and Dtale sessions.)
    """
    st.subheader("Tensorboard sessions")
    tb_sessions = tb_manager.get_all()
    if tb_sessions:
        for col, header in zip(
            st.columns([5, 1, 5, 1]), ["**Directory**", "**Port**", "**SSH CMD**", ""]
        ):
            col.markdown(header)
        for sesh in tb_sessions:
            col1, col2, col3, col4 = st.columns(
                [5, 1, 5, 1]
            )  # New columns on each row for vertical alignment
            server_path = READ_DIR / Path(sesh.logdir).relative_to(MOUNT_DIR)
            col1.text(str(server_path))
            col2.markdown(f"[{sesh.port}](http://localhost:{sesh.port})")
            col3.markdown(
                f"`ssh -L {sesh.port}:localhost:{sesh.port} name@dqn.ist.berkeley.edu`"
            )
            if col4.button("Delete", key=sesh.cache_key):
                os.kill(sesh.pid, signal.SIGTERM)
        st.button("↻ Refresh")  # Forces Streamlit script to rerun
    else:
        st.text("No sessions running")
