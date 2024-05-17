<script lang="ts">
  import { pages } from "../../content";
  import { NavbarItemEnum } from "../../navbar-items";

  export let currentPath: string;
  export let item: Record<string, any>;
  export let isActive: boolean;
  export let isDropdownDescendant: boolean = false;

  // The navbar item is active if it or any of its descendants are the current
  // page.
  let childrenActive: boolean[] = [];
  $: if (!childrenActive && "items" in item) {
      childrenActive = item["items"].map(_ => false) ?? [];
  }
  $: isActive = item["destination"] === currentPath || childrenActive.some(x => x);
</script>

{#if item["type"] === NavbarItemEnum.Dropdown}
    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            class:active={isActive}
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {item["title"]}
        </a>
        <ul class="dropdown-menu">
            {#each item["items"] as dropdownItem, i}
                <svelte:self
                    bind:currentPath
                    item={dropdownItem}
                    bind:isActive={childrenActive[i]}
                    isDropdownDescendant={true}
                />
            {/each}
        </ul>
    </li>
{:else if item["type"] === NavbarItemEnum.DropdownDivider}
    <li><hr class="dropdown-divider"></li>
{:else if item["type"] === NavbarItemEnum.DropdownText}
    <p class="px-2 text-center">{@html item["text"]}</p>
{:else if item["type"] === NavbarItemEnum.Link}
    {@const page = item["destination"]}
    <li class:nav-item={!isDropdownDescendant}>
        <a
            class:nav-link={!isDropdownDescendant}
            class:dropdown-item={isDropdownDescendant}
            class:active={isActive}
            href="#contents"
            on:click={() => {
               currentPath = page;
               history.pushState({}, "", currentPath + "#contents");
            }}
        >
            {item["title"] ?? pages[page]["title"]}
        </a>
    </li>
{/if}

<style>
    .nav-link.active {
        font-weight: bolder;
    }
    .dropdown-item {
        --bs-dropdown-link-color: var(--bs-nav-link-color);
    }
    /* Make dropdown menus open on hover.

       Source for the CSS attributes:
       https://stackoverflow.com/a/74985391/4865149

       The `min-width` media query disables hover dropdowns when the navbar is
       collapsed. `--bs-breakpoint-lg: 992px` is the breakpoint for Bootstrap's
       `lg` size. We can't use CSS variables in media queries, so we hard code
       "992px".

       The `hover` media query ensures we only apply hover dropdowns when the
       user's device actually supports hovering. E.g., on tablet, the navbar may
       be non-collapsed, but since tablets cannot hover, they should be able to
       click the navbar.

       Bootstrap made a conscious design decision to not have hover dropdowns
       (https://getbootstrap.com/docs/5.0/components/dropdowns/#overview) but
       for this website where we have a bunch of similar content spread
       throughout dropdowns, it's nice to save the user a click via hovering.
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
