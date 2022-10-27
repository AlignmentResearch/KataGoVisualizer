<script lang="ts">
  export let dirName: string;
  export let sgfPath: string;
  let goBoardDiv: HTMLElement;
  $: if (goBoardDiv)
    new (<any>window).WGo.BasicPlayer(goBoardDiv, {
      sgfFile: sgfPath,
      layout: (<any>window).WGo.BasicPlayer.dynamicLayout,
      allowIllegalMoves: true,
      move: 9999,
    });
</script>

<div id={`${dirName}-board`} bind:this={goBoardDiv} />

<style>
  div {
    scroll-margin-top: 12em;
    margin: 0vh;
    margin-top: 1vh;
  }
</style>
