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
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<main>
    <Title />
    <NavBar bind:currentPath />
    {#key currentPath}
        {#if pages[currentPath]["description"]}
            <div class="centerflex">
                <!-- {#if "description" in pages[currentPath]} -->
                <h3 id="summary" class="subheading">Summary</h3>
                <!-- {/if} -->
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
    .subheading {
        scroll-margin-top: 4em;
        position: sticky;
        background-color: var(--accent-color-2);
        color: white;
        margin: 2vh;
        padding: 13px;
        border-radius: 105px;
        top: 85px;
        /* padding: 10px; */
        z-index: 998;
    }
    .centerflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    p {
        font-size: 18px;
        align-self: center;
        margin: 2vw;
        max-width: min(90vw, 800px);
    }
</style>
