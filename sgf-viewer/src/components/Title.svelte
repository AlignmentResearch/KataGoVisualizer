<script lang="ts">
    import { cards } from "../landing-page-content";
    import IconLink from "./subcomponents/IconLink.svelte";
</script>
<h1>
    Adversarial policies in Go
</h1>
<div class="image-cards">
    {#each cards as card, index (index)}
        <IconLink
            image={card.image}
            url={card.url}
            alt={card.imageName}
            color={card.color}
            border={card.border}
            description={card.description}
        />
    {/each}
</div>

<style>
    h1 {
      font-weight: 700;
      margin-top: 0.5em;
      text-align: center;
    }
    div {
        display: flex;
        justify-content: center;
    }
    .image-cards {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1.5rem;
        justify-content: center;
        padding: 0;
    }
</style>
