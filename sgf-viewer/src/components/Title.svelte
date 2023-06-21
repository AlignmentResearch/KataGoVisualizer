<script lang="ts">
    import { fade } from "svelte/transition";
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
    <a href="https://far.ai/" target="_blank">
        <img src="/images/far-logo.png" class="logo far" alt="FAR Logo" />
    </a>
    <a href="https://www.mit.edu/" target="_blank">
        <img src="/images/mit-logo.svg" class="logo mit" alt="MIT Logo" />
    </a>
    <a href="https://humancompatible.ai/" target="_blank">
        <img
            src="/images/chai-logo.png"
            class="logo"
            alt="Center for Human-Compatible Artificial Intelligence Logo"
        />
    </a>
</div>
<!-- Empty anchor target. Named for link backwards compatibility. -->
<div id="contents" />
<h1 in:fade style="text-align: center;">
    Adversarial Policies Beat Superhuman Go AIs
</h1>
<div>
    <div class="authors-list">
        {#each [...authors] as [name, link]}
            <a href={link} target="_blank">{name}</a>
        {/each}
    </div>
</div>

<style>
    #contents {
        scroll-margin-top: 0px;
    }
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
        margin-top: 1vh;
        margin-bottom: -3vh;
    }
    .logo {
        object-fit: contain;
        height: 110px;
        padding: 30px;
        will-change: filter;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #77a22e9a);
        transform: scale(1.1);
    }
    .mit:hover {
        filter: drop-shadow(0 0 2em #a3203497);
    }
    .far:hover {
        filter: drop-shadow(0 0 1em #00e0d894);
    }
</style>
