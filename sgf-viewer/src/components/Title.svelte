<script lang="ts">
    import IconLink from "./subcomponents/IconLink.svelte";

    // Page title separated into phrases where line breaks are preferred.
    export let title: string[];
    // Array of [(Author, their institutions, and an asterisk for equal contribution)
    export let authors: [string, string[], string][];
    export let cards: Array<any>;
    export let showAuthors: boolean = true;

    const authorToWebsite: Map<string, string> = new Map([
        ["Tom Tseng", "https://www.tomhmtseng.com/"],
        ["Kellin Pelrine", "https://kellinpelrine.github.io/"],
        ["Euan McLean", "https://www.linkedin.com/in/euan-mclean-12a51358"],
        ["Tony Wang", "https://terveisin.tw/"],
        ["Adam Gleave", "https://www.gleave.me/"],
    ]);

    const instMap: Map<string, [string, string]> = new Map([
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
<div class="paper-title-wrapper">
    <p class="paper-title">
        {#each title as line}
            <!-- spans make title breaking nicer -->
            <span class="paper-title-span">{line}</span>
            {@html '&#x20;'}
        {/each}
    </p>
</div>
{#if showAuthors}
    <div>
        <div class="authors-list">
            {#each [...authors] as [name, institutions, asterisk], i}
                <a class="authors-list-item" href={authorToWebsite.get(name)} target="_blank">
                    <span class="author-name">{name}</span>{#if asterisk.length > 0}{asterisk}{/if}
                    <sup>{#each institutions as instKey}{institutionToIndex.get(instKey)}{@html '&#x20;'}{/each}</sup>
                </a>
            {/each}
        </div>
    </div>
    <div>
        <div class="authors-list">
            {#each [...instMap] as [abbrev, [name, link]]}
                <a class="institution-list-item" href={link} target="_blank"><sup>{institutionToIndex.get(abbrev)}</sup> {name}</a>
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
