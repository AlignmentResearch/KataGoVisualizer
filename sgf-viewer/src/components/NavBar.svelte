<script lang="ts">
    import { pages } from "../content";
    import NavButtons from "./subcomponents/NavButtons.svelte";
    import { fade } from "svelte/transition";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaFile from "svelte-icons/fa/FaFile.svelte";

    export let currentPath: string;
    export let navBarElem: HTMLElement;

    let contentsTitle: HTMLElement;
    let pagesPaths = Object.keys(pages);
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
    const rmvUrlParams = () =>
        window.history.pushState({}, "", window.location.pathname);
</script>

<div class="nav-bar" bind:this={navBarElem}>
    <!-- <div class="icons flex-grow-symmetric">
        <a
            href="https://github.com/HumanCompatibleAI/go_attack"
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
                    history.pushState({}, "", currentPath);
                }}
            />
        {/each}
    </div>
    <!-- <div class="flex-grow-symmetric" /> -->
</div>
<div class="contents" bind:this={contentsTitle}>
    <h3 id="contents" class="contents-title">Contents</h3>
    <ol in:fade>
        {#if pages[currentPath]["description"]}
            <li>
                <a href={"#summary"} on:click={rmvUrlParams}>• Summary</a>
            </li>
        {/if}
        {#each sections as section}
            <li>
                <a href={"#" + section["dir_name"]} on:click={rmvUrlParams}
                    >• {section["title"]}</a
                >
            </li>
        {/each}
    </ol>
</div>

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
    .nav-bar {
        position: sticky;
        top: 0px;
        z-index: 999;
        padding: 0px;
        display: flex;
        justify-content: center;
        align-items: stretch;
        background-color: var(--accent-color-1);
    }
    .contents-title {
        margin: 0px;
        margin-top: 0.2em;
    }
    .contents {
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
        text-align: left;
        margin-top: 0;
    }
    li {
        padding: 0px;
        margin: 0.6em;
    }
</style>
