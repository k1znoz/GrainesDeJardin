<script lang="ts">
	import { contact, siteConfig } from '$lib/data/content';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	import SectionDivider from '$lib/components/ui/SectionDivider.svelte';
	import HeaderOrnament from '$lib/components/ui/HeaderOrnament.svelte';

	let formData = $state({
		name: '',
		email: '',
		phone: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		// TODO: Integrer avec un service d'envoi d'emails (Formspree, EmailJS, etc.)
		// Pour l'instant, simulation
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log('Form data:', formData);
		submitStatus = 'success';
		isSubmitting = false;

		// Reset apres 3 secondes
		setTimeout(() => {
			submitStatus = 'idle';
			formData = { name: '', email: '', phone: '', message: '' };
		}, 3000);
	}
</script>

<section class="contact-section" id="contact">
	<!-- Top divider to match previous section -->
	<div class="section-divider section-divider-top" aria-hidden="true">
		<SectionDivider colorFrom="#584331" colorTo="#4d3a2b" height={120} flip={true} />
	</div>
	<!-- Decor : sous la terre -->
	<div class="underground-background">
		<div class="soil-layer"></div>
		<div class="roots-layer">
			{#each Array.from({ length: 15 }, (_, i) => i) as i (i)}
				<div class="small-root" style="--i: {i}"></div>
			{/each}
		</div>
	</div>

	<div class="container">
		<!-- En-tete -->
		<div class="section-header">
			<h2 class="section-title">{contact.title}</h2>
			<p class="section-subtitle">{contact.subtitle}</p>
			<HeaderOrnament />
		</div>

		<div class="contact-grid">
			<!-- Informations de contact -->
			<div class="contact-info">
				<div class="info-card phone-card">
					<div class="card-icon">&#x1F4DE;</div>
					<h3 class="card-title">Telephone</h3>
					<p class="card-content">{siteConfig.phone}</p>
					<p class="card-note">{contact.preferredContact}</p>
					<PhoneButton class="mt-4" />
				</div>

				<div class="info-card email-card">
					<div class="card-icon">&#9993;</div>
					<h3 class="card-title">Email</h3>
					<p class="card-content">{siteConfig.email}</p>
					<a href="mailto:{siteConfig.email}" class="card-link"> Envoyer un email </a>
				</div>

				<div class="info-card location-card">
					<div class="card-icon">&#x1F4CD;</div>
					<h3 class="card-title">Zone d'intervention</h3>
					<p class="card-content">{siteConfig.address}</p>
				</div>
			</div>

			<!-- Formulaire de contact -->
			<div class="contact-form-wrapper">
				<form class="contact-form" onsubmit={handleSubmit}>
					<div class="form-group">
						<label for="name">Votre nom *</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							placeholder={contact.form.namePlaceholder}
							required
							disabled={isSubmitting}
						/>
					</div>

					<div class="form-row">
						<div class="form-group">
							<label for="email">Votre email *</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								placeholder={contact.form.emailPlaceholder}
								required
								disabled={isSubmitting}
							/>
						</div>

						<div class="form-group">
							<label for="phone">Votre telephone</label>
							<input
								type="tel"
								id="phone"
								bind:value={formData.phone}
								placeholder={contact.form.phonePlaceholder}
								disabled={isSubmitting}
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="message">Votre message *</label>
						<textarea
							id="message"
							bind:value={formData.message}
							placeholder={contact.form.messagePlaceholder}
							rows="6"
							required
							disabled={isSubmitting}
						></textarea>
					</div>

					<button type="submit" class="submit-button" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="spinner"></span>
							Envoi en cours...
						{:else if submitStatus === 'success'}
							&#10003; Message envoye !
						{:else}
							{contact.form.submit}
						{/if}
					</button>

					{#if submitStatus === 'success'}
						<div class="success-message">
							Merci ! Votre message a bien ete envoye. Je vous recontacte tres rapidement.
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="footer">
		<p>&copy; {new Date().getFullYear()} {siteConfig.name} - Tous droits reserves</p>
		<p class="footer-tagline">Graines de Jardin - Votre jardin entre de bonnes mains &#x1F331;</p>
	</footer>
</section>

<style>
	.contact-section {
		position: relative;
		padding: 6rem 2rem 2rem;
		background: #4f3e30;
		overflow: hidden;
	}

	/* Decor sous-terrain */
	.underground-background {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.soil-layer {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.04);
	}

	.roots-layer {
		position: absolute;
		inset: 0;
	}

	.small-root {
		position: absolute;
		width: 2px;
		height: 100px;
		background: rgba(45, 80, 22, 0.1);
		top: calc(var(--i) * 6.66%);
		left: calc(var(--i) * 6.66%);
		transform: rotate(calc(var(--i) * 20deg));
		border-radius: 1px;
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
		color: #f6efe6;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
	}

	.section-subtitle {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #e7d6bf;
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Grille */
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	/* Infos de contact */
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 3px 14px rgba(0, 0, 0, 0.12);
		transition: transform 0.3s ease;
	}

	.info-card:hover {
		transform: translateY(-5px);
	}

	.card-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #4a3a2a;
		margin-bottom: 0.75rem;
	}

	.card-content {
		font-size: 1.125rem;
		color: #5f4b37;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.card-note {
		font-size: 0.875rem;
		color: #786249;
		font-style: italic;
		margin-bottom: 1rem;
	}

	.card-link {
		display: inline-block;
		padding: 0.625rem 1.25rem;
		background: var(--brand-brown-soft);
		color: white;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9375rem;
		transition: all 0.3s ease;
		margin-top: 0.75rem;
	}

	.card-link:hover {
		background: var(--brand-green-pastel);
		color: var(--brand-brown);
		transform: translateY(-2px);
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
	}

	.card-link:focus-visible {
		outline: 2px solid var(--brand-green-pastel);
		outline-offset: 2px;
	}

	/* Formulaire */
	.contact-form-wrapper {
		background: white;
		padding: 2.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: #4a3a2a;
		font-size: 0.9375rem;
	}

	.form-group input,
	.form-group textarea {
		padding: 0.875rem;
		border: 2px solid #e7dbc9;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.3s ease;
		background: white;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--brand-green-soft);
		box-shadow: 0 0 0 3px rgba(66, 99, 27, 0.1);
	}

	.form-group input:disabled,
	.form-group textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submit-button {
		padding: 1rem 2rem;
		background: var(--brand-brown-soft);
		color: white;
		border: none;
		border-radius: 0.75rem;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.submit-button:hover:not(:disabled) {
		background: var(--brand-green-pastel);
		color: var(--brand-brown);
		transform: translateY(-2px);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
	}

	.submit-button:focus-visible {
		outline: 2px solid var(--brand-green-pastel);
		outline-offset: 2px;
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.success-message {
		padding: 1rem;
		background: #e4ebd7;
		color: #4c3b2b;
		border-radius: 0.5rem;
		text-align: center;
		font-weight: 600;
	}

	/* Footer */
	.footer {
		text-align: center;
		padding: 3rem 2rem 2rem;
		color: #ddcdb7;
		border-top: 1px solid rgba(221, 205, 183, 0.22);
		margin-top: 4rem;
	}

	.footer p {
		margin: 0.5rem 0;
		font-size: 0.9375rem;
	}

	.footer-tagline {
		font-style: italic;
		opacity: 0.8;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.contact-section {
			padding: 4rem 1rem 2rem;
		}

		.contact-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.contact-form-wrapper {
			padding: 1.5rem;
		}
	}

	/* Classe utilitaire pour le PhoneButton */
	:global(.mt-4) {
		margin-top: 1rem;
	}
</style>
