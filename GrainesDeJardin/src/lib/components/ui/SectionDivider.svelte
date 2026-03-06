<script lang="ts">
	export let colorFrom: string = '#ffffff';
	export let colorTo: string = '#f6fbf2';
	export let height: number = 120; // px
	export let flip: boolean = false;

	// unique id for gradient to avoid collisions when multiple instances exist
	const gid = 'g' + Math.random().toString(36).slice(2, 9);
	const gradientUrl = `url(#${gid})`;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 1200 120"
	preserveAspectRatio="none"
	style="display:block;width:100%;"
	class:flipped={flip}
	{height}
	aria-hidden="true"
	focusable="false"
>
	<defs>
		<linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
			<stop offset="0%" stop-color={colorFrom} />
			<stop offset="100%" stop-color={colorTo} />
		</linearGradient>
	</defs>

	<path
		d="M0,56 C220,102 540,8 820,48 C980,70 1100,68 1200,56 L1200,120 L0,120 Z"
		fill={gradientUrl}
	/>
	<path
		d="M0,56 C220,102 540,8 820,48 C980,70 1100,68 1200,56"
		stroke="rgba(255,255,255,0.14)"
		stroke-width="1"
		fill="none"
	/>
</svg>

<style>
	svg {
		display: block;
		filter: drop-shadow(0 -3px 10px rgba(0, 0, 0, 0.05));
	}

	.flipped {
		transform: rotate(180deg);
		transform-origin: center;
	}
</style>
