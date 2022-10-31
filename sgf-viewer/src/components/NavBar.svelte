<script lang="ts">
    import { fade } from "svelte/transition";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaFile from "svelte-icons/fa/FaFile.svelte";
    import NavButtons from "./NavButtons.svelte";
    import { pages } from "../content";
    export let currentPath: string;
    export let navBarElem: HTMLElement;
    let contentsTitle: HTMLElement;
    let pagesPaths = Object.keys(pages);
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
</script>

<div class="nav-bar" bind:this={navBarElem}>
    <div class="icons spaced">
        <a
            href="https://github.com/HumanCompatibleAI/go_attack"
            target="_blank"
            class="icon-link"
        >
            <FaGithub />
        </a>
        <a
            href="https://tinyurl.com/2p8m7edv"
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
                onClick={() => {
                    contentsTitle.scrollIntoView(true);
                    currentPath = page;
                    history.pushState({}, "", currentPath);
                }}
            />
        {/each}
    </div>
    <div class="spaced" />
</div>
<div class="contents" bind:this={contentsTitle}>
    <h3 style="text-align: center;">Contents</h3>
    <ol in:fade>
        {#if pages[currentPath]["description"]}
            <li>
                <a href={"#summary"}>Summary</a>
            </li>
        {/if}
        {#each sections as section, i}
            <li>
                <a href={"#" + section["dir_name"]}>{section["title"]}</a>
            </li>
        {/each}
    </ol>
</div>

<style>
    .icons {
        display: flex;
        gap: 2vw;
        align-items: center;
        z-index: 99999;
    }
    .icon-link {
        display: flex;
        align-items: center;
        min-width: 30px;
        height: 45px;
        color: white;
        background-color: var(--accent-color-1);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .spaced {
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
        justify-content: center;
    }
    .nav-bar {
        position: sticky;
        top: 0px;
        z-index: 999;
        padding: 0px;
        display: flex;
        justify-content: center;
        background-color: var(--accent-color-1);
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .contents {
        scroll-margin-top: 4em;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 1vh;
    }
    ol {
        list-style: none;
        padding-left: 0;
        text-align: center;
    }
    li {
        padding: 0px;
        margin: 0px;
    }
    h3 {
        margin: 0px;
        margin-top: 0.2em;
    }
</style>
