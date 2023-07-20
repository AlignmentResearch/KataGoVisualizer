<script context="module" lang="ts">
    import { crossfade } from "svelte/transition";
    const [send, receive] = crossfade({ duration: 500 });
</script>

<script lang="ts">
    export let label: string;
    export let href: string;
    export let onClick: () => void = () => {};
    export let tabsId: string | null = null; // Just needs to be unique for in:receive out:send animation
    export let selected: boolean = false;
</script>

<div class="container">
    <div class="tab-indicator-container" />
    <a
        {href}
        aria-label={label}
        on:click={onClick}
        class={selected ? "selected" : ""}
    >
        {label}
    </a>
    <div class="tab-indicator-container">
        {#if tabsId && selected}
            <div
                in:receive={{ key: tabsId }}
                out:send={{ key: tabsId }}
                class="current-tab-indicator"
            />
        {/if}
    </div>
</div>

<style>
    .tab-indicator-container {
        height: 5px;
        border-radius: 10px;
        width: 80%;
        margin: auto;
        margin-bottom: 0px;
    }
    .container {
        display: flex;
        flex-direction: column;
    }
    .selected {
        color: var(--accent-color-2);
    }
    .current-tab-indicator {
        width: 100%;
        height: 100%;
        background-color: var(--accent-color-2);
        border-radius: 10px;
    }
    a {
        /* font-weight: bolder; */
        font-weight: normal;
        /* font-size: 1.1em; */
        background-color: transparent;
        text-align: center;
        color: var(--accent-color-1);
        padding: 1.2rem 0.6rem;
        transition-duration: 200ms;
        transform: scale(1.01); /* prevents pixel shift during animation */
    }
    a:hover {
        cursor: pointer;
        border-color: var(--accent-color-3);
        fill: var(--accent-color-3);
        transform: scale(1.1);
    }
</style>
