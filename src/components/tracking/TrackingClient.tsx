'use client'

import { useState, useEffect, useCallback } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import CalorieRing from '@/components/ui/CalorieRing'
import type { EdamamFood } from '@/lib/edamam'
import { Sunrise, Sun, Moon, Apple, ClipboardList, Check, X, type LucideIcon } from 'lucide-react'

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK'

const MEAL_OPTIONS: { value: MealType; label: string; icon: LucideIcon }[] = [
  { value: 'BREAKFAST', label: 'Petit-déjeuner', icon: Sunrise },
  { value: 'LUNCH', label: 'Déjeuner', icon: Sun },
  { value: 'SNACK', label: 'Collation', icon: Apple },
  { value: 'DINNER', label: 'Dîner', icon: Moon },
]

export default function TrackingClient({ targetCalories }: { targetCalories: number }) {
  const today = new Date().toISOString().split('T')[0]
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<EdamamFood[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState<MealType>('LUNCH')
  const [basket, setBasket] = useState<Array<EdamamFood & { quantity: number }>>([])
  const [todayLogs, setTodayLogs] = useState<any[]>([])
  const [isLogging, setIsLogging] = useState(false)

  const loadTodayLogs = useCallback(async () => {
    const res = await fetch(`/api/meals?date=${today}`)
    if (res.ok) setTodayLogs(await res.json())
  }, [today])

  useEffect(() => { loadTodayLogs() }, [loadTodayLogs])

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      setIsSearching(true)
      const res = await fetch(`/api/nutrition/search?q=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.results || [])
      }
      setIsSearching(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const addToBasket = (food: EdamamFood) => {
    setBasket(prev => {
      const existing = prev.find(f => f.foodId === food.foodId)
      if (existing) return prev.map(f => f.foodId === food.foodId ? { ...f, quantity: f.quantity + 100 } : f)
      return [...prev, { ...food, quantity: 100 }]
    })
  }

  const logMeal = async () => {
    if (basket.length === 0) return
    setIsLogging(true)
    const foods = basket.map(f => ({
      foodId: f.foodId,
      label: f.label,
      quantity: f.quantity,
      unit: 'g',
      calories: (f.calories * f.quantity) / 100,
      protein: (f.protein * f.quantity) / 100,
      carbs: (f.carbs * f.quantity) / 100,
      fat: (f.fat * f.quantity) / 100,
    }))

    const totalCalories = foods.reduce((s, f) => s + f.calories, 0)
    const totalProtein = foods.reduce((s, f) => s + f.protein, 0)
    const totalCarbs = foods.reduce((s, f) => s + f.carbs, 0)
    const totalFat = foods.reduce((s, f) => s + f.fat, 0)

    const res = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: today, mealType: selectedMealType, foods, totalCalories, totalProtein, totalCarbs, totalFat }),
    })

    if (res.ok) {
      setBasket([])
      setQuery('')
      setResults([])
      await loadTodayLogs()
    }
    setIsLogging(false)
  }

  const deleteLog = async (id: string) => {
    await fetch(`/api/meals/${id}`, { method: 'DELETE' })
    await loadTodayLogs()
  }

  const MEAL_LABELS: Record<string, string> = { BREAKFAST: 'Petit-déjeuner', LUNCH: 'Déjeuner', DINNER: 'Dîner', SNACK: 'Collation' }
  const MEAL_ICONS: Record<string, LucideIcon> = { BREAKFAST: Sunrise, LUNCH: Sun, DINNER: Moon, SNACK: Apple }

  const loggedCalories = todayLogs.reduce((s, l) => s + l.totalCalories, 0)
  const basketCalories = basket.reduce((s, f) => s + (f.calories * f.quantity) / 100, 0)
  const totalCalories = loggedCalories + basketCalories
  const remaining = Math.max(0, targetCalories - totalCalories)

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-poppins text-xl font-bold text-brand-black mb-4 md:text-2xl md:mb-6">Suivi alimentaire</h1>

      {/* Jauge compacte */}
      <Card className="mb-4 flex items-center gap-4">
        <CalorieRing calories={totalCalories} target={targetCalories} size={72} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <p className="text-xl font-bold text-brand-green font-poppins">{Math.round(totalCalories)}</p>
            <p className="text-sm text-gray-400">/ {targetCalories} kcal</p>
          </div>
          <p className="text-xs text-gray-500">{Math.round(remaining)} kcal restantes</p>
          {basketCalories > 0 && (
            <p className="mt-1 text-xs font-medium text-brand-green">+{Math.round(basketCalories)} dans le panier</p>
          )}
        </div>
      </Card>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <p className="font-poppins font-semibold text-brand-black mb-3">Type de repas</p>
            <div className="grid grid-cols-2 gap-2">
              {MEAL_OPTIONS.map(m => {
                const Icon = m.icon
                return (
                  <button
                    key={m.value}
                    onClick={() => setSelectedMealType(m.value)}
                    className={`flex items-center gap-2 rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                      selectedMealType === m.value ? 'border-brand-green bg-brand-green/5 text-brand-green' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <Icon size={15} /> {m.label}
                  </button>
                )
              })}
            </div>
          </Card>

          <Card>
            <p className="font-poppins font-semibold text-brand-black mb-3">Rechercher un aliment</p>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ex : poulet, riz, avocat..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />

            {isSearching && <p className="mt-2 text-sm text-gray-400">Recherche...</p>}

            {results.length > 0 && (
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {results.map(food => (
                  <button
                    key={food.foodId}
                    onClick={() => addToBasket(food)}
                    className="w-full flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-left hover:border-brand-green hover:bg-brand-green/5 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-brand-black">{food.label}</p>
                      <p className="text-xs text-gray-400">Pour 100g : {food.protein}g prot. · {food.carbs}g gluc. · {food.fat}g lip.</p>
                    </div>
                    <Badge variant="green">{food.calories} kcal</Badge>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {basket.length > 0 && (
            <Card>
              <p className="font-poppins font-semibold text-brand-black mb-3">Mon repas ({basket.length} aliment{basket.length > 1 ? 's' : ''})</p>
              <div className="space-y-2 mb-4">
                {basket.map(food => (
                  <div key={food.foodId} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{food.label}</p>
                      <p className="text-xs text-gray-400">{Math.round((food.calories * food.quantity) / 100)} kcal</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setBasket(prev => prev.map(f => f.foodId === food.foodId ? { ...f, quantity: Math.max(10, f.quantity - 50) } : f))} className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-100">-</button>
                      <span className="text-sm font-medium w-12 text-center">{food.quantity}g</span>
                      <button onClick={() => setBasket(prev => prev.map(f => f.foodId === food.foodId ? { ...f, quantity: f.quantity + 50 } : f))} className="rounded-lg border px-2 py-1 text-sm hover:bg-gray-100">+</button>
                      <button onClick={() => setBasket(prev => prev.filter(f => f.foodId !== food.foodId))} className="ml-1 text-red-300 hover:text-red-500"><X size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-brand-green/5 p-3 mb-3 text-sm">
                <span className="font-semibold text-brand-green">Total : </span>
                {Math.round(basket.reduce((s, f) => s + (f.calories * f.quantity) / 100, 0))} kcal ·{' '}
                {Math.round(basket.reduce((s, f) => s + (f.protein * f.quantity) / 100, 0))}g prot. ·{' '}
                {Math.round(basket.reduce((s, f) => s + (f.carbs * f.quantity) / 100, 0))}g gluc. ·{' '}
                {Math.round(basket.reduce((s, f) => s + (f.fat * f.quantity) / 100, 0))}g lip.
              </div>
              <Button onClick={logMeal} isLoading={isLogging} className="w-full justify-center">
                <Check size={15} className="mr-1.5 inline" />Enregistrer ce repas
              </Button>
            </Card>
          )}
        </div>

        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-4">
            Repas d'aujourd'hui
            <span className="ml-2 text-sm font-normal text-gray-400">
              {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </span>
          </p>
          {todayLogs.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList size={40} className="mx-auto text-gray-200" />
              <p className="mt-3 text-gray-500 text-sm">Aucun repas enregistré aujourd'hui.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayLogs.map(log => (
                <div key={log.id} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {(() => { const Icon = MEAL_ICONS[log.mealType] || ClipboardList; return <Icon size={14} className="text-brand-green" /> })()}
                      <p className="font-medium text-sm">{MEAL_LABELS[log.mealType]}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="green">{Math.round(log.totalCalories)} kcal</Badge>
                      <button onClick={() => deleteLog(log.id)} className="text-gray-300 hover:text-red-400 transition-colors"><X size={14} /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                    {(log.foods as any[]).map((f, i) => (
                      <span key={i}>{f.label} ({f.quantity}g)</span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-xl bg-brand-green p-4 text-brand-white">
                <p className="text-sm font-medium mb-1">Total du jour</p>
                <p className="font-poppins text-2xl font-bold">{Math.round(todayLogs.reduce((s, l) => s + l.totalCalories, 0))} kcal</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
