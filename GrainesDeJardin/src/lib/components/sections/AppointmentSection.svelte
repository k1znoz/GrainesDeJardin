<script lang="ts">
	import { appointment, siteConfig } from '$lib/data/content';
	import { onMount } from 'svelte';
	
	// État du calendrier
	let currentDate = $state(new Date());
	let selectedDate = $state<Date | null>(null);
	let selectedTime = $state<string | null>(null);
	let showConfirmation = $state(false);
	
	// État du formulaire
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		message: ''
	});
	
	// Calcul des jours du mois
	let calendarDays = $derived(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();
		
		const days: (Date | null)[] = [];
		
		// Jours vides avant le 1er du mois
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}
		
		// Jours du mois
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}
		
		return days;
	});
	
	const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
	
	// Créneaux horaires disponibles
	const timeSlots = [
		'08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
		'11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
		'16:00', '16:30', '17:00', '17:30'
	];
	
	function previousMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
	}
	
	function nextMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
	}
	
	function selectDate(date: Date | null) {
		if (!date) return;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (date < today) return; // Pas de sélection de dates passées
		
		selectedDate = date;
		selectedTime = null; // Reset time selection
	}
	
	function selectTime(time: string) {
		selectedTime = time;
	}
	
	function isDateDisabled(date: Date | null): boolean {
		if (!date) return true;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (date < today) return true;
		
		// Dimanche désactivé
		if (date.getDay() === 0) return true;
		
		return false;
	}
	
	function isDateSelected(date: Date | null): boolean {
		if (!date || !selectedDate) return false;
		return date.toDateString() === selectedDate.toDateString();
	}
	
	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
	
	function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!selectedDate || !selectedTime) {
			alert('Veuillez sélectionner une date et une heure');
			return;
		}
		
		showConfirmation = true;
		
		// TODO: Envoyer la demande au backend ou par email
		console.log('Demande de RDV:', {
			date: selectedDate,
			time: selectedTime,
			...formData
		});
	}
	
	function resetForm() {
		selectedDate = null;
		selectedTime = null;
		showConfirmation = false;
		formData = { name: '', email: '', phone: '', message: '' };
	}
</script>

<section class="appointment-section" id="appointment">
	<div class="container">
		<!-- En-tête -->
		<div class="section-header">
			<h2 class="section-title">{appointment.title}</h2>
			<p class="section-subtitle">{appointment.subtitle}</p>
			<div class="note">{appointment.note}</div>
		</div>

		<!-- Bénéfices -->
		<div class="benefits-grid">
			{#each appointment.benefits as benefit}
				<div class="benefit-card">
					<div class="benefit-icon">{benefit.icon}</div>
					<h3 class="benefit-title">{benefit.title}</h3>
					<p class="benefit-description">{benefit.description}</p>
				</div>
			{/each}
		</div>

		{#if !showConfirmation}
			<!-- Booking Interface -->
			<div class="booking-container">
				<!-- Calendrier -->
				<div class="calendar-section">
					<div class="calendar-header">
						<button class="month-nav" onclick={previousMonth} aria-label="Mois précédent">‹</button>
						<h3 class="month-title">
							{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
						</h3>
						<button class="month-nav" onclick={nextMonth} aria-label="Mois suivant">›</button>
					</div>

					<div class="calendar-grid">
						<!-- Jours de la semaine -->
						{#each dayNames as day}
							<div class="day-name">{day}</div>
						{/each}

						<!-- Jours du mois -->
						{#each calendarDays() as date}
							<button
								class="calendar-day"
								class:disabled={isDateDisabled(date)}
								class:selected={isDateSelected(date)}
								class:empty={!date}
								onclick={() => selectDate(date)}
								disabled={isDateDisabled(date)}
							>
								{date ? date.getDate() : ''}
							</button>
						{/each}
					</div>

					<div class="availability-note">{appointment.availabilityNote}</div>
				</div>

				<!-- Horaires & Formulaire -->
				<div class="booking-form-section">
					{#if selectedDate}
						<div class="selected-date-display">
							<span class="date-icon">📅</span>
							<span class="date-text">{formatDate(selectedDate)}</span>
						</div>

						<!-- Créneaux horaires -->
						<div class="time-slots">
							<h4 class="time-slots-title">Choisissez un horaire</h4>
							<div class="time-grid">
								{#each timeSlots as time}
									<button
										class="time-slot"
										class:selected={selectedTime === time}
										onclick={() => selectTime(time)}
									>
										{time}
									</button>
								{/each}
							</div>
						</div>

						{#if selectedTime}
							<!-- Formulaire de contact -->
							<form class="booking-form" onsubmit={handleSubmit}>
								<div class="form-group">
									<label for="apt-name">Votre nom *</label>
									<input
										type="text"
										id="apt-name"
										bind:value={formData.name}
										placeholder="Nom complet"
										required
									/>
								</div>

								<div class="form-row">
									<div class="form-group">
										<label for="apt-email">Email *</label>
										<input
											type="email"
											id="apt-email"
											bind:value={formData.email}
											placeholder="votre@email.com"
											required
										/>
									</div>

									<div class="form-group">
										<label for="apt-phone">Téléphone *</label>
										<input
											type="tel"
											id="apt-phone"
											bind:value={formData.phone}
											placeholder="06 XX XX XX XX"
											required
										/>
									</div>
								</div>

								<div class="form-group">
									<label for="apt-message">Message (optionnel)</label>
									<textarea
										id="apt-message"
										bind:value={formData.message}
										placeholder="Précisez vos besoins..."
										rows="3"
									></textarea>
								</div>

								<button type="submit" class="submit-button">
									📅 Demander ce rendez-vous
								</button>
							</form>
						{/if}
					{:else}
						<div class="select-date-prompt">
							<span class="prompt-icon">📅</span>
							<p class="prompt-text">Sélectionnez une date dans le calendrier</p>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Confirmation -->
			<div class="confirmation-message">
				<div class="confirmation-icon">✅</div>
				<h3 class="confirmation-title">Demande de rendez-vous envoyée !</h3>
				<p class="confirmation-text">
					Votre demande pour le <strong>{selectedDate ? formatDate(selectedDate) : ''}</strong> à
					<strong>{selectedTime}</strong> a bien été enregistrée.
				</p>
				<p class="confirmation-note">
					Julian vous contactera par téléphone au <strong>{formData.phone}</strong> pour confirmer ce
					rendez-vous.
				</p>
				<button class="reset-button" onclick={resetForm}>
					Faire une nouvelle demande
				</button>
			</div>
		{/if}

		<!-- Contact direct -->
		<div class="direct-contact">
			<p>Vous préférez le contact direct ?</p>
			<a href="tel:{siteConfig.phone.replace(/\s/g, '')}" class="phone-link">
				📞 Appelez maintenant : {siteConfig.phone}
			</a>
		</div>
	</div>
</section>

<style>
	.appointment-section {
		position: relative;
		padding: 6rem 2rem;
		background: linear-gradient(180deg, #388e3c 0%, #2e7d32 50%, #1b5e20 100%);
		overflow: hidden;
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
		margin-bottom: 3rem;
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
		margin: 0 auto 1.5rem;
		line-height: 1.6;
	}

	.note {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 152, 0, 0.2);
		border: 2px solid #ff9800;
		border-radius: 0.5rem;
		color: #ffe0b2;
		font-weight: 600;
		font-size: 0.9375rem;
	}

	/* Bénéfices */
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.benefit-card {
		text-align: center;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.benefit-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.benefit-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #c8e6c9;
		margin-bottom: 0.5rem;
	}

	.benefit-description {
		font-size: 1rem;
		color: #a5d6a7;
		margin: 0;
	}

	/* Booking Container */
	.booking-container {
		display: grid;
		grid-template-columns: 400px 1fr;
		gap: 3rem;
		background: white;
		border-radius: 1.5rem;
		padding: 2.5rem;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
		margin-bottom: 3rem;
	}

	/* Calendrier */
	.calendar-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.month-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1b5e20;
		margin: 0;
	}

	.month-nav {
		width: 36px;
		height: 36px;
		border: none;
		background: #f1f8e9;
		border-radius: 50%;
		font-size: 1.5rem;
		color: #2e7d32;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.month-nav:hover {
		background: #c8e6c9;
		transform: scale(1.1);
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.5rem;
	}

	.day-name {
		text-align: center;
		font-size: 0.75rem;
		font-weight: 700;
		color: #558b2f;
		padding: 0.5rem 0;
		text-transform: uppercase;
	}

	.calendar-day {
		aspect-ratio: 1;
		border: none;
		background: #f1f8e9;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #2e7d32;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.calendar-day:hover:not(.disabled):not(.empty) {
		background: #c8e6c9;
		transform: scale(1.1);
	}

	.calendar-day.selected {
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
	}

	.calendar-day.disabled {
		background: transparent;
		color: #bdbdbd;
		cursor: not-allowed;
		text-decoration: line-through;
	}

	.calendar-day.empty {
		background: transparent;
		cursor: default;
	}

	.availability-note {
		font-size: 0.8125rem;
		color: #558b2f;
		font-style: italic;
		text-align: center;
		padding: 0.75rem;
		background: #f1f8e9;
		border-radius: 0.5rem;
	}

	/* Booking Form Section */
	.booking-form-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.selected-date-display {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border-radius: 0.75rem;
		font-size: 1.125rem;
		font-weight: 600;
	}

	.date-icon {
		font-size: 1.5rem;
	}

	/* Time Slots */
	.time-slots-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #1b5e20;
		margin: 0 0 1rem;
	}

	.time-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		gap: 0.75rem;
	}

	.time-slot {
		padding: 0.75rem;
		border: 2px solid #c8e6c9;
		background: white;
		border-radius: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: #2e7d32;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.time-slot:hover {
		border-color: #4a7c2c;
		background: #f1f8e9;
	}

	.time-slot.selected {
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border-color: #2d5016;
	}

	/* Select Date Prompt */
	.select-date-prompt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 4rem 2rem;
		text-align: center;
	}

	.prompt-icon {
		font-size: 4rem;
		opacity: 0.5;
	}

	.prompt-text {
		font-size: 1.125rem;
		color: #558b2f;
		margin: 0;
	}

	/* Booking Form */
	.booking-form {
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
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #2d5016;
		box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
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
	}

	.submit-button:hover {
		background: linear-gradient(135deg, #3a6b1e 0%, #5a9c3c 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
	}

	/* Confirmation */
	.confirmation-message {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 1.5rem;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
		margin-bottom: 3rem;
	}

	.confirmation-icon {
		font-size: 5rem;
		margin-bottom: 1.5rem;
	}

	.confirmation-title {
		font-size: 2rem;
		font-weight: 700;
		color: #1b5e20;
		margin-bottom: 1rem;
	}

	.confirmation-text,
	.confirmation-note {
		font-size: 1.125rem;
		color: #2e7d32;
		line-height: 1.6;
		margin: 0 0 1rem;
	}

	.confirmation-note {
		font-size: 1rem;
		color: #558b2f;
	}

	.reset-button {
		margin-top: 2rem;
		padding: 0.875rem 2rem;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border: none;
		border-radius: 0.75rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.reset-button:hover {
		transform: translateY(-2px);
	}

	/* Direct Contact */
	.direct-contact {
		text-align: center;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		backdrop-filter: blur(10px);
	}

	.direct-contact p {
		color: #c8e6c9;
		font-size: 1.125rem;
		margin: 0 0 1rem;
	}

	.phone-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: white;
		color: #2d5016;
		border-radius: 9999px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.125rem;
		transition: all 0.3s ease;
	}

	.phone-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	/* Mobile */
	@media (max-width: 968px) {
		.booking-container {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 1.5rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.time-grid {
			grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
		}
	}
</style>
