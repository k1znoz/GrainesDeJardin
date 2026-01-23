<script lang="ts">
	import { gallery } from '$lib/data/content';
	
	let currentIndex = $state(0);
	let isTransitioning = $state(false);
	let photoState = $state<'before' | 'during' | 'after'>('before');
	let direction = $state<'left' | 'right'>('right');
	
	// Index pour naviguer entre plusieurs photos d'un même état
	let beforePhotoIndex = $state(0);
	let duringPhotoIndex = $state(0);
	let afterPhotoIndex = $state(0);
	
	function nextProject() {
		if (isTransitioning) return;
		direction = 'right';
		isTransitioning = true;
		currentIndex = (currentIndex + 1) % gallery.projects.length;
		setTimeout(() => isTransitioning = false, 600);
	}
	
	function prevProject() {
		if (isTransitioning) return;
		direction = 'left';
		isTransitioning = true;
		currentIndex = (currentIndex - 1 + gallery.projects.length) % gallery.projects.length;
		setTimeout(() => isTransitioning = false, 600);
	}
	
	function goToProject(index: number) {
		if (isTransitioning || index === currentIndex) return;
		direction = index > currentIndex ? 'right' : 'left';
		isTransitioning = true;
		currentIndex = index;
		setTimeout(() => isTransitioning = false, 600);
	}
	
	function cyclePhotoState() {
		if (photoState === 'before') {
			photoState = 'during';
		} else if (photoState === 'during') {
			photoState = 'after';
		} else {
			photoState = 'before';
		}
	}
	
	function nextPhotoInState(project: any) {
		if (photoState === 'before' && project.before.length > 1) {
			beforePhotoIndex = (beforePhotoIndex + 1) % project.before.length;
		} else if (photoState === 'during' && project.during.length > 1) {
			duringPhotoIndex = (duringPhotoIndex + 1) % project.during.length;
		} else if (photoState === 'after' && project.after.length > 1) {
			afterPhotoIndex = (afterPhotoIndex + 1) % project.after.length;
		}
	}
	
	function prevPhotoInState(project: any) {
		if (photoState === 'before' && project.before.length > 1) {
			beforePhotoIndex = (beforePhotoIndex - 1 + project.before.length) % project.before.length;
		} else if (photoState === 'during' && project.during.length > 1) {
			duringPhotoIndex = (duringPhotoIndex - 1 + project.during.length) % project.during.length;
		} else if (photoState === 'after' && project.after.length > 1) {
			afterPhotoIndex = (afterPhotoIndex - 1 + project.after.length) % project.after.length;
		}
	}
	
	$effect(() => {
		// Reset à "avant" quand on change de projet
		currentIndex; // Créer la dépendance réactive
		photoState = 'before';
		beforePhotoIndex = 0;
		duringPhotoIndex = 0;
		afterPhotoIndex = 0;
	});
</script>

<section class="gallery-section" id="gallery" aria-label="Galerie de projets">
	<div class="container">
		<!-- En-tête -->
		<div class="section-header">
			<h2 class="section-title">{gallery.title}</h2>
			<p class="section-subtitle">{gallery.subtitle}</p>
			<div class="note">{gallery.note}</div>
		</div>

		<!-- Slider principal -->
		<div class="gallery-slider">
			<div class="slider-track">
				{#each gallery.projects as project, index}
					<div 
						class="slider-container" 
						class:active={index === currentIndex}
						class:prev={index === (currentIndex - 1 + gallery.projects.length) % gallery.projects.length}
						class:next={index === (currentIndex + 1) % gallery.projects.length}
						class:transitioning={isTransitioning}
						class:slide-left={isTransitioning && direction === 'left'}
						class:slide-right={isTransitioning && direction === 'right'}
					>
<!-- Image avant/pendant/après -->
					<div class="image-container">
						<div class="image-wrapper" 
							class:show-during={photoState === 'during' && index === currentIndex}
							class:show-after={photoState === 'after' && index === currentIndex}>
							<!-- Image AVANT -->
							<div class="image before-image" class:active={photoState === 'before' || index !== currentIndex}>
									{#if project.before.length > 0}
										<img 
											src={project.before[beforePhotoIndex]} 
											alt="{project.title} - Avant"
											class="real-image"
										/>
										<!-- Navigation photos multiples -->
										{#if project.before.length > 1 && index === currentIndex && photoState === 'before'}
											<button class="photo-nav-side prev" onclick={(e) => { e.stopPropagation(); prevPhotoInState(project); }} aria-label="Photo précédente">
												‹
											</button>
											<button class="photo-nav-side next" onclick={(e) => { e.stopPropagation(); nextPhotoInState(project); }} aria-label="Photo suivante">
												›
											</button>
											<div class="photo-counter">{beforePhotoIndex + 1}/{project.before.length}</div>
										{/if}
									{:else}
										<div class="placeholder-image">
											<span class="placeholder-icon">🌿</span>
											<span class="placeholder-text">AVANT</span>
											<span class="placeholder-note">Photo à venir</span>
										</div>
									{/if}
									<div class="image-label before-label">Avant</div>
								</div>
								
								<!-- Image PENDANT -->
								<div class="image during-image" class:active={photoState === 'during' && index === currentIndex}>
									{#if project.during.length > 0}
										<img 
											src={project.during[duringPhotoIndex]} 
											alt="{project.title} - Pendant"
											class="real-image"
										/>
										<!-- Navigation photos multiples -->
										{#if project.during.length > 1 && index === currentIndex && photoState === 'during'}
											<button class="photo-nav-side prev" onclick={(e) => { e.stopPropagation(); prevPhotoInState(project); }} aria-label="Photo précédente">
												‹
											</button>
											<button class="photo-nav-side next" onclick={(e) => { e.stopPropagation(); nextPhotoInState(project); }} aria-label="Photo suivante">
												›
											</button>
											<div class="photo-counter">{duringPhotoIndex + 1}/{project.during.length}</div>
										{/if}
									{:else}
										<div class="placeholder-image progress">
											<span class="placeholder-icon">🔨</span>
											<span class="placeholder-text">PENDANT</span>
											<span class="placeholder-note">Photo à venir</span>
										</div>
									{/if}
									<div class="image-label during-label">Pendant</div>
								</div>
								
								<!-- Image APRÈS -->
								<div class="image after-image" class:active={photoState === 'after' && index === currentIndex}>
									{#if project.after.length > 0}
										<img 
											src={project.after[afterPhotoIndex]} 
											alt="{project.title} - Après"
											class="real-image"
										/>
										<!-- Navigation photos multiples -->
										{#if project.after.length > 1 && index === currentIndex && photoState === 'after'}
											<button class="photo-nav-side prev" onclick={(e) => { e.stopPropagation(); prevPhotoInState(project); }} aria-label="Photo précédente">
												‹
											</button>
											<button class="photo-nav-side next" onclick={(e) => { e.stopPropagation(); nextPhotoInState(project); }} aria-label="Photo suivante">
												›
											</button>
											<div class="photo-counter">{afterPhotoIndex + 1}/{project.after.length}</div>
										{/if}
									{:else}
										<div class="placeholder-image success">
											<span class="placeholder-icon">✨</span>
											<span class="placeholder-text">APRÈS</span>
											<span class="placeholder-note">Photo à venir</span>
										</div>
									{/if}
									<div class="image-label after-label">Après</div>
								</div>
							</div>
							
							<!-- Bouton cycle avant/pendant/après (seulement sur la carte active) -->
							{#if index === currentIndex}
								<button class="toggle-button" onclick={cyclePhotoState}>
									<span class="toggle-icon">→</span>
									<span class="toggle-text">
										{photoState === 'before' ? 'Voir pendant' : photoState === 'during' ? 'Voir après' : 'Voir avant'}
									</span>
								</button>
							{/if}
						</div>

						<!-- Info du projet -->
						<div class="project-info">
							<div class="project-header">
								<h3 class="project-title">{project.title}</h3>
								<div class="project-location">
									<span class="location-icon">📍</span>
									{project.location}
								</div>
							</div>
							
							<p class="project-description">{project.description}</p>
							
							<div class="project-services">
								{#each project.services as service}
									<span class="service-tag">{service}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Navigation -->
			<button class="nav-button prev" onclick={prevProject} aria-label="Projet précédent">
				<span>‹</span>
			</button>
			<button class="nav-button next" onclick={nextProject} aria-label="Projet suivant">
				<span>›</span>
			</button>

			<!-- Dots navigation -->
			<div class="dots-nav">
				{#each gallery.projects as _, index}
					<button
						class="dot"
						class:active={index === currentIndex}
						onclick={() => goToProject(index)}
						aria-label="Aller au projet {index + 1}"
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.gallery-section {
		position: relative;
		padding: 6rem 2rem;
		background: linear-gradient(180deg, #4caf50 0%, #43a047 50%, #388e3c 100%);
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
		margin: 0 auto 1.5rem;
		line-height: 1.6;
	}

	.note {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.9);
		border-left: 4px solid #ff9800;
		border-radius: 0.5rem;
		color: #f57c00;
		font-weight: 600;
		font-size: 0.9375rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Slider */
	.gallery-slider {
		position: relative;
		max-width: 1000px;
		margin: 0 auto;
		perspective: 1500px;
		overflow: visible;
	}

	.slider-track {
		position: relative;
		width: 100%;
		height: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slider-container {
		position: absolute;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		background: white;
		border-radius: 1.5rem;
		padding: 2rem;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		pointer-events: none;
		transform: translateX(100%) scale(0.8);
		z-index: 0;
	}

	/* Carte active */
	.slider-container.active {
		opacity: 1;
		pointer-events: auto;
		transform: translateX(0) scale(1);
		z-index: 3;
	}

	/* Carte précédente (à gauche) */
	.slider-container.prev {
		opacity: 0.3;
		transform: translateX(-120%) scale(0.85) rotateY(15deg);
		z-index: 1;
	}

	/* Carte suivante (à droite) */
	.slider-container.next {
		opacity: 0.3;
		transform: translateX(120%) scale(0.85) rotateY(-15deg);
		z-index: 1;
	}

	/* Animations de transition */
	.slider-container.transitioning.slide-right {
		animation: slideOutLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.slider-container.transitioning.slide-left {
		animation: slideOutRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideOutLeft {
		from {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateX(-120%) scale(0.85) rotateY(15deg);
		}
	}

	@keyframes slideOutRight {
		from {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateX(120%) scale(0.85) rotateY(-15deg);
		}
	}

	.slider-container:hover {
		transform: translateX(0) scale(1.02);
	}

	.slider-container.prev:hover,
	.slider-container.next:hover {
		opacity: 0.5;
	}

	/* Image container */
	.image-container {
		position: relative;
		aspect-ratio: 4/3;
		border-radius: 1rem;
		overflow: hidden;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.image {
		position: absolute;
		inset: 0;
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.real-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.before-image {
		opacity: 1;
		transform: translateX(0);
	}

	.during-image {
		opacity: 0;
		transform: translateX(20px);
	}

	.after-image {
		opacity: 0;
		transform: translateX(20px);
	}

	/* État PENDANT */
	.image-wrapper.show-during .before-image {
		opacity: 0;
		transform: translateX(-20px);
	}

	.image-wrapper.show-during .during-image {
		opacity: 1;
		transform: translateX(0);
	}

	.image-wrapper.show-during .after-image {
		opacity: 0;
		transform: translateX(20px);
	}

	/* État APRÈS */
	.image-wrapper.show-after .before-image {
		opacity: 0;
		transform: translateX(-20px);
	}

	.image-wrapper.show-after .during-image {
		opacity: 0;
		transform: translateX(-20px);
	}

	.image-wrapper.show-after .after-image {
		opacity: 1;
		transform: translateX(0);
	}

	/* Placeholders */
	.placeholder-image {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
		gap: 1rem;
	}

	.placeholder-image.progress {
		background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
	}

	.placeholder-image.success {
		background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
	}

	.placeholder-icon {
		font-size: 4rem;
		opacity: 0.6;
	}

	.placeholder-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: #666;
		letter-spacing: 0.1em;
	}

	.placeholder-image.progress .placeholder-text {
		color: #f57f17;
	}

	.placeholder-image.success .placeholder-text {
		color: #2e7d32;
	}

	.placeholder-note {
		font-size: 0.875rem;
		color: #999;
		font-style: italic;
	}

	/* Labels */
	.image-label {
		position: absolute;
		top: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-weight: 700;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.before-label {
		left: 1rem;
		background: #ff5722;
		color: white;
	}

	.during-label {
		left: 50%;
		transform: translateX(-50%);
		background: #ffc107;
		color: #333;
	}

	.after-label {
		right: 1rem;
		background: #4caf50;
		color: white;
	}

	/* Toggle button */
	.toggle-button {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.95);
		border: none;
		border-radius: 9999px;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		z-index: 10;
	}

	.toggle-button:hover {
		background: white;
		transform: translateX(-50%) scale(1.05);
	}

	.toggle-icon {
		font-size: 1.25rem;
	}

	/* Navigation pour photos multiples */
	.photo-nav-side {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 40px;
		background: rgba(0, 0, 0, 0.7);
		border: none;
		border-radius: 50%;
		color: white;
		font-size: 1.75rem;
		font-weight: 700;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		z-index: 8;
		opacity: 0;
	}

	.image-container:hover .photo-nav-side {
		opacity: 1;
	}

	.photo-nav-side.prev {
		left: 0.75rem;
	}

	.photo-nav-side.next {
		right: 0.75rem;
	}

	.photo-nav-side:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: translateY(-50%) scale(1.1);
	}

	.photo-counter {
		position: absolute;
		bottom: 4.5rem;
		right: 1rem;
		padding: 0.375rem 0.75rem;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 9999px;
		color: white;
		font-size: 0.8125rem;
		font-weight: 600;
		z-index: 6;
	}

	/* Project info */
	.project-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.5rem;
	}

	.project-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.project-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1b5e20;
		margin: 0;
	}

	.project-location {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #558b2f;
		font-size: 1rem;
	}

	.location-icon {
		font-size: 1.25rem;
	}

	.project-description {
		font-size: 1.0625rem;
		color: #2e7d32;
		line-height: 1.7;
		margin: 0;
	}

	.project-services {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.service-tag {
		padding: 0.5rem 1rem;
		background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
		color: white;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
	}

	/* Navigation */
	.nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		font-size: 2rem;
		font-weight: 700;
		color: #2d5016;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		z-index: 10;
	}

	.nav-button:hover {
		background: white;
		transform: translateY(-50%) scale(1.1);
	}

	.nav-button.prev {
		left: -25px;
	}

	.nav-button.next {
		right: -25px;
	}

	/* Dots navigation */
	.dots-nav {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid white;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.dot.active {
		background: white;
		transform: scale(1.3);
	}

	.dot:hover {
		transform: scale(1.2);
	}

	/* Mobile */
	@media (max-width: 768px) {
		.gallery-section {
			padding: 4rem 1rem;
		}

		.slider-track {
			height: 700px;
		}

		.slider-container {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 1.5rem;
		}

		/* Désactiver l'effet 3D sur mobile */
		.slider-container.prev,
		.slider-container.next {
			transform: translateX(-120%) scale(0.85);
		}

		.slider-container.active:hover {
			transform: translateX(0) scale(1);
		}

		.nav-button {
			width: 40px;
			height: 40px;
			font-size: 1.5rem;
		}

		.nav-button.prev {
			left: -10px;
		}

		.nav-button.next {
			right: -10px;
		}

		.project-title {
			font-size: 1.5rem;
		}

		.project-description {
			font-size: 1rem;
		}
	}
</style>
