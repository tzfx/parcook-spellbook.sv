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

<div class="border-2 p-2 basis-1/4">
    <h2>
        Spell Slots <button
            class="text-sm"
            on:click={() => (spellSlots = resetAll())}
            ><i class="las la-sync-alt" /></button
        >
    </h2>
    <div class="flex flex-col">
        {#each spellSlots as slot, slotLevel}
            <div class="border-2 basis-1/5 w-56 mt-3">
                <h3 class="pl-2">Level {convert(slotLevel + 1)}</h3>
                <hr />
                <div class="flex flex-row w-56">
                    {#each slot as spent, i}
                        <input
                            class="w-8 h-8 basis-1/4 mt-2"
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
