import type { Session } from 'next-auth'

export interface AuthSession extends Session {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export interface FoodItem {
  foodId: string
  label: string
  quantity: number
  unit: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MacroSummary {
  calories: number
  protein: number
  carbs: number
  fat: number
  targetCalories: number
}
