<script lang="ts">
    import { onMount } from "svelte";
    import type { prep } from "./prep";
    import Spell from "./Spell.svelte";
    import { classes } from "./srd/classes";
    import { spells } from "./srd/spells-phb";
    import { getLazy } from "./utils/lazy";
    import { getOptimism } from "./srd/optimism";
    import SpellDetails from "./SpellDetails.svelte";

    export let prep: prep;
    export let save: (prep: prep) => void;

    const showCantrips = false;

    let allClassSpells: any[] = [];
    let maxSlotLevel = 0;
    let toPrepare = 0;
    let selectedSpell;

    const selectedSpell$ = (e) => {
        selectedSpell = e.detail;
    };

    const mod = (score: number) => Math.floor((score - 10) / 2);
    const refreshSpells = () =>
        (allClassSpells = spells
            .filter(
                (spell) =>
                    spell.classes.fromClassList.find(
                        (i) =>
                            i.name.toLowerCase() ===
                            prep.clazz.name.toLowerCase()
                    ) && !prep.prepared.includes(spell)
            )
            .sort((a, b) => (a.level < b.level ? -1 : +1)));
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
        toPrepare = Math.floor(
            (mod(prep.score) + prep.level) * caster - prep.prepared.length
        );
    };
    const clearPrepared = () => ([prep.catnips, prep.prepared] = [[], []]);
    onMount(() => {
        refreshSpells();
        refreshMaxSlotLevel();
    });
</script>

<div class="h-screen">
    <h1>Parcook-spellbook.sv</h1>
    <p class="p-1">
        A tool for the {getLazy()}
        <select
            on:change={(e) => {
                prep.clazz = classes[e.currentTarget.value];
                clearPrepared();
                refreshSpells();
                refreshMaxSlotLevel();
                save(prep);
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
                save(prep);
            }}
            bind:value={prep.level}
            max="20"
            min="1"
            type="number"
        />, with a {prep.clazz.spellcastingAbility} score of
        <input
            on:change={() => {
                refreshMaxSlotLevel();
                save(prep);
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
                                    save(prep);
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
                                save(prep);
                            }}
                        />
                    {/each}
                </ul>
            </div>
        </div>
        <br />
    {/if}
    <div class="flex flex-row">
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
                                save(prep);
                            }}
                        />
                    {/each}
                {:else}
                    {getOptimism()}
                {/if}
            </ul>
        </div>
        <div class="basis-1/5 my-auto">
            <i class="las la-3x la-exchange-alt" />
        </div>
        <div class="basis-2/5">
            <h2>Prepared spells</h2>
            <hr />
            <ul class="overflow-auto max-h-96">
                {#each prep.prepared as spell}
                    <Spell
                        on:message={selectedSpell$}
                        {spell}
                        click={() => {
                            prep.prepared = prep.prepared.filter(
                                (p) => p.name !== spell.name
                            );
                            calculatePrepared();
                            save(prep);
                        }}
                    />
                {/each}
            </ul>
        </div>
    </div>
    <hr />
    <div class="pt-3 w-6/12 mx-auto">
        {#if selectedSpell != null}
            <SpellDetails spell={selectedSpell} />
        {:else}
            <p class="text-center text-gray-500">
                <em>Select a spell from above to view details.</em>
            </p>
        {/if}
    </div>
</div>

<style>
    ul {
        list-style-type: none;
        width: 100%;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }
</style>
