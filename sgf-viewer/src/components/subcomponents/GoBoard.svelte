<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let dirName: string;

    let goBoardDiv: HTMLElement;
    const wgoPlayer: Writable<WGo.BasicPlayer> = getContext("wgoPlayer");

    function releaseCanvas(canvas) {
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        ctx && ctx.clearRect(0, 0, 1, 1);
    }

    $: if (goBoardDiv && !$wgoPlayer) {
        [...goBoardDiv.getElementsByTagName("CANVAS")].forEach(releaseCanvas);

        $wgoPlayer = new (<any>window).WGo.BasicPlayer(goBoardDiv, {
            layout: (<any>window).WGo.BasicPlayer.dynamicLayout,
            allowIllegalMoves: true,
            enableWheel: false,
            board: {
                // Options: NORMAL, PAINTED, REALISTIC, GLOW, SHELL, MONO, CR, LB, SQ, TR, MA, SL, SM, outline, mini
                stoneHandler: (<any>window).WGo.Board.drawHandlers.MONO,
                background: "wgo/wood1.jpg",
            },
        });
    }
</script>

<div id={`${dirName}-board`} bind:this={goBoardDiv} class="go-board" />

<style>
    div {
        scroll-margin-top: 12em;
    }
    /* These values override changes in css/sanitize that break WGo's appearance */
    :global(.wgo-board) {
        background-repeat: repeat;
    }
    :global(.wgo-player-mn-value) {
        box-sizing: content-box;
    }
</style>
