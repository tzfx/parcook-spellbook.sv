<script lang="ts">
    import { convert } from "./utils/numerals";
    import { alpha2school } from "./srd/school";
    export let spell;
</script>

<li class="spell p-0">
    <button class={alpha2school(spell.school)}
        >{spell.name}
        {spell.level !== 0 ? convert(spell.level) : ""}</button
    >
</li>

<style>
    button {
        margin: 1px;
        border-radius: 5px;
    }
</style>
