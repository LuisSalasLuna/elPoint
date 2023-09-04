<script>
    import i_parejas from '$lib/images/heart.svg'
    import i_quioscos from '$lib/images/store.svg'
    import i_diversion from '$lib/images/fun.svg'
    import i_comida from '$lib/images/burger.svg'
    import i_servicios from '$lib/images/money.svg'

    export let value = '';

    let categories = [
        {id: "0", name: "Parejas", img: i_parejas},
        {id: "1", name: "Quioscos", img: i_quioscos},
        {id: "2", name: "Diversión", img: i_diversion},
        {id: "3", name: "Comida", img: i_comida},
        {id: "4", name: "Servicios", img: i_servicios}
    ]
</script>

<div class="container">
{#each categories as category}
    <button type="button" on:click={()=>{value = category.id}}>
        <h1>{category.name}</h1>
        <div class="image-wrapper">
            <img src={category.img} alt={category.name}>
        </div>
    </button>
{/each}
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .image-wrapper {
        background-color: white;
        border-radius: 50%;
        height: 54px;
        width: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: var(--shadow);
    }
    img {
        display: block;
        width: 32px;
    }
    h1 {
        font-weight: normal;
        font-size: 12px;
        text-shadow: 0px 0px 3px white, 0px 0px 3px white, 0px 0px 2px white, 0px 0px 2px white, 0px 0px 2px white;
    }
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        border: none;
        cursor: pointer;
        background-color: transparent;
    }
    button:focus {
        outline: transparent;
    }
</style>