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
    <h4 class="toc-exclude">Citation Info</h4>
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
    h4 {
        text-align: center;
        font-weight: 300;
        margin-top: 0.5em;
        margin-bottom: 0em;
    }
    pre {
        margin: auto;
        max-width: 80%;
        font-size: 13px;
    }
</style>
