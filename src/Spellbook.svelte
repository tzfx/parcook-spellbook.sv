<script lang="ts">
    import { classes, randomClass } from "./srd/classes";
    import { spells } from "./srd/spells-phb";
    import { getLazy } from "./utils/lazy";
    import { convert } from "./utils/numerals";
    import { CharacterStorage } from "./utils/storage";
    import type { prep } from "./prep";
    import { onMount } from "svelte";
    let classSpells = [];
    let maxSlotLevel = 0;
    export let prep: prep;

    const mod = (score: number) => Math.floor((score - 10) / 2);
    const refreshSpells = () =>
        (classSpells = spells
            .filter((spell) =>
                spell.classes.fromClassList.find(
                    (i) =>
                        i.name.toLowerCase() === prep.clazz.name.toLowerCase()
                )
            )
            .sort((a, b) => (a.level < b.level ? -1 : +1)));
    const refreshMaxSlotLevel = () =>
        (maxSlotLevel = prep.clazz.classTableGroups
            .find((group) => group.rowsSpellProgression != null)
            ?.rowsSpellProgression[prep.level - 1].findIndex((n) => n === 0));
    const calculatePrepared = () => {
        let caster = 1;
        if (prep.clazz.casterProgression === "1/2") {
            caster = 0.5;
        }
        return Math.floor(
            (mod(prep.score) + prep.level) * caster - prep.prepared.length
        );
    };
    onMount(() => {
        refreshSpells();
        refreshMaxSlotLevel();
    });
</script>

<div>
    <h1>Parcook-spellbook.sv</h1>
    <p class="p-1">
        A tool for the {getLazy()}
        <select
            bind:value={prep.clazz}
            on:change={() => {
                refreshSpells();
                refreshMaxSlotLevel();
            }}
        >
            {#each Object.values(classes) as clazz}
                <option value={clazz}>{clazz.name}</option>
            {/each}
        </select>, who is level
        <input
            on:change={() => refreshMaxSlotLevel()}
            bind:value={prep.level}
            max="20"
            min="1"
            type="number"
        />, with a {prep.clazz.spellcastingAbility} score of
        <input
            on:change={() => refreshMaxSlotLevel()}
            bind:value={prep.score}
            max="20"
            min="1"
            type="number"
        />.
    </p>
    <p>
        <button>load</button>
        <button>save</button>
    </p>
    <hr />
    <div class="grid grid-cols-3">
        <div>
            <h2>
                Choose {prep.clazz.cantripProgression != null
                    ? prep.clazz.cantripProgression[prep.level + 1]
                    : 0} cantrips:
            </h2>
            <hr />
            <ul>
                {#each classSpells.filter((s) => s.level === 0) as cantrip}
                    <li class="spell">
                        <label for={cantrip.name}>
                            {cantrip.name}
                            <input
                                id={cantrip.name}
                                on:click={(e) =>
                                    (prep.catnips =
                                        prep.catnips.concat(cantrip))}
                                type="checkbox"
                            /></label
                        >
                    </li>
                {/each}
            </ul>
        </div>
        <div>>></div>
        <div>
            <h2>Chosen cantrips:</h2>
            <hr />
            <ul>
                {#each prep.catnips as catnip}
                    <li class="spell">
                        <label for={catnip.name}>
                            {catnip.name}
                            <input
                                id={catnip.name}
                                on:click={(e) =>
                                    (prep.catnips = prep.catnips.filter(
                                        (c) => c.name !== catnip.name
                                    ))}
                                type="checkbox"
                            /></label
                        >
                    </li>
                {/each}
            </ul>
        </div>
        <div>
            <h2>
                You have {calculatePrepared()} spell{calculatePrepared() === 1
                    ? ""
                    : "s"} to prepare.
            </h2>
            <hr />
            <ul class="overflow-auto">
                {#each classSpells.filter((s) => s.level !== 0 && s.level <= maxSlotLevel) as spell}
                    <li class="spell">
                        <label for={spell.name}>
                            {spell.name}
                            {convert(spell.level)}
                            <input id={spell.name} type="checkbox" /></label
                        >
                    </li>
                {/each}
            </ul>
        </div>
        <div><span>>></span></div>
        <div>
            prepared spelluloids
            <hr />
        </div>
    </div>
</div>

<style>
    p {
        text-align: right;
    }
    p input {
        width: 50px;
    }
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
