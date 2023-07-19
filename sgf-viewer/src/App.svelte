<script lang="ts">
    import "@fontsource/lato/100.css";
    import "@fontsource/lato/300.css";
    import "@fontsource/lato/400.css";
    import "@fontsource/lato/700.css";
    import "@fontsource/lato/900.css";
    import "@fontsource/lato/100-italic.css";
    import "@fontsource/lato/300-italic.css";
    import "@fontsource/lato/400-italic.css";
    import "@fontsource/lato/700-italic.css";
    import "@fontsource/lato/900-italic.css";

    import { fly } from "svelte/transition";
    import LandingPage from "./components/LandingPage.svelte";
    import NavBar from "./components/NavBar.svelte";
    import Section from "./components/Section.svelte";
    import Title from "./components/Title.svelte";
    import { pages } from "./content";
    import Citation from "./components/Citation.svelte";

    let innerHeight, innerWidth;
    let pagesPaths = Object.keys(pages);
    let currentPath: string = window.location.pathname.split("/").slice(-1)[0];
    $: landingPage = currentPath === "adversarial-policy-katago";
    // $: console.log("currentPath", currentPath, "landingPage", landingPage);
    currentPath = pagesPaths.includes(currentPath)
        ? currentPath
        : pagesPaths[0];
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
</script>

<svelte:head>
    <link rel="stylesheet" href={`/themes/light-theme.css`} />
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth />

<main>
    <Title />
    {#if landingPage}
        <LandingPage />
    {/if}
    <!-- <div transition:fly={{ y: 200, duration: 400 }}> -->
    <NavBar bind:currentPath bind:navBarElem={navBar} />
    {#key currentPath}
        {#if pages[currentPath]["description"]}
            <div class="centerflex">
                <div class="text-wrapper">
                    {#each pages[currentPath]["description"] as description}
                        <p>{@html description}</p>
                    {/each}
                </div>
            </div>
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
        margin: 0.5vw;
    }
    p {
        font-size: 18px;
        align-self: flex-start;
        max-width: min(90vw, 800px);
        text-align: justify;
        margin-left: 1rem;
        margin-right: 1rem;
    }
</style>
