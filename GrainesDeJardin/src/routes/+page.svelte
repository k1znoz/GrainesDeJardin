<script lang="ts">
	import { onMount } from 'svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import ExperienceTimeline from '$lib/components/sections/ExperienceTimeline.svelte';
	import ServicesSection from '$lib/components/sections/ServicesSection.svelte';
	import GallerySection from '$lib/components/sections/GallerySection.svelte';
	import PricingSection from '$lib/components/sections/PricingSection.svelte';
	import AppointmentSection from '$lib/components/sections/AppointmentSection.svelte';
	import TestimonialsSection from '$lib/components/sections/TestimonialsSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';

	let scrollY = $state(0);
	let showStickyPhone = $state(false);
	let activeSection = $state('hero');

	const sectionNav = [
		{ id: 'hero', label: 'Accueil' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'services', label: 'Services' },
		{ id: 'gallery', label: 'Galerie' },
		{ id: 'pricing', label: 'Tarifs' },
		{ id: 'appointment', label: 'Rendez-vous' },
		{ id: 'testimonials', label: 'Avis' },
		{ id: 'contact', label: 'Contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
			// Afficher le bouton sticky après 300px de scroll
			showStickyPhone = scrollY > 300;

			// L'ornement gagne en lisibilite a mesure que les sections s'assombrissent
			const depth = Math.min(scrollY / 2200, 1);
			const ornamentBrightness = 1 + depth * 0.28;
			const ornamentContrast = 1 + depth * 0.12;
			const ornamentOpacity = 0.8 + depth * 0.14;
			document.documentElement.style.setProperty(
				'--ornament-brightness',
				ornamentBrightness.toFixed(3)
			);
			document.documentElement.style.setProperty(
				'--ornament-contrast',
				ornamentContrast.toFixed(3)
			);
			document.documentElement.style.setProperty('--ornament-opacity', ornamentOpacity.toFixed(3));

			const viewportMiddle = window.scrollY + window.innerHeight * 0.35;
			for (const section of sectionNav) {
				const element = document.getElementById(section.id);
				if (!element) continue;
				const top = element.offsetTop;
				const bottom = top + element.offsetHeight;
				if (viewportMiddle >= top && viewportMiddle < bottom) {
					activeSection = section.id;
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

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
	<GallerySection />
	<PricingSection />
	<AppointmentSection />
	<TestimonialsSection />
	<ContactSection />

	<nav class="section-nav" aria-label="Navigation des sections">
		{#each sectionNav as item (item.id)}
			<a
				href={'#' + item.id}
				class="section-nav-link"
				class:active={activeSection === item.id}
				aria-current={activeSection === item.id ? 'location' : undefined}
				title={item.label}
			>
				<span class="section-nav-dot" aria-hidden="true"></span>
				<span class="section-nav-label">{item.label}</span>
			</a>
		{/each}
	</nav>

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

	.section-nav {
		position: fixed;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 900;
	}

	.section-nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: 148px;
		padding: 0.35rem 0.45rem;
		border-radius: 9999px;
		background: rgba(80, 69, 44, 0.72);
		border: 1px solid rgba(245, 236, 223, 0.4);
		color: #f5ecdf;
		text-decoration: none;
		font-size: 0.74rem;
		line-height: 1.2;
		transition: all 0.2s ease;
	}

	.section-nav-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: rgba(245, 236, 223, 0.8);
		flex-shrink: 0;
	}

	.section-nav-label {
		white-space: nowrap;
		opacity: 0.78;
		max-width: 120px;
		overflow: hidden;
		transition: all 0.2s ease;
	}

	.section-nav-link:hover .section-nav-label,
	.section-nav-link:focus-visible .section-nav-label,
	.section-nav-link.active .section-nav-label {
		opacity: 1;
		max-width: 120px;
	}

	.section-nav-link:hover,
	.section-nav-link:focus-visible,
	.section-nav-link.active {
		background: rgba(143, 168, 115, 0.95);
		border-color: rgba(80, 69, 44, 0.45);
		color: var(--brand-brown);
	}

	.section-nav-link:focus-visible {
		outline: 2px solid rgba(245, 236, 223, 0.95);
		outline-offset: 2px;
	}

	.section-nav-link:hover .section-nav-dot,
	.section-nav-link.active .section-nav-dot {
		background: var(--brand-brown);
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
		.section-nav {
			display: none;
		}

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
			-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
			'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
