# Graines de Jardin - Site Web pour Julian Lemoine

## 🌱 Vue d'ensemble

Site web vitrine pour Julian Lemoine, paysagiste avec 14 ans d'expérience spécialisé dans l'entretien de jardins. Le site utilise une métaphore visuelle de **descente le long d'une liane** pour raconter l'histoire du parcours professionnel et des services.

## 🎨 Concept créatif

### Métaphore de la liane

Chaque section représente une étape de la descente :

1. **Canopée** (Hero) - Vue d'ensemble, présentation
2. **Tronc** (Expérience) - Solidité, parcours professionnel
3. **Branches** (Services) - Extension des compétences
4. **Racines** (Tarification) - Fondations du processus
5. **Sol** (Avis) - Ancrage dans la confiance
6. **Sous terre** (Contact) - Connexion profonde

### Design

- Palette naturelle : verts, beiges, terre
- Animations fluides et organiques
- Scroll storytelling immersif
- Responsive mobile-first

## 📁 Structure du projet

```
src/
├── lib/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.svelte          # Canopée - Section d'accueil
│   │   │   ├── ExperienceTimeline.svelte   # Tronc - Timeline d'expérience
│   │   │   ├── ServicesSection.svelte      # Branches - Services proposés
│   │   │   ├── PricingSection.svelte       # Racines - Tarification et processus
│   │   │   ├── TestimonialsSection.svelte  # Sol - Avis clients
│   │   │   └── ContactSection.svelte       # Sous terre - Formulaire de contact
│   │   └── ui/
│   │       └── PhoneButton.svelte          # Bouton téléphone (sticky + inline)
│   └── data/
│       └── content.ts                       # Contenu éditable centralisé
├── routes/
│   └── +page.svelte                         # Page principale (SPA)
└── static/
    └── Ressources/
        └── Graines-de-Jardin-Logo.PNG      # Logo du client
```

## 🔧 Technologies

- **SvelteKit 2** - Framework
- **Svelte 5** - Avec runes ($state, $effect)
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type safety
- **Vite 7** - Build tool

## 🚀 Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Preview du build de production
npm run preview
```

## ✏️ Éditer le contenu

**Tout le contenu est centralisé dans `src/lib/data/content.ts`**

Pour modifier :

- Textes de toutes les sections
- Numéro de téléphone
- Email
- Adresse
- Services
- Timeline d'expérience
- Avis clients
- Formules tarifaires

## 🎯 Fonctionnalités principales

### Implémentées

✅ Page vitrine SPA complète
✅ Scroll storytelling avec animations
✅ Timeline d'expérience visuelle
✅ Sections services détaillées
✅ Processus de tarification expliqué
✅ Avis clients
✅ Formulaire de contact
✅ Bouton téléphone sticky (apparaît après 300px de scroll)
✅ Responsive mobile
✅ SEO de base (meta tags)

### À implémenter (Phase 2)

⏳ Connexion formulaire à un service d'envoi (Formspree, EmailJS, etc.)
⏳ Agenda interactif (Calendly ou custom)
⏳ Système d'avis dynamique
⏳ Intégration Sanity CMS (si besoin d'évolution)

## 📝 À personnaliser AVANT le déploiement

Dans `src/lib/data/content.ts`, modifier :

1. `siteConfig.phone` - Numéro de téléphone réel
2. `siteConfig.email` - Email réel
3. `siteConfig.address` - Ville/région d'intervention
4. `testimonials.list` - Avis clients réels
5. Tous les textes selon les besoins

## 🎨 Personnalisation du design

### Palette de couleurs

Les couleurs principales sont définies dans les gradients de chaque section. Pour les modifier :

- Hero : [HeroSection.svelte](src/lib/components/sections/HeroSection.svelte) ligne ~71
- Experience : [ExperienceTimeline.svelte](src/lib/components/sections/ExperienceTimeline.svelte) ligne ~87
- Services : [ServicesSection.svelte](src/lib/components/sections/ServicesSection.svelte) ligne ~79
- Etc.

### Animations

Toutes les animations utilisent :

- Intersection Observer pour le scroll
- Transitions CSS natives
- Pas de dépendance externe

## 📱 Contact & Support

Pour toute question sur le développement :

- Référez-vous aux commentaires dans le code
- Consultez la documentation SvelteKit : https://kit.svelte.dev/
- Consultez la documentation Svelte 5 : https://svelte.dev/

## 📦 Déploiement

Le site peut être déployé sur :

- **Vercel** (recommandé pour SvelteKit)
- **Netlify**
- **Cloudflare Pages**
- N'importe quel hébergeur Node.js

### Configuration de l'adapter

Par défaut, le projet utilise `@sveltejs/adapter-auto` qui s'adapte automatiquement à la plateforme de déploiement.

Pour un déploiement statique :

```bash
npm install -D @sveltejs/adapter-static
```

Puis modifier `svelte.config.js` pour utiliser `adapter-static`.

## 🔮 Évolution future

### Court terme

- Connecter le formulaire de contact
- Ajouter Google Analytics / Plausible
- Optimiser les images (WebP, lazy loading avancé)
- Implémenter un agenda de prise de RDV

### Moyen terme

- Intégrer Sanity CMS pour gestion de contenu dynamique
- Ajouter un blog/actualités
- Espace client avec historique d'interventions
- Galerie photos avant/après

### Long terme

- Application mobile compagnon
- Système de gestion de planning complet
- Facturation intégrée

## 📄 Licence

Propriété de Julian Lemoine - Graines de Jardin
