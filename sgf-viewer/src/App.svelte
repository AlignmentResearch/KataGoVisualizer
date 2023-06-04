<script lang="ts">
    import NavBar from "./components/NavBar.svelte";
    import Section from "./components/Section.svelte";
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
            <Section {section} />
        {/each}
    {/key}
</main>

<style>
    .subheading {
        top: calc(var(--scroll-margin) + 2.5vh);
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
    }
    p {
        font-size: 18px;
        align-self: center;
        margin: 0.5vw;
        max-width: min(90vw, 800px);
        text-align: left;
    }
</style>
