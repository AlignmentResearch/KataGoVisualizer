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

<div class="table-responsive">
    <table class="table table-hover">
        <thead>
            <tr>
                <!-- slice(0, 1) drops the sgf_path column -->
                {#each Object.values(tableColumns).slice(0, -1) as header}
                    <th scope="col">{header}</th>
                {/each}
                <th scope="col">Download</th>
            </tr>
        </thead>
        <tbody>
            {#each games as game, index (index)}
                <tr
                    class:table-active={index === selectedRow}
                    on:click={() => clickCell(index)}
                >
                    {#each game.slice(0, -1) as cell}
                        <td>{cell}</td>
                    {/each}
                    <td>
                        <a
                            href={indexToSgfPath(index)}
                            download={"go_game.sgf"}
                        >
                            <div class="icon">
                                <MdFileDownload />
                            </div>
                        </a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .icon {
        height: 1.5em;
        width: 1.5em;
        margin: auto;
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
    }
    .table-active {
        --bs-table-bg-state: var(--accent-color-2);
        --bs-table-active-color: var(--accent-color-3);
        /* We set --bs-table-hover-* because otherwise when the user clicks a
         * row while hovering, they still just see the hover color instead of
         * the active color.
         */
        --bs-table-hover-bg: var(--accent-color-2);
        --bs-table-hover-color: var(--accent-color-3);
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
