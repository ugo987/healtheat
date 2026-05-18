import Anthropic from '@anthropic-ai/sdk'
import type { Profile } from '@prisma/client'
import { generateNutritionPlanRules, calculateTDEE, type PlanData } from '@/lib/nutrition-rules'

const ACTIVITY_LABELS: Record<string, string> = {
  SEDENTARY: 'sédentaire',
  LIGHT: 'légèrement actif',
  MODERATE: 'modérément actif',
  ACTIVE: 'actif',
  VERY_ACTIVE: 'très actif',
}

const GOAL_LABELS: Record<string, string> = {
  LOSE_WEIGHT: 'perte de poids',
  MAINTAIN: 'maintien du poids',
  GAIN_MUSCLE: 'prise de muscle',
  EAT_HEALTHIER: 'manger plus sainement',
}

const DIET_LABELS: Record<string, string> = {
  OMNIVORE: 'omnivore',
  VEGETARIAN: 'végétarien',
  VEGAN: 'végétalien (vegan)',
  PESCATARIAN: 'pescétarien',
  KETO: 'cétogène (keto)',
  PALEO: 'paléo',
}

export async function generateNutritionPlan(profile: Profile): Promise<PlanData> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return generateNutritionPlanRules(profile)

  const targetCalories = profile.targetCalories || calculateTDEE(profile)

  const systemPrompt = `Tu es un nutritionniste expert certifié. Tu génères des plans nutritionnels personnalisés, équilibrés et adaptés à la culture française.
Réponds UNIQUEMENT en JSON valide, sans markdown, sans texte avant ou après.
Structure JSON exacte attendue :
{
  "weekOf": "YYYY-MM-DD",
  "targetCalories": number,
  "days": {
    "monday": { "breakfast": {...}, "lunch": {...}, "dinner": {...}, "snack": {...} },
    "tuesday": { ... },
    "wednesday": { ... },
    "thursday": { ... },
    "friday": { ... },
    "saturday": { ... },
    "sunday": { ... }
  },
  "weeklyNotes": "string"
}
Chaque repas : { "label": "string", "calories": number, "protein": number, "carbs": number, "fat": number, "recipe": "description courte en 1-2 phrases" }
Les macros sont en grammes. Adapte les portions pour atteindre exactement ${targetCalories} kcal/jour en total des 4 repas.`

  const userPrompt = `Génère un plan nutritionnel pour une semaine pour ce profil :
- Genre : ${(profile.gender as string) || 'non précisé'}
- Âge : ${profile.age || 25} ans
- Poids : ${profile.weight || 70} kg, Taille : ${profile.height || 170} cm
- Niveau d'activité : ${ACTIVITY_LABELS[profile.activityLevel] || profile.activityLevel}
- Objectif : ${GOAL_LABELS[profile.goal] || profile.goal}
- Type de régime : ${DIET_LABELS[profile.dietType] || profile.dietType}
- Allergies / intolérances : ${profile.allergies?.length ? profile.allergies.join(', ') : 'aucune'}
- Calories cibles : ${targetCalories} kcal/jour
La semaine commence le ${new Date().toISOString().split('T')[0]}.
Varie les sources de protéines et les légumes chaque jour. Cuisine française et méditerranéenne privilégiée.`

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const text = (response.content[0] as { type: string; text: string }).text
    return JSON.parse(text) as PlanData
  } catch (error) {
    console.error('Claude API error, using fallback rules engine:', error)
    return generateNutritionPlanRules(profile)
  }
}
