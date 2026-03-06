<svg class="header-ornament" viewBox="0 0 300 44" aria-hidden="true" focusable="false">
	<g stroke-linecap="round" stroke-linejoin="round">
		<path d="M8 22 H100" class="line" />
		<path d="M200 22 H292" class="line" />

		<!-- Embleme logo -->
		<circle cx="150" cy="22" r="17" class="ring" fill="none" />

		<!-- Tige -->
		<path d="M150 30.7 V16.5" class="plant" fill="none" />

		<!-- Feuille haute -->
		<path
			d="M150 8.1 C146.8 9.7 145.9 13.0 150 15.9 C154.1 13.0 153.2 9.7 150 8.1 Z"
			class="leaf-fill"
		/>
		<path d="M150 15.3 V10.3" class="leaf-cut" fill="none" />

		<!-- Feuille gauche -->
		<path
			d="M149.2 19.5 C145.2 15.0 140.2 14.1 136.8 14.9 C136.8 18.7 140.2 21.8 146.6 22.6 Z"
			class="leaf-fill"
		/>
		<path d="M146.8 21.7 C145.4 19.8 143.6 18.6 141.2 17.8" class="leaf-cut" fill="none" />

		<!-- Feuille droite -->
		<path
			d="M150.8 19.5 C154.8 15.0 159.8 14.1 163.2 14.9 C163.2 18.7 159.8 21.8 153.4 22.6 Z"
			class="leaf-fill"
		/>
		<path d="M153.2 21.7 C154.6 19.8 156.4 18.6 158.8 17.8" class="leaf-cut" fill="none" />

		<!-- Bandes de champ -->
		<path
			d="M132.8 25.2 C138.4 25.6 144.6 28.6 150 33.2 C155.4 28.6 161.6 25.6 167.2 25.2"
			class="field"
			fill="none"
		/>
		<path
			d="M133.9 28.1 C139.0 28.5 144.8 30.8 150 35.0 C155.2 30.8 161.0 28.5 166.1 28.1"
			class="field"
			fill="none"
		/>
		<path
			d="M136.3 30.8 C140.8 31.0 145.5 32.8 150 36.4 C154.5 32.8 159.2 31.0 163.7 30.8"
			class="field"
			fill="none"
		/>
	</g>
</svg>

<style>
	.header-ornament {
		display: block;
		width: min(300px, 64vw);
		height: auto;
		margin: 0.55rem auto 1rem;
		opacity: var(--ornament-opacity, 0.82);
		filter: brightness(var(--ornament-brightness, 1)) contrast(var(--ornament-contrast, 1));
		transition:
			filter 0.28s ease,
			opacity 0.28s ease;
	}

	.line {
		stroke: rgba(245, 236, 223, 0.76);
		stroke-width: 1.45;
	}

	.ring {
		stroke: rgba(66, 99, 27, 0.95);
		stroke-width: 1.85;
	}

	.plant {
		stroke: rgba(66, 99, 27, 0.95);
		stroke-width: 1.65;
	}

	.leaf-fill {
		fill: rgba(66, 99, 27, 0.95);
		stroke: rgba(66, 99, 27, 0.95);
		stroke-width: 1.2;
	}

	.leaf-cut {
		stroke: rgba(245, 236, 223, 0.95);
		stroke-width: 1.2;
	}

	.field {
		stroke: rgba(66, 99, 27, 0.92);
		stroke-width: 1.6;
	}

	@media (max-width: 640px) {
		.header-ornament {
			width: min(250px, 72vw);
		}
	}
</style>
