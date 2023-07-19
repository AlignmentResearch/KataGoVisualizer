<script lang="ts">
</script>

<div>
    <p class="paper-abstract">
        We attack the state-of-the-art Go-playing AI system KataGo by training
        adversarial policies against it, achieving a >97% win rate against
        KataGo running at superhuman settings. Our adversaries do not win by
        playing Go well. Instead, they trick KataGo into making serious
        blunders. Our attack transfers zero-shot to other superhuman Go-playing
        AIs, and is comprehensible to the extent that human experts can
        implement it without algorithmic assistance to consistently beat
        superhuman AIs. The core vulnerability uncovered by our attack persists
        even in KataGo agents adversarially trained to defend against our
        attack. Our results demonstrate that even superhuman AI systems may
        harbor surprising failure modes.
    </p>
    <img
        class="paper-image"
        src="/images/cyclic-example.svg"
        alt="Cyclic Attack"
    />
    <span>An example of our attack in action.</span>

    <p class="link-advert">
        <!-- spans make breaking nicer -->
        <span class="link-advert-span">&#x2193;&#x2193;&#x2193;</span>
        <span class="link-advert-span">Browse adversary games and analysis</span>
        <span class="link-advert-span">&#x2193;&#x2193;&#x2193;</span>
    </p>
</div>

<style>
    .paper-image {
        width: 250px;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
        margin-bottom: 5vmin;
    }
    .paper-abstract {
        max-width: 625px;
        text-align: justify;
        margin-top: 0.3em;
        margin-left: 5vmin;
        margin-right: 5vmin;
        font-size: 17px;
        font-weight: 500;
    }
    .link-advert {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        margin-top: 0.1em;
        margin-bottom: -0.5em;
    }
    .link-advert-span {
        display: inline-block;
        line-height: 1.3em;
        margin-left: 0.7em;
        margin-right: 0.7em;
        margin-top: 0.3em;
        margin-bottom: 0.3em;
    }
</style>
