<script>
    import Card from "./subcomponents/Card.svelte";
    import { cards } from "../landing-page-content";
    import IconLink from "./subcomponents/IconLink.svelte";
    console.log(cards);

</script>
<div class="image-cards">
    {#each cards as card, index (index)}
        <!-- <Card imgPath={card.image} imgName={card.imageName} description={card.description} url={card.url} /> -->
        <IconLink image={card.image} url={card.url} alt={card.imageName} />
    {/each}
</div>


<style>
    .image-cards {
        display: flex;
        flex-wrap: wrap;
        /* minmax min matches width of the image cards */
        /* grid-template-columns: repeat(auto-fill, minmax(min(150px, 19vw), 1fr)); */
        /* grid-template-columns: repeat(auto-fit, minmax(min(150px, 19vw), 1fr)); */
        /* grid-gap: 1.5vmin; */
        margin: 2vmin;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
</style>