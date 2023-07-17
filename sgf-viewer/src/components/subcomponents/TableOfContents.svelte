<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    import { pages } from "../../content";

    export let currentPath: string;

    let topHeadingIdx = 0;
    let pagesPaths = Object.keys(pages);

    $: sections = pagesPaths.includes(currentPath)
        ? pages[currentPath]["content"]
        : [];
    const rmvUrlParams = () =>
        window.history.pushState({}, "", window.location.pathname);

    // Ternary is just to force Svelte to recompute when currentPath changes
    $: anchors = currentPath ? document.querySelectorAll(".subheading") : [];
    $: summaryOffset = pages[currentPath]["description"] ? 1 : 0;

    // Base JumpTo string split by VAR
    $: jumpToBase = (pages[currentPath].jump_to?.base ?? "").split("VAR");
    // Current values of VARs, these are bound to the dropdowns in the jump_to UI
    $: jumpSelect = (pages[currentPath].jump_to?.vars ?? []).map((v) => v[0]);
    // Construct the title to jump to. jumpSelect[i] is undefined for final index.
    // undefined is converted to the empty string by `join()`
    $: jumpTitle = jumpToBase.flatMap((x, i) => [x, jumpSelect[i]]).join("");

    function handleScroll() {
        let visibleAnchors = Array.from(anchors).filter(
            (e) => e.getBoundingClientRect().top < window.innerHeight / 2
        );
        topHeadingIdx = Math.max(visibleAnchors.length - 1, 0);
    }
    onMount(() => window.addEventListener("scroll", handleScroll));
    onDestroy(() => window.removeEventListener("scroll", handleScroll));
</script>

<div class="contents-container">
    {#if pages[currentPath]["jump_to"]}
        <div class="jump-to-container">
            <h3 style="margin: 0;">Jump to</h3>
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
                href={"#" +
                    sections.find((sec) => sec.title == jumpTitle).dir_name}
                on:click={rmvUrlParams}
                style="flex: 1"
            >
                Go
            </a>
        </div>
    {:else}
        <div class="contents">
            <h3>Contents</h3>
            <ol>
                {#if pages[currentPath]["description"]}
                    <li
                        class={topHeadingIdx == 0
                            ? "curr-section"
                            : "other-section"}
                    >
                        <a
                            href={"#summary"}
                            on:click={rmvUrlParams}
                            class={topHeadingIdx == 0
                                ? "curr-section"
                                : "other-section"}>• Summary</a
                        >
                    </li>
                {/if}
                {#each sections as section, i}
                    <li
                        class={topHeadingIdx == i + summaryOffset
                            ? "curr-section"
                            : "other-section"}
                    >
                        <a
                            href={"#" + section["dir_name"]}
                            on:click={rmvUrlParams}
                            class={topHeadingIdx == i + summaryOffset
                                ? "curr-section"
                                : "other-section"}
                        >
                            • {section["title"]}
                        </a>
                    </li>
                {/each}
            </ol>
        </div>
    {/if}
</div>

<style>
    h3 {
        font-weight: normal;
        margin-bottom: 0vh;
        text-align: center;
    }
    ol {
        list-style: none;
        padding-left: 0;
        margin-top: 0;
    }
    li {
        padding: 0px;
        margin: 0.6em;
        transition: all 0.4s;
        text-align: left;
        font-weight: normal;
    }
    a {
        font-weight: normal;
    }
    .curr-section {
        color: var(--accent-color-2);
        transform: translateX(0.5em) scale(1.02);
    }
    .other-section {
        color: grey;
    }
    .jump-to-container {
        flex-direction: column;
        margin-top: 4vh;
        margin-bottom: 4vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2vh;
    }
    .jump-to {
        display: flex;
        justify-content: center;
        border: 3px solid var(--accent-color-2);
        background-color: var(--accent-color-2);
        color: white;
        padding: 6px;
        border-radius: 105px;
        z-index: 998;
    }
    .contents-container {
        position: absolute;
        top: 200px;
        margin-left: calc(((100% - 1439px) / 4) + 8px);
    }
    /* Media queries declarations don't support CSS vars so we have to hardcode */
    @media (max-width: 1500px) {
        .contents-container {
            position: static;
            background-color: transparent;
            display: flex;
            margin-left: 0;
            justify-content: center;
        }
    }
    .contents {
        background-color: white;
        margin-top: 4vh;
        color: black;
        width: 300px;
        display: flex;
        border: 2px solid var(--accent-color-1);
        border-radius: 10px;
        flex-direction: column;
        justify-content: center;
        padding: 1vh;
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
</style>
