<script lang="ts">
	import { siteConfig } from '$lib/data/content';

	let { class: className = '' } = $props();

	// Format le numéro pour le lien tel:
	const phoneLink = siteConfig.phone.replace(/\s/g, '');
</script>

<a
	href={'tel:' + phoneLink}
	class={'phone-button ' + className}
	aria-label={'Appeler ' + siteConfig.name}
>
	<svg
		class="phone-icon"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
		/>
	</svg>
	<span class="phone-text">{siteConfig.phone}</span>
</a>

<style>
	.phone-button {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: var(--brand-brown-soft);
		color: white;
		border-radius: 9999px;
		font-weight: 600;
		font-size: 1.125rem;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.phone-button:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		background: var(--brand-green-pastel);
		color: var(--brand-brown);
	}

	.phone-button:focus-visible {
		outline: 2px solid var(--brand-green-pastel);
		outline-offset: 2px;
	}

	.phone-button:active {
		transform: translateY(0) scale(0.98);
	}

	.phone-icon {
		width: 1.5rem;
		height: 1.5rem;
		animation: ring 2s ease-in-out infinite;
	}

	@keyframes ring {
		0%,
		100% {
			transform: rotate(0deg);
		}
		10%,
		30% {
			transform: rotate(-10deg);
		}
		20%,
		40% {
			transform: rotate(10deg);
		}
		50% {
			transform: rotate(0deg);
		}
	}

	.phone-text {
		white-space: nowrap;
	}

	/* Version sticky flottante */
	:global(.phone-button-sticky) {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 1000;
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

	/* Version mobile */
	@media (max-width: 640px) {
		.phone-button {
			padding: 0.875rem 1.25rem;
			font-size: 1rem;
		}

		.phone-text {
			font-size: 0.875rem;
		}

		:global(.phone-button-sticky) {
			bottom: 1rem;
			right: 1rem;
		}
	}
</style>
