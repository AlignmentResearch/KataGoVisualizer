import streamlit as st
import pandas as pd
import plotly.express as px

TRAINING_STEPS_SLIDER_STATE = "training_steps_slider"


def win_rate_by_adv_steps_graph_filter(df):
    df19 = df[df.board_size == 19]

    # Make columns with names 'adv = white' and 'adv = black'
    win_rate_df = pd.DataFrame(index=sorted(df.adv_steps.unique()))
    for v in sorted(df19.victim_steps.unique()):
        victim_df = df19[df19.victim_steps == v]
        win_rate_df = win_rate_df.join(
            victim_df[victim_df.adv_color == "b"]
            .groupby("adv_steps")
            .mean(True)[["adv_win"]]
            .rename({"adv_win": f"victim {v} steps, adv black"}, axis=1)
            * 100,
        )
        win_rate_df = win_rate_df.join(
            victim_df[victim_df.adv_color == "w"]
            .groupby("adv_steps")
            .mean(True)[["adv_win"]]
            .rename({"adv_win": f"victim {v} steps, adv white"}, axis=1)
            * 100,
        )

    # Define plotly graph
    px_fig = px.line(
        win_rate_df,
        y=win_rate_df.columns,
        title=None,
        markers=True,
    )
    px_fig.update_layout(
        xaxis_title="Adversary training steps", yaxis_title="Win rate% (19x19 only)"
    )

    # Dataframe index is now 'adv_steps' due to groupby() call
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

        px_fig.add_vrect(
            x0=min_step, x1=max_step, line_width=0, fillcolor="red", opacity=0.2
        )
        st.markdown("#")
        st.subheader("Filter by adversary training steps")
        st.plotly_chart(px_fig, use_container_width=True, config={"staticPlot": True})
    return min_step, max_step
