import streamlit as st
import pandas as pd
import plotly.express as px
from itertools import product

MAX_LINES_ON_GRAPH = 100

TRAINING_STEPS_SLIDER_STATE = "training_steps_slider"
PLOT_SEPERATE_ATTRIBUTES_STATE = "plot_seperate_attributes"


def win_rate_by_adv_steps_graph_filter(df):
    df19 = df[df.board_size == 19]
    win_rate_df = pd.DataFrame(index=sorted(df19.adv_steps.unique()))

    st.markdown("#")
    st.subheader("Filter by adversary training steps")

    default_cols = ["victim_steps", "adv_color", "victim_visits", "train_status"]
    cols = st.multiselect(
        label="Plot attributes separately",
        options=df19.columns,
        default=default_cols,
        format_func=lambda x: x.replace("_", " ").title(),
        key=PLOT_SEPERATE_ATTRIBUTES_STATE,
    )
    try:
        cartesian_product = list(sorted(product(*[df19[c].unique() for c in cols])))
    except TypeError:
        cartesian_product = list(product(*[df19[c].unique() for c in cols]))
    line_count = 0
    for i in cartesian_product:
        # Surround only string values with quotes
        query = " & ".join(
            [
                (c + " == " + str([v]).strip("[]")) if v or v == 0 else f"{c}.isnull()"
                for c, v in zip(cols, i)
            ]
        )
        if line_count < MAX_LINES_ON_GRAPH:
            df19_filtered = df19.query(query)
            if len(df19_filtered) > 0:
                line_count += 1
                win_rate_df = win_rate_df.join(
                    df19_filtered.groupby("adv_steps")
                    .mean(True)[["adv_win"]]
                    .rename(
                        {"adv_win": ", ".join([f"{c}: {v}" for c, v in zip(cols, i)])},
                        axis=1,
                    )
                    * 100,
                )

    # Define plotly graph
    px_fig = px.line(
        win_rate_df,
        y=win_rate_df.columns,
        title=None,
        markers=True,
        symbol_sequence=["x"],
    )
    px_fig.update_traces(marker=dict(size=9, line=dict(width=1, color="White")))
    px_fig.update_layout(
        xaxis_title="Adversary training steps",
        yaxis_title="Win rate %",
    )

    min_step, max_step = win_rate_df.index.min().item(), win_rate_df.index.max().item()
    if min_step < max_step:
        min_step, max_step = st.slider(
            label="",
            min_value=min_step,
            max_value=max_step,
            value=(min_step, max_step),
            key=TRAINING_STEPS_SLIDER_STATE,
            step=max((max_step - min_step) // 100, 1),
        )
    px_fig.add_vline(x=min_step, line_width=3, line_dash="dash", line_color="red")
    px_fig.add_vline(x=max_step, line_width=3, line_dash="dash", line_color="red")
    st.plotly_chart(
        px_fig,
        use_container_width=True,
        config={"displaylogo": False},
    )
    return min_step, max_step
