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
    let save = (prep) => storage.set(prep);
</script>

<main class="md:max-w-5xl text-center p-4 mx-auto">
    <div>
        <a
            href="https://github.com/tzfx"
            class="text-xs right-4 top-2 absolute"
            target="_blank">made with 🧙 by tzfx</a
        >
    </div>
    {#await load then prep}
        <Spellbook {save} {prep} />
    {/await}
</main>
