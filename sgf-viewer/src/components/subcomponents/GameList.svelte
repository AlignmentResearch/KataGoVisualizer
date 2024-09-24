<script lang="ts">
    import { getContext } from "svelte";
    import MdFileDownload from "svelte-icons/md/MdFileDownload.svelte";

    export let dirName: string;
    export let numGames: number = 0;

    let games: Array<Array<string>> = [];
    const tableColumns = {
        victim_color: "Victim Color",
        win_color: "Win color",
        adv_win: "Adversary Win",
        adv_minus_victim_score: "Score difference",
        num_moves: "Game length",
        sgf_path: "SGF Path", // Should also include line number
    };
    const numColumns = Object.keys(tableColumns).length;
    const sgfPathKeyIndex = Object.keys(tableColumns).indexOf("sgf_path");
    $: sgfPaths = games.map((game) => {
        const fileName = game[sgfPathKeyIndex].split("/").slice(-1)[0]; // Get last element
        return `/sgfs/${dirName}/${fileName}`;
    })

    const wgoPlayer = getContext("wgoPlayer");
    const updateGame = getContext("updateGame");
    let selectedRow: number = 0;
    // Current game loaded by the wgoPlayer. Doesn't necessarily match with
    // selectedRow if wgoPlayer is not yet initialized.
    let currentSgfPath: string = "";
    // Arbitrary large number, should be be larger than the move count in any of
    // our SGFs. This is used to load the last move of the game.
    const LAST_MOVE_NUM = 10000;
    // Updates wgoPlayer and selectedRow.
    $updateGame = (row, move = LAST_MOVE_NUM, updateUrl = true) => {
        selectedRow = row;
        if (updateUrl) {
            let params = new URLSearchParams();
            params.set("row", row.toString());
            const url = `${
                window.location.pathname
            }?${params.toString()}#${dirName}-board`;
            const currentUrl = location.pathname + location.search + location.hash
            if (url !== currentUrl) {
                history.pushState({}, "", url);
            }
        }

        if (!$wgoPlayer || row >= sgfPaths.length) {
            return;
        }
        const newSgfPath = sgfPaths[row];
        if (newSgfPath === currentSgfPath) {
            $wgoPlayer.goTo(move);
        } else {
            $wgoPlayer.loadSgfFromFile(newSgfPath, move);
            currentSgfPath = newSgfPath;
        }
    }

    let goPlayerIsInitialized: boolean = false;
    $: if (!goPlayerIsInitialized && games.length > 0 && $wgoPlayer) {
        let row = 0;
        if (window.location.hash.startsWith("#" + dirName)) {
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("row")) {
                row = parseInt(searchParams.get("row"));
            }
        }
        $updateGame(row, LAST_MOVE_NUM, false);
        goPlayerIsInitialized = true;
    }

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
</script>

<div class="table-responsive">
    <table class="table table-hover">
        <thead>
            <tr>
                <!-- slice(0, -1) drops the sgf_path column -->
                {#each Object.values(tableColumns).slice(0, -1) as header}
                    <th scope="col">{header}</th>
                {/each}
                <th scope="col">Download</th>
            </tr>
        </thead>
        <tbody>
            {#if games.length === 0 && numGames > 0}
                <!-- Add filler rows to avoid content layout shift. Without the
                    filler rows, anchor links on page load will scroll to the
                    wrong place.
                -->
                {#each {length: numGames} as _}
                    <tr>
                        {#each {length: numColumns - 1} as _}
                            <td></td>
                        {/each}
                        <td>
                            <!-- The icon soon will be clickable, so we make
                                them appear clickable now to avoid visual
                                flicker.
                            -->
                            <a class="clickable">
                                <div class="icon">
                                    <MdFileDownload />
                                </div>
                            </a>
                        </td>
                    </tr>
                {/each}
            {/if}
            {#each games as game, index (index)}
                <tr
                    class:table-active={index === selectedRow}
                    on:click={() => $updateGame(index)}
                >
                    {#each game.slice(0, -1) as cell}
                        <td>{cell}</td>
                    {/each}
                    <td>
                        <a
                            href={sgfPaths[index]}
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
    .table {
        --bs-table-hover-bg: var(--mid-gray);
    }
    .table-active {
        --bs-table-bg-state: var(--green);
        --bs-table-active-color: var(--deep-navy);
        --bs-table-hover-bg: var(--green);
        --bs-table-hover-color: var(--deep-navy);
    }
    .table-active a:hover {
        /* Change link hover color since otherwise it's the same as the
         * table-active background color. */
        color: white;
    }
    th:first-of-type {
        border-top-left-radius: 10px;
    }
    th:last-of-type {
        border-top-right-radius: 10px;
    }
    tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
    th {
        background-color: var(--dark-green);
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
    .icon {
        height: 1.5em;
        width: 1.5em;
        margin: auto;
    }
</style>
