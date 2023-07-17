<script lang="ts">
    export let image: string;
    export let url: string;
    export let alt: string;
</script>

<div>
<a href={url} target="_blank">
    <img src={image} class="logo" alt={alt} />
</a>
</div>

<style>
    .logo {
        object-fit: contain;
        height: 4vh;
        margin: 1vmax;
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