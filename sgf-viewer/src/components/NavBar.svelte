<script lang="ts">
    import { pages } from "../content";

    import { Collapse } from "bootstrap";

    export let currentPath: string;

    let pagesPaths = Object.keys(pages);
    let navbarSupportedContent;

    // Make the navbar collapse when a non-dropdown link is clicked on mobile.
    // Based on https://stackoverflow.com/a/42401686/4865149 but with
    // modifications to make it work with Svelte's dynamic element rendering.
    // (The other solution using HTML attributes given in the SO answer, though
    // it's simpler, breaks the links' actual href functionality.)
    $: navLinks = navbarSupportedContent?.querySelectorAll('.nav-item:not(.dropdown)')
    $: bootstrapCollapse = navbarSupportedContent ? Collapse.getOrCreateInstance(navbarSupportedContent, {toggle: false}) : undefined
    $: if (navLinks) {
        navLinks.forEach((link) => {
            link.addEventListener('click', () => { bootstrapCollapse.toggle() })
        })
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
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

<style>
/* Make dropdown menus open on hover.
   https://stackoverflow.com/questions/70739334/bootstrap-5-dropdown-open-on-hover-and-click-to-go-to-new-url
   `--bs-breakpoint-lg: 992px` is the breakpoint for Bootstrap's `lg` size, but
   we can't use CSS variables in media queries.

   Bootstrap made a conscious design decision to not have hover dropdowns:
   https://getbootstrap.com/docs/5.0/components/dropdowns/#overview
 */
@media (min-width: 992px) {
    .dropdown:hover > .dropdown-menu {
        display: block;
    }
    .dropdown > .dropdown-toggle:active {
        pointer-events: none;
    }
}
</style>
