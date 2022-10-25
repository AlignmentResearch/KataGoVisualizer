<script lang="ts">
    import { fade } from "svelte/transition";
    import Saos from "saos";
    import GameList from "./components/GameList.svelte";
    import NavButtons from "./components/NavButtons.svelte";
    import { pages } from "./content";

    let pagesPaths = Object.keys(pages);
    let currentPath: string = window.location.pathname.split("/").slice(-1)[0];
    currentPath = pagesPaths.includes(currentPath)
        ? currentPath
        : pagesPaths[0];
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<main>
    <Saos
        animation={"fade-in-bottom 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000) both"}
    >
        <div class="logos">
            <a href="https://humancompatible.ai/" target="_blank">
                <img
                    src="/images/chai-logo.png"
                    class="logo"
                    alt="Center for Human-Compatible Artificial Intelligence Logo"
                />
            </a>
            <a href="https://www.mit.edu/" target="_blank">
                <img
                    src="/images/mit-logo.svg"
                    class="logo mit"
                    alt="MIT Logo"
                />
            </a>
            <a href="https://alignmentfund.org/" target="_blank">
                <img
                    src="/images/far-logo.png"
                    class="logo far"
                    alt="FAR Logo"
                />
            </a>
        </div>
    </Saos>
    <Saos
        animation={"fade-in-bottom 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000) both"}
    >
        <h1 in:fade style="text-align: center;">
            Adversarial Policies Beat Professional-Level Go AIs
        </h1>
    </Saos>
    <div class="nav-bar">
        {#each pagesPaths as page}
            <NavButtons
                label={pages[page]["title"]}
                tabsId="tabs"
                selected={page === currentPath}
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    currentPath = page;
                    history.pushState({}, "", currentPath);
                }}
            />
        {/each}
    </div>
    {#key currentPath}
        <div class="centerflex">
            <h3 style="text-align: center;">Contents</h3>
            <ol in:fade>
                {#each sections as section, i}
                    <li>
                        <a href={"#" + section["dir_name"]}
                            >{section["title"]}</a
                        >
                    </li>
                {/each}
            </ol>
        </div>
        {#if pages[currentPath]["description"]}
            <div class="centerflex">
                <h2 id="summary">Summary</h2>
                <p>{@html pages[currentPath]["description"]}</p>
            </div>
        {/if}
        {#each sections as section}
            <div class="centerflex" in:fade>
                <h2 id={section["dir_name"]}>
                    {section["title"]}
                </h2>
                {#each section["description"] as description}
                    <p>{@html description}</p>
                {/each}
                <GameList dirName={section["dir_name"]} />
                <div style="display: flex">
                    <p style="align-self: flex-start">
                        <b>Victim:</b>
                        {section["victim"]}
                    </p>
                    <p style="align-self: flex-end; min-width=0;">
                        <b>Adversary:</b>
                        {section["adversary"]}
                    </p>
                </div>
                {#if section["discussion"]}
                    <p>{section["discussion"]}</p>
                {/if}
            </div>
        {/each}
    {/key}
</main>

<style>
    @keyframes -global-fade-in-bottom {
        0% {
            transform: translateY(50px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    h2 {
        scroll-margin-top: 4em;
    }
    .centerflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .nav-bar {
        display: flex;
        justify-content: center;
        position: sticky;
        top: -5px;
        background-color: var(--accent-color-1);
        padding-bottom: 3px;
        z-index: 999;
    }
    @counter-style counters {
        system: cyclic;
        /* symbols: "⚪" "⚫"; */
        symbols: "⚫";
        suffix: "   ";
    }
    ol {
        list-style: none;
        padding-left: 0;
        text-align: center;
    }
    h1 {
        font-size: 2em;
    }
    h3 {
        margin-top: 4vh;
        margin-bottom: 0vh;
    }
    p {
        font-size: 18px;
        align-self: center;
        margin: 2vw;
        max-width: min(90vw, 800px);
    }
    .logos {
        margin-top: 10vh;
        max-width: 100%;
        display: flex;
        justify-content: center;
    }
    .logo {
        margin: auto;
        height: 6vw;
        padding: 1.5em;
        will-change: filter;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #78a22e);
        transform: scale(1.1);
    }
    .logo.mit:hover {
        filter: drop-shadow(0 0 2em #a32034);
    }
    .logo.far:hover {
        filter: drop-shadow(0 0 1em #00e0da);
    }
</style>
