<script lang="ts">
    import IconLink from "./subcomponents/IconLink.svelte";

    // Page title separated into phrases where line breaks are preferred.
    export let title: string[];
    // Array of [(Author, their institutions, and an asterisk for equal contribution)
    export let authors: [string, string[], string | undefined][];
    export let cards: Array<any>;
    export let showAuthors: boolean = true;

    const authorToWebsite: Map<string, string> = new Map([
        ["Nora Belrose", "https://twitter.com/norabelrose"],
        ["Michael Dennis", "https://www.michaeldennis.ai/"],
        ["Yawen Duan", "https://scholar.google.com/citations?user=IJQlPvYAAAAJ"],
        ["Adam Gleave", "https://www.gleave.me/"],
        ["Sergey Levine", "https://people.eecs.berkeley.edu/~svlevine/"],
        ["Euan McLean", "https://scholar.google.com/citations?user=ljA17W8AAAAJ"],
        ["Joseph Miller", "https://www.linkedin.com/in/joseph-miller-991479161"],
        ["Kellin Pelrine", "https://kellinpelrine.github.io/"],
        ["Viktor Pogrebniak", "https://www.linkedin.com/in/avtomaton/"],
        ["Stuart Russell", "https://people.eecs.berkeley.edu/~russell/"],
        ["Tom Tseng", "https://www.tomhmtseng.com/"],
        ["Tony Wang", "https://terveisin.tw/"],
    ]);

    const instMap: Map<string, [string, string]> = new Map([
        ["berk", ["UC Berkeley", "https://www.berkeley.edu/"]],
        ["chai", ["Center for Human-Compatible AI", "https://humancompatible.ai/"]],
        ["far", ["FAR AI", "https://far.ai/"]],
        ["mila", ["McGill University; Mila", "https://mila.quebec/en/"]],
        ["mit", ["MIT CSAIL", "https://www.csail.mit.edu/"]],
    ]);
    function getInstitutionToIndex(authors) {
        // Numbers the institutions in the order they appear in the authors
        // list.
        const institutionToIndex = new Map();
        let index = 1;
        for (const author of authors) {
            for (const institution of author[1]) {
                if (!institutionToIndex.has(institution)) {
                    institutionToIndex.set(institution, index);
                    index++;
                }
            }
        }
        return institutionToIndex;
    }
    $: institutionToIndex = getInstitutionToIndex(authors);
</script>
<h1>
    {#each title as line}
        <!-- spans make title breaking nicer -->
        <span class="paper-title-span">{line}</span>
        {@html '&#x20;'}
    {/each}
</h1>
{#if showAuthors}
    <div>
        <div class="authors-list">
            {#each [...authors] as [name, institutions, asterisk], i}
                <a class="authors-list-item" href={authorToWebsite.get(name)} target="_blank">
                    <span class="author-name">{name}</span>{#if asterisk}{asterisk}{/if}
                    <sup>{#each institutions as instKey}{institutionToIndex.get(instKey)}{@html '&#x20;'}{/each}</sup>
                </a>
            {/each}
        </div>
    </div>
    <div>
        <div class="authors-list">
            {#each [...institutionToIndex] as [inst, index]}
                <a class="institution-list-item" href={instMap.get(inst)[1]} target="_blank">
                    <sup>{index}</sup> {instMap.get(inst)[0]}
                </a>
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
    h1 {
      font-weight: 700;
      margin-top: 0.5em;
      text-align: center;
    }
    .paper-title-span {
        display: inline-block;
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
        align-items: center;
        justify-content: center;
        padding: 0;
    }
</style>
