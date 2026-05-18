# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Description du projet

HealthEat est une application de coaching nutritionnel personnalisé par IA. Elle génère des plans alimentaires hebdomadaires adaptés au profil de chaque utilisateur (objectif, régime, allergies, métabolisme). Slogan : **"Mangez mieux — Vivez mieux"**.

Stack : Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · NextAuth.js · Claude API (`claude-sonnet-4-6`) · Edamam Food API.

## Commandes utiles

```bash
npm run dev          # Démarrer le serveur de développement (port 3000)
npm run build        # Build de production
npm run lint         # Linter ESLint

npm run db:push      # Appliquer le schéma Prisma sans créer de migration (dev rapide)
npm run db:migrate   # Créer une migration Prisma (production / changements structurels)
npm run db:generate  # Régénérer le client Prisma après modification du schéma
npm run db:studio    # Ouvrir Prisma Studio (interface visuelle BDD)
```

## Setup initial

1. `npm install`
2. Copier `.env.local.example` → `.env.local` et remplir toutes les variables
3. `npm run db:push` (ou `db:migrate`)
4. `npm run dev`

Variables d'environnement requises :

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connexion PostgreSQL |
| `NEXTAUTH_SECRET` | Secret JWT (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL de l'app (`http://localhost:3000` en dev) |
| `EDAMAM_FOOD_APP_ID` / `EDAMAM_FOOD_APP_KEY` | API Edamam — https://developer.edamam.com/ |
| `ANTHROPIC_API_KEY` | API Claude — https://console.anthropic.com/ |

Les deux APIs externes (Edamam et Anthropic) ont des **fallbacks** intégrés : si les clés sont absentes, l'app fonctionne avec des données mock/règles statiques.

## Architecture

### Route groups (App Router)

```
src/app/
├── page.tsx                      # Landing page publique
├── layout.tsx                    # Root layout (polices, providers)
├── providers.tsx                 # SessionProvider NextAuth
├── (marketing)/                  # Pages publiques (about, blog, features, pricing)
├── (auth)/                       # Login / Register — layout centré
├── (app)/                        # App protégée — layout avec Sidebar
│   └── onboarding/page.tsx       # Wizard d'onboarding (redirige vers /dashboard ensuite)
└── api/
    ├── auth/[...nextauth]/       # Handler NextAuth
    ├── auth/register/            # POST — création de compte (bcrypt, Zod)
    ├── user/onboarding/          # POST — sauvegarde profil + calcul TDEE
    └── user/profile/             # GET / PUT — lecture/mise à jour du profil
```

Le layout `(app)/layout.tsx` fait une vérification de session côté serveur (`getServerSession`) en plus du middleware.

### Protection des routes

`src/middleware.ts` protège via `withAuth` (NextAuth) les chemins : `/dashboard`, `/program`, `/tracking`, `/profile`, `/onboarding`. Tout accès sans token JWT valide redirige vers `/login`.

### Génération des plans nutritionnels

`src/lib/ai-nutrition.ts` — `generateNutritionPlan(profile)` :

1. Si `ANTHROPIC_API_KEY` est définie → appel Claude `claude-sonnet-4-6` avec un prompt système en français demandant du JSON pur (7 jours × 4 repas).
2. Sinon (ou en cas d'erreur) → fallback sur `generateNutritionPlanRules()` dans `nutrition-rules.ts`.

Le moteur de règles (`nutrition-rules.ts`) calcule le TDEE via la formule **Mifflin-St Jeor**, ajuste selon l'objectif (+250 kcal muscle / -300 kcal perte de poids), puis sélectionne des repas pré-définis adaptés au régime (vegan/keto/standard) et les échelonne proportionnellement aux calories cibles.

### Authentification

Stratégie JWT (pas de session DB). `PrismaAdapter` est configuré pour persister les comptes OAuth éventuels (`Account`, `Session`). Seul `CredentialsProvider` est actif. Le `session.user.id` est injecté via le callback `jwt → session`.

Pour récupérer la session dans un Server Component : `getServerSession(authOptions)`.  
Pour récupérer l'ID utilisateur dans une route API : `session.user.id` (typé via `src/types/index.ts` → `AuthSession`).

### Edamam Food API

`src/lib/edamam.ts` — `searchFood(query)` :
- Cache mémoire en-process avec TTL de 1 heure (`Map<string, { data, expiresAt }>`)
- Renvoie 100g de valeurs nutritionnelles (calories, protéines, glucides, lipides)
- Fallback : base mock de 10 aliments courants si les clés API sont absentes

### Modèle de données (Prisma)

- `User` — compte (email + password hashé bcrypt, ou OAuth via `Account`)
- `Profile` — données biométriques + préférences nutritionnelles (1-to-1 avec User)
- `MealLog` — repas journaliers loggués (`foods` est un champ JSON `FoodItem[]`)
- `NutritionPlan` — plan hebdomadaire (`planData` JSON de type `PlanData`, unique par `[userId, weekStartDate]`)

Les enums Prisma (`Goal`, `DietType`, `ActivityLevel`, `MealType`) sont réutilisés directement comme types TypeScript dans les validations Zod (`src/lib/validations.ts`).

## Conventions de code

### Design system

Les classes Tailwind de marque à utiliser :
- `brand-black` (`#000000`), `brand-white` (`#DFEBEB`), `brand-green` (`#253836`)
- `font-poppins` pour les titres (Bold), `font-roboto` pour le corps de texte
- Animations déclarées : `animate-fade-in`, `animate-slide-up`

### Composants UI

Les primitives dans `src/components/ui/` (Button, Card, Input, Badge, ProgressBar) doivent être utilisées en priorité. Le composant `Button` accepte `variant` (`primary` | `ghost` | ...) et `isLoading`.

### Validation

Toutes les entrées utilisateur passent par des schémas Zod définis dans `src/lib/validations.ts`. Les routes API retournent `{ error: string }` avec le bon status HTTP en cas d'échec Zod.

### Alias de chemin

Le path alias `@/` pointe vers `src/`. L'utiliser systématiquement pour les imports internes.

### Types partagés

`src/types/index.ts` contient `AuthSession` (extension de `Session` avec `user.id`), `FoodItem` (structure d'un aliment loggué dans `MealLog.foods`) et `MacroSummary`.

## Points d'attention

- **`npm run db:push` vs `db:migrate`** : utiliser `db:push` pour les itérations rapides en dev, `db:migrate` pour les changements à versionner.
- **`prisma generate`** : à relancer après toute modification de `prisma/schema.prisma` pour mettre à jour le client TypeScript.
- Le champ `MealLog.foods` est un `Json` Prisma — le type TypeScript attendu est `FoodItem[]` (défini dans `src/types/index.ts`), il faut caster manuellement.
- `NutritionPlan.planData` est un `Json` Prisma — le type attendu est `PlanData` (défini dans `src/lib/nutrition-rules.ts`).
- Les images Edamam sont autorisées dans `next.config.js` via `remotePatterns`. Ajouter tout autre domaine d'image externe dans ce fichier.
