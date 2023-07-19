<script lang="ts">
    export let section: Map<string, string>;
    import GameList from "./subcomponents/GameList.svelte";
    import GoBoard from "./subcomponents/GoBoard.svelte";

    let sgfPath: string;
</script>

<div class="centerflex" id={section["dir_name"]}>
    <h3 class="subheading">
        {section["title"]}
    </h3>
    <div class="text-wrapper">
        {#each section["description"] as description}
            <p>{@html description}</p>
        {/each}
    </div>
    {#if section["paths"] || section["paths_with_line_num"]}
        <div style="max-width: 100%;">
            <GameList dirName={section["dir_name"]} bind:sgfPath />
            <div class="board-wrapper">
                <GoBoard dirName={section["dir_name"]} {sgfPath} />
            </div>
        </div>
        <div class="annotation">
            <p class="annotation-item" style="text-align: left;">
                <b>Victim:</b>
                {@html section["victim"]}
            </p>
            <p class="annotation-item" style="text-align: right;">
                <b>Adversary:</b>
                {@html section["adversary"]}
            </p>
        </div>
    {/if}
    {#if section["figure"]}
        <iframe src="{section["figure"]}" title={section["title"]}></iframe>
    {/if}
    {#if section["discussion"]}
        <p>{section["discussion"]}</p>
    {/if}
</div>

<style>
    .annotation {
        display: flex;
        position: relative;
        margin-top: 0.5rem;
        margin-bottom: 0.1rem;
    }
    .annotation-item {
        align-self: flex-start;
        margin-left: 2rem;
        margin-right: 2rem;
        margin-bottom: 2rem;
    }
    iframe {
        width: min(90vw, 800px);
        height: min(110vw, 800px);
        border: none;
        margin-top: 1em;
    }
    .subheading {
        top: calc(var(--scroll-margin) + 1vh);
        position: sticky;
        background-color: var(--accent-color-2);
        color: white;
        text-align: center;
        font-weight: normal;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.75);
        padding: 13px;
        border-radius: 105px;
        z-index: 998;
    }
    .centerflex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .text-wrapper {
        width: min(90vw, 800px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 0.5rem;
    }
    p {
        font-size: 18px;
        align-self: flex-start;
        max-width: min(90vw, 800px);
        text-align: justify;
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
    }
    .board-wrapper {
        display: flex;
        justify-content: center;
        margin: auto;
        margin-top: 1em;
        margin-bottom: 0px;
        height: calc(min(450px, 95vw) + 9.5em);
        max-width: 98%;
    }
</style>
