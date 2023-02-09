<script lang="ts">
    import { pages } from "../content";
    import NavButtons from "./subcomponents/NavButtons.svelte";
    import { fade } from "svelte/transition";
    import FaGithub from "svelte-icons/fa/FaGithub.svelte";
    import FaFile from "svelte-icons/fa/FaFile.svelte";

    export let currentPath: string;
    export let navBarElem: HTMLElement;

    let pagesPaths = Object.keys(pages);
    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
    const rmvUrlParams = () =>
        window.history.pushState({}, "", window.location.pathname);

    $: jumpToBase = (pages[currentPath].jump_to?.base ?? "").split("VAR");
    $: jumpSelect = (pages[currentPath].jump_to?.vars ?? []).map(v => v[0]);
    $: jumpTitle = jumpToBase.flatMap((x, i) => [x, jumpSelect[i]]).join('')
</script>

<div class="nav-bar" bind:this={navBarElem}>
    <div class="icons flex-grow-symmetric">
        <a
            href="https://github.com/HumanCompatibleAI/go_attack"
            target="_blank"
            class="icon-link"
        >
            <FaGithub />
        </a>
        <a
            href="/pdfs/go_attack_paper.pdf"
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
{#if pages[currentPath]["jump_to"]}
    <div class="jump-to-div" id="contents">
        <h3 class="contents-title" style="text-align: right; flex: 1">Jump to</h3>
        <div class="jump-to">
            {#each jumpToBase.slice(0, -1) as jumpToSegment, i}
                <h3>{jumpToSegment}</h3>
                <select bind:value={jumpSelect[i]}>
                    {#each pages[currentPath].jump_to.vars[i] as val}
                        <option value={val}>{val}</option>
                    {/each}
                </select>
            {/each}
            <h3>{jumpToBase[jumpToBase.length - 1]}</h3>
        </div>
        <a
            href={"#" + sections.find(sec => sec.title == jumpTitle).dir_name}
            on:click={rmvUrlParams}
            style="flex: 1"
        >
            Go
        </a>
    </div>
{:else}
    <div class="contents">
        <h3 id="contents" class="contents-title">Contents</h3>
        <ol in:fade>
            {#if pages[currentPath]["description"]}
                <li>
                    <a href={"#summary"} on:click={rmvUrlParams}>• Summary</a>
                </li>
            {/if}
            {#each sections as section}
                <li>
                    <a href={"#" + section["dir_name"]} on:click={rmvUrlParams}>
                        • {section["title"]}
                    </a>
                </li>
            {/each}
        </ol>
    </div>
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
    .jump-to-div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1vh;
    }
    .jump-to {
        display: flex;
        justify-content: center;
        border: 3px solid var(--accent-color-2);
        background-color: var(--accent-color-2);
        color: white;
        margin: 2vh;
        padding: 13px;
        border-radius: 105px;
        z-index: 998;
    }
    select {
        border: 0px;
        border-bottom: 2px solid var(--accent-color-2);
        background-color: white;
        margin: 0.7em;
        color: black;
        border-radius: 8px;
        text-align: center;
        font-weight: bold;
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
