<script lang="ts">
	import { services } from '$lib/data/content';
	import { onMount } from 'svelte';
	
	let serviceCards: HTMLElement[] = [];
	
	onMount(() => {
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
				rootMargin: '0px 0px -50px 0px'
			}
		);

		serviceCards.forEach((card) => {
			if (card) observer.observe(card);
		});

		return () => observer.disconnect();
	});
</script>

<section class="services-section" id="services">
	<!-- Décor : branches en arrière-plan -->
	<div class="branches-background">
		<svg class="branch branch-1" viewBox="0 0 200 400">
			<path
				d="M 20 0 Q 40 100 80 200 L 150 400"
				stroke="#2d5016"
				stroke-width="4"
				fill="none"
				opacity="0.1"
			/>
		</svg>
		<svg class="branch branch-2" viewBox="0 0 200 400">
			<path
				d="M 180 0 Q 160 100 120 200 L 50 400"
				stroke="#2d5016"
				stroke-width="4"
				fill="none"
				opacity="0.1"
			/>
		</svg>
	</div>

	<div class="container">
		<!-- En-tête -->
		<div class="section-header">
			<h2 class="section-title">{services.title}</h2>
			<p class="section-subtitle">{services.subtitle}</p>
			<div class="note">{services.note}</div>
		</div>

		<!-- Grille de services -->
		<div class="services-grid">
			{#each services.list as service, i}
				<div
					class="service-card"
					bind:this={serviceCards[i]}
					style="--delay: {i * 0.15}s"
				>
					<div class="service-icon">{service.icon}</div>
					<h3 class="service-name">{service.name}</h3>
					<p class="service-description">{service.description}</p>
					<ul class="service-features">
						{#each service.features as feature}
							<li>
								<span class="check-icon">✓</span>
								{feature}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.services-section {
		position: relative;
		padding: 6rem 2rem;
		background: linear-gradient(180deg, #66bb6a 0%, #4caf50 50%, #43a047 100%);
		overflow: hidden;
	}

	/* Décor branches */
	.branches-background {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.branch {
		position: absolute;
		width: 300px;
		height: 100%;
	}

	.branch-1 {
		left: -50px;
		top: 0;
	}

	.branch-2 {
		right: -50px;
		top: 0;
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
		margin-bottom: 1rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.section-subtitle {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #2e7d32;
		max-width: 700px;
		margin: 0 auto 1.5rem;
		line-height: 1.6;
	}

	.note {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.9);
		border-left: 4px solid #ff6f00;
		border-radius: 0.5rem;
		color: #e65100;
		font-weight: 600;
		font-size: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Grille de services */
	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	.service-card {
		background: white;
		padding: 2.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(30px) scale(0.95);
		transition-delay: var(--delay, 0s);
		position: relative;
		overflow: hidden;
	}

	.service-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 6px;
		background: linear-gradient(90deg, #2d5016 0%, #4a7c2c 100%);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s ease;
	}

	.service-card:hover::before {
		transform: scaleX(1);
	}

	:global(.service-card.visible) {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.service-card:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}

	.service-icon {
		font-size: 4rem;
		margin-bottom: 1.5rem;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.service-name {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1b5e20;
		margin-bottom: 1rem;
	}

	.service-description {
		font-size: 1.0625rem;
		color: #558b2f;
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.service-features li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
		color: #2e7d32;
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.check-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border-radius: 50%;
		font-weight: 700;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.services-section {
			padding: 4rem 1rem;
		}

		.services-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.service-card {
			padding: 2rem;
		}
	}
</style>
