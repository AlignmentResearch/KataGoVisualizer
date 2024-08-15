<script lang="ts">
    export let image: string;
    export let url: string;
    export let alt: string;
    export let color: string;
    export let border: boolean = false;
    export let description: string = "";

    let img: HTMLImageElement;
</script>

<a
    href={url}
    target="_blank"
    on:mouseover={() => {
        img.style.filter = `drop-shadow(0 0 2em ${color})`;
        img.style.transform = "scale(1.1)";
    }}
    on:mouseout={() => {
        img.style.filter = "none"
        img.style.transform = "none";
    }}
>
    <img
        src={image}
        class="logo"
        {alt}
        style={border
            ? "border: 0.5px solid black;"
            : ""}
        bind:this={img}
    />
    <div class="logo-desc">{description}</div>
</a>

<style>
    .logo {
        aspect-ratio: 1;
        object-fit: contain;
        will-change: filter;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        margin: 0 1.5rem;
        height: 3rem;
    }
    @media (max-width: 768px) {
      .logo {
        margin: 0 1rem;
        height: 2rem;
      }
    }
    .logo-desc {
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        margin: auto;
        margin-top: 0.5em;
        margin-bottom: 1em;
        max-width: 4em;
        line-height: 1.25;
    }
</style>
