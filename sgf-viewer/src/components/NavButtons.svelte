<script context="module" lang="ts">
    import { crossfade } from "svelte/transition";
    const [send, receive] = crossfade({});
</script>

<script lang="ts">
    import { scale } from "svelte/transition";
    export let label: string | null = null;
    export let onClick: () => void = () => {};
    export let disabled: boolean = false;
    export let tabsId: string | null = null; // Just needs to be unique for in:receive out:send animation
    export let selected: boolean = false;
    export let border: boolean = true;
</script>

<div in:scale={{ duration: 300 }}>
    <button
        aria-label={label}
        {disabled}
        on:click={onClick}
        style={tabsId || !border ? "border: 0px;" : ""}
        class={selected ? "selected" : ""}
        autocomplete="off"
    >
        {#if $$slots.default}
            <div style="width: 20px; height: 20px;">
                <slot />
            </div>
        {/if}
        {#if label}
            <p style="padding: 0; margin: 5px;">
                {label}
            </p>
        {/if}
    </button>
    <div style={tabsId ? "height: 2px;" : ""}>
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
    .selected {
        color: var(--accent-color-4);
    }
    .current-tab-indicator {
        background-color: var(--accent-color-4);
        height: 5px;
        border-radius: 10px;
        width: 80%;
        margin: auto;
    }

    button {
        border-radius: 5px;
        display: flex;
        font-weight: bolder;
        font-size: 1.1em;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: var(--accent-color-3);
        padding: 1vw;
        transition-duration: 200ms;
        border: 3px solid var(--accent-color-3);
        transform: scale(1.01); /* Prevents pixel shift during animation */
    }

    button :global(path) {
        fill: var(--accent-color-3);
        stroke: var(--accent-color-3);
        /* transition-duration: 100ms; */
    }

    button:disabled {
        color: var(--disabled-color);
        border: 3px solid var(--disabled-color);
    }

    button:disabled :global(path) {
        fill: var(--disabled-color);
        stroke: var(--disabled-color);
    }

    button:hover:enabled {
        cursor: pointer;
        border-color: var(--accent-color-3);
        /* color: var(--accent-color-3); */
        fill: var(--accent-color-3);
        transform: scale(1.2);
    }

    button:hover:enabled :global(path) {
        fill: var(--accent-color-3);
        stroke: var(--accent-color-3);
    }
</style>
