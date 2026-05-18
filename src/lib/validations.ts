import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères'),
})

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

export const onboardingSchema = z.object({
  goal: z.enum(['LOSE_WEIGHT', 'MAINTAIN', 'GAIN_MUSCLE', 'EAT_HEALTHIER']),
  dietType: z.enum(['OMNIVORE', 'VEGETARIAN', 'VEGAN', 'PESCATARIAN', 'KETO', 'PALEO']),
  allergies: z.array(z.string()),
  activityLevel: z.enum(['SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE']),
  age: z.number().int().min(10).max(120),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  gender: z.enum(['male', 'female']),
})

export const mealLogSchema = z.object({
  date: z.string(),
  mealType: z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']),
  foods: z.array(z.object({
    foodId: z.string(),
    label: z.string(),
    quantity: z.number().positive(),
    unit: z.string(),
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
  })),
  totalCalories: z.number(),
  totalProtein: z.number().optional(),
  totalCarbs: z.number().optional(),
  totalFat: z.number().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type OnboardingInput = z.infer<typeof onboardingSchema>
export type MealLogInput = z.infer<typeof mealLogSchema>
