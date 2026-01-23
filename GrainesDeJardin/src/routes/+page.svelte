<script lang="ts">
	import { onMount } from 'svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import ExperienceTimeline from '$lib/components/sections/ExperienceTimeline.svelte';
	import ServicesSection from '$lib/components/sections/ServicesSection.svelte';
	import PricingSection from '$lib/components/sections/PricingSection.svelte';
	import TestimonialsSection from '$lib/components/sections/TestimonialsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	
	let scrollY = $state(0);
	let showStickyPhone = $state(false);
	
	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
			// Afficher le bouton sticky après 300px de scroll
			showStickyPhone = scrollY > 300;
		};
		
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		// Smooth scroll pour les liens d'ancre
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (this: HTMLElement, e: Event) {
				e.preventDefault();
				const href = this.getAttribute('href');
				if (href) {
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}
				}
			});
		});
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Julian Lemoine - Paysagiste & Entretien de Jardins</title>
	<meta
		name="description"
		content="Paysagiste professionnel avec 14 ans d'expérience. Entretien de jardins : tonte, taille, désherbage. Forfaits mensuels et annuels sur mesure."
	/>
	<meta
		name="keywords"
		content="paysagiste, entretien jardin, tonte, taille, haies, pelouse, forfait mensuel, forfait annuel"
	/>
</svelte:head>

<div class="page-container">
	<!-- La descente le long de la liane -->
	<HeroSection />
	<ExperienceTimeline />
	<ServicesSection />
	<PricingSection />
	<TestimonialsSection />
	<ContactSection />

	<!-- Bouton téléphone flottant -->
	{#if showStickyPhone}
		<div class="sticky-phone-wrapper">
			<PhoneButton class="phone-button-sticky" />
		</div>
	{/if}
</div>

<style>
	.page-container {
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
	}

	.sticky-phone-wrapper {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 1000;
		animation: slideInRight 0.5s ease-out;
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(100px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media (max-width: 640px) {
		.sticky-phone-wrapper {
			bottom: 1rem;
			right: 1rem;
		}
	}

	/* Reset et base globale */
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
