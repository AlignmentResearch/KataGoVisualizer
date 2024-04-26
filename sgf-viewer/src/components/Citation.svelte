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
<div>
    <div class="citation">Citation Info</div>
    <code on:click={tdFocus}>
        <pre>{citation}</pre>
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
