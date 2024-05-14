<script lang="ts">
    function tdFocus(e) {
        const el = e.target;
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    export let citation: string
</script>

<hr />
<h4 class="toc-exclude">Citation Info</h4>
<code on:click={tdFocus}>
    <pre>{citation}</pre>
</code>

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
