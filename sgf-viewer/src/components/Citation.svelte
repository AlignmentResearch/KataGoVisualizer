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

<hr>
<div>
    <h3>Cite this paper</h3>
    <code on:click={tdFocus}>
        <pre>
{`@misc{
    wang2023adversarial,
    title={Adversarial Policies Beat Professional-Level Go {AI}s},
    author={Tony Tong Wang and Adam Gleave and Nora Belrose and Tom Tseng and Michael D Dennis and Yawen Duan and Viktor Pogrebniak and Sergey Levine and Stuart Russell},
    year={2023},
    url={https://openreview.net/forum?id=Kyz1SaAcnd}
}`}</pre>
    </code>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    pre {
        width: 650px;
        /* overflow-wrap: normal; */
    }
</style>
