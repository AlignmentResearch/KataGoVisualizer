<script lang="ts">
    import { pages } from "../content";
    import NavButtons from "./subcomponents/NavButtons.svelte";
    import TableOfContents from "./subcomponents/TableOfContents.svelte";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaFile from "svelte-icons/fa/FaFile.svelte";
    import TiHome from "svelte-icons/ti/TiHome.svelte";
    import IoIosMenu from "svelte-icons/io/IoIosMenu.svelte";

    export let currentPath: string;
    export let navBarElem: HTMLElement;

    const menuNavigationWidth = 800;
    const contentsFloatWidth = 1500;

    let pagesPaths = Object.keys(pages);
    let innerWidth;
    let menuOpen = false;
</script>

<svelte:window bind:innerWidth />
<!-- Empty anchor target. Named for link backwards compatibility. -->
<div id="contents" />
<div class="nav-bar-container">
    {#if innerWidth > menuNavigationWidth}
        <div class="nav-bar" bind:this={navBarElem}>
            <!-- <div class="icons flex-grow-symmetric">
                <a
                    class="icon-link"
                    on:click={() => {
                        currentPath = "";
                        history.pushState({}, "", currentPath);
                    }}
                    href="#"
                >
                    <TiHome />
                </a>
            </div> -->
            <div class="pages">
                {#each pagesPaths as page}
                    <NavButtons
                        label={pages[page]["title"]}
                        tabsId="tabs"
                        selected={page === currentPath}
                        href="#contents"
                        onClick={() => {
                            currentPath = page;
                            history.pushState({}, "", currentPath + "#contents");
                        }}
                    />
                {/each}
            </div>
            <!-- <div class="flex-grow-symmetric" /> -->
        </div>
    {:else}
        <div class="menu-bar" bind:this={navBarElem}>
            <!-- <div class="flex-grow-symmetric" /> -->
            <!-- <p class="menu-selected">{pages[currentPath]["title"]}</p> -->
            <!-- <div class="menu-burger flex-grow-symmetric">
                <div >
                    <a on:click={() => menuOpen = !menuOpen}>
                        <IoIosMenu />
                    </a>
                </div>
            </div> -->
            <!-- {#if menuOpen} -->
            <select
                bind:value={currentPath}
                on:change={() => {
                    history.pushState({}, "", currentPath);
                    location.replace("#contents");
                }}
            >
                {#each pagesPaths as page}
                    <option value={page}>{pages[page]["title"]}</option>
                {/each}
            </select>
            <!-- {/if} -->
        </div>
    {/if}
    {#if innerWidth > contentsFloatWidth}
        <TableOfContents {currentPath} />
    {/if}
</div>
{#if innerWidth <= contentsFloatWidth}
    <TableOfContents {currentPath} />
{/if}

<style>
    #contents {
        scroll-margin-top: 0px;
    }
    select {
        appearance: none;
        background: url("/images/menu-burger.svg") no-repeat 98%;
        background-size: 2.5rem;
        text-align: center;
        font-size: 1.5em;
        height: 4rem;
        width: 100%;
    }
    select::after {
        appearance: none;
        color: red;
        /* content: "\f0c9"; */
        /* font-family: FontAwesome; */
    }
    /* select:before {
        content: "";
        background: url("/images/menu-burge;
        font-size: 1.5em;
        margin-right: 0.5em;
    } */
    .menu-selected {
        margin: auto;
        font-size: 1.5em;
        color: var(--accent-color-2);
    }
    .menu-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2px solid var(--accent-color-1);
        border-bottom: 2px solid var(--accent-color-1);
        background-color: white;
    }
    .menu-burger {
        /* width: 40px; */
        height: 100%;
        /* margin-left: auto; */
        display: flex;
        justify-content: flex-end;
        color: var(--accent-color-1);
        aspect-ratio: 1 / 1;
    }
    .icons {
        display: flex;
        gap: 1em;
        align-items: center;
        padding: 0.5em;
        z-index: 99999;
    }
    .icon-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        max-width: 40px;
        min-width: 30px;
        height: 50px;
        color: var(--accent-color-1);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .flex-grow-symmetric {
        flex: 1;
        padding-left: 3vh;
        padding-right: 4vh;
    }
    .icon-link:hover {
        scale: 1.1;
        color: var(--accent-color-2);
    }
    .pages {
        display: flex;
        gap: 1vw;
        justify-content: center;
    }
    .nav-bar-container {
        width: 100%;
        position: sticky;
        top: 0px;
        z-index: 999;
        margin-bottom: 1.5em;
    }
    .nav-bar {
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0px;
        display: flex;
        /* flex-wrap: wrap; */
        justify-content: center;
        align-items: center;
        background-color: rgb(255, 255, 255);
        box-shadow: 4px 1px 4px 0px rgba(182, 182, 182, 0.75);

        /* Add a top and bottom border */
        border-top: 2px solid var(--accent-color-1);
        border-bottom: 2px solid var(--accent-color-1);
    }
</style>
