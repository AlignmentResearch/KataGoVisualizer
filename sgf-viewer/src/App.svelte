<script lang="ts">
    import { fade } from "svelte/transition";
    import GameList from "./components/GameList.svelte";
    import NavBar from "./components/NavBar.svelte";
    import Title from "./components/Title.svelte";
    import { pages } from "./content";

    let pagesPaths = Object.keys(pages);
    let currentPath: string = window.location.pathname.split("/").slice(-1)[0];
    currentPath = pagesPaths.includes(currentPath)
        ? currentPath
        : pagesPaths[0];
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
    let navBar: HTMLElement;
    $: navBarMargin = navBar ? navBar.clientHeight : 100;
    $: document.documentElement.style.cssText =
        "--scroll-margin: " + navBarMargin + "px;";
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<main>
    <Title />
    <NavBar bind:currentPath bind:navBarElem={navBar} />
    {#key currentPath}
        {#if pages[currentPath]["description"]}
            <div class="centerflex">
                <h3 id="summary" class="subheading">Summary</h3>
                {#each pages[currentPath]["description"] as description}
                    <p>{@html description}</p>
                {/each}
            </div>
        {/if}
        {#each sections as section}
            <div class="centerflex" in:fade>
                <h3 id={section["dir_name"]} class="subheading">
                    {section["title"]}
                </h3>
                {#each section["description"] as description}
                    <p>{@html description}</p>
                {/each}
                <GameList dirName={section["dir_name"]} />
                <div class="annotation">
                    <p class="annotation-item" style="text-align: left;">
                        <b>Victim:</b>
                        {section["victim"]}
                    </p>
                    <p class="annotation-item" style="text-align: right;">
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
    .subheading {
        top: calc(var(--scroll-margin) + 1vh);
        position: sticky;
        background-color: var(--accent-color-2);
        color: white;
        margin: 2vh;
        padding: 13px;
        border-radius: 105px;
        z-index: 998;
    }
    .centerflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .annotation {
        display: flex;
        position: relative;
        top: -3vh;
    }
    .annotation-item {
        align-self: flex-start;
        margin-bottom: 1vh;
    }
    p {
        font-size: 18px;
        align-self: center;
        margin: 2vw;
        max-width: min(90vw, 800px);
    }
</style>
