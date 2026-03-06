<script lang="ts">
	import { hero, siteConfig } from '$lib/data/content';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	import SectionDivider from '$lib/components/ui/SectionDivider.svelte';
	import { onMount } from 'svelte';

	let scrollY = $state(0);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Parallax et fade out au scroll - fade plus progressif
	$effect(() => {
		if (mounted) {
			// Fade out plus lent et progressif (de 0 a 1200px de scroll)
			const opacity = Math.max(0, 1 - scrollY / 1200);
			// Opacite du contenu encore plus progressive
			const contentOpacity = Math.max(0, 1 - scrollY / 800);
			const translateY = scrollY * 0.5;
			// Scale down progressif pour un effet de recul
			const scale = Math.max(0.8, 1 - scrollY / 2000);

			document.documentElement.style.setProperty('--hero-opacity', opacity.toString());
			document.documentElement.style.setProperty(
				'--hero-content-opacity',
				contentOpacity.toString()
			);
			document.documentElement.style.setProperty('--hero-translate', `${translateY}px`);
			document.documentElement.style.setProperty('--hero-scale', scale.toString());
		}
	});
</script>

<section class="hero-section" id="hero">
	<!-- Canopee animee en arriere-plan -->
	<div class="canopy-background">
		<div class="leaves-layer">
			{#each Array.from({ length: 20 }, (_, i) => i) as i (i)}
				<div class="leaf" style="--i: {i}">&#x1F343;</div>
			{/each}
		</div>
	</div>

	<!-- Contenu principal -->
	<div class="hero-content">
		<!-- Logo -->
		<div class="logo-container animate-fade-in">
			<img
				src="/Ressources/Graines-de-Jardin-Logo.PNG"
				alt={siteConfig.name + ' - Logo'}
				class="logo"
			/>
		</div>

		<!-- Titre principal -->
		<h1 class="hero-title animate-slide-up">
			{hero.title}
		</h1>

		<!-- Sous-titre -->
		<p class="hero-subtitle animate-slide-up" style="animation-delay: 0.2s">
			{hero.subtitle}
		</p>

		<!-- Baseline -->
		<p class="hero-baseline animate-slide-up" style="animation-delay: 0.4s">
			{hero.baseline}
		</p>

		<!-- CTAs -->
		<div class="cta-container animate-slide-up" style="animation-delay: 0.6s">
			<PhoneButton />
			<a href="#contact" class="cta-secondary">
				{hero.cta}
			</a>
		</div>
	</div>

	<!-- Transition visuelle : la liane qui descend -->
	<div class="vine-transition">
		<svg class="vine-svg" viewBox="0 0 100 400" preserveAspectRatio="none">
			<path
				d="M 50 0 Q 30 100 50 200 Q 70 300 50 400"
				stroke="var(--brand-green)"
				stroke-width="3"
				fill="none"
				stroke-linecap="round"
			/>
			<!-- Feuilles le long de la liane -->
			<circle cx="50" cy="100" r="8" fill="var(--brand-green-soft)" opacity="0.62" />
			<circle cx="50" cy="200" r="8" fill="var(--brand-green-soft)" opacity="0.62" />
			<circle cx="50" cy="300" r="8" fill="var(--brand-green-soft)" opacity="0.62" />
		</svg>
		<div class="scroll-indicator">
			<span>&darr;</span>
			<span class="scroll-text">Descendre</span>
		</div>
	</div>

	<!-- Divider SVG pour transition vers la section suivante -->
	<div class="section-divider" aria-hidden="true">
		<SectionDivider colorFrom="#dcc7ab" colorTo="#cdb292" height={140} />
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background-color: #dcc7ab;
		background-image: radial-gradient(
			900px 360px at 10% 0%,
			rgba(255, 255, 255, 0.42) 0%,
			rgba(255, 255, 255, 0) 70%
		);
		opacity: var(--hero-opacity, 1);
		transition: opacity 0.1s ease-out;
		z-index: 1;
	}

	/* Canopee animee */
	.canopy-background {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: var(--hero-opacity, 1);
	}

	.leaves-layer {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.leaf {
		position: absolute;
		font-size: 2rem;
		animation: float-leaf 15s infinite ease-in-out;
		animation-delay: calc(var(--i) * -0.5s);
		top: calc(var(--i) * -10%);
		left: calc((var(--i) * 7.3%) + 10%);
		opacity: 0.3;
		filter: blur(1px);
	}

	@keyframes float-leaf {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		25% {
			transform: translateY(20px) rotate(5deg);
		}
		50% {
			transform: translateY(0) rotate(0deg);
		}
		75% {
			transform: translateY(-20px) rotate(-5deg);
		}
	}

	/* Contenu hero */
	.hero-content {
		position: relative;
		z-index: 10;
		text-align: center;
		max-width: 800px;
		padding: 2rem;
		transform: translateY(var(--hero-translate, 0)) scale(var(--hero-scale, 1));
		opacity: var(--hero-content-opacity, 1);
		transition:
			opacity 0.1s ease-out,
			transform 0.1s ease-out;
	}

	.logo-container {
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;
	}

	.logo {
		max-width: 200px;
		height: auto;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
		border-radius: 5%;
	}

	.hero-title {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 800;
		color: #3a3023;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		letter-spacing: -0.02em;
	}

	.hero-subtitle {
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		color: #5d4d38;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	.hero-baseline {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: #715c42;
		margin-bottom: 2.5rem;
		font-style: italic;
	}

	.cta-container {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.cta-secondary {
		display: inline-flex;
		align-items: center;
		padding: 1rem 1.5rem;
		background: white;
		color: var(--brand-brown-soft);
		border: 2px solid var(--brand-brown-soft);
		border-radius: 9999px;
		font-weight: 600;
		font-size: 1.125rem;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.cta-secondary:hover {
		background: var(--brand-green-pastel);
		color: white;
		transform: translateY(-2px);
	}

	/* Transition liane */
	.vine-transition {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 5;
		opacity: 0.6;
	}

	.vine-svg {
		width: 100px;
		height: 300px;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: var(--brand-green);
		font-weight: 600;
		animation: bounce 2s infinite;
	}

	.scroll-indicator span:first-child {
		font-size: 2rem;
	}

	.scroll-text {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(10px);
		}
	}

	/* Animations */
	.animate-fade-in {
		animation: fadeIn 1s ease-out forwards;
		opacity: 0;
	}

	.animate-slide-up {
		animation: slideUp 0.8s ease-out forwards;
		opacity: 0;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Mobile */
	@media (max-width: 640px) {
		.logo {
			max-width: 150px;
		}

		.cta-container {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
