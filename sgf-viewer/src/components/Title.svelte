<script lang="ts">
    import { fade } from "svelte/transition";
    const authors: Map<string, string> = new Map([
        ["Tony Wang", "https://terveisin.tw/"],
        ["Adam Gleave", "https://www.gleave.me/"],
        ["Nora Belrose", "https://twitter.com/norabelrose"],
        ["Tom Tseng", "https://www.tomhmtseng.com/"],
        ["Joseph Miller", "https://alignmentfund.org/author/joseph-miller/"],
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
    <a href="https://humancompatible.ai/" target="_blank">
        <img
            src="/images/chai-logo.png"
            class="logo"
            alt="Center for Human-Compatible Artificial Intelligence Logo"
        />
    </a>
    <a href="https://www.mit.edu/" target="_blank">
        <img src="/images/mit-logo.svg" class="logo mit" alt="MIT Logo" />
    </a>
    <a href="https://alignmentfund.org/" target="_blank">
        <img src="/images/far-logo.png" class="logo far" alt="FAR Logo" />
    </a>
</div>
<h1 in:fade style="text-align: center;">
    Adversarial Policies Beat Professional-Level Go AIs
</h1>
<div>
    <div class="authors-list">
        {#each [...authors] as [name, link], i}
            <a href={link} target="_blank">{name}</a>
        {/each}
    </div>
</div>

<style>
    h1 {
        font-size: 2em;
    }
    .authors-list {
        max-width: 700px;
        flex-wrap: wrap;
        gap: 1em;
        margin: 3vh;
    }
    div {
        display: flex;
        justify-content: center;
    }
    .logos {
        margin-top: 10vh;
        max-width: 100%;
    }
    .logo {
        margin: auto;
        height: 5em;
        padding: 1.5em;
        will-change: filter;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #78a22e);
        transform: scale(1.1);
    }
    .logo.mit:hover {
        filter: drop-shadow(0 0 2em #a32034);
    }
    .logo.far:hover {
        filter: drop-shadow(0 0 1em #00e0da);
    }
</style>
