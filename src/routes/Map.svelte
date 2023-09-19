<script>
	import { onDestroy, onMount, setContext } from 'svelte';
	import { mapboxgl, key } from '$lib/mapbox.js';
	import '../mapbox.css'
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lng;
	export let zoom;

	let container;
	let map;

	onMount(() => {
		map = new mapboxgl.Map({
			container: container,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom
		});

		map.on('click', (e) => {dispatch('click', {});});
	})

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<div class="container" bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100vh;
	}
</style>
