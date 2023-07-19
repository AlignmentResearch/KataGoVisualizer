<script lang="ts">
    function tdFocus(e) {
        const el = e.target;
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
</script>

<hr />
<div>
    <div class="citation">Citation Info</div>
    <code on:click={tdFocus}>
        <pre>
{`@inproceedings{wang2023adversarial,
    title={Adversarial Policies Beat Superhuman Go AIs},
    author={Wang, Tony T and Gleave, Adam and Tseng, Tom and Pelrine, Kellin and Belrose, Nora and Miller, Joseph and Dennis, Michael D and Duan, Yawen and Pogrebniak, Viktor and Levine, Sergey and Russell, Stuart},
    booktitle={International Conference on Machine Learning},
    year={2023}
}`}</pre>
    </code>
</div>

<style>
    hr {
        border: none;
        height: 1px;
        background: #000;
        background: repeating-linear-gradient(
            90deg,
            #000,
            #000 6px,
            transparent 6px,
            transparent 12px
        );
    }
    .citation {
        font-size: 22px;
        font-weight: 300;
        margin-top: 0.5em;
        margin-bottom: 0em;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    pre {
        width: min(80vw, 800px);
        font-size: 13px;
    }
</style>
