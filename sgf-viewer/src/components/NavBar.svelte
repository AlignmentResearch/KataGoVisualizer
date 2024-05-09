<script lang="ts">
    import { pages } from "../content";

    import { Collapse } from "bootstrap";

    export let currentPath: string;

    let pagesPaths = Object.keys(pages);
    let navbarSupportedContent;

    // Make the navbar collapse when a link is clicked (when viewport is narrow
    // enough that the navbar becomes collapsible).
    // Based on https://stackoverflow.com/a/42401686/4865149 but with
    // modifications to make it work with Svelte's element rendering.
    // (The other solution using HTML attributes given in the SO answer, though
    // it's simpler, breaks the links' actual href functionality.)
    $: navLinks = navbarSupportedContent?.querySelectorAll('.nav-item')
    $: bootstrapCollapse = navbarSupportedContent ? Collapse.getOrCreateInstance(navbarSupportedContent, {toggle: false}) : undefined
    $: if (navLinks) {
        navLinks.forEach((l) => {
            l.addEventListener('click', () => { bootstrapCollapse.toggle() })
        })
    }
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="https://far.ai">
            <img src="/images/far-logo.svg" alt="FAR logo" width="24" height="24" class="d-inline-block align-text-top">
            FAR
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" bind:this={navbarSupportedContent}>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#each pagesPaths as page}
                    <li class="nav-item">
                        <a class="nav-link"
                           class:active={page == currentPath}
                           href="#contents"
                           on:click={() => {
                              currentPath = page;
                              history.pushState({}, "", currentPath + "#contents");
                           }}
                        >
                            {pages[page]["title"]}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</nav>
