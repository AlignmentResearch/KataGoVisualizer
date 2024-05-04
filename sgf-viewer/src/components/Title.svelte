<script lang="ts">
    import { cards } from "../landing-page-content";
    import IconLink from "./subcomponents/IconLink.svelte";

    export let showAuthors: boolean = true;

    const authors: [string, string, string[]][] = [
        ["Tony Wang", "https://terveisin.tw/", ["mit"]],
        ["Adam Gleave", "https://www.gleave.me/", ["far"]],
        ["Tom Tseng", "https://www.tomhmtseng.com/", ["far"]],
        [
            "Kellin Pelrine",
            "https://scholar.google.com/citations?user=_s2HT_0AAAAJ&hl=en",
            ["far", "mila"]
        ],
        ["Nora Belrose", "https://twitter.com/norabelrose", ["far"]],
        ["Joseph Miller", "https://far.ai/author/joseph-miller/", ["far"]],
        [
            "Michael Dennis",
            "https://scholar.google.com/citations?user=WXXu26AAAAAJ&hl=en&authuser=1",
            ["berk", "chai"],
        ],
        [
            "Yawen Duan",
            "https://scholar.google.com/citations?user=IJQlPvYAAAAJ&hl=en",
            ["berk", "chai"],
        ],
        ["Viktor Pogrebniak", "https://www.linkedin.com/in/avtomaton/", []],
        ["Sergey Levine", "https://people.eecs.berkeley.edu/~svlevine/", ["berk"]],
        ["Stuart Russell", "https://people.eecs.berkeley.edu/~russell/", ["berk", "chai"]],
    ];

    const instMap: Map<string, [string, string, string]> = new Map([
        ["mit", ["1", "MIT CSAIL", "https://www.csail.mit.edu/"]],
        ["far", ["2", "FAR AI", "https://far.ai/"]],
        ["mila", ["3", "McGill University; Mila", "https://mila.quebec/en/"]],
        ["berk", ["4", "UC Berkeley", "https://www.berkeley.edu/"]],
        ["chai", ["5", "Center for Human-Compatible AI", "https://humancompatible.ai/"]],
    ]);
</script>
<p class="paper-title">
    <!-- spans make title breaking nicer -->
    <span class="paper-title-span">Adversarial Policies Beat</span>
    <span class="paper-title-span">Superhuman Go AIs</span>
</p>
{#if showAuthors}
    <div>
        <div class="authors-list">
            {#each [...authors] as [name, link, institutions], i}
                <a class="authors-list-item" href={link} target="_blank">
                    <span class="author-name">{name}</span>{#if i <= 1}*{/if}<sup>{#if i > 1}{@html '&#x20;'}{:else}&thinsp;{/if}{#each institutions as instKey}{instMap.get(instKey)[0]}{@html '&#x20;'}{/each}</sup>
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
    .paper-title {
        font-size: 2em;
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
