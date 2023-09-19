<script>
	import { getContext } from 'svelte';
	import { mapboxgl, key } from '$lib/mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;

	const marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
</script>