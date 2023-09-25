<script>
	import { estadoLocal, distancia } from '$lib/utils.js';

	export let width

	export let name = 'Un lugar'
	export let media = 'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1'
	export let category = 'Categoria'
	export let stars = 0
	export let latitude = -16.4180
	export let longitude = -71.5275
	export let schedule = undefined
	export let details = 'No hay descripción'

	$: distance = distancia([latitude, longitude], [ -16.4180, -71.5275 ])
	$: todays_schedule = schedule ? estadoLocal(schedule, new Date().toLocaleTimeString('es-PE', {timeStyle: 'short'})) : 'Abierto todo el día'

	$: red    = todays_schedule[0] == 'C'
	$: green  = todays_schedule[0] == 'A'
	$: orange = todays_schedule[0] == 'P'
</script>

<article bind:clientHeight={width}>
	<main>
		<img src={media} alt={name} draggable="false">
		<header class="dark-gray items-center">
			<div class="flex-8 items-center">
				<h2>{category}</h2>
				<div class="stars">
					<svg class:red={stars>0} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.03268 3.26099C8.33204 2.33968 9.63545 2.33968 9.9348 3.26099L10.7799 5.8618C10.9137 6.27382 11.2977 6.55279 11.7309 6.55279H14.4656C15.4343 6.55279 15.8371 7.7924 15.0534 8.3618L12.841 9.96919C12.4905 10.2238 12.3438 10.6752 12.4777 11.0872L13.3228 13.688C13.6221 14.6094 12.5676 15.3755 11.7839 14.8061L9.57153 13.1987C9.22104 12.944 8.74644 12.944 8.39596 13.1987L6.18357 14.8061C5.39986 15.3755 4.34538 14.6094 4.64473 13.688L5.48978 11.0872C5.62366 10.6752 5.477 10.2238 5.12651 9.96919L2.91413 8.3618C2.13042 7.7924 2.53319 6.55279 3.50192 6.55279H6.23657C6.6698 6.55279 7.05375 6.27383 7.18763 5.8618L8.03268 3.26099Z" fill="#D9D9D9"/>
					</svg>
					<svg class:red={stars>1} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.03268 3.26099C8.33204 2.33968 9.63545 2.33968 9.9348 3.26099L10.7799 5.8618C10.9137 6.27382 11.2977 6.55279 11.7309 6.55279H14.4656C15.4343 6.55279 15.8371 7.7924 15.0534 8.3618L12.841 9.96919C12.4905 10.2238 12.3438 10.6752 12.4777 11.0872L13.3228 13.688C13.6221 14.6094 12.5676 15.3755 11.7839 14.8061L9.57153 13.1987C9.22104 12.944 8.74644 12.944 8.39596 13.1987L6.18357 14.8061C5.39986 15.3755 4.34538 14.6094 4.64473 13.688L5.48978 11.0872C5.62366 10.6752 5.477 10.2238 5.12651 9.96919L2.91413 8.3618C2.13042 7.7924 2.53319 6.55279 3.50192 6.55279H6.23657C6.6698 6.55279 7.05375 6.27383 7.18763 5.8618L8.03268 3.26099Z" fill="#D9D9D9"/>
					</svg>
					<svg class:red={stars>2} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.03268 3.26099C8.33204 2.33968 9.63545 2.33968 9.9348 3.26099L10.7799 5.8618C10.9137 6.27382 11.2977 6.55279 11.7309 6.55279H14.4656C15.4343 6.55279 15.8371 7.7924 15.0534 8.3618L12.841 9.96919C12.4905 10.2238 12.3438 10.6752 12.4777 11.0872L13.3228 13.688C13.6221 14.6094 12.5676 15.3755 11.7839 14.8061L9.57153 13.1987C9.22104 12.944 8.74644 12.944 8.39596 13.1987L6.18357 14.8061C5.39986 15.3755 4.34538 14.6094 4.64473 13.688L5.48978 11.0872C5.62366 10.6752 5.477 10.2238 5.12651 9.96919L2.91413 8.3618C2.13042 7.7924 2.53319 6.55279 3.50192 6.55279H6.23657C6.6698 6.55279 7.05375 6.27383 7.18763 5.8618L8.03268 3.26099Z" fill="#D9D9D9"/>
					</svg>
				</div>
			</div>
			<h2>{distance}</h2>
		</header>
		<h1>{name}</h1>
		<div class="flex-4 items-center" class:green class:red class:orange>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.475 12.525L12.525 11.475L9.75 8.7V5.25H8.25V9.3L11.475 12.525ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9812 3.69375 14.3062C3.01875 13.6312 2.48437 12.8375 2.09062 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09062 6.075C2.48437 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48437 6.075 2.09062C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09062C12.8375 2.48437 13.6312 3.01875 14.3062 3.69375C14.9812 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9812 13.6312 14.3062 14.3062C13.6312 14.9812 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5ZM9 15C10.6625 15 12.0781 14.4156 13.2469 13.2469C14.4156 12.0781 15 10.6625 15 9C15 7.3375 14.4156 5.92187 13.2469 4.75312C12.0781 3.58437 10.6625 3 9 3C7.3375 3 5.92187 3.58437 4.75312 4.75312C3.58437 5.92187 3 7.3375 3 9C3 10.6625 3.58437 12.0781 4.75312 13.2469C5.92187 14.4156 7.3375 15 9 15Z" fill="#6BBD44"/>
			</svg>			
			<p><strong>{todays_schedule}</strong></p>
		</div>
		<p><strong>{details}</strong></p>
	</main>
</article>

<style>
	article {
		background-color: var(--white);
	}
	main, header, .flex-8 {
		display: flex;
		gap: 8px;
	}
	main {
		flex-direction: column;
		padding: 0 20px 8px;
	}
	header {
		justify-content: space-between;
	}
	img {
		height: 176px;
		border-radius: 8px;
		width: 100%;
		object-fit: cover;
	}
	.stars {
		display: flex;
	}
	svg {
		display: block;
	}
	strong {
		font-weight: 500;
	}
</style>