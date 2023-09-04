<script>
    import { supabase } from "$lib/supabaseClient"
    import { geo_lat, geo_lng } from './stores.js';
    import mapboxgl from 'mapbox-gl'
    import userpic from '$lib/images/user-profile-pic.jpeg'

    export let category, map, place, point

    let subcategories = [
        ['Telos', 'Farmacias'],
        ['Bodegas', 'Licores', 'Señitos'],
        ['Bares', 'Discotecas', 'Karaokes'],
        ['Pizzerías','Salchipapa', 'Hamburguesas', 'Emolientes', 'Helados', 'Callejera', 'Anticucho','Popcorn'],
        ['Estacionamientos', 'Paraderos', 'Basureros', 'Cajeros', 'Agentes']
    ]

    let results = [];

    const search = async () => {
        let { data: places , error } = await supabase
        .rpc('get_points3', {
            lat_input: $geo_lat.toString(), 
            lon_input: $geo_lng.toString(), 
            radius: "50000"
        })

        if (error) console.error(error)
        else {
            if (place) {
                places = places.filter(obj => {
                    return obj.tags && obj.tags.some(tag => tag.includes(place));
                });
            }   
        }

        for (const previous of results) {
            previous.remove()
        }

        for (const place of places) {
            const el = document.createElement('img');
            el.src = place.profilepic;
            el.alt = 'Foto de lugar';
            el.className = 'marker';
            el.onclick = () => {
                point = place;
                map.flyTo({
                    center: [place.longitude/1000000, place.latitude/1000000],
                    zoom: 18,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
            };

            results.push(new mapboxgl.Marker(el).setLngLat([place.longitude/1000000, place.latitude/1000000]).addTo(map));
        }
    }
</script>

<form class="container" on:submit={search}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
    <input
        type="text" placeholder="Buscar" on:input={()=>{category = undefined}} bind:value={place}
    >
    <img src={userpic} alt="Foto de perfil" width="32" height="32">
</form>

{#if category}
<ul>
    {#each subcategories[category] as tag}
        <li><button type="button" on:click={()=>{place = tag; category = undefined; search()}}>
            {tag}
        </button></li>
    {/each}
</ul>
{/if}

<style>
    .container {
        height: 44px;
        padding: 6px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border-radius: 22px;
        background-color: white;
        box-shadow: var(--shadow);
    }

    svg {
        flex-shrink: 0;
        margin-left: 4px;
    }

    input {
        width: 100%;
        border: none;
        padding: 0 8px;
        background-color: transparent;
    }

    input:focus {
        outline: transparent;
    }

    img {
        object-fit: cover;
        border-radius: 50%;
    }

    ul {
        background-color: white;
        box-shadow: var(--shadow);
        border-radius: 22px;
        list-style: none;
        padding: 15px;
        font-size: 14px;
    }
    li {
        margin: 8px 0;
    }
    li:first-child {
        margin-top: 0;
    }
    li:last-child {
        margin-bottom: 0;
    }
    button {
        display: block;
        width: 100%;
        text-align: left;
        background-color: transparent;
        border: none;
    }
</style>