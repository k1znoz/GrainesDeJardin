<script lang="ts">
	import { experience } from '$lib/data/content';
	import { onMount } from 'svelte';
	
	let timelineItems: HTMLElement[] = [];
	
	onMount(() => {
		// Intersection Observer pour animer les éléments au scroll
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
	<!-- Décor : tronc d'arbre en arrière-plan -->
	<div class="trunk-background">
		<div class="trunk"></div>
		<div class="bark-texture"></div>
	</div>

	<div class="container">
		<!-- En-tête de section -->
		<div class="section-header">
			<h2 class="section-title">{experience.title}</h2>
			<p class="section-intro">{experience.intro}</p>
		</div>

		<!-- Timeline verticale -->
		<div class="timeline">
			<div class="timeline-line"></div>

			{#each experience.timeline as item, i}
				<div
					class="timeline-item"
					bind:this={timelineItems[i]}
					style="--delay: {i * 0.15}s"
				>
					<!-- Icône / Point sur la timeline -->
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

		<!-- Résumé en chiffres -->
		<div class="stats-grid">
			<div class="stat-item">
				<div class="stat-number">14</div>
				<div class="stat-label">ans d'expérience</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">10</div>
				<div class="stat-label">ans chef d'équipe</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">100%</div>
				<div class="stat-label">passion du métier</div>
			</div>
		</div>
	</div>
</section>

<style>
	.experience-section {
		position: relative;
		padding: 6rem 2rem;
		background: linear-gradient(180deg, #a5d6a7 0%, #81c784 50%, #66bb6a 100%);
		overflow: hidden;
		/* Positionner en dessous du Hero au début */
		margin-top: -5vh;
		padding-top: 8rem;
		z-index: 10;
	}

	/* Décor tronc */
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
		background: repeating-linear-gradient(90deg, #3e2723 0px, #5d4037 10px, #3e2723 20px);
		border-radius: 40px;
	}

	.bark-texture {
		position: absolute;
		inset: 0;
		background-image: repeating-linear-gradient(
			0deg,
			transparent 0px,
			rgba(0, 0, 0, 0.1) 2px,
			transparent 4px
		);
	}

	.container {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* En-tête */
	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		color: #1b5e20;
		margin-bottom: 1.5rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.section-intro {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #2e7d32;
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
		background: linear-gradient(180deg, #2d5016 0%, #4a7c2c 100%);
		transform: translateX(-50%);
		border-radius: 2px;
		box-shadow: 0 0 10px rgba(45, 80, 22, 0.3);
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
		border: 4px solid #2d5016;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.75rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease;
	}

	.timeline-item:hover .marker-icon {
		transform: scale(1.15) rotate(360deg);
	}

	.timeline-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.timeline-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	.card-year {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
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
		color: #1b5e20;
		margin-bottom: 0.75rem;
	}

	.card-description {
		font-size: 1rem;
		color: #558b2f;
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
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		color: #558b2f;
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
