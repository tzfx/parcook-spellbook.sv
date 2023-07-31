<script lang="ts">
    import { alpha2school } from "./srd/school";

    import type { SRDSpell } from "./srd/SRDSpell";

    export let spell: SRDSpell;
    export let deselect: () => void = () => {};
</script>

<div class="text-left border-2 p-2">
    <h1 class="text-xl">
        <strong>{spell.name}</strong>
        <div class="float-right cursor-pointer" on:click={() => deselect()}>
            <i class="las la-times" />
        </div>
    </h1>
    <div>
        <em>Level {spell.level} - {alpha2school(spell.school)}</em>
        <p>
            <strong>Casting Time:</strong>
            {spell.time[0].number}
            {spell.time[0].unit}
        </p>
        <p>
            <strong>Range:</strong>
            {spell.range?.distance?.amount ?? ""}
            {spell.range?.distance?.type}
        </p>
        <p>
            <strong>Components:</strong>
            {Object.keys(spell.components)
                .map((c) => c.toUpperCase())
                .join(", ")}
            {#if spell.components.m != null}
                ({spell.components.m.text != null
                    ? spell.components.m.text
                    : spell.components.m})
            {/if}
        </p>
        <p>
            <strong>Duration:</strong>
            {#if spell.duration[0].concentration}
                Concentration, up to
            {/if}
            {#if spell.duration[0].type == "timed"}
                {spell.duration[0].duration.amount}
                {spell.duration[0].duration.type}
            {:else}
                {spell.duration[0].type}
            {/if}
        </p>
    </div>
    <hr class="my-2" />
    <div>
        <!-- @todo: refactor into entries component -->
        <!-- to allow for multiple types (list, table, etc.) -->
        {#each spell.entries as entry}
            {#if entry.type == null}
                <!-- entry is a simple string -->
                <p>{entry}</p>
            {:else if entry.type === "entries"}
                <p><strong><em>{entry.name}</em></strong> {entry.entries}</p>
            {:else if entry.type === "table"}
                <div class="py-2">
                    <table>
                        <caption>{entry.caption}</caption>
                        <tr>
                            {#each entry.colLabels as col}
                                <th>{col}</th>
                            {/each}
                        </tr>
                        {#each entry.rows as row}
                            <tr>
                                {#each row as col}
                                    <td>
                                        {col}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    </table>
                </div>
            {:else if entry.type === "list"}
                <div class="py-2">
                    <ul>
                        {#each entry.items as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
        {/each}
        {#if spell.entriesHigherLevel != null}
            <br />
            <strong><em>At Higher Levels:</em></strong>
            {#each spell.entriesHigherLevel as ehl}
                {#each ehl.entries as entry}
                    {#if entry.entries == null}
                        <p>{entry}</p>
                    {:else}
                        <p>{entry.entries}</p>
                    {/if}
                {/each}
            {/each}
        {/if}
    </div>
</div>
