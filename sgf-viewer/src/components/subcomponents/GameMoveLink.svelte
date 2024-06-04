<!-- Link that updates the Go player game and move. -->
<script lang="ts">
    import { getContext } from "svelte";

    export let dirName: string;
    export let gameIndex: number;
    export let move: number;
    export let text: string;

    const updateGame = getContext("updateGame");
    const onClick = () => $updateGame(gameIndex, move);
</script>

<a class="clickable" on:click={onClick}>{text}</a>
