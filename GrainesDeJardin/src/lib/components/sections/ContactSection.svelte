<script lang="ts">
	import { contact, siteConfig } from '$lib/data/content';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	
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
		
		// TODO: Intégrer avec un service d'envoi d'emails (Formspree, EmailJS, etc.)
		// Pour l'instant, simulation
		await new Promise((resolve) => setTimeout(resolve, 1500));
		
		console.log('Form data:', formData);
		submitStatus = 'success';
		isSubmitting = false;
		
		// Reset après 3 secondes
		setTimeout(() => {
			submitStatus = 'idle';
			formData = { name: '', email: '', phone: '', message: '' };
		}, 3000);
	}
</script>

<section class="contact-section" id="contact">
	<!-- Décor : sous la terre -->
	<div class="underground-background">
		<div class="soil-layer"></div>
		<div class="roots-layer">
			{#each Array(15) as _, i}
				<div class="small-root" style="--i: {i}"></div>
			{/each}
		</div>
	</div>

	<div class="container">
		<!-- En-tête -->
		<div class="section-header">
			<h2 class="section-title">{contact.title}</h2>
			<p class="section-subtitle">{contact.subtitle}</p>
		</div>

		<div class="contact-grid">
			<!-- Informations de contact -->
			<div class="contact-info">
				<div class="info-card phone-card">
					<div class="card-icon">📞</div>
					<h3 class="card-title">Téléphone</h3>
					<p class="card-content">{siteConfig.phone}</p>
					<p class="card-note">{contact.preferredContact}</p>
					<PhoneButton class="mt-4" />
				</div>

				<div class="info-card email-card">
					<div class="card-icon">✉️</div>
					<h3 class="card-title">Email</h3>
					<p class="card-content">{siteConfig.email}</p>
					<a href="mailto:{siteConfig.email}" class="card-link"> Envoyer un email </a>
				</div>

				<div class="info-card location-card">
					<div class="card-icon">📍</div>
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
							<label for="phone">Votre téléphone</label>
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
							✓ Message envoyé !
						{:else}
							{contact.form.submit}
						{/if}
					</button>

					{#if submitStatus === 'success'}
						<div class="success-message">
							Merci ! Votre message a bien été envoyé. Je vous recontacte très rapidement.
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="footer">
		<p>&copy; {new Date().getFullYear()} {siteConfig.name} - Tous droits réservés</p>
		<p class="footer-tagline">Graines de Jardin - Votre jardin entre de bonnes mains 🌱</p>
	</footer>
</section>

<style>
	.contact-section {
		position: relative;
		padding: 6rem 2rem 2rem;
		background: linear-gradient(180deg, #33691e 0%, #1b5e20 50%, #0d3818 100%);
		overflow: hidden;
	}

	/* Décor sous-terrain */
	.underground-background {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.soil-layer {
		position: absolute;
		inset: 0;
		background-image: repeating-linear-gradient(
			0deg,
			transparent 0px,
			rgba(0, 0, 0, 0.05) 2px,
			transparent 4px
		);
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
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
	}

	.section-subtitle {
		font-size: clamp(1.125rem, 2.5vw, 1.375rem);
		color: #c8e6c9;
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
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
		color: #1b5e20;
		margin-bottom: 0.75rem;
	}

	.card-content {
		font-size: 1.125rem;
		color: #2e7d32;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.card-note {
		font-size: 0.875rem;
		color: #558b2f;
		font-style: italic;
		margin-bottom: 1rem;
	}

	.card-link {
		display: inline-block;
		padding: 0.625rem 1.25rem;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9375rem;
		transition: all 0.3s ease;
		margin-top: 0.75rem;
	}

	.card-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	/* Formulaire */
	.contact-form-wrapper {
		background: white;
		padding: 2.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
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
		color: #1b5e20;
		font-size: 0.9375rem;
	}

	.form-group input,
	.form-group textarea {
		padding: 0.875rem;
		border: 2px solid #c8e6c9;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.3s ease;
		background: white;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #2d5016;
		box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
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
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
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
		background: linear-gradient(135deg, #3a6b1e 0%, #5a9c3c 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
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
		background: #c8e6c9;
		color: #1b5e20;
		border-radius: 0.5rem;
		text-align: center;
		font-weight: 600;
	}

	/* Footer */
	.footer {
		text-align: center;
		padding: 3rem 2rem 2rem;
		color: #c8e6c9;
		border-top: 1px solid rgba(200, 230, 201, 0.2);
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
