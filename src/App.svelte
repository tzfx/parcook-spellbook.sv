<script lang="ts">
    import { randomClass } from "./srd/classes";
    import { CharacterStorage } from "./utils/storage";
    import type { prep } from "./prep";
    import Spellbook from "./Spellbook.svelte";
    import Spell from "./Spell.svelte";

    const storage: CharacterStorage = new CharacterStorage();
    let idlist: string[] = [];

    const init = async () => {
        idlist = await storage.list(true);
        return await load();
    };

    const load = async (id?: string) => {
        let prep = await storage.get(id);
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

    const save = async (prep: prep) => {
        await storage.set(prep);
        idlist = await storage.list(true);
    };

    const remove = (id: string) => storage.delete(id);

    let loading = init();
    let showSelect = false;
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
    <div class="flex flex-row-reverse">
        <p
            class="w-fit h-min p-2 text-sm mb-2 text-slate-500 border-2 cursor-pointer"
            on:click={() => (showSelect = !showSelect)}
        >
            <i
                class={`las la-chevron-circle-${
                    !showSelect ? "left" : "right"
                }`}
            />
            saved characters ({idlist.length})
        </p>
        {#await loading then _}
            {#if showSelect}
                {#each idlist as id}
                    <p
                        class="w-fit mr-2 h-min p-2 text-sm mb-2 text-slate-500 border-2 cursor-pointer"
                        on:click={() => (loading = load(id))}
                    >
                        {id}
                    </p>
                    <p
                        class="text-red-500 border-1 cursor-pointer border-red-500 h-min align-middle"
                        on:click={async () => {
                            await remove(id);
                            idlist = idlist.filter((i) => i !== id);
                        }}
                    >
                        <i class="las la-trash-alt" />
                    </p>
                {/each}
            {/if}
        {/await}
    </div>
    {#await loading then prep}
        <Spellbook {save} {prep} />
    {/await}
</main>
