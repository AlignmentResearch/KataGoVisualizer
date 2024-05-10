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

    const pagesPaths = Object.keys(pages);
    const bootstrapLargeBreakpoint = parseInt(getComputedStyle(document.body).getPropertyValue("--bs-breakpoint-lg"));

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
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<NavBar bind:currentPath />
<div class="app">
    <div class="content">
        <Title showAuthors={landingPage} />
            <main>
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
            </main>
        <Citation />
    </div>
    <Toc
        titleTag="h5"
        breakpoint={bootstrapLargeBreakpoint}
        --toc-min-width="12em"
        --toc-desktop-max-width="12em"
    >
        <div class="toc-icon" slot="open-toc-icon">
            <MdFormatListBulleted />
        </div>
    </Toc>
</div>

<style>
    .app {
        /* flex is the easiest way to use svelte-toc */
        display: flex;
        justify-content: center;
        /* TODO debug why padding isn't working as expected */
        padding: 0 min(1.5em, 4vw);
    }
    .content {
        max-width: min(50em, 100vw);
    }
    .toc-icon {
        height: 1em;
        width: 1em;
    }
    #contents {
        /* Extra scroll margin when navigating to the #contents anchor. */
        scroll-margin-top: 1em;
    }
</style>
