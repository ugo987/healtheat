const FOOD_API_BASE = 'https://api.edamam.com/api/food-database/v2'

export interface EdamamFood {
  foodId: string
  label: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image?: string
}

const cache = new Map<string, { data: EdamamFood[]; expiresAt: number }>()

export async function searchFood(query: string): Promise<EdamamFood[]> {
  const cacheKey = query.toLowerCase().trim()
  const cached = cache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) return cached.data

  const appId = process.env.EDAMAM_FOOD_APP_ID
  const appKey = process.env.EDAMAM_FOOD_APP_KEY

  if (!appId || !appKey) {
    return getMockFoods(query)
  }

  const url = new URL(`${FOOD_API_BASE}/parser`)
  url.searchParams.set('app_id', appId)
  url.searchParams.set('app_key', appKey)
  url.searchParams.set('ingr', query)
  url.searchParams.set('nutrition-type', 'logging')

  const res = await fetch(url.toString())
  if (!res.ok) return getMockFoods(query)

  const json = await res.json()
  const results: EdamamFood[] = (json.hints || []).slice(0, 10).map((hint: any) => ({
    foodId: hint.food.foodId,
    label: hint.food.label,
    calories: Math.round(hint.food.nutrients?.ENERC_KCAL || 0),
    protein: Math.round((hint.food.nutrients?.PROCNT || 0) * 10) / 10,
    carbs: Math.round((hint.food.nutrients?.CHOCDF || 0) * 10) / 10,
    fat: Math.round((hint.food.nutrients?.FAT || 0) * 10) / 10,
    image: hint.food.image,
  }))

  cache.set(cacheKey, { data: results, expiresAt: Date.now() + 3_600_000 })
  return results
}

function getMockFoods(query: string): EdamamFood[] {
  const mockDb: EdamamFood[] = [
    { foodId: 'poulet', label: 'Poulet (blanc)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { foodId: 'riz', label: 'Riz blanc cuit', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { foodId: 'brocoli', label: 'Brocoli cuit', calories: 35, protein: 2.4, carbs: 7, fat: 0.4 },
    { foodId: 'oeuf', label: 'Œuf entier', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { foodId: 'avocat', label: 'Avocat', calories: 160, protein: 2, carbs: 9, fat: 15 },
    { foodId: 'saumon', label: 'Saumon cuit', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { foodId: 'banane', label: 'Banane', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { foodId: 'yaourt', label: 'Yaourt grec nature', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { foodId: 'amandes', label: 'Amandes', calories: 579, protein: 21, carbs: 22, fat: 50 },
    { foodId: 'patate_douce', label: 'Patate douce cuite', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  ]
  const q = query.toLowerCase()
  return mockDb.filter(f => f.label.toLowerCase().includes(q)).slice(0, 5)
}
