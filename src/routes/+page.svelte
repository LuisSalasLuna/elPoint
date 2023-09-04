<script>
    import mapboxgl from 'mapbox-gl'
    import '../mapbox.css'
    import { onMount, onDestroy } from "svelte"
    import { user_lat, user_lng } from './stores.js';

    import SearchBar from './SearchBar.svelte'
    import Categorias from './Categorias.svelte'
    import userpic from '$lib/images/user-profile-pic.jpeg'
    import Details from './Details.svelte';

    let mapContainer, selectedCategory, watchID, map, searchValue, point;
    let userMarker;

    function success(position) {
        console.log(position);
        if (Math.abs(position.coords.latitude - $user_lat) > 0.005 || Math.abs(position.coords.longitude - $user_lng) > 0.005) {
            user_lat.set(position.coords.latitude);
            user_lng.set(position.coords.longitude);
            map.flyTo({
                center: [$user_lng, $user_lat],
                zoom: 15,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            userMarker.setLngLat([$user_lng, $user_lat]);
        }
    }

    function error() {
        alert("Sorry, no position available.");
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };

    onMount(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q';
        map = new mapboxgl.Map({
            container: mapContainer, // container ID
            style: 'mapbox://styles/alan-25/clj2wi59a033w01p77pyg6zbm', // style URL
            center: [-71.5369, -16.3988], // starting position [lng, lat]
            zoom: 14, // starting zoom
        });

        const el = document.createElement('img');
        el.src = userpic;
        el.alt = 'Foto de perfil';
        el.className = 'marker user';

        userMarker = new mapboxgl.Marker(el).setLngLat([-71.5369, -16.3988]).addTo(map);

        if (typeof navigator !== 'undefined') {
            watchID = navigator.geolocation.watchPosition(success, error, options);
        }
    });

    onDestroy(() => {
        if (typeof map !== 'undefined') {
            map.remove();
        }
        if (typeof navigator !== 'undefined') {
            navigator.geolocation.clearWatch(watchID);
        }
    });
</script>

<header>
    <Categorias bind:value={selectedCategory}/>
    <SearchBar bind:point={point} bind:category={selectedCategory} {map} bind:place={searchValue}/>
</header>
<div class="map-wrap">
    <div class="map" bind:this={mapContainer} />
</div>
<Details bind:point={point}/>

<style>
    header {
        position: absolute;
        z-index: 999;
        inset: 15px 15px auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>