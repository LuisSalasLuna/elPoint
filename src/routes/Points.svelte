<script>
    import { supabase } from "$lib/supabase";

    export let points, show_results, selected
</script>

{#each points as point}
    <button on:click={async () => {
        let { data: points2, error } = await supabase
        .from('points2')
        .select("*")
        .eq('id', point.id)

        show_results = false

        selected = points2[0]

    }}>{point.name}</button>
{/each}

<style>
    button {
        display: block;
        padding: 1em;
        font-size: 16px;
        color: white;
        background-color: transparent;
        border: none;
    }
</style>