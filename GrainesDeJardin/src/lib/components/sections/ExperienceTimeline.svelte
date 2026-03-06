<script lang="ts">
	import { experience } from '$lib/data/content';
	import { onMount } from 'svelte';
	import SectionDivider from '$lib/components/ui/SectionDivider.svelte';
	import HeaderOrnament from '$lib/components/ui/HeaderOrnament.svelte';

	let timelineItems: HTMLElement[] = [];

	onMount(() => {
		// Intersection Observer pour animer les elements au scroll
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '0px 0px -100px 0px'
			}
		);

		timelineItems.forEach((item) => {
			if (item) observer.observe(item);
		});

		return () => observer.disconnect();
	});
</script>

<section class="experience-section" id="experience">
	<!-- Decor : tronc d'arbre en arriere-plan -->
	<div class="trunk-background">
		<div class="trunk"></div>
		<div class="bark-texture"></div>
	</div>

	<div class="container">
		<!-- En-tete de section -->
		<div class="section-header">
			<h2 class="section-title">{experience.title}</h2>
			<p class="section-intro">{experience.intro}</p>
			<HeaderOrnament />
		</div>

		<!-- Timeline verticale -->
		<div class="timeline">
			<div class="timeline-line"></div>

			{#each experience.timeline as item, i (`${item.year}-${item.title}-${i}`)}
				<div class="timeline-item" bind:this={timelineItems[i]} style="--delay: {i * 0.15}s">
					<!-- Icone / Point sur la timeline -->
					<div class="timeline-marker">
						<div class="marker-icon">{item.icon}</div>
					</div>

					<!-- Carte de contenu -->
					<div class="timeline-card">
						<div class="card-year">{item.year}</div>
						<h3 class="card-title">{item.title}</h3>
						<p class="card-description">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Resume en chiffres -->
		<div class="stats-grid">
			<div class="stat-item">
				<div class="stat-number">14</div>
				<div class="stat-label">ans d'experience</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">10</div>
				<div class="stat-label">ans chef d'equipe</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">100%</div>
				<div class="stat-label">passion du metier</div>
			</div>
		</div>
	</div>

	<!-- Divider -->
	<div class="section-divider" aria-hidden="true">
		<SectionDivider colorFrom="#c5aa88" colorTo="#b09170" height={120} />
	</div>
</section>

<style>
	.experience-section {
		position: relative;
		padding: 6rem 2rem;
		background: #d5c0a0;
		overflow: hidden;
		/* Positionner en dessous du Hero au debut */
		margin-top: -5vh;
		padding-top: 8rem;
		z-index: 10;
	}

	/* Decor tronc */
	.trunk-background {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 120px;
		transform: translateX(-50%);
		pointer-events: none;
		opacity: 0.1;
		z-index: 0;
	}

	.trunk {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 80px;
		transform: translateX(-50%);
		background: #4b392c;
		border-radius: 40px;
	}

	.bark-texture {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.06);
	}

	.container {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* En-tete */
	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		color: #3a3023;
		margin-bottom: 1.5rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.section-intro {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #5d4d38;
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Timeline */
	.timeline {
		position: relative;
		max-width: 900px;
		margin: 0 auto 4rem;
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 4px;
		background: #6a5a3d;
		transform: translateX(-50%);
		border-radius: 2px;
		box-shadow: 0 0 6px rgba(106, 90, 61, 0.2);
	}

	.timeline-item {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 2rem;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
		transition-delay: var(--delay, 0s);
	}

	:global(.timeline-item.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline-item:nth-child(even) .timeline-card {
		grid-column: 1;
		text-align: right;
	}

	.timeline-item:nth-child(odd) .timeline-card {
		grid-column: 3;
		text-align: left;
	}

	.timeline-marker {
		grid-column: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}

	.marker-icon {
		width: 60px;
		height: 60px;
		background: white;
		border: 4px solid #6a5a3d;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.75rem;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.timeline-item:hover .marker-icon {
		transform: scale(1.15) rotate(360deg);
	}

	.timeline-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.timeline-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.11);
	}

	.card-year {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		background: var(--brand-brown-soft);
		color: white;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 700;
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
	}

	.card-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #4a3a2a;
		margin-bottom: 0.75rem;
	}

	.card-description {
		font-size: 1rem;
		color: #705d45;
		line-height: 1.6;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.stat-item {
		text-align: center;
		padding: 2rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.stat-item:hover {
		transform: translateY(-5px);
	}

	.stat-number {
		font-size: 3rem;
		font-weight: 900;
		color: #6a5a3d;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		color: #705d45;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.experience-section {
			padding: 4rem 1rem;
		}

		.timeline {
			padding-left: 2rem;
		}

		.timeline-line {
			left: 0;
		}

		.timeline-item {
			grid-template-columns: auto 1fr;
			gap: 1rem;
		}

		.timeline-marker {
			grid-column: 1;
			grid-row: 1;
		}

		.timeline-item:nth-child(even) .timeline-card,
		.timeline-item:nth-child(odd) .timeline-card {
			grid-column: 2;
			grid-row: 1;
			text-align: left;
		}

		.marker-icon {
			width: 50px;
			height: 50px;
			font-size: 1.5rem;
		}

		.timeline-card {
			padding: 1.5rem;
		}
	}
</style>
