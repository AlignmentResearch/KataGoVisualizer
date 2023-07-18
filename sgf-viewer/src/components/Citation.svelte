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
{`@inproceedings{wang2023adversarial,
    title={Adversarial Policies Beat Superhuman Go AIs},
    author={Wang, Tony Tong and Gleave, Adam and Tseng, Tom and Pelrine, Kellin and Belrose, Nora and Miller, Joseph and Dennis, Michael D and Duan, Yawen and Pogrebniak, Viktor and Levine, Sergey and Russell, Stuart},
    booktitle={International Conference on Machine Learning},
    year={2023}
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
