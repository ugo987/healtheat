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

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function getMockFoods(query: string): EdamamFood[] {
  const mockDb: EdamamFood[] = [
    // Petit-déjeuner
    { foodId: 'oeuf_entier', label: 'Œuf entier cuit', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { foodId: 'oeuf_brouille', label: 'Œufs brouillés', calories: 149, protein: 10, carbs: 1.6, fat: 11 },
    { foodId: 'oeuf_coque', label: 'Œuf à la coque', calories: 147, protein: 12.5, carbs: 0.7, fat: 10 },
    { foodId: 'pain_blanc', label: 'Pain blanc (tranche)', calories: 265, protein: 9, carbs: 49, fat: 3.2 },
    { foodId: 'pain_complet', label: 'Pain complet (tranche)', calories: 247, protein: 13, carbs: 41, fat: 4.2 },
    { foodId: 'pain_mie', label: 'Pain de mie', calories: 263, protein: 8, carbs: 49, fat: 3.4 },
    { foodId: 'baguette', label: 'Baguette', calories: 270, protein: 9, carbs: 55, fat: 1.4 },
    { foodId: 'beurre', label: 'Beurre', calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
    { foodId: 'confiture', label: 'Confiture de fraise', calories: 250, protein: 0.4, carbs: 65, fat: 0.1 },
    { foodId: 'miel', label: 'Miel', calories: 304, protein: 0.3, carbs: 82, fat: 0 },
    { foodId: 'nutella', label: 'Nutella', calories: 539, protein: 6, carbs: 57, fat: 31 },
    { foodId: 'croissant', label: 'Croissant', calories: 406, protein: 8, carbs: 46, fat: 21 },
    { foodId: 'brioche', label: 'Brioche', calories: 368, protein: 9, carbs: 48, fat: 16 },
    { foodId: 'cereales_corn_flakes', label: 'Corn Flakes', calories: 357, protein: 7, carbs: 84, fat: 0.7 },
    { foodId: 'cereales_muesli', label: 'Muesli', calories: 367, protein: 11, carbs: 66, fat: 7 },
    { foodId: 'flocons_avoine', label: "Flocons d'avoine", calories: 389, protein: 17, carbs: 66, fat: 7 },
    { foodId: 'porridge', label: 'Porridge au lait', calories: 71, protein: 3, carbs: 12, fat: 1.5 },
    { foodId: 'lait_entier', label: 'Lait entier', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
    { foodId: 'lait_demi', label: 'Lait demi-écrémé', calories: 46, protein: 3.3, carbs: 4.8, fat: 1.5 },
    { foodId: 'fromage_blanc', label: 'Fromage blanc 0%', calories: 46, protein: 8, carbs: 4, fat: 0.1 },
    { foodId: 'yaourt_nature', label: 'Yaourt nature', calories: 56, protein: 3.8, carbs: 5.5, fat: 1.5 },
    { foodId: 'yaourt_grec', label: 'Yaourt grec nature', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { foodId: 'jus_orange', label: "Jus d'orange frais", calories: 45, protein: 0.7, carbs: 10, fat: 0.2 },
    { foodId: 'orange', label: 'Orange', calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
    { foodId: 'pomme', label: 'Pomme', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { foodId: 'banane', label: 'Banane', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { foodId: 'fraise', label: 'Fraises', calories: 32, protein: 0.7, carbs: 8, fat: 0.3 },
    { foodId: 'myrtilles', label: 'Myrtilles', calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },
    { foodId: 'kiwi', label: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fat: 0.5 },
    // Viandes & protéines
    { foodId: 'poulet_blanc', label: 'Poulet blanc grillé', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { foodId: 'poulet_cuisse', label: 'Cuisse de poulet', calories: 209, protein: 26, carbs: 0, fat: 11 },
    { foodId: 'dinde', label: 'Escalope de dinde', calories: 135, protein: 30, carbs: 0, fat: 1.7 },
    { foodId: 'boeuf_hache', label: 'Bœuf haché 5%', calories: 152, protein: 21, carbs: 0, fat: 7.7 },
    { foodId: 'steak', label: 'Steak de bœuf', calories: 217, protein: 26, carbs: 0, fat: 12 },
    { foodId: 'jambon', label: 'Jambon blanc', calories: 107, protein: 18, carbs: 1.5, fat: 3.3 },
    { foodId: 'saumon', label: 'Saumon grillé', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { foodId: 'thon_boite', label: 'Thon en conserve', calories: 116, protein: 26, carbs: 0, fat: 0.8 },
    { foodId: 'crevettes', label: 'Crevettes cuites', calories: 99, protein: 21, carbs: 0.9, fat: 1.1 },
    { foodId: 'sardines', label: "Sardines à l'huile", calories: 208, protein: 25, carbs: 0, fat: 11 },
    // Féculents & céréales
    { foodId: 'riz_blanc', label: 'Riz blanc cuit', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { foodId: 'riz_complet', label: 'Riz complet cuit', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { foodId: 'pates_cuites', label: 'Pâtes cuites', calories: 131, protein: 5, carbs: 25, fat: 1.1 },
    { foodId: 'pates_completes', label: 'Pâtes complètes cuites', calories: 124, protein: 5.3, carbs: 23, fat: 1.3 },
    { foodId: 'pomme_de_terre', label: 'Pomme de terre cuite', calories: 87, protein: 1.9, carbs: 20, fat: 0.1 },
    { foodId: 'patate_douce', label: 'Patate douce cuite', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
    { foodId: 'quinoa', label: 'Quinoa cuit', calories: 120, protein: 4.4, carbs: 22, fat: 1.9 },
    { foodId: 'lentilles', label: 'Lentilles cuites', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    { foodId: 'pois_chiches', label: 'Pois chiches cuits', calories: 164, protein: 8.9, carbs: 27, fat: 2.6 },
    // Légumes
    { foodId: 'brocoli', label: 'Brocoli cuit', calories: 35, protein: 2.4, carbs: 7, fat: 0.4 },
    { foodId: 'epinards', label: 'Épinards cuits', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { foodId: 'haricots_verts', label: 'Haricots verts cuits', calories: 31, protein: 1.8, carbs: 7, fat: 0.1 },
    { foodId: 'courgette', label: 'Courgette cuite', calories: 17, protein: 1.1, carbs: 3.6, fat: 0.2 },
    { foodId: 'carotte', label: 'Carotte cuite', calories: 35, protein: 0.8, carbs: 8, fat: 0.2 },
    { foodId: 'tomate', label: 'Tomate', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    { foodId: 'salade', label: 'Salade verte', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
    { foodId: 'poivron', label: 'Poivron rouge', calories: 31, protein: 1, carbs: 6, fat: 0.3 },
    { foodId: 'champignons', label: 'Champignons de Paris', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
    { foodId: 'concombre', label: 'Concombre', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
    // Produits laitiers & fromages
    { foodId: 'fromage_cheddar', label: 'Cheddar', calories: 402, protein: 25, carbs: 1.3, fat: 33 },
    { foodId: 'fromage_emmental', label: 'Emmental', calories: 380, protein: 29, carbs: 0.4, fat: 29 },
    { foodId: 'mozzarella', label: 'Mozzarella', calories: 280, protein: 22, carbs: 2.2, fat: 20 },
    { foodId: 'fromage_blanc_40', label: 'Fromage blanc 40%', calories: 113, protein: 7, carbs: 4, fat: 7.5 },
    { foodId: 'cottage_cheese', label: 'Cottage cheese', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
    // Matières grasses & noix
    { foodId: 'avocat', label: 'Avocat', calories: 160, protein: 2, carbs: 9, fat: 15 },
    { foodId: 'amandes', label: 'Amandes', calories: 579, protein: 21, carbs: 22, fat: 50 },
    { foodId: 'noix', label: 'Noix', calories: 654, protein: 15, carbs: 14, fat: 65 },
    { foodId: 'beurre_cacahuete', label: 'Beurre de cacahuète', calories: 588, protein: 25, carbs: 20, fat: 50 },
    { foodId: 'huile_olive', label: "Huile d'olive", calories: 884, protein: 0, carbs: 0, fat: 100 },
    // Boissons & divers
    { foodId: 'cafe', label: 'Café noir', calories: 2, protein: 0.3, carbs: 0, fat: 0 },
    { foodId: 'the', label: 'Thé nature', calories: 1, protein: 0, carbs: 0.3, fat: 0 },
    { foodId: 'chocolat_noir', label: 'Chocolat noir 70%', calories: 598, protein: 7, carbs: 46, fat: 43 },
    { foodId: 'compote', label: 'Compote de pommes', calories: 51, protein: 0.2, carbs: 13, fat: 0.1 },
  ]

  const q = normalize(query)
  // Recherche insensible aux accents, correspondance sur plusieurs mots
  const terms = q.split(/\s+/).filter(Boolean)
  return mockDb
    .filter(f => terms.every(t => normalize(f.label).includes(t)))
    .slice(0, 8)
}
