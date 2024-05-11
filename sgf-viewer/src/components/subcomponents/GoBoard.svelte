<script context="module">
    let wgoPlayers = {};
    window.setMove = (dirName, move) => wgoPlayers[dirName].goTo(move);
</script>

<script lang="ts">
    export let dirName: string;
    export let sgfPath: string;

    let goBoardDiv: HTMLElement;
    let wgoPlayer: WGo.BasicPlayer;
    const LAST_MOVE_NUM = 10000;

    function releaseCanvas(canvas) {
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        ctx && ctx.clearRect(0, 0, 1, 1);
    }

    $: if (goBoardDiv && !wgoPlayer) {
        [...goBoardDiv.getElementsByTagName("CANVAS")].forEach(releaseCanvas);

        wgoPlayer = new (<any>window).WGo.BasicPlayer(goBoardDiv, {
            layout: (<any>window).WGo.BasicPlayer.dynamicLayout,
            allowIllegalMoves: true,
            enableWheel: false,
            board: {
                // Options: NORMAL, PAINTED, REALISTIC, GLOW, SHELL, MONO, CR, LB, SQ, TR, MA, SL, SM, outline, mini
                stoneHandler: (<any>window).WGo.Board.drawHandlers.MONO,
                background: "wgo/wood1.jpg",
            },
        });
        wgoPlayers[dirName] = wgoPlayer;
    }
    $: if (wgoPlayer && sgfPath) {
      wgoPlayer.loadSgfFromFile(sgfPath, LAST_MOVE_NUM);
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
