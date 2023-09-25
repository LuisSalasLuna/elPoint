<script>
	import { onDestroy, onMount, setContext } from 'svelte';
	import { mapboxgl, key } from '$lib/mapbox.js';
	import '../mapbox.css'
	import { supabase } from "$lib/supabase";
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
			style: 'mapbox://styles/lesel22/clmy99n7g05xu01qr41ab8ol4',
			center: [lng, lat],
			zoom: zoom
		});

		let selectPoint = async (e) => {
			if (e.features.length > 0) {
				console.log(e.features)
				let { data: points2, error } = await supabase
				.from('points2')
				.select("*")
				.eq('id', e.features[0].id)

				dispatch('click', {
					point: points2[0]
				});
			}
		}

		map.on('load', () => {

			map.loadImage('/icons/pizza.png', (error, image) => {
				if (error) throw error;
				map.addImage('123_pizza', image);
			});
			map.loadImage('/icons/heart.png', (error, image) => {
				if (error) throw error;
				map.addImage('123_heart', image);
			});
			map.loadImage('/icons/spades.png', (error, image) => {
				if (error) throw error;
				map.addImage('123_spades', image);
			});
			map.loadImage('/icons/test.png', (error, image) => {
				if (error) throw error;
				map.addImage('test', image);
			});

			map.addSource('points', {
				type: 'vector',
				url: 'mapbox://lesel22.clmy6a2il1ei52iqulvotoefo-1st32',
				promoteId: 'id'
			});

			map.addLayer({
				'id': 'labels-layer',
				'type': 'symbol',
				'source': 'points',
				'source-layer': 'elPoint',
				'layout': {
					'text-field': ["get", "details"],
					'text-size': 13,
					'text-offset': [0,3.75],
					'text-anchor': 'top',
					'text-max-width': 12
				},
				'paint': {
					'text-halo-width': 2,
					'text-halo-color': 'rgba(209, 233, 75, 100)',
					'text-halo-blur': 2
				}
			});

			map.addLayer({
				'id': 'points-layer',
				'type': 'symbol',
				'source': 'points',
				'source-layer': 'elPoint',
				'layout': {
					'icon-image': [
						'match',
						['get', 'category'],
						'Pizza','123_pizza',
						'Casino','123_spades',
						'Hotel','123_heart',
						'test'
					],
					'icon-size': 0.8,

					'text-field': ["get", "name"],
					'text-offset': [0,2],
					'text-optional': true
				},
				'paint': {
					'text-halo-width': 2,
					'text-halo-color': 'rgba(209, 233, 75, 100)',
					'text-halo-blur': 2
				}
			});

			map.on('click', 'labels-layer', selectPoint);
			map.on('click', 'points-layer', selectPoint);
		});
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
