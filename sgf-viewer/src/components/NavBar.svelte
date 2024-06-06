<script lang="ts">
    import { pages } from "../content";

    import { Collapse } from "bootstrap";

    export let currentPath: string;

    let pagesPaths = Object.keys(pages);
    let navbarSupportedContent;

    // Make the navbar collapse when a non-dropdown link is clicked on mobile.
    // This is needed because we have a single-page app, and our links don't
    // actually open a new page.
    // Based on https://stackoverflow.com/a/42401686/4865149 but with
    // modifications to make it work with Svelte's dynamic element rendering.
    // (The other solution using HTML attributes given in the SO answer, though
    // it's simpler, breaks the links' actual href functionality.)
    $: navLinks = navbarSupportedContent?.querySelectorAll(".nav-item:not(.dropdown)");
    $: bootstrapCollapse = navbarSupportedContent ? Collapse.getOrCreateInstance(navbarSupportedContent, {toggle: false}) : undefined;
    $: navLinks?.forEach((link) => {
           link.addEventListener("click", () => {
               // Checking for "show" class ensures this only runs on mobile, not
               // desktop.
               if (navbarSupportedContent.classList.contains("show")) {
                   bootstrapCollapse.toggle()
               }
           });
    })
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="https://far.ai">
            <img src="/images/far-logo.svg" alt="FAR logo" width="65" height="25" class="d-inline-block align-text-top">
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
.navbar {
    --bs-navbar-active-color: var(--dark-accent-color);
}
.navbar-nav .nav-link.active {
    font-weight: bolder;
}

/* Make dropdown menus open on hover.

   Source for the CSS attributes: https://stackoverflow.com/a/74985391/4865149

   The `min-width` media query disables hover dropdowns when the navbar is
   collapsed. `--bs-breakpoint-lg: 992px` is the breakpoint for Bootstrap's
   `lg` size. We can't use CSS variables in media queries, so we hard code
   "992px".

   The `hover` media query ensures we only apply hover dropdowns when the user's
   device actually supports hovering. E.g., on tablet, the navbar may be
   non-collapsed, but since tablets cannot hover, they should be able to click
   the navbar.

   Bootstrap made a conscious design decision to not have hover dropdowns
   (https://getbootstrap.com/docs/5.0/components/dropdowns/#overview) but for
   this website where we have a bunch of similar content spread throughout
   dropdowns, it's nice to save the user a click via hovering.
 */
@media (min-width: 992px) and (hover: hover) {
    .dropdown:hover > .dropdown-menu {
        display: block;
    }
    .dropdown > .dropdown-toggle:active {
        /* Clicking a hovered dropdown toggles some extra Bootstrap logic that
         * looks weird, so we make it non-clickable. */
        pointer-events: none;
    }
}
</style>
