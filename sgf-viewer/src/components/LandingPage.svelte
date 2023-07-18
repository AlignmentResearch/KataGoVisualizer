<script lang="ts">
</script>

<div>
    <p>
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
        src="/images/cyclic-example.png"
        alt="Attack"
        style="max-width: 650px;"
    />
    
</div>

<style>
    img {
        width: 350px;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
        margin-bottom: 5vmin;
    }
    p {
        max-width: 650px;
    }
</style>
