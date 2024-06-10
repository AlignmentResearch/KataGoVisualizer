<!-- Renders a section description.

  MoveLink tags in the description are parsed and replaced with the actual Svelte
  component GameMoveLink handling move links.

  This is a bit hacky but it allows us to keep our current architecture of
  having all content and games stored as text in content.ts.
-->
<script lang="ts">
    import GameMoveLink from "./GameMoveLink.svelte";

    export let dirName: string;
    export let description: Array<string>;

    // Format: <MoveLink game={game number} move={move number}>{link text}</MoveLink>
    const parseMoveLinkRegex = /<MoveLink (?:game=(\d+) )?move=(\d+)>(.+?)<\/MoveLink>/;
    // split() splices capture groups into its result, so we have a different
    // regex moveLinkRegex capturing the whole <MoveLink> tag for split(). Then
    // we can run parseMoveLinkRegex on the tag to extract its arguments.
    const moveLinkRegex = /(<MoveLink.+?>.+?<\/MoveLink>)/;
    $: splitDescription = description.map(
        (paragraph) => paragraph.split(moveLinkRegex)
    );
</script>

{#each splitDescription as paragraph}
    <p>
        {#each paragraph as segment}
            {@const match = segment.match(parseMoveLinkRegex)}
            {#if match}
                <GameMoveLink
                    {dirName}
                    gameIndex={match[1] === undefined ? 0 : parseInt(match[1])}
                    move={parseInt(match[2])}
                    text={match[3]}
                />
            {:else}
                {@html segment}
            {/if}
        {/each}
    </p>
{/each}
