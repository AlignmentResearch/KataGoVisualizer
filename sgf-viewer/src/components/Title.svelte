<script lang="ts">
    import { cards } from "../landing-page-content";
    import IconLink from "./subcomponents/IconLink.svelte";

    const authors: Map<string, string> = new Map([
        ["Tony Wang*", "https://terveisin.tw/"],
        ["Adam Gleave*", "https://www.gleave.me/"],
        ["Tom Tseng", "https://www.tomhmtseng.com/"],
        ["Nora Belrose", "https://twitter.com/norabelrose"],
        [
            "Kellin Pelrine",
            "https://scholar.google.com/citations?user=_s2HT_0AAAAJ&hl=en",
        ],
        ["Joseph Miller", "https://far.ai/author/joseph-miller/"],
        [
            "Michael D Dennis",
            "https://scholar.google.com/citations?user=WXXu26AAAAAJ&hl=en&authuser=1",
        ],
        [
            "Yawen Duan",
            "https://scholar.google.com/citations?user=IJQlPvYAAAAJ&hl=en",
        ],
        ["Viktor Pogrebniak", "https://www.linkedin.com/in/avtomaton/"],
        ["Sergey Levine", "https://people.eecs.berkeley.edu/~svlevine/"],
        ["Stuart Russell", "https://people.eecs.berkeley.edu/~russell/"],
    ]);
</script>

<div class="logos">
    <IconLink image="/images/far-logo.png" url="https://far.ai/" alt="FAR Logo" color="#00e0d894" small/>
    <IconLink image="/images/mit-logo.svg" url="https://www.mit.edu/" alt="MIT Logo" color="#a3203497" small/>
    <IconLink image="/images/chai-logo.png" url="https://humancompatible.ai/"
        alt="Center for Human-Compatible AI Logo" color="#77a22e9a" small/>
</div>
<h1 style="text-align: center;">

    Adversarial Policies Beat Superhuman Go AIs
</h1>
<div>
    <div class="authors-list">
        {#each [...authors] as [name, link]}
            <a href={link} target="_blank">{name}</a>
        {/each}
    </div>
</div>
<div class="image-cards">
    {#each cards as card, index (index)}
        <IconLink image={card.image} url={card.url} alt={card.imageName} color={card.color} />
    {/each}
</div>

<style>
    h1 {
        font-size: 2em;
    }
    .authors-list {
        max-width: 700px;
        flex-wrap: wrap;
        gap: 1em;
        margin-bottom: 3vh;
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
        margin-bottom: 1vmin;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
</style>
