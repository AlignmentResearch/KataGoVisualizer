<script lang="ts">
    export let section: Map<string, string>;
    import GameList from "./subcomponents/GameList.svelte";
    import GoBoard from "./subcomponents/GoBoard.svelte";

    let sgfPath: string;
</script>

<div class="centerflex" id={section["dir_name"]}>
    <h3>
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
            <p class="annotation-item">
                <b>Victim:</b>
                {@html section["victim"]}
            </p>
            <!-- <p class="annotation-item" style="text-align: right;"> -->
            <p class="annotation-item" style="margin-left: auto;">
                <b>Adversary:</b>
                {@html section["adversary"]}
            </p>
        </div>
    {/if}
    {#if section["figure"]}
        <div class="iframe-container">
        <iframe src="{section["figure"]}" title={section["title"]}></iframe>
        </div>
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
    .iframe-container {
        text-align: center;
    }
    iframe {
        width: min(90vw, 800px);
        height: min(110vw, 800px);
        border: none;
        margin-top: 1em;
    }
    h3 {
      margin-top: 1em;
      margin-bottom: 0.5em;
    }
    .board-wrapper {
        display: flex;
        justify-content: center;
        margin: auto;
        margin-top: 1em;
        margin-bottom: 0px;
        height: calc(min(450px, 95vw) + 9.5em);
        max-width: 90%;
    }
</style>
