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
    .authors-list {
        flex-wrap: wrap;
        gap: 0.5em;
        margin-bottom: 0.5em;
    }
    .authors-list-item {
        font-weight: 300;
        font-size: 18px;
        margin-left: 1rem;
        margin-right: 1rem;
        color: #000000;
    }
    .author-name:hover {
        text-decoration: underline;
    }
    .authors-list-item sup {
        font-size: 9px;
    }
    .institution-list-item {
        font-weight: 300;
        font-size: 14.5px;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .institution-list-item sup {
        font-size: 9px;
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
