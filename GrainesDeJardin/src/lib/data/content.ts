// 📋 Contenu éditable de l'application
// Tous les textes sont centralisés ici pour faciliter les modifications

export const siteConfig = {
	name: 'Julian Lemoine',
	title: 'Paysagiste & Entretien de Jardins',
	phone: '06 XX XX XX XX', // À mettre à jour
	email: 'grainesdejardin85@gmail.com', 
	address: 'Sainte-Foy, 85150 France' 
};

export const hero = {
	title: 'Graines de Jardin',
	subtitle: 'L\'entretien de votre jardin confié à un expert',
	baseline: '14 ans d\'expérience au service de vos espaces verts',
	cta: 'Demander un devis',
	ctaPhone: 'Appeler maintenant'
};

export const experience = {
	title: 'Un parcours enraciné dans l\'excellence',
	intro:
		'Passionné depuis toujours, j\'ai construit mon expertise au fil des années pour vous offrir un service professionnel et sur-mesure.',
	timeline: [
		{
			year: '2010',
			title: 'BEP Paysagiste',
			description: 'Première pierre de mon parcours professionnel',
			icon: '🌱'
		},
		{
			year: '2012',
			title: 'Bac Pro Paysagiste',
			description: '4 ans d\'apprentissage terrain durant mes études',
			icon: '🌿'
		},
		{
			year: '2012-2022',
			title: 'Chef d\'équipe',
			description: '10 ans de management dans une grande entreprise du secteur',
			icon: '🌳'
		},
		{
			year: '2012-2026',
			title: '14 ans d\'activité',
			description: 'Une expertise confirmée, des centaines de jardins entretenus',
			icon: '🏆'
		}
	]
};

export const services = {
	title: 'Des services d\'entretien professionnels',
	subtitle: 'Je me concentre exclusivement sur l\'entretien, pour un travail de qualité irréprochable',
	note: '⚠️ Pas de création paysagère – uniquement de l\'entretien expert',
	list: [
		{
			name: 'Tonte',
			description:
				'Tonte régulière et soignée de vos pelouses. Finitions impeccables, respect des bordures.',
			icon: '🌾',
			features: ['Tonte mulching', 'Ramassage ou broyage', 'Bordures nettes']
		},
		{
			name: 'Taille',
			description:
				'Taille de haies, arbustes et arbres. Respect de la croissance naturelle et des formes.',
			icon: '✂️',
			features: ['Haies et arbustes', 'Taille douce', 'Évacuation des déchets']
		},
		{
			name: 'Entretien global',
			description:
				'Désherbage, nettoyage, ramassage de feuilles. Votre jardin impeccable toute l\'année.',
			icon: '🧹',
			features: ['Désherbage manuel', 'Nettoyage saisonnier', 'Suivi régulier']
		}
	]
};

export const pricing = {
	title: 'Une tarification adaptée à vos besoins',
	subtitle: 'Pas de surprise : un devis clair après évaluation sur place',
	process: [
		{
			step: '1',
			title: 'Premier rendez-vous',
			description: 'Je me déplace gratuitement pour évaluer vos besoins et l\'état de votre jardin.',
			icon: '📍'
		},
		{
			step: '2',
			title: 'Devis personnalisé',
			description: 'Je vous propose un forfait sur-mesure : mensuel ou annuel, selon vos préférences.',
			icon: '📋'
		},
		{
			step: '3',
			title: 'Engagement serein',
			description: 'Contrat clair, interventions planifiées, tranquillité garantie.',
			icon: '✅'
		}
	],
	formulas: [
		{
			name: 'Forfait Mensuel',
			description: 'Idéal pour un entretien régulier sans engagement long terme',
			features: [
				'Interventions programmées',
				'Tarif mensuel fixe',
				'Résiliable avec préavis',
				'Flexibilité maximale'
			]
		},
		{
			name: 'Forfait Annuel',
			description: 'Le meilleur rapport qualité-prix pour un suivi toute l\'année',
			features: [
				'Tarif préférentiel',
				'Suivi 4 saisons',
				'Priorité sur le planning',
				'Sérénité totale'
			],
			highlighted: true
		}
	]
};

export const testimonials = {
	title: 'Ils me font confiance',
	subtitle: 'L\'avis de mes clients est ma meilleure récompense',
	list: [
		{
			name: 'Marie D.',
			location: 'Votre ville',
			text: 'Julian entretient mon jardin depuis 3 ans. Toujours ponctuel, soigneux, et de bon conseil. Je recommande les yeux fermés !',
			rating: 5
		},
		{
			name: 'Pierre L.',
			location: 'Votre ville',
			text: 'Un vrai professionnel. Mon jardin n\'a jamais été aussi beau. Le forfait annuel est vraiment intéressant.',
			rating: 5
		},
		{
			name: 'Sophie M.',
			location: 'Votre ville',
			text: 'Travail impeccable, respect des horaires, et en plus il est très sympathique. Parfait !',
			rating: 5
		}
	]
};

export const contact = {
	title: 'Parlons de votre jardin',
	subtitle: 'Un coup de fil, un message, et je me déplace pour vous rencontrer',
	form: {
		namePlaceholder: 'Votre nom',
		emailPlaceholder: 'Votre email',
		phonePlaceholder: 'Votre téléphone',
		messagePlaceholder: 'Parlez-moi de votre jardin et de vos besoins...',
		submit: 'Envoyer ma demande'
	},
	preferredContact: 'Le téléphone reste le moyen le plus rapide de me joindre !'
};

export const gallery = {
	title: 'Nos réalisations parlent d\'elles-mêmes',
	subtitle: 'Découvrez la transformation de jardins confiés à nos soins',
	note: '📸 Photos de chantiers à venir - Section en préparation',
	projects: [
		{
			id: 1,
			title: 'Transformation complète',
			location: 'Sainte-Foy',
			before: [],
			during: [],
			after: [],
			description: 'Entretien annuel : tonte, taille des haies et désherbage régulier',
			services: ['Tonte', 'Taille', 'Désherbage']
		},
		{
			id: 2,
			title: 'Rénovation de pelouse',
			location: 'Vendée',
			before: [],
			during: [],
			after: [],
			description: 'Remise en état et entretien suivi sur forfait mensuel',
			services: ['Tonte mulching', 'Bordures']
		},
		{
			id: 3,
			title: 'Taille de haies',
			location: 'Sainte-Foy',
			before: ['/images/gallery/projet1-avant.jpeg'],
			during: ['/images/gallery/projet1-pendant.jpeg'],
			after: ['/images/gallery/projet1-apres.jpeg', '/images/gallery/projet1-apres2.jpeg'],
			description: 'Taille architecturale et entretien régulier',
			services: ['Taille', 'Ramassage']
		}
	]
};

export const appointment = {
	title: 'Réservez votre premier rendez-vous',
	subtitle: 'Consultation gratuite pour évaluer vos besoins et établir un devis personnalisé',
	note: '⚠️ Sous réserve d\'acceptation du professionnel - Confirmation par téléphone',
	benefits: [
		{
			icon: '📅',
			title: 'Rendez-vous gratuit',
			description: 'Premier contact sans engagement'
		},
		{
			icon: '📍',
			title: 'Visite sur place',
			description: 'Évaluation précise de vos besoins'
		},
		{
			icon: '💰',
			title: 'Devis personnalisé',
			description: 'Tarification adaptée et transparente'
		}
	],
	availabilityNote: 'Disponibilités indicatives - confirmation par téléphone',
	workingHours: {
		monday: '08:00-18:00',
		tuesday: '08:00-18:00',
		wednesday: '08:00-18:00',
		thursday: '08:00-18:00',
		friday: '08:00-18:00',
		saturday: '08:00-12:00',
		sunday: 'Fermé'
	}
};
