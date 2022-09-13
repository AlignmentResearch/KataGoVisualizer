import streamlit as st
import plotly.express as px

TRAINING_STEPS_SLIDER_STATE = 'training_steps_slider'

def win_rate_by_adv_steps_graph_filter(df):
    st.markdown('#')
    st.subheader('Filter by adversary training steps')

    # Make columns with names 'adv = white' and 'adv = black'
    win_rate_df = df[df.adv_color == "b"].groupby("adv_steps").mean()
    win_rate_df['adv = white'] = df[df.adv_color == "w"].groupby("adv_steps").mean()['adv_win']
    win_rate_df = win_rate_df.rename(columns={'adv_win': 'adv = black'})

    # Define plotly graph
    px_fig = px.line(win_rate_df, x=win_rate_df.index, y=['adv = black', 'adv = white'], title=None, markers=True, color_discrete_sequence=['blue', 'green'])
    px_fig.update_layout(xaxis_title='Adversary training steps', yaxis_title='Win rate')

    # Dataframe index is now 'adv_steps' due to groupby() call
    min_step, max_step = win_rate_df.index.min().item(), win_rate_df.index.max().item()
    lower_step, upper_step = st.slider(label='', min_value=min_step, max_value=max_step,
        value=(min_step, max_step), key=TRAINING_STEPS_SLIDER_STATE, step=(max_step - min_step) // 100)

    px_fig.add_vrect(x0=lower_step, x1=upper_step, line_width=0, fillcolor="red", opacity=0.2)
    st.plotly_chart(px_fig, use_container_width=True, config={'staticPlot': True})
    return lower_step, upper_step