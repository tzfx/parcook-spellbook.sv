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

<div class="text-left border-1 p-2 flex-column">
  <h2>Spell Slots</h2>
  <button on:click={() => (spellSlots = resetAll())}>reset</button>
  {#each spellSlots as slot, slotLevel}
    <div class="border-2 m-2">
      <h3>Level {convert(slotLevel + 1)}</h3>
      {#each slot as spent, i}
        <input
          type="checkbox"
          checked={spellSlots[slotLevel][i]}
          on:click={() => {
            spellSlots[slotLevel][i] = !spellSlots[slotLevel][i];
          }}
        />
      {/each}
    </div>
  {/each}
</div>
