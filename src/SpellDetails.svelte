<script lang="ts">
    import { alpha2school } from "./srd/school";

    import type { SRDSpell } from "./srd/SRDSpell";

    export let spell: SRDSpell;
</script>

<div class="text-left border-2 p-2">
    <h1 class="text-xl">
        <strong>{spell.name}</strong>
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
            {spell.range.distance.amount ?? ""}
            {spell.range.distance.type}
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
        {#each spell.entries as entry}
            <p>{entry}</p>
        {/each}
        {#if spell.entriesHigherLevel != null}
            <br />
            <strong><em>At Higher Levels:</em></strong>
            {#each spell.entriesHigherLevel as ehl}
                {#each ehl.entries as entry}
                    <p>{entry}</p>
                {/each}
            {/each}
        {/if}
    </div>
</div>
