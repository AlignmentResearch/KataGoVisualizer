<script lang="ts">
    export let image: string;
    export let url: string;
    export let alt: string;
    export let color: string;
    export let small: boolean = false;
    export let border: boolean = false;
    export let description: string = "";

    let img: HTMLImageElement;
</script>

<a href={url} target="_blank">
    <img
        src={image}
        class="logo"
        {alt}
        style={(small ? "height: 3rem;" : "height: 4rem;") + (border
            ? "border: 0.5px solid black;"
            : "")}
        bind:this={img}
        on:mouseover={() =>
            (img.style.filter = `drop-shadow(0 0 2em ${color})`)}
        on:mouseout={() => (img.style.filter = "none")}
        on:focus={() => null}
        on:blur={() => null}
    />
    <div class="logo-desc">{description}</div>
</a>

<style>
    .logo {
        object-fit: contain;
        /* height: 7vh; */
        margin: 1.5vmax;
        will-change: filter;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        margin-bottom: 0.5em;
    }
    .logo:hover {
        transform: scale(1.1);
    }
    .logo-desc {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 1em;
    }
</style>
