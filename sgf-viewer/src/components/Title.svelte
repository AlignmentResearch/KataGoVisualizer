<script lang="ts">
    import { cards } from "../defense/landing-page-content";
    import IconLink from "./subcomponents/IconLink.svelte";

    export let showAuthors: boolean = true;

    const authors: [string, string, string[]][] = [
        ["Tom Tseng", "https://www.tomhmtseng.com/", ["far"]],
        ["Kellin Pelrine", "https://kellinpelrine.github.io/", ["far", "mila"]],
        ["Euan McLean", "https://www.linkedin.com/in/euan-mclean-12a51358", ["far"]],
        ["Tony Wang", "https://terveisin.tw/", ["mit"]],
        ["Adam Gleave", "https://www.gleave.me/", ["far"]],
    ];

    const instMap: Map<string, [string, string, string]> = new Map([
        ["far", ["1", "FAR AI", "https://far.ai/"]],
        ["mila", ["2", "McGill University; Mila", "https://mila.quebec/en/"]],
        ["mit", ["3", "MIT CSAIL", "https://www.csail.mit.edu/"]],
    ]);
</script>
<div class="paper-title-wrapper">
    <p class="paper-title">
        <!-- spans make title breaking nicer -->
        <span class="paper-title-span">The challenges of training</span>
        <span class="paper-title-span">adversarially robust Go AIs</span>
    </p>
</div>
{#if showAuthors}
    <div>
        <div class="authors-list">
            {#each [...authors] as [name, link, institutions], i}
                <a class="authors-list-item" href={link} target="_blank">
                    <span class="author-name">{name}</span><sup>{@html '&#x20;'}{#each institutions as instKey}{instMap.get(instKey)[0]}{@html '&#x20;'}{/each}</sup>
                </a>
            {/each}
        </div>
    </div>
    <div>
        <div class="authors-list">
            {#each [...instMap] as [abbrev, [index, name, link]]}
                <a class="institution-list-item" href={link} target="_blank"><sup>{index}</sup> {name}</a>
            {/each}
        </div>
    </div>
{/if}
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
    .paper-title-wrapper {
        margin-left: 1.5em;
        margin-right: 1.5em;
    }
    .paper-title {
        font-size: 44px;
        font-weight: 700;
        line-height: 1.3em;
        margin-top: 0.5em;
        margin-bottom: 0.4em;
        text-align: center;
    }
    .paper-title-span {
        display: inline-block;
    }
    .authors-list {
        max-width: 900px;
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
    .logos {
        display: flex;
        justify-content: center;
        gap: 0.9vmin;
        margin-top: 1.2vmin;
        margin-bottom: -2vh;
    }
    .image-cards {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.2rem;
        margin-bottom: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
</style>
