<script lang="ts">
    import { convert } from "./utils/numerals";
    import { alpha2school } from "./srd/school";
    import type { SRDSpell } from "./srd/SRDSpell";
    import SpellDetails from "./SpellDetails.svelte";
    import { createEventDispatcher } from "svelte";
    export let spell: SRDSpell;
    export let click: () => void = () => {};
    let showInfo = false;
    const emitter = createEventDispatcher();
    const info = () => emitter("message", spell);
</script>

<li class="spell p-0">
    <button class={alpha2school(spell.school)} on:click={click}
        >{spell.name}
        {spell.level !== 0 ? convert(spell.level) : ""}</button
    ><button on:click={info}><i class="las la-search" /></button>
    <p class="overflow-auto max-h-48 max-w-48" hidden={!showInfo}>
        <SpellDetails {spell} />
    </p>
</li>

<style>
    button {
        margin: 1px;
        border-radius: 5px;
    }
</style>
