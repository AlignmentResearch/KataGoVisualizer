<script lang="ts">
    import MdFileDownload from "svelte-icons/md/MdFileDownload.svelte";

    export let dirName: string;
    export let sgfPath: string = "";

    let selectedRow: number = 0;
    let games: Array<Array<string>> = [];
    const tableColumns = {
        victim_color: "Victim Color",
        win_color: "Win color",
        adv_win: "Adversary Win",
        adv_minus_victim_score: "Score difference",
        num_moves: "Game length",
        sgf_path: "SGF Path", // Should also include line number
    };
    function indexToSgfPath(index: number) {
        let keyIndex = Object.keys(tableColumns).indexOf("sgf_path");
        let fileName = games[index][keyIndex].split("/").slice(-1)[0]; // Get last element
        return `/sgfs/${dirName}/${fileName}`;
    }
    $: if (games.length < selectedRow + 1) selectedRow = 0;
    $: if (games.length > 0) sgfPath = indexToSgfPath(selectedRow);
    function processData(text: string) {
        let allTextLines = text.trim().split(/\r\n|\n/);
        let headers = allTextLines[0].split(",");
        // Get the indices from headers of the tableColumns keys
        let tableColumnIndices: Array<number> = Object.keys(tableColumns).map(
            (key) => headers.indexOf(key)
        );

        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(",");
            // Push the values of the tableColumns keys into the games array
            games.push(tableColumnIndices.map((index) => data[index]));
        }
        games = games; // trigger Svelte reactivity. See https://svelte.dev/tutorial/updating-arrays-and-objects
    }

    fetch(`/sgfs/${dirName}/game_infos.csv`)
        .then((r) => r.text())
        .then((text) => processData(text));

    function clickCell(row) {
        selectedRow = row;
        let params = new URLSearchParams();
        params.set("row", selectedRow.toString());
        let url = `${
            window.location.pathname
        }?${params.toString()}#${dirName}-board`;
        history.pushState({}, "", url);
    }
    $: if (window.location.hash.startsWith("#" + dirName)) {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("row"))
            selectedRow = parseInt(searchParams.get("row"));
    }
</script>

<div class="table-wrapper">
    <table style="overflow: hidden;">
        <tr>
            <!-- slice(0, 1) drops the sgf_path column -->
            {#each Object.values(tableColumns).slice(0, -1) as header}
                <th>{header}</th>
            {/each}
            <th>Download</th>
        </tr>
        {#each games as game, index (index)}
            <tr
                class:selected-row={index === selectedRow}
                on:click={() => clickCell(index)}
            >
                {#each game.slice(0, -1) as cell}
                    <td>{cell}</td>
                {/each}
                <td>
                    <a
                        href={indexToSgfPath(index)}
                        download={"go_game.sgf"}
                        class="icon"
                    >
                        <MdFileDownload />
                    </a>
                </td>
            </tr>
        {/each}
    </table>
</div>

<style>
    div {
        max-width: 100%;
    }
    .icon :global(svg) {
        max-height: 1.5em;
    }
    .table-wrapper {
        margin: 2vw;
        overflow-x: auto;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        border-radius: 10px;
    }
    th,
    td {
        text-align: center;
        font-weight: bold;
        padding: 8px;
        margin: 8px;
    }
    td {
        border: 1px solid rgb(172, 172, 172);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    td:hover {
        transform: scale(1.1);
        background-color: var(--accent-color-2);
    }
    td:hover,
    td:hover a {
        color: var(--accent-color-3);
    }
    tr {
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .selected-row {
        background-color: var(--accent-color-2);
    }
    .selected-row,
    .selected-row a {
        color: var(--accent-color-3);
    }
    th:first-of-type {
        border-top-left-radius: 10px;
    }
    th:last-of-type {
        border-top-right-radius: 10px;
    }
    th {
        background-color: var(--accent-color-1);
        color: white;
    }
    td:first-child {
        border-left: none;
    }
    td:last-child {
        border-right: none;
    }
    tr:nth-child(2) td {
        border-top: none;
    }
    tr:last-child td {
        border-bottom: none;
    }
</style>
