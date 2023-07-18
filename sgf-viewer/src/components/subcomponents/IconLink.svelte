<script lang="ts">
    export let image: string;
    export let url: string;
    export let alt: string;
    export let color: string;
    export let small: boolean = false;

    let img: HTMLImageElement;
</script>

<a href={url} target="_blank">
    <img
        src={image}
        class="logo"
        {alt}
        style={small ? "height: 5vh;" : "height: 6vh;"}
        bind:this={img}
        on:mouseover={() =>
            (img.style.filter = `drop-shadow(0 0 2em ${color})`)}
        on:mouseout={() => (img.style.filter = "none")}
        on:focus={() => null}
        on:blur={() => null}
    />
</a>

<style>
    .logo {
        object-fit: contain;
        /* height: 7vh; */
        margin: 1.5vmax;
        will-change: filter;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .logo:hover {
        transform: scale(1.1);
    }
</style>
