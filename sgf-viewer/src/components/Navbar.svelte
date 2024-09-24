<script lang="ts">
    import { Collapse } from "bootstrap";

    import { navbarItems } from "../navbar-items";
    import NavbarItem from "./subcomponents/NavbarItem.svelte";

    export let currentPath: string;

    let navbarSupportedContent;
    // Make the navbar collapse when a non-dropdown link is clicked on mobile.
    // This is needed because we have a single-page app, and our links don't
    // actually open a new page.
    // Based on https://stackoverflow.com/a/42401686/4865149 but with
    // modifications to make it work with Svelte's dynamic element rendering.
    // (The other solution using HTML attributes given in the SO answer, though
    // it's simpler, breaks the links' actual href functionality.)
    $: navLinks = navbarSupportedContent?.querySelectorAll("a.dropdown-item");
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
            <img src="/images/far-logo.svg" alt="FAR logo" width="115" height="20" class="d-inline-block align-baseline">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" bind:this={navbarSupportedContent}>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#each navbarItems as navbarItem}
                    <NavbarItem bind:currentPath item={navbarItem} />
                {/each}
            </ul>
        </div>
    </div>
</nav>

<style>
    .navbar {
        --bs-navbar-active-color: var(--deep-navy);
        border-bottom: 1px solid white;
    }
    .bg-light {
        background-color: var(--bs-body-bg) !important;
    }
</style>
