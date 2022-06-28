<script lang="ts">
    import { randomClass } from "./srd/classes";
    import { CharacterStorage } from "./utils/storage";
    import type { prep } from "./prep";
    import Spellbook from "./Spellbook.svelte";

    const storage: CharacterStorage = new CharacterStorage();
    let idlist: string[];

    const init = async () => {
        idlist = await storage.list(true);
        let prep = await storage.get();
        if (prep == null) {
            prep = {
                clazz: randomClass(),
                name: null,
                level: 1,
                score: 10,
                catnips: [],
                prepared: [],
            };
        }
        return prep;
    };

    const save = (prep: prep) => storage.set(prep);
</script>

<main class="md:max-w-5xl text-center p-4 mx-auto h-screen">
    <div>
        <a
            href="https://github.com/tzfx"
            class="text-xs right-4 top-2 absolute"
            target="_blank">made with 🧙 by tzfx</a
        >
    </div>
    <h1 class="text-orange-500 uppercase text-xl font-light my-5">
        Parcook-spellbook.sv
    </h1>
    <p class="text-sm mb-2 text-slate-500">
        other saved characters
        {#await init() then prep}
            <select default={false}>
                {#each idlist as id}
                    <option>{id}</option>
                {/each}
            </select>
        {/await}
    </p>
    {#await init() then prep}
        <Spellbook {save} {prep} />
    {/await}
</main>
