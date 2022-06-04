<script lang="ts">
    export let name: string;
    import { classes } from "./srd/classes";
    import { spells } from "./srd/spells-phb";
    import { getLazy } from "./srd/lazy";
    let level: number = 1;
    let wis: number = 10;
    let pclass = classes.cleric;
    let catnips = [];
    let prepped = [];
    let classSpells = [];
    let maxSlotLevel = 0;
    const mod = (score: number) => Math.floor((score - 10) / 2);
    const refreshSpells = () =>
        (classSpells = spells
            .filter((spell) =>
                spell.classes.fromClassList.find(
                    (i) => i.name.toLowerCase() === pclass.name.toLowerCase()
                )
            )
            .sort((a, b) => (a.level < b.level ? -1 : +1)));
    const refreshMaxSlotLevel = () =>
        (maxSlotLevel = pclass.classTableGroups
            .find((group) => group.rowsSpellProgression != null)
            ?.rowsSpellProgression[level - 1].findIndex((n) => n === 0));
    const calculatePrepared = () => {
        let caster = 1;
        if (pclass.casterProgression === "1/2") {
            caster = 0.5;
        }
        return (mod(wis) + level) * caster - prepped.length;
    };
    refreshSpells();
    refreshMaxSlotLevel();
</script>

<main>
    <h1>Parcook-spellbook.sv</h1>
    <p class="p-1">
        A tool for the {getLazy()}
        <select
            bind:value={pclass}
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
            bind:value={level}
            max="20"
            min="1"
            type="number"
        />, with a {pclass.spellcastingAbility} score of
        <input
            on:change={() => refreshMaxSlotLevel()}
            bind:value={wis}
            max="20"
            min="1"
            type="number"
        />.
    </p>
    <hr />
    <div class="grid grid-cols-3">
        <div>
            <h2>
                Choose {pclass.cantripProgression != null
                    ? pclass.cantripProgression[level + 1]
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
                                on:click={(e) => catnips.push(cantrip)}
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
                {#each catnips as catnip}
                    <li class="spell">
                        <label for={catnip.name}>
                            {catnip.name}
                            <input
                                id={catnip.name}
                                on:click={(e) =>
                                    (catnips = catnips.filter(
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
                            {spell.name} (Level {spell.level})
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
    <div>
        <a href="https://github.com/tzfx" class="footer" target="_blank"
            >made with 🧙 by tzfx</a
        >
    </div>
</main>

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
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }
    .footer {
        position: absolute;
        right: 5em;
        bottom: 1em;
        color: #ff3e00;
    }

    @media (min-width: 640px) {
        main {
            max-width: 1000px;
        }
    }
</style>
