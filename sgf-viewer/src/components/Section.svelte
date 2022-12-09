<script lang="ts">
    import { fade } from "svelte/transition";
    export let section: Map<string, string>;
    import GameList from "./subcomponents/GameList.svelte";
    import GoBoard from "./subcomponents/GoBoard.svelte";

    let sgfPath: string;
</script>

<div class="centerflex" in:fade>
    <h3 id={section["dir_name"]} class="subheading">
        {section["title"]}
    </h3>
    {#each section["description"] as description}
        <p>{@html description}</p>
    {/each}
    <div style="max-width: 100%;">
        <GameList dirName={section["dir_name"]} bind:sgfPath />
        <div class="board-wrapper">
            <GoBoard dirName={section["dir_name"]} {sgfPath} />
        </div>
    </div>
    <div class="annotation">
        <p class="annotation-item" style="text-align: left;">
            <b>Victim:</b>
            {section["victim"]}
        </p>
        <p class="annotation-item" style="text-align: right;">
            <b>Adversary:</b>
            {section["adversary"]}
        </p>
    </div>
    {#if section["discussion"]}
        <p>{section["discussion"]}</p>
    {/if}
</div>

<style>
    .annotation {
        display: flex;
        position: relative;
        top: -3vh;
        margin-top: 2vw;
    }
    .annotation-item {
        align-self: flex-start;
        margin-bottom: 1vh;
    }
    .subheading {
        top: calc(var(--scroll-margin) + 1vh);
        position: sticky;
        background-color: var(--accent-color-2);
        color: white;
        margin: 2vh;
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
    p {
        font-size: 18px;
        align-self: center;
        margin: 0.5vw;
        max-width: min(90vw, 800px);
        text-align: justify;
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
