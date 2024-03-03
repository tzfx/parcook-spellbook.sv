<script lang="ts">
    import { convert } from "./utils/numerals";
    export let level: number;
    export let clazz: any;

    const levelSlots: number[] = clazz.classTableGroups
        .find((g) => g.title === "Spell Slots per Spell Level")
        .rowsSpellProgression[level - 1].filter((slot) => slot > 0);

    const resetAll = () =>
        levelSlots.map((slotAmount) => Array(slotAmount).fill(false));

    let spellSlots: boolean[][] = resetAll();
</script>

<div class="border-2 p-2">
    <div class="w-100 flex justify-end">
        <h2 class="w-3/4">Spell Slots</h2>
        <button class="w-1/8 text-sm" on:click={() => (spellSlots = resetAll())}
            ><i class="las la-sync-alt" /></button
        >
        <button class="w-1/8 text-sm" on:click={() => {}}
            ><i class="las la-eye" /></button
        >
    </div>
    <div class="flex flex-row justify-around">
        {#each spellSlots as slot, slotLevel}
            <div class="mt-3 w-56 basis-1/5 border-2">
                <h3 class="pl-2">Level {convert(slotLevel + 1)}</h3>
                <hr />
                <div class="flex w-56 flex-row justify-center">
                    {#each slot as spent, i}
                        <input
                            class="mt-2 h-8 w-8 basis-1/4"
                            type="checkbox"
                            checked={spellSlots[slotLevel][i]}
                            on:click={() => {
                                spellSlots[slotLevel][i] =
                                    !spellSlots[slotLevel][i];
                            }}
                        />
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
