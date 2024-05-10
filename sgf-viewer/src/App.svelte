<script lang="ts">
    import "@fontsource/lato/100-italic.css";
    import "@fontsource/lato/100.css";
    import "@fontsource/lato/300-italic.css";
    import "@fontsource/lato/300.css";
    import "@fontsource/lato/400-italic.css";
    import "@fontsource/lato/400.css";
    import "@fontsource/lato/700-italic.css";
    import "@fontsource/lato/700.css";
    import "@fontsource/lato/900-italic.css";
    import "@fontsource/lato/900.css";

    import { onDestroy, onMount } from "svelte";
    import MdFormatListBulleted from 'svelte-icons/md/MdFormatListBulleted.svelte'
    import Toc from 'svelte-toc'

    import Citation from "./components/Citation.svelte";
    import NavBar from "./components/NavBar.svelte";
    import Section from "./components/Section.svelte";
    import Title from "./components/Title.svelte";
    import { pages } from "./content";

    let innerWidth;
    let pagesPaths = Object.keys(pages);

    let currentPath;
    function updateCurrentPath() {
        let windowLocationPathname = window.location.pathname;
        let windowLoc = windowLocationPathname.split("/").slice(-1)[0];
        currentPath = pagesPaths.includes(windowLoc) ? windowLoc : pagesPaths[0];
    }
    updateCurrentPath();
    onMount(() => window.addEventListener("popstate", updateCurrentPath));
    onDestroy(() => window.removeEventListener("popstate", updateCurrentPath));

    $: landingPage = currentPath === "home";
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];

    const menuNavigationWidth = 915;
    const contentsFloatWidth = 1500;
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<svelte:window bind:innerWidth />

<NavBar bind:currentPath />
<div class="page">
    <main>
        <Title showAuthors={landingPage} />
        <!-- Empty anchor target. Named for link backwards compatibility. -->
        <div id="contents" />
        {#key currentPath}
            <h2>{pages[currentPath]["title"]}</h2>
            {#if pages[currentPath]["description"]}
                <div class="centerflex">
                    <div class="text-wrapper">
                        {#each pages[currentPath]["description"] as description}
                            <p class="description-p">{@html description}</p>
                        {/each}
                    </div>
                </div>
            {/if}
            {#each sections as section}
                <Section {section} />
            {/each}
        {/key}
        <Citation />
    </main>
    <Toc
        titleTag="h5"
        --toc-min-width="12em";
        --toc-desktop-max-width="12em"
    >
        <div class="toc-icon" slot="open-toc-icon">
            <MdFormatListBulleted />
        </div>
    </Toc>
</div>

<style>
    main {
        /* Set width to scale with viewport, otherwise flex elements
           from .page can overflow the viewport width. */
        max-width: min(50em, 90vw);
    }
    .page {
        /* flex is the easiest way to use svelte-toc */
        display: flex;
        place-content: center;
        padding: 0 min(3em, 5vw);
    }
    .toc-icon {
        height: 1em;
        width: 1em;
    }
</style>
