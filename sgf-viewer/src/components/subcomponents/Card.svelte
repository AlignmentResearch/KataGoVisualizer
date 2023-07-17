<script lang="ts">
    export let imgPath: string;
    export let imgName: string;
    export let description: string;
    export let url: string;
</script>

    <a href="{url}" target={url.startsWith("/") ? "_self" : "_blank"}>
<!-- <div> -->
        <img src={imgPath} alt={imgName} />
        <!-- <p>{description}</p> -->
<!-- </div> -->
    </a>

<style>
    div {
        background-color: white;
        box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        border: 2px solid var(--accent-color-1);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        aspect-ratio: 1 / 1;
        width: min(150px, 19vw); /* Careful! This value is hardcoded in several places */
        /* min-height: min(calc(150px + 1.2em), calc(19vw + 1.2em)); */
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    div:hover {
        box-shadow: 6px 6px 4px 0px var(--accent-color-2);
        transform: scale(1.05);
    }
    img {
        width: 100%;
        border-radius: 8px;
        padding: 1vw;
        margin: 1vw;
        cursor: pointer;
        background-color: white;
    }
    p {
        text-align: center;
        font-weight: bold;
        margin: 1vw;
        color: black;
    }
    a {
        /* width: 100%; */
        /* height: 100%; */
    }
</style>
