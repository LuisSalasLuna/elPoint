import { writable, derived } from 'svelte/store';

export const user_lat = writable(-16.3988);
export const user_lng = writable(-71.5369);

export const geo_lat = derived(
	user_lat,
	($user_lat) => (Math.round($user_lat * 1000000))
);
export const geo_lng = derived(
	user_lng,
	($user_lng) => (Math.round($user_lng * 1000000))
);