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

<NavBar bind:currentPath />
<div class="flex-container">
    <div class="content">
        <Title showAuthors={landingPage} />
        <main>
            <!-- Empty anchor target. Named for link backwards compatibility. -->
            <div id="contents" />
            {#key currentPath}
                <h2>{pages[currentPath]["title"]}</h2>
                {#if pages[currentPath]["description"]}
                    {#each pages[currentPath]["description"] as description}
                        <p class="description-p">{@html description}</p>
                    {/each}
                {/if}
                {#each sections as section}
                    <Section {section} />
                {/each}
            {/key}
        </main>
        <Citation />
    </div>
    <!-- Give the table of contents the same breakpoint as the navbar and give
      it a fixed width. -->
    <Toc
        titleTag="h5"
        breakpoint={bootstrapLargeBreakpoint}
        --toc-min-width="12em"
        --toc-desktop-max-width="12em"
    >
        <div class="toc-icon" slot="open-toc-icon">
            <!-- The default mobile icon looks too much like the navbar icon.
              We copy Wikipedia in using the standard hamburger icon for the
              navbar and a bullet list icon for the table of contents
            -->
            <MdFormatListBulleted />
        </div>
    </Toc>
</div>

<style>
    .flex-container {
        /* flex is the easiest way to use svelte-toc */
        display: flex;
        justify-content: center;
        padding: 0 min(1.5em, 4vw);
        width: 100vw;
    }
    .content {
        max-width: 50em;
        /* By default, flex items have a minimum width determined by their
         * content. This can cause the `.content` div to be wider than the
         * viewport width when its content is wide. In particular, the
         * `GameList` and `Citation` components can push out the minimum width,
         * despite them having horizontal scrollbars. Explicitly setting
         * `min-width` prevents this kind of overflow.
         */
        min-width: 0;
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
