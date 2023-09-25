<script>
    import { supabase } from "$lib/supabase";

    export let points, show, show_results

    let search

    const foo = async () => {


        let { data, error } = await supabase
        .rpc('get_points22', {
            input: search
        })

        if (error) console.error(error)
        else points = data

        show_results = true

        show = true
    }
</script>

<input type="text" name="point" id="search_input" placeholder="ejem: pizzería" 
    on:change={foo}
    bind:value={search}
>

<style>
    input {
        position: absolute;
        z-index: 100;
        background-color: var(--background);
        color: var(--text);
        border: none;
        font-size: 16px;
        inset: 0 0 auto 0;
        padding: 1em;
        margin: 1em;
        border-radius: 26px;
    }
</style>