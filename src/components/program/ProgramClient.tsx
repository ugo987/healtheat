'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Sunrise, Sun, Moon, Apple, Utensils, Sparkles, RefreshCw, Lightbulb, Beef, Wheat, Droplets, type LucideIcon } from 'lucide-react'

const DAYS_FR: Record<string, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche',
}

const MEAL_ICONS: Record<string, LucideIcon> = {
  breakfast: Sunrise,
  lunch: Sun,
  dinner: Moon,
  snack: Apple,
}

const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Petit-déjeuner',
  lunch: 'Déjeuner',
  dinner: 'Dîner',
  snack: 'Collation',
}

const TODAY_DAY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()]

export default function ProgramClient({ plan }: { plan: any }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(plan)
  const [selectedDay, setSelectedDay] = useState(TODAY_DAY)

  const generatePlan = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/program/generate', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setCurrentPlan(data)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const planData = currentPlan?.planData as any

  if (!currentPlan) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <Utensils size={52} className="mb-4 text-brand-green/30" />
        <h1 className="font-poppins text-2xl font-bold text-brand-black">Votre programme n'est pas encore généré</h1>
        <p className="mt-3 text-gray-500 max-w-md">
          Notre IA va créer un plan nutritionnel personnalisé pour la semaine, adapté à votre profil et vos objectifs.
        </p>
        <Button onClick={generatePlan} isLoading={isGenerating} size="lg" className="mt-6">
          {isGenerating ? 'Génération en cours...' : <><Sparkles size={16} className="mr-1.5 inline" />Générer mon programme IA</>}
        </Button>
        <p className="mt-3 text-xs text-gray-400">Prend environ 5-10 secondes</p>
      </div>
    )
  }

  const days = Object.keys(DAYS_FR)
  const selectedMeals = planData?.days?.[selectedDay]

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-brand-black">Mon programme</h1>
          <p className="mt-1 text-gray-500">Semaine du {new Date(currentPlan.weekStartDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
        </div>
        <Button onClick={generatePlan} isLoading={isGenerating} variant="secondary" size="sm">
          <RefreshCw size={14} className="mr-1.5 inline" />Regénérer
        </Button>
      </div>

      {planData?.weeklyNotes && (
        <div className="mb-6 rounded-2xl bg-brand-green/5 border border-brand-green/20 p-4">
          <p className="flex items-center gap-1.5 text-sm text-brand-green font-medium"><Lightbulb size={14} />Note de votre nutritionniste IA</p>
          <p className="mt-1 text-sm text-gray-700">{planData.weeklyNotes}</p>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              selectedDay === day
                ? 'bg-brand-green text-brand-white'
                : day === TODAY_DAY
                ? 'bg-brand-green/10 text-brand-green border border-brand-green/30'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-green'
            }`}
          >
            {DAYS_FR[day]}
            {day === TODAY_DAY && <span className="ml-1 text-xs opacity-70">auj.</span>}
          </button>
        ))}
      </div>

      {selectedMeals ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(selectedMeals).map(([mealKey, meal]: [string, any]) => (
            <Card key={mealKey} hover>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = MEAL_ICONS[mealKey] || Utensils; return <Icon size={18} className="text-brand-green" /> })()}
                  <p className="font-poppins font-semibold text-brand-black">{MEAL_LABELS[mealKey]}</p>
                </div>
                <Badge variant="green">{Math.round(meal.calories)} kcal</Badge>
              </div>
              <p className="text-sm font-medium text-brand-black">{meal.label}</p>
              {meal.recipe && (
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{meal.recipe}</p>
              )}
              <div className="mt-3 flex gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Beef size={11} />{Math.round(meal.protein)}g prot.</span>
                <span className="flex items-center gap-1"><Wheat size={11} />{Math.round(meal.carbs)}g gluc.</span>
                <span className="flex items-center gap-1"><Droplets size={11} />{Math.round(meal.fat)}g lip.</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Aucun plan pour ce jour.</p>
      )}

      <div className="mt-6">
        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-3">Total de la journée</p>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: 'Calories', value: Math.round(planData?.targetCalories || 0), unit: 'kcal', color: 'text-brand-green' },
              { label: 'Protéines', value: selectedMeals ? Math.round(Object.values(selectedMeals as any).reduce((s: number, m: any) => s + m.protein, 0)) : 0, unit: 'g' },
              { label: 'Glucides', value: selectedMeals ? Math.round(Object.values(selectedMeals as any).reduce((s: number, m: any) => s + m.carbs, 0)) : 0, unit: 'g' },
              { label: 'Lipides', value: selectedMeals ? Math.round(Object.values(selectedMeals as any).reduce((s: number, m: any) => s + m.fat, 0)) : 0, unit: 'g' },
            ].map(item => (
              <div key={item.label}>
                <p className={`font-poppins text-xl font-bold ${item.color || 'text-brand-black'}`}>{item.value}</p>
                <p className="text-xs text-gray-400">{item.unit}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
