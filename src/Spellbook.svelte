<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import type { prep } from "./prep";
    import Spell from "./Spell.svelte";
    import { classes } from "./srd/classes";
    import { spells } from "./srd/spells/spells";
    import { getLazy } from "./utils/lazy";
    import { convert } from "./utils/numerals";
    import { getOptimism } from "./srd/optimism";
    import SpellDetails from "./SpellDetails.svelte";
    import { randomName } from "./srd/names/names";

    export let prep: prep;
    export let save: (prep: prep) => void;
    export let srd: boolean;

    const showCantrips = false;
    let showOtherSpells = true;
    let showOtherSpellsSelection = true;

    let allClassSpells: any[] = [];
    let maxSlotLevel = 0;
    let toPrepare = 0;
    let selectedSpell;

    let levelfilter;

    const selectedSpell$ = (e) => {
        selectedSpell = e.detail;
    };

    const mod = (score: number) => Math.floor((score - 10) / 2);
    const refreshSpells = () =>
        (allClassSpells = spells.filter(
            (spell) =>
                (srd ? spell.srd : true) &&
                spell.classes.fromClassList?.find(
                    (i) =>
                        i.name.toLowerCase() ===
                            prep.clazz.name.toLowerCase() &&
                        i.source === prep.clazz.source
                ) &&
                !prep.prepared.includes(spell)
        ));
    const refreshMaxSlotLevel = () => {
        maxSlotLevel = prep.clazz.classTableGroups
            .find((group) => group.rowsSpellProgression != null)
            ?.rowsSpellProgression[prep.level - 1].findIndex((n) => n === 0);
        calculatePrepared();
    };
    const calculatePrepared = () => {
        let caster = 1;
        if (prep.clazz.casterProgression === "1/2") {
            caster = 0.5;
        }
        toPrepare =
            mod(prep.score) +
            Math.floor(prep.level * caster) -
            prep.prepared.length;
    };
    const clearPrepared = () => ([prep.catnips, prep.prepared] = [[], []]);

    const deselect = () => (selectedSpell = null);

    const trySave = () => {
        if (![null, ""].includes(prep.name)) save(prep);
    };

    onMount(() => {
        refreshSpells();
        refreshMaxSlotLevel();
    });

    afterUpdate(() => {
        refreshSpells();
    });
</script>

<div>
    <p class="p-1 text-gray-700 font-light mt-2">
        A tool for
        <input
            type="text"
            placeholder={randomName()}
            class="w-32"
            bind:value={prep.name}
        />, the {getLazy()}
        <select
            on:change={(e) => {
                prep.clazz = classes[e.currentTarget.value];
                clearPrepared();
                refreshSpells();
                refreshMaxSlotLevel();
                trySave();
            }}
        >
            {#each Object.values(classes) as clazz}
                {#if prep.clazz.name === clazz.name}
                    <option value={clazz.name.toLowerCase()} selected
                        >{clazz.name}</option
                    >
                {:else}
                    <option value={clazz.name.toLowerCase()}
                        >{clazz.name}</option
                    >
                {/if}
            {/each}
        </select>, who is level
        <input
            on:change={() => {
                refreshMaxSlotLevel();
                trySave();
            }}
            bind:value={prep.level}
            max="20"
            min="1"
            type="number"
        />, with a {prep.clazz.spellcastingAbility} score of
        <input
            on:change={() => {
                refreshMaxSlotLevel();
                trySave();
            }}
            bind:value={prep.score}
            max="20"
            min="1"
            type="number"
        />.
    </p>
    <hr />
    {#if showCantrips}
        <div class="flex flex-row">
            <div class="basis-2/5">
                <h2>
                    Choose {prep.clazz.cantripProgression != null
                        ? prep.clazz.cantripProgression[prep.level + 1] -
                          prep.catnips.length
                        : 0} cantrips:
                </h2>
                <hr />
                <ul class="overflow-auto max-h-64">
                    {#if prep.clazz.cantripProgression !== null && prep.clazz.cantripProgression[prep.level + 1] - prep.catnips.length > 0}
                        {#each allClassSpells.filter((s) => s.level === 0 && !prep.catnips.find((c) => s.name === c.name)) as catnip}
                            <Spell
                                spell={catnip}
                                click={() => {
                                    prep.catnips = prep.catnips.concat(catnip);
                                    trySave();
                                }}
                            />
                        {/each}
                    {:else}
                        {getOptimism()}
                    {/if}
                </ul>
            </div>
            <div class="basis-1/5" />
            <div class="basis-2/5">
                <h2>Chosen cantrips:</h2>
                <hr />
                <ul class="overflow-auto max-h-64">
                    {#each prep.catnips as catnip}
                        <Spell
                            spell={catnip}
                            click={() => {
                                prep.catnips = prep.catnips.filter(
                                    (c) => c.name !== catnip.name
                                );
                                trySave();
                            }}
                        />
                    {/each}
                </ul>
            </div>
        </div>
        <br />
    {/if}
    <div class="flex md:flex-row flex-col">
        <div class="basis-2/5">
            <h2>
                You have {toPrepare} spell{toPrepare === 1 ? "" : "s"}
                to prepare.
            </h2>
            <hr />
            <ul class="overflow-auto max-h-96">
                {#if toPrepare > 0}
                    {#each allClassSpells.filter((s) => !prep.prepared.find((c) => s.name === c.name) && s.level !== 0 && s.level <= maxSlotLevel) as spell}
                        <Spell
                            on:message={selectedSpell$}
                            {spell}
                            click={() => {
                                prep.prepared = prep.prepared.concat(spell);
                                calculatePrepared();
                                trySave();
                            }}
                        />
                    {/each}
                {:else}
                    {getOptimism()}
                {/if}
            </ul>
        </div>
        <div class="basis-1/5 my-auto">
            <i class="las la-3x la-exchange-alt p-5 rotate-90 md:rotate-0" />
        </div>
        <div class="basis-2/5">
            <h2>Prepared spells</h2>
            <hr />
            <ul class="overflow-auto max-h-96">
                {#each prep.prepared
                    .sort((a, b) => (a.name < b.name ? -1 : 1))
                    .sort((a, b) => (a.level < b.level ? -1 : 1)) as spell}
                    <Spell
                        on:message={selectedSpell$}
                        {spell}
                        click={() => {
                            prep.prepared = prep.prepared.filter(
                                (p) => p.name !== spell.name
                            );
                            calculatePrepared();
                            trySave();
                        }}
                    />
                {/each}
            </ul>
        </div>
    </div>
    <hr />
    {#if showOtherSpells}
        <div class="flex md:flex-row flex-col pt-2">
            <div class="basis-2/5" hidden={!showOtherSpellsSelection}>
                <h2>Other Spell Selection</h2>
                <div class="flex flex-row justify-center py-2">
                    {#each new Array(maxSlotLevel + 1)
                        .fill(1)
                        .map((_, i) => i) as lvl}
                        <div
                            class="cursor-pointer w-4 border-2 {lvl ===
                                levelfilter && 'bg-blue-300'}"
                            on:click={() =>
                                (levelfilter =
                                    lvl === levelfilter ? undefined : lvl)}
                        >
                            {convert(lvl)}
                        </div>
                    {/each}
                </div>
                <ul class="overflow-auto max-h-96">
                    {#each spells.filter((s) => (srd ? s.srd : true) && !prep.other.find((c) => s.name === c.name) && s.level <= maxSlotLevel && (levelfilter != null ? s.level === levelfilter : true)) as spell}
                        <Spell
                            on:message={selectedSpell$}
                            {spell}
                            click={() => {
                                prep.other = prep.other.concat(spell);
                                trySave();
                            }}
                        />
                    {/each}
                </ul>
            </div>
            <div class={showOtherSpellsSelection ? "basis-1/5" : "basis-3/5"}>
                <p
                    class="w-fit mx-auto h-min p-2 text-sm mb-2 text-slate-500 border-2 cursor-pointer"
                    on:click={() =>
                        (showOtherSpellsSelection = !showOtherSpellsSelection)}
                >
                    {showOtherSpellsSelection ? "hide" : "show"} selection
                </p>
            </div>
            <div class="basis-2/5">
                <h2>Other Spells Known</h2>
                <ul class="overflow-auto max-h-96">
                    {#each prep.other
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .sort((a, b) => (a.level < b.level ? -1 : 1)) as spell}
                        <Spell
                            on:message={selectedSpell$}
                            {spell}
                            click={() => {
                                prep.other = prep.other.filter(
                                    (p) => p.name !== spell.name
                                );
                                trySave();
                            }}
                        />
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
    <hr />
    <div class="py-3 md:w-6/12 mx-auto">
        {#if selectedSpell != null}
            <SpellDetails {deselect} spell={selectedSpell} />
        {:else}
            <p class="text-center text-gray-500 py-28">
                <em
                    >Select the <i class="las la-search" /> icon from a spell above
                    to view details.</em
                >
            </p>
        {/if}
    </div>
</div>

<style>
    ul {
        list-style-type: none;
        width: 100%;
    }
</style>
