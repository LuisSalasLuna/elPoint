<script>
	export let title, width, show;

	let bottomSheet, sheetContent, dragIcon, fifty;

	// Global variables for tracking drag events
	let isDragging = false,
		startY,
		startHeight,
		us_height = 0;

	const updateSheetHeight = (height) => {
		us_height = height;
	};

	$: if (show) {
		document.body.style.overflowY = "hidden";
		fifty = ((43 + width) / window.innerHeight) * 100;
		updateSheetHeight(fifty);
	}

	const hideBottomSheet = () => {
		show = false;
		document.body.style.overflowY = "auto";
	};

	const dragStart = (e) => {
		startY = e.pageY || e.touches?.[0].pageY;
		startHeight = parseInt(sheetContent.style.height);
		isDragging = true;
	};

	const dragging = (e) => {
		if (!isDragging) return;
		const delta = startY - (e.pageY || e.touches?.[0].pageY);
		const newHeight = startHeight + (delta / window.innerHeight) * 100;
		updateSheetHeight(newHeight);
	};

	const dragStop = () => {
		isDragging = false;
		const sheetHeight = parseInt(sheetContent.style.height);
		sheetHeight < 25
			? hideBottomSheet()
			: sheetHeight > 75
			? updateSheetHeight(100)
			: updateSheetHeight(fifty);
	};
</script>

<svelte:document
	on:mousemove={dragging}
	on:mouseup={dragStop}
	on:touchmove={dragging}
	on:touchend={dragStop}
/>

<div
	bind:this={bottomSheet}
	class="bottom-sheet"
	class:fullscreen={us_height == 100}
	class:show
	class:dragging={isDragging}
>
	<!-- <div class="sheet-overlay" /> -->
	<div
		bind:this={sheetContent}
		class="content"
		style:height={`${us_height}vh`}
	>
		<div
			bind:this={dragIcon}
			class="drag-icon"
			role="button"
			tabindex="0"
			on:mousedown={dragStart}
			on:touchstart={dragStart}
		>
			<div class="rect" />
		</div>
		<main>
			{#if title}
				<h3>{title}</h3>
			{/if}
			<slot />
		</main>
	</div>
</div>

<style>
	h3 {
		text-align: center;
		font-size: 16px;
		line-height: 32px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.bottom-sheet {
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		opacity: 0;
		pointer-events: none;
		align-items: center;
		flex-direction: column;
		justify-content: flex-end;
		transition: 0.1s linear;
	}
	.bottom-sheet.show {
		opacity: 1;
		pointer-events: auto;
	}
	/* .bottom-sheet .sheet-overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		opacity: 0.2;
		background: #000;
	} */
	.bottom-sheet .content {
		width: 100%;
		position: relative;
		background-color: var(--white);
		max-height: 100vh;
		height: 50vh;
		max-width: 1080px;
		transform: translateY(100%);
		border-radius: 32px 32px 0 0;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
		transition: 0.3s ease;
		padding-bottom: 48px;
	}
	.bottom-sheet.show .content {
		transform: translateY(0%);
	}
	.bottom-sheet.dragging .content {
		transition: none;
	}
	.bottom-sheet.fullscreen .content {
		border-radius: 0;
		overflow-y: hidden;
	}
	.drag-icon {
		cursor: grab;
		user-select: none;
		display: flex;
		justify-content: center;
		padding: 20px 0;
	}
	.rect {
		background-color: #d9d9d9;
		height: 4px;
		width: 48px;
		border-radius: 2px;
	}
	main {
		height: 100%;
		overflow-y: auto;
		scrollbar-width: none;
	}
	main::-webkit-scrollbar {
		width: 0;
	}
</style>
