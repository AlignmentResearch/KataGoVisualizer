import math

VICTIM_ACTIVE_RANGES = """
df19["victim_name_v2"] = (
    df19.victim_name.str.strip("kata1-").str.strip(".bin.gz").str.strip(".txt.gz")
    + "-v"
    + df19.victim_visits.astype("str")
)

min_dict = df19[["victim_name_v2", "adv_steps"]].groupby("victim_name_v2").min().adv_steps
max_dict = df19[["victim_name_v2", "adv_steps"]].groupby("victim_name_v2").max().adv_steps

victim_ranges = {{}}
for v in df19.victim_name_v2.unique():
    start = min_dict[v]
    end = max_dict[v]
    victim_ranges[v] = (start, end)
victim_ranges = dict(sorted(victim_ranges.items(), key=lambda x: x[1][1]))

plt.subplot({nrows}, {ncols}, {next_plot_idx})
los = np.array([lo for lo, _ in victim_ranges.values()])
his = np.array([hi for _, hi in victim_ranges.values()])
plt.barh(y=np.arange(len(los)), left=los, width=his - los, height=0.3)
plt.yticks(np.arange(len(los)), labels=victim_ranges.keys())
plt.title("Victim active ranges")
"""

WIN_RATE_VICTIM_RANGES = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
ALPHA = 0.05
df19['adv_win_perc'] = df.adv_win * 100
for i, v in enumerate(sorted(df19.victim_steps.unique())):
    ax = (
        df19[df19.victim_steps == v]
        .groupby("adv_steps")
        .mean(True)
        .adv_win_perc
        .plot(label='%.1f' % (v / 1e9))
    )
    victim_df = df19[df19.victim_steps == v]
    df_confint = victim_df.groupby("adv_steps").mean(True)
    conf_df = df_confint.apply(
        lambda x: proportion_confint(
            len(victim_df[(victim_df.adv_steps == x.name) & (victim_df.adv_win)]),
            len(victim_df[victim_df.adv_steps == int(x.name)]),
            alpha=ALPHA),
        axis=1, result_type='expand')
    plt.fill_between(df_confint.index, conf_df[0] * 100, conf_df[1] * 100, alpha=0.3)
    plt.axvline(x=df_confint.index[0], ls=':', lw=1)

plt.ylabel(r"Adversary win rate \%")
plt.xlabel("Adversary training steps")
plt.legend(title=r"Victim Training Steps ($\\times 10^{{9}}$)")
"""

WIN_RATE_VICTIM_RANGES_COLORS = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
for i, v in enumerate(sorted(df19.victim_name_v2.unique())):
    ax = (
        df19[(df19.adv_color == "b") & (df19.victim_name_v2 == v)]
        .groupby("adv_steps")
        .mean(True)
        .adv_win.plot(label="adv = black" if i == 0 else "_")
    )
    df19[(df19.adv_color == "w") & (df19.victim_name_v2 == v)].groupby(
        "adv_steps"
    ).mean(True).adv_win.plot(
        linestyle="--",
        color=ax.lines[-1].get_color(),
        label="adv = white" if i == 0 else "_",
    )
plt.ylabel("Win rate")
plt.title("Win rate (victim ranges)")
plt.legend()
"""

WIN_RATE = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
df19[df19.adv_color == "b"].groupby("adv_steps").mean(True).adv_win.plot(
    label="adv = black"
)
df19[df19.adv_color == "w"].groupby("adv_steps").mean(True).adv_win.plot(
    label="adv = white"
)
plt.ylabel("Win rate")
plt.title("win rate")
plt.legend()
"""

GAME_COUNT = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
df19[df19.adv_color == "b"].groupby("adv_steps").count().adv_win.plot(
    label="adv = black"
)
df19[df19.adv_color == "w"].groupby("adv_steps").count().adv_win.plot(
    label="adv = white"
)
plt.ylabel(r"\# of games")
plt.title("game count")
plt.legend()
"""

SCORE_EVOLUTION_MEDIAN = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
df19[df19.adv_color == "b"].groupby("adv_steps").median().adv_minus_victim_score.plot(
    label="adv = black"
)
df19[df19.adv_color == "w"].groupby("adv_steps").median().adv_minus_victim_score.plot(
    label="adv = white"
)
plt.ylabel("adv_minus_victim_score")
plt.title("score evolution (median)")
plt.legend()
"""

NUM_MOVES_EVOLUTION_MEDIAN = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
df19[df19.adv_color == "b"].groupby("adv_steps").median().num_moves.plot(
    label="adv = black"
)
df19[df19.adv_color == "w"].groupby("adv_steps").median().num_moves.plot(
    label="adv = white"
)
plt.ylabel("num_moves")
plt.title(r"\# of moves evolution (median)")
plt.legend()
"""

SCORE_EVOLUTION = """
ax = plt.subplot({nrows}, {ncols}, {next_plot_idx}, projection="3d")
hist_3d(
    df19,
    ts=np.sort(df19.adv_steps.unique())[:-2],
    t_key="adv_steps",
    v_key="adv_minus_victim_score",
    ax=ax,
)
ax.invert_xaxis()
plt.title("score evolution")
"""

NUM_MOVES_EVOLUTION = """
ax = plt.subplot({nrows}, {ncols}, {next_plot_idx}, projection="3d")
hist_3d(
    df19,
    ts=np.sort(df19.adv_steps.unique())[:-2],
    t_key="adv_steps",
    v_key="num_moves",
    ax=ax,
)
plt.title(r"\# of moves evolution")
"""

BOARD_SIZE_DISTRIBUTION = """
ax = plt.subplot({nrows}, {ncols}, {next_plot_idx})
df19.board_size.hist()
plt.title("Board size distribution")
"""

KOMI_DISTRIBUTION = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
df19.adv_komi.hist(bins=100)
plt.title("Komi distribution");
"""

HIST_3D = """
def hist_3d(
    df: pd.DataFrame,
    t_key: str,
    ts: np.ndarray,
    v_key: str,
    ax: plt.Axes,
    cmap: plt.cm.ScalarMappable = plt.cm.inferno,
    bins: int = 50,
):
    # Adapted from https://stackoverflow.com/a/65126279/1337463
    ts = np.sort(ts)
    if len(ts) > 2:  # truncate early points which are unreliable
        ts = ts[2:]

    # calculate now the histogram and plot it for each column
    for i, t in enumerate(ts):
        # extract the current column from your df by its number
        col = df[df[t_key] == t][v_key]

        # determine the histogram values, here you have to adapt it to your needs
        histvals, edges = np.histogram(col, bins=bins, density=True)

        # calculate the center and width of each bar
        # obviously not necessary to do this for each column if you always have the same bins
        # but if you choose for np.histogram other parameters, the bins may not be the same for each histogram
        xcenter = np.convolve(edges, np.ones(2), "valid") / 2
        xwidth = np.diff(edges)

        # plot the histogram as a bar for each bin
        # now with continuous color mapping and edgecolor, so we can better see all bars
        ax.bar(
            left=xcenter,
            height=histvals,
            width=xwidth,
            zs=t,
            zdir="y",
            color=cmap(1 - i / len(ts)),
            alpha=0.666,
            edgecolor="grey",
        )

    ax.set_xlabel(v_key)
    ax.set_ylabel(t_key)
    ax.set_zlabel("density")

    if len(ts) > 1:
        ax.set_ylim(ts[-1], ts[0])
        ax.set_yticks(ts[::10])
"""

SELECTED_LOSSES = """
plt.subplot({nrows}, {ncols}, {next_plot_idx})
for k in ["p0loss_1", "p1loss_1", "vloss_1", "sloss_1", "oloss_1"]:
    tb_metric_dict[k].plot()
tb_metric_dict["loss"].rolling(100).mean(True).plot(linestyle="--")
plt.legend()
plt.yscale("log")
plt.title("Selected losses");
"""

BIGGEST_LOSSES = """
loss_components = [
    "p0loss_1",
    "p1loss_1",
    "vloss_1",
    "tdvloss_1",
    "tdsloss_1",
    "smloss_1",
    "leadloss_1",
    "vtimeloss_1",
    "sbpdfloss_1",
    "sbcdfloss_1",
    "oloss_1",
    "sloss_1",
    "fploss_1",
    "skloss_1",
    "rsdloss_1",
    "evstloss_1",
    "esstloss_1",
    "rloss_1",
    "rscloss_1",
]

plt.subplot({nrows}, {ncols}, {next_plot_idx})
for k in loss_components:
    if k not in tb_metric_dict:
        continue
    if tb_metric_dict[k].iloc[-1] < 1e-2 * tb_metric_dict["loss"].iloc[-1]:
        continue
    tb_metric_dict[k].plot()
tb_metric_dict["loss"].rolling(100).mean(True).plot(linestyle="--")
plt.legend()
plt.yscale("log")
plt.title("Biggest losses");
"""

TBPARSE_SETUP = """
df_tb = tbparse_reader.scalars
df_tb["step_old"] = df_tb.step
df_tb.step *= 256 # Multiple by batch size

tb_metric_dict = {}
for tag in df_tb.tag.unique():
    sdf: pd.DataFrame = df_tb[df_tb.tag == tag] # type: ignore
    tb_metric_dict[tag] = sdf.set_index("step").value
    tb_metric_dict[tag].name = tag
"""

PLOT_PRESET_NAME_MAP = {
    "Victim active ranges": VICTIM_ACTIVE_RANGES,
    "Win rate (victim ranges)": WIN_RATE_VICTIM_RANGES,
    "Win rate": WIN_RATE,
    "Game count": GAME_COUNT,
    "Score evolution (median)": SCORE_EVOLUTION_MEDIAN,
    "Num moves evolution (median)": NUM_MOVES_EVOLUTION_MEDIAN,
    "Score evolution": SCORE_EVOLUTION,
    "Num moves evolution": NUM_MOVES_EVOLUTION,
    "Board size distribution": BOARD_SIZE_DISTRIBUTION,
    "Komi distribution": KOMI_DISTRIBUTION,
}

TBPARSE_PRESET_NAME_MAP = {
    "Selected losses": SELECTED_LOSSES,
    "Biggest losses": BIGGEST_LOSSES,
}

ALL_PRESET_NAME_MAP = {**PLOT_PRESET_NAME_MAP, **TBPARSE_PRESET_NAME_MAP}
PAGE_WIDTH_INCH = 5.50107


def get_plot_preset(plots):
    """
    Height ratios are used to make the 3D figures large
    """
    if len(plots) < 1:
        return ""
    nrows, ncols = math.ceil(len(plots) / 2), 2 if len(plots) > 1 else 1
    height_ratios = [10] * nrows
    for i, plot in enumerate(plots):
        if plot in ["Score evolution", "Num moves evolution"]:
            height_ratios[i // ncols] = 20
    preset_strs = []
    if not set(plots).isdisjoint(PLOT_PRESET_NAME_MAP.keys()):
        preset_strs.append("df19 = df[df.board_size == 19]")
    if "Selected losses" in plots or "Biggest losses" in plots:
        preset_strs.append(TBPARSE_SETUP)
    if "Score evolution" in plots or "Num moves evolution" in plots:
        preset_strs.append(HIST_3D)
    preset_strs.append(
        f"""
plt.rcParams.update({{
    "text.usetex": True,
    "font.family": "serif",
    "font.serif": ["Times"],
    "font.size": 10,
    "font.weight": 'medium',
}})
plt.style.use('tableau-colorblind10')
plt.margins(x=0)
fig, axs = plt.subplots({nrows}, {ncols}, constrained_layout=True,
            figsize=({PAGE_WIDTH_INCH}, {3*nrows}), dpi=240, gridspec_kw={{'height_ratios': {height_ratios}}})
"""
    )
    for i, plot in enumerate(plots):
        preset_strs.append(
            ALL_PRESET_NAME_MAP[plot].format(
                nrows=nrows, ncols=ncols, next_plot_idx=i + 1
            )
        )
    return "\n\n".join([s.strip() for s in preset_strs])
