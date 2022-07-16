<script lang="ts">
    import { randomClass } from "./srd/classes";
    import { CharacterStorage } from "./utils/storage";
    import type { prep } from "./prep";
    import Spellbook from "./Spellbook.svelte";

    const storage: CharacterStorage = new CharacterStorage();
    let idlist: string[] = [];

    const init = async () => {
        idlist = await storage.list(true);
        srd = await storage.getSRD();
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
                other: [],
            };
        }
        return prep;
    };

    const save = async (prep: prep) => {
        await storage.set(prep);
        idlist = await storage.list(true);
    };

    const remove = (id: string) => storage.delete(id);

    const toggleSrd = () => {
        srd = !srd;
        storage.setSRD(srd);
    };

    let loading = init();
    let showSelect = false;
    let srd = true;
</script>

<main class="md:max-w-5xl text-center p-4 mx-auto h-screen">
    <div>
        <a
            href="https://github.com/tzfx"
            class="text-xs right-4 top-2 absolute"
            target="_blank">made with 🧙 by tzfx</a
        >
    </div>
    <h1
        class="text-orange-500 cursor-default uppercase text-xl font-light my-5"
    >
        <span on:click={toggleSrd}>{srd ? "📕" : "📚"}</span>
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
        <Spellbook {save} {srd} {prep} />
    {/await}
</main>
