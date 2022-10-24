<script lang="ts">
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

<div bind:this={goBoardDiv} />

<style>
  div {
    margin: 1vh;
    margin-bottom: 0vh;
  }
</style>
