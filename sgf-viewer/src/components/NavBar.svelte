<script lang="ts">
    import { fade } from "svelte/transition";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaFile from "svelte-icons/fa/FaFile.svelte";
    import NavButtons from "./NavButtons.svelte";
    import { pages } from "../content";
    export let currentPath: string;
    let pagesPaths = Object.keys(pages);
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
</script>

<div class="icons">
    <a
        href="https://github.com/HumanCompatibleAI/go_attack"
        target="_blank"
        class="icon-link"
    >
        <FaGithub />
    </a>
    <a href="https://tinyurl.com/2p8m7edv" target="_blank" class="icon-link">
        <FaFile />
    </a>
</div>
<div class="sticky">
    <div class="nav-bar">
        {#each pagesPaths as page}
            <NavButtons
                label={pages[page]["title"]}
                tabsId="tabs"
                selected={page === currentPath}
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    currentPath = page;
                    history.pushState({}, "", currentPath);
                }}
            />
        {/each}
    </div>
    <div class="contents">
        <h3 style="text-align: center;">Contents</h3>
        <ol in:fade>
            {#each sections as section, i}
                <li>
                    <a href={"#" + section["dir_name"]}>{section["title"]}</a>
                </li>
            {/each}
        </ol>
    </div>
</div>

<style>
    .icons {
        display: flex;
        height: 40px;
        position: fixed;
        z-index: 99999;
        gap: 10px;
        top: 10px;
        left: 10px;
    }
    .icon-link {
        width: 40px;
        height: 40px;
        color: white;
        background-color: var(--accent-color-1);
        padding: 3px;
        border-radius: 8px;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .icon-link:hover {
        scale: 1.1;
        color: var(--accent-color-4);
    }
    .nav-bar {
        display: flex;
        justify-content: center;
        background-color: var(--accent-color-1);
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .sticky {
        position: sticky;
        top: -5px;
        z-index: 999;
        padding: 0px;
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
