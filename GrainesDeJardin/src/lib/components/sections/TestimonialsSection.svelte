<script lang="ts">
	import { testimonials } from '$lib/data/content';
	import { onMount } from 'svelte';
	
	let testimonialCards: HTMLElement[] = [];
	
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
				threshold: 0.2
			}
		);

		testimonialCards.forEach((card) => {
			if (card) observer.observe(card);
		});

		return () => observer.disconnect();
	});
</script>

<section class="testimonials-section" id="testimonials">
	<!-- Décor : sol avec herbe -->
	<div class="ground-background">
		<div class="grass-layer">
			{#each Array(30) as _, i}
				<div class="grass-blade" style="--i: {i}">🌱</div>
			{/each}
		</div>
	</div>

	<div class="container">
		<!-- En-tête -->
		<div class="section-header">
			<h2 class="section-title">{testimonials.title}</h2>
			<p class="section-subtitle">{testimonials.subtitle}</p>
		</div>

		<!-- Grille d'avis -->
		<div class="testimonials-grid">
			{#each testimonials.list as testimonial, i}
				<div class="testimonial-card" bind:this={testimonialCards[i]} style="--delay: {i * 0.15}s">
					<!-- Étoiles -->
					<div class="rating">
						{#each Array(testimonial.rating) as _}
							<span class="star">★</span>
						{/each}
					</div>

					<!-- Citation -->
					<blockquote class="testimonial-text">
						"{testimonial.text}"
					</blockquote>

					<!-- Auteur -->
					<div class="testimonial-author">
						<div class="author-avatar">{testimonial.name.charAt(0)}</div>
						<div class="author-info">
							<div class="author-name">{testimonial.name}</div>
							<div class="author-location">{testimonial.location}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Note moyenne (décoratif) -->
		<div class="average-rating">
			<div class="rating-number">5.0</div>
			<div class="rating-stars">★★★★★</div>
			<div class="rating-label">Basé sur {testimonials.list.length} avis clients</div>
		</div>
	</div>
</section>

<style>
	.testimonials-section {
		position: relative;
		padding: 6rem 2rem;
		background: linear-gradient(180deg, #2e7d32 0%, #1b5e20 50%, #33691e 100%);
		overflow: hidden;
	}

	/* Décor sol et herbe */
	.ground-background {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100px;
		pointer-events: none;
	}

	.grass-layer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.grass-blade {
		position: absolute;
		bottom: 0;
		font-size: 1.5rem;
		opacity: 0.2;
		left: calc(var(--i) * 3.33%);
		animation: sway 3s ease-in-out infinite;
		animation-delay: calc(var(--i) * -0.1s);
	}

	@keyframes sway {
		0%,
		100% {
			transform: rotate(-5deg);
		}
		50% {
			transform: rotate(5deg);
		}
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
		color: #e8f5e9;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
	}

	.section-subtitle {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #c8e6c9;
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Grille d'avis */
	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.testimonial-card {
		background: white;
		padding: 2rem;
		border-radius: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		transition: all 0.4s ease;
		opacity: 0;
		transform: translateY(30px) rotateX(10deg);
		transition-delay: var(--delay, 0s);
		position: relative;
	}

	:global(.testimonial-card.visible) {
		opacity: 1;
		transform: translateY(0) rotateX(0);
	}

	.testimonial-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
	}

	.testimonial-card::before {
		content: '"';
		position: absolute;
		top: -1rem;
		left: 1.5rem;
		font-size: 6rem;
		font-family: Georgia, serif;
		color: #e8f5e9;
		opacity: 0.3;
		line-height: 1;
	}

	.rating {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.star {
		color: #ffd54f;
		font-size: 1.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.testimonial-text {
		font-size: 1.0625rem;
		color: #2e7d32;
		line-height: 1.7;
		margin: 0 0 1.5rem;
		font-style: italic;
		position: relative;
		z-index: 1;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.author-avatar {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.author-info {
		flex: 1;
	}

	.author-name {
		font-weight: 700;
		color: #1b5e20;
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	.author-location {
		font-size: 0.875rem;
		color: #558b2f;
	}

	/* Note moyenne */
	.average-rating {
		text-align: center;
		padding: 2.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1.5rem;
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	.rating-number {
		font-size: 4rem;
		font-weight: 900;
		color: #ffd54f;
		margin-bottom: 0.5rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
	}

	.rating-stars {
		font-size: 2rem;
		color: #ffd54f;
		margin-bottom: 0.75rem;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	}

	.rating-label {
		font-size: 1.125rem;
		color: #e8f5e9;
		font-weight: 500;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.testimonials-section {
			padding: 4rem 1rem;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
