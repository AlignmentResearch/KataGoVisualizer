<script lang="ts">
    import { pages } from "../content";
    import NavButtons from "./subcomponents/NavButtons.svelte";
    import TableOfContents from "./subcomponents/TableOfContents.svelte";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaFile from "svelte-icons/fa/FaFile.svelte";

    export let currentPath: string;
    export let navBarElem: HTMLElement;

    const contentsFloatWidth = 1439;

    let pagesPaths = Object.keys(pages);
    let innerWidth;
</script>

<svelte:window bind:innerWidth />
<div class="nav-bar-container">
    <div class="nav-bar" bind:this={navBarElem}>
        <div class="icons flex-grow-symmetric">
            <a
                href="https://github.com/AlignmentResearch/go_attack"
                target="_blank"
                class="icon-link"
            >
                <FaGithub />
            </a>
            <a
                href="https://arxiv.org/abs/2211.00241"
                target="_blank"
                class="icon-link"
            >
                <FaFile />
            </a>
        </div>
        <div class="pages">
            {#each pagesPaths as page}
                <NavButtons
                    label={pages[page]["title"]}
                    tabsId="tabs"
                    selected={page === currentPath}
                    href="#contents"
                    onClick={() => {
                        currentPath = page;
                        history.pushState({}, "", currentPath);
                    }}
                />
            {/each}
        </div>
        <div class="flex-grow-symmetric" />
    </div>
    {#if innerWidth > contentsFloatWidth}
        <TableOfContents {currentPath} />
    {/if}
</div>
{#if innerWidth <= contentsFloatWidth}
    <TableOfContents {currentPath} />
{/if}

<style>
    .icons {
        display: flex;
        gap: 1em;
        align-items: center;
        padding: 0.5em;
        z-index: 99999;
    }
    .icon-link {
        display: flex;
        align-items: center;
        max-width: 50px;
        min-width: 30px;
        height: 50px;
        color: white;
        background-color: var(--accent-color-1);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .flex-grow-symmetric {
        flex: 1;
        padding-left: 1vh;
        padding-right: 1vh;
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
    }
    .nav-bar {
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0px;
        display: flex;
        justify-content: space-between;
        background-color: var(--accent-color-1);
    }
</style>
