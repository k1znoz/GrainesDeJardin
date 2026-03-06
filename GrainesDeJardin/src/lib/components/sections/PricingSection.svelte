<script lang="ts">
	import { pricing } from '$lib/data/content';
	import { onMount } from 'svelte';
	import SectionDivider from '$lib/components/ui/SectionDivider.svelte';
	import HeaderOrnament from '$lib/components/ui/HeaderOrnament.svelte';

	let processSteps: HTMLElement[] = [];
	let formulaCards: HTMLElement[] = [];

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

		[...processSteps, ...formulaCards].forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<section class="pricing-section" id="pricing">
	<!-- Decor : racines en arriere-plan -->
	<div class="roots-background">
		<svg class="roots" viewBox="0 0 800 600">
			<path
				d="M 400 0 Q 350 150 300 300 Q 250 450 200 600"
				stroke="#6a5a3d"
				stroke-width="6"
				fill="none"
				opacity="0.08"
			/>
			<path
				d="M 400 0 Q 450 150 500 300 Q 550 450 600 600"
				stroke="#6a5a3d"
				stroke-width="6"
				fill="none"
				opacity="0.08"
			/>
			<path d="M 400 0 L 400 600" stroke="#6a5a3d" stroke-width="8" fill="none" opacity="0.1" />
		</svg>
	</div>

	<div class="container">
		<!-- En-tete -->
		<div class="section-header">
			<h2 class="section-title">{pricing.title}</h2>
			<p class="section-subtitle">{pricing.subtitle}</p>
			<HeaderOrnament />
		</div>

		<!-- Processus en 3 etapes -->
		<div class="process-flow">
			{#each pricing.process as step, i (`${step.step}-${step.title}-${i}`)}
				<div class="process-step" bind:this={processSteps[i]} style="--delay: {i * 0.15}s">
					<div class="step-number">{step.step}</div>
					<div class="step-icon">{step.icon}</div>
					<h3 class="step-title">{step.title}</h3>
					<p class="step-description">{step.description}</p>
				</div>

				{#if i < pricing.process.length - 1}
					<div class="process-arrow">&rarr;</div>
				{/if}
			{/each}
		</div>

		<!-- Formules tarifaires -->
		<div class="formulas-grid">
			{#each pricing.formulas as formula, i (`${formula.name}-${i}`)}
				<div
					class="formula-card"
					class:highlighted={formula.highlighted}
					bind:this={formulaCards[i]}
					style="--delay: {(i + 3) * 0.15}s"
				>
					{#if formula.highlighted}
						<div class="badge">Recommande</div>
					{/if}

					<h3 class="formula-name">{formula.name}</h3>
					<p class="formula-description">{formula.description}</p>

					<ul class="formula-features">
						{#each formula.features as feature, featureIndex (`${formula.name}-${feature}-${featureIndex}`)}
							<li>
								<span class="check-icon">&#10003;</span>
								{feature}
							</li>
						{/each}
					</ul>

					<a href="#contact" class="formula-cta"> Demander un devis </a>
				</div>
			{/each}
		</div>
	</div>

	<!-- Divider -->
	<div class="section-divider" aria-hidden="true">
		<SectionDivider colorFrom="#805f40" colorTo="#6f5238" height={120} />
	</div>
</section>

<style>
	.pricing-section {
		position: relative;
		padding: 6rem 2rem;
		background: #987450;
		overflow: hidden;
	}

	/* Decor racines */
	.roots-background {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.roots {
		width: 100%;
		height: 100%;
		max-width: 800px;
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
		color: #f8f1e8;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
	}

	.section-subtitle {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #efdcc7;
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Processus */
	.process-flow {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 4rem;
		flex-wrap: wrap;
	}

	.process-step {
		flex: 1;
		min-width: 220px;
		max-width: 280px;
		background: white;
		padding: 2rem 1.5rem;
		border-radius: 1rem;
		text-align: center;
		box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s ease;
		transition-delay: var(--delay, 0s);
		position: relative;
	}

	:global(.process-step.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.step-number {
		position: absolute;
		top: -1rem;
		left: 50%;
		transform: translateX(-50%);
		width: 2.5rem;
		height: 2.5rem;
		background: var(--brand-brown-soft);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.125rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
	}

	.step-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.step-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #4a3a2a;
		margin-bottom: 0.75rem;
	}

	.step-description {
		font-size: 0.9375rem;
		color: #705d45;
		line-height: 1.6;
	}

	.process-arrow {
		font-size: 2rem;
		color: #efdcc7;
		font-weight: 700;
		flex-shrink: 0;
	}

	/* Formules */
	.formulas-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.formula-card {
		background: white;
		padding: 2.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
		transition: all 0.4s ease;
		opacity: 0;
		transform: translateY(30px);
		transition-delay: var(--delay, 0s);
		position: relative;
		display: flex;
		flex-direction: column;
	}

	:global(.formula-card.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.formula-card.highlighted {
		border: 3px solid #d2ae80;
		box-shadow: 0 6px 18px rgba(130, 98, 63, 0.24);
		transform: scale(1.05);
	}

	:global(.formula-card.highlighted.visible) {
		transform: scale(1.05) translateY(0);
	}

	.formula-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 8px 22px rgba(0, 0, 0, 0.14);
	}

	.formula-card.highlighted:hover {
		transform: scale(1.05) translateY(-10px);
	}

	.badge {
		position: absolute;
		top: -0.75rem;
		right: 1.5rem;
		background: #b78b5a;
		color: white;
		padding: 0.375rem 1rem;
		border-radius: 9999px;
		font-size: 0.8125rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
	}

	.formula-name {
		font-size: 1.75rem;
		font-weight: 700;
		color: #4a3a2a;
		margin-bottom: 1rem;
	}

	.formula-description {
		font-size: 1rem;
		color: #705d45;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.formula-features {
		list-style: none;
		padding: 0;
		margin: 0 0 2rem;
		flex-grow: 1;
	}

	.formula-features li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 0;
		color: #64543e;
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.check-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		background: var(--brand-brown-soft);
		color: white;
		border-radius: 50%;
		font-weight: 700;
		font-size: 0.75rem;
		flex-shrink: 0;
	}

	.formula-cta {
		display: block;
		width: 100%;
		padding: 1rem;
		background: var(--brand-brown-soft);
		color: white;
		text-align: center;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.formula-cta:hover {
		background: var(--brand-green-pastel);
		color: var(--brand-brown);
		transform: translateY(-2px);
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
	}

	.formula-cta:focus-visible {
		outline: 2px solid var(--brand-green-pastel);
		outline-offset: 2px;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.pricing-section {
			padding: 4rem 1rem;
		}

		.process-flow {
			flex-direction: column;
		}

		.process-arrow {
			transform: rotate(90deg);
		}

		.formula-card.highlighted {
			transform: scale(1);
		}

		:global(.formula-card.highlighted.visible) {
			transform: translateY(0);
		}
	}
</style>
