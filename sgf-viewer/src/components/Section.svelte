<script lang="ts">
    export let section: Map<string, string>;
    import GameList from "./subcomponents/GameList.svelte";
    import GoBoard from "./subcomponents/GoBoard.svelte";

    let sgfPath: string;
</script>

<h3 id={section["dir_name"]}>
    {@html section["title"]}
</h3>
<div class="text-wrapper">
    {#each section["description"] as description}
        <p>{@html description}</p>
    {/each}
</div>
{#if section["paths"] || section["paths_with_line_num"]}
    <div class="board-wrapper">
        <GoBoard dirName={section["dir_name"]} {sgfPath} />
    </div>
    <div class="d-flex m-2">
        <p class="me-auto m-2">
            <b>Victim:</b>
            {@html section["victim"]}
        </p>
        <p class="m-2 text-end">
            <b>Adversary:</b>
            {@html section["adversary"]}
        </p>
    </div>
    <GameList dirName={section["dir_name"]} bind:sgfPath />
{/if}
{#if section["figure"]}
    <div class="iframe-container">
        <iframe src="{section["figure"]}" title={section["title"]}></iframe>
    </div>
{/if}
{#if section["discussion"]}
    <p>{section["discussion"]}</p>
{/if}

<style>
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
        max-width: 98%;
    }
</style>
