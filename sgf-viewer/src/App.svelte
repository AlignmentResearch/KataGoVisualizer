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
    import Citation from "./components/Citation.svelte";
    import NavBar from "./components/NavBar.svelte";
    import Section from "./components/Section.svelte";
    import Title from "./components/Title.svelte";
    import TableOfContents from "./components/subcomponents/TableOfContents.svelte";
    import { pages } from "./content";

    let innerHeight, innerWidth;
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
    let navBar: HTMLElement;
    // The values * 0 are just to force Svelte to recompute when window size changes
    $: navBarMargin = navBar
        ? navBar.clientHeight + (innerWidth + innerHeight) * 0
        : 100;
    $: document.documentElement.style.cssText =
        "--scroll-margin: " + navBarMargin + "px;";

    const menuNavigationWidth = 915;
    const contentsFloatWidth = 1500;
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

<main>
    <Title showAuthors={landingPage} />
    <div class="icml-ad">
        Come find us at <a
            href="https://icml.cc/virtual/2023/papers.html?filter=titles&search=Go+AIs"
            target="_blank"
            >ICML 2023</a
        >!
    </div>
    <NavBar
        {contentsFloatWidth}
        {menuNavigationWidth}
        bind:currentPath
        bind:navBarElem={navBar}
    />
    {#key currentPath}
        {#if pages[currentPath]["description"]}
            <div class="centerflex">
                <div class="text-wrapper">
                    {#each pages[currentPath]["description"] as description}
                        <p class="description-p">{@html description}</p>
                    {/each}
                </div>
            </div>
        {/if}
        {#if innerWidth <= contentsFloatWidth}
            <TableOfContents {currentPath} />
        {/if}
        {#each sections as section}
            <Section {section} />
        {/each}
    {/key}
    <!-- </div> -->
    <Citation />
</main>

<style>
    .subheading {
        top: calc(var(--scroll-margin) + 1vh);
        position: sticky;
        background-color: var(--accent-color-2);
        color: white;
        font-weight: normal;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.75);
        padding: 13px;
        border-radius: 105px;
        z-index: 998;
    }
    .centerflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 0.1rem;
    }
    .text-wrapper {
        width: min(90vw, 800px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 0.5rem;
    }
    p {
        font-size: 18px;
        align-self: flex-start;
        max-width: min(90vw, 800px);
        text-align: justify;
        margin: 0.5rem 0;
    }
    .description-p {
        width: 100%;
    }
    .icml-ad {
        text-align: center;
        font-size: 1.5em;
        margin: 0 0 0.5em;
    }
    .icml-ad>a {
        font-size: 1em;
    }
</style>
