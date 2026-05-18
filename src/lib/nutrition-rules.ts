import type { Profile } from '@prisma/client'

export interface PlanDay {
  breakfast: PlanMeal
  lunch: PlanMeal
  dinner: PlanMeal
  snack: PlanMeal
}

export interface PlanMeal {
  label: string
  calories: number
  protein: number
  carbs: number
  fat: number
  recipe: string
}

export interface PlanData {
  weekOf: string
  targetCalories: number
  days: Record<string, PlanDay>
  weeklyNotes: string
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_FR = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export function calculateTDEE(profile: Profile): number {
  const weight = profile.weight || 70
  const height = profile.height || 170
  const age = profile.age || 30
  const gender = (profile.gender as string) || 'male'

  const bmr =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161

  const activityFactors: Record<string, number> = {
    SEDENTARY: 1.2,
    LIGHT: 1.375,
    MODERATE: 1.55,
    ACTIVE: 1.725,
    VERY_ACTIVE: 1.9,
  }
  const tdee = bmr * (activityFactors[profile.activityLevel] || 1.55)

  const goalAdjust: Record<string, number> = {
    LOSE_WEIGHT: -300,
    MAINTAIN: 0,
    GAIN_MUSCLE: 250,
    EAT_HEALTHIER: 0,
  }
  return Math.round(tdee + (goalAdjust[profile.goal] || 0))
}

function makeMeal(label: string, recipe: string, cal: number, p: number, c: number, f: number): PlanMeal {
  return { label, calories: cal, protein: p, carbs: c, fat: f, recipe }
}

export function generateNutritionPlanRules(profile: Profile): PlanData {
  const targetCalories = profile.targetCalories || calculateTDEE(profile)
  const isVegan = profile.dietType === 'VEGAN' || profile.dietType === 'VEGETARIAN'
  const isKeto = profile.dietType === 'KETO'

  const breakfasts = isVegan
    ? [
        makeMeal('Porridge avoine & fruits rouges', 'Cuire 60g flocons d\'avoine dans lait végétal, ajouter 100g fruits rouges et 1 c.s de graines de chia.', 380, 12, 65, 8),
        makeMeal('Toast avocat & graines', 'Toaster 2 tranches pain complet, écraser 1 avocat, ajouter graines de sésame et jus de citron.', 360, 10, 45, 18),
        makeMeal('Smoothie bowl protéiné', 'Mixer 1 banane congelée, 30g protéine végétale, lait d\'amande. Garnir granola et baies.', 420, 25, 60, 10),
      ]
    : isKeto
    ? [
        makeMeal('Œufs brouillés & bacon', 'Brouiller 3 œufs dans beurre, servir avec 2 tranches bacon et avocat 1/2.', 480, 30, 3, 38),
        makeMeal('Omelette champignons & fromage', '3 œufs, 100g champignons sautés, 30g fromage râpé.', 420, 28, 4, 32),
        makeMeal('Yaourt grec & noix', '200g yaourt grec entier, 30g noix mélangées, 1 c.s huile de coco.', 380, 20, 8, 30),
      ]
    : [
        makeMeal('Porridge avoine & banane', 'Cuire 60g flocons d\'avoine, ajouter 1 banane et 1 c.s beurre de cacahuète.', 420, 15, 70, 10),
        makeMeal('Œufs & toast complet', '2 œufs brouillés, 2 tranches pain complet, 1/2 avocat.', 450, 22, 40, 18),
        makeMeal('Yaourt grec & granola', '200g yaourt grec, 40g granola maison, 100g fruits frais.', 380, 20, 55, 9),
      ]

  const lunches = isVegan
    ? [
        makeMeal('Buddha bowl quinoa & légumes', '150g quinoa cuit, pois chiches rôtis, légumes grillés, tahini.', 520, 20, 72, 15),
        makeMeal('Curry lentilles & riz', '200g lentilles corail, lait de coco, curry, 100g riz basmati.', 540, 22, 80, 14),
        makeMeal('Wraps haricots noirs & avocat', '2 tortillas blé, haricots noirs, avocat, salsa, salade.', 490, 18, 68, 16),
      ]
    : isKeto
    ? [
        makeMeal('Salade poulet & avocat', '150g poulet grillé, 1 avocat, salade verte, vinaigrette huile olive.', 490, 35, 8, 36),
        makeMeal('Saumon & légumes vapeur', '180g saumon, courgettes et brocoli vapeur, beurre citronné.', 520, 40, 6, 34),
        makeMeal('Bowl bœuf & chou-fleur', '150g bœuf haché, chou-fleur rôti, crème fraîche, herbes.', 480, 32, 10, 32),
      ]
    : [
        makeMeal('Poulet & riz & brocoli', '150g blanc de poulet grillé, 120g riz complet, 200g brocoli vapeur.', 520, 42, 58, 8),
        makeMeal('Saumon & patate douce', '150g saumon au four, 200g patate douce, salade verte.', 540, 35, 45, 18),
        makeMeal('Salade niçoise complète', 'Thon, œufs durs, tomates, olives, haricots verts, vinaigrette légère.', 480, 35, 25, 22),
      ]

  const dinners = isVegan
    ? [
        makeMeal('Tofu sauté & nouilles soba', '200g tofu ferme, 100g nouilles soba, légumes wok, sauce soja.', 450, 22, 58, 12),
        makeMeal('Dahl de lentilles', '200g lentilles, tomates, épices, avec naan complet.', 480, 20, 72, 10),
        makeMeal('Risotto champignons', '100g riz arborio, 200g champignons, parmesan végétal, bouillon légumes.', 420, 14, 72, 10),
      ]
    : isKeto
    ? [
        makeMeal('Entrecôte & épinards sautés', '200g entrecôte grillée, 200g épinards au beurre aillé.', 580, 45, 4, 42),
        makeMeal('Poulet rôti & ratatouille', '200g cuisse de poulet, ratatouille courgette-tomate-poivron.', 490, 38, 12, 28),
        makeMeal('Soupe crème de brocoli', '300g brocoli, bouillon, crème entière, fromage de chèvre.', 380, 18, 10, 30),
      ]
    : [
        makeMeal('Poulet rôti & légumes du four', '200g cuisse de poulet, pommes de terre, carottes, herbes de Provence.', 560, 38, 48, 16),
        makeMeal('Pâtes complètes bolognaise', '100g pâtes complètes, sauce bolognaise maison, parmesan.', 580, 32, 72, 14),
        makeMeal('Soupe de légumes & pain complet', 'Minestrone maison, 2 tranches pain complet.', 380, 16, 62, 6),
      ]

  const snacks = [
    makeMeal('Pomme & amandes', '1 pomme moyenne + 20g amandes.', 180, 4, 28, 10),
    makeMeal('Yaourt grec nature', '150g yaourt grec, 1 c.c miel.', 130, 12, 12, 3),
    makeMeal('Barre protéinée', '1 barre protéinée maison ou du commerce.', 200, 20, 22, 5),
    makeMeal('Carotte & houmous', '2 carottes coupées + 50g houmous.', 150, 5, 22, 6),
  ]

  const weekOf = new Date().toISOString().split('T')[0]
  const days: Record<string, PlanDay> = {}

  DAYS.forEach((day, i) => {
    const b = breakfasts[i % breakfasts.length]
    const l = lunches[i % lunches.length]
    const d = dinners[i % dinners.length]
    const s = snacks[i % snacks.length]

    const scale = targetCalories / (b.calories + l.calories + d.calories + s.calories)
    const scaleMeal = (m: PlanMeal): PlanMeal => ({
      ...m,
      calories: Math.round(m.calories * scale),
      protein: Math.round(m.protein * scale * 10) / 10,
      carbs: Math.round(m.carbs * scale * 10) / 10,
      fat: Math.round(m.fat * scale * 10) / 10,
    })

    days[day] = {
      breakfast: scaleMeal(b),
      lunch: scaleMeal(l),
      dinner: scaleMeal(d),
      snack: scaleMeal(s),
    }
  })

  return {
    weekOf,
    targetCalories,
    days,
    weeklyNotes: `Plan adapté à votre objectif "${profile.goal}" avec ${targetCalories} kcal/jour. Boire au moins 1,5L d'eau par jour.`,
  }
}
