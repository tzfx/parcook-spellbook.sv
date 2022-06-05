<script lang="ts">
    import { randomClass } from "./srd/classes";
    import { CharacterStorage } from "./utils/storage";
    import Spellbook from "./Spellbook.svelte";
    let storage: CharacterStorage = new CharacterStorage();

    let load = storage.get().then((prep) => {
        if (prep == null) {
            prep = {
                clazz: randomClass(),
                level: 1,
                score: 10,
                catnips: [],
                prepared: [],
            };
        }
        return prep;
    });
</script>

<main>
    {#await load then prep}
        <Spellbook {prep} />
    {/await}
    <div>
        <a href="https://github.com/tzfx" class="footer" target="_blank"
            >made with 🧙 by tzfx</a
        >
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
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
