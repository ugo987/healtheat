'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { TrendingDown, Scale, Dumbbell, Heart, UtensilsCrossed, Leaf, Sprout, Fish, Flame, Beef, type LucideIcon } from 'lucide-react'

type Goal = 'LOSE_WEIGHT' | 'MAINTAIN' | 'GAIN_MUSCLE' | 'EAT_HEALTHIER'
type Diet = 'OMNIVORE' | 'VEGETARIAN' | 'VEGAN' | 'PESCATARIAN' | 'KETO' | 'PALEO'
type Activity = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'ACTIVE' | 'VERY_ACTIVE'

interface FormData {
  goal: Goal
  dietType: Diet
  allergies: string[]
  activityLevel: Activity
  age: number
  weight: number
  height: number
  gender: 'male' | 'female'
}

const TOTAL_STEPS = 5

const goals: { value: Goal; label: string; icon: LucideIcon; desc: string }[] = [
  { value: 'LOSE_WEIGHT', label: 'Perdre du poids', icon: TrendingDown, desc: 'Déficit calorique adapté, recettes légères' },
  { value: 'MAINTAIN', label: 'Maintenir mon poids', icon: Scale, desc: 'Alimentation équilibrée et durable' },
  { value: 'GAIN_MUSCLE', label: 'Prendre du muscle', icon: Dumbbell, desc: 'Surplus protéique, calories adaptées' },
  { value: 'EAT_HEALTHIER', label: 'Mieux manger', icon: Heart, desc: 'Nutrition équilibrée au quotidien' },
]

const diets: { value: Diet; label: string; icon: LucideIcon }[] = [
  { value: 'OMNIVORE', label: 'Omnivore', icon: UtensilsCrossed },
  { value: 'VEGETARIAN', label: 'Végétarien', icon: Leaf },
  { value: 'VEGAN', label: 'Vegan', icon: Sprout },
  { value: 'PESCATARIAN', label: 'Pescétarien', icon: Fish },
  { value: 'KETO', label: 'Keto', icon: Flame },
  { value: 'PALEO', label: 'Paléo', icon: Beef },
]

const commonAllergies = ['Gluten', 'Lactose', 'Fruits à coques', 'Œufs', 'Soja', 'Sésame', 'Arachides', 'Poisson', 'Crustacés']

const activities: { value: Activity; label: string; desc: string }[] = [
  { value: 'SEDENTARY', label: 'Sédentaire', desc: 'Peu ou pas d\'exercice, travail de bureau' },
  { value: 'LIGHT', label: 'Légèrement actif', desc: '1-3 jours d\'exercice par semaine' },
  { value: 'MODERATE', label: 'Modérément actif', desc: '3-5 jours d\'exercice par semaine' },
  { value: 'ACTIVE', label: 'Actif', desc: '6-7 jours d\'exercice par semaine' },
  { value: 'VERY_ACTIVE', label: 'Très actif', desc: 'Entraînements intensifs quotidiens' },
]

export default function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Partial<FormData>>({
    allergies: [],
    gender: 'male',
  })

  const update = (patch: Partial<FormData>) => setData(prev => ({ ...prev, ...patch }))

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        router.push('/dashboard')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Étape {step} sur {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}% complété</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div>
          <h1 className="font-poppins text-2xl font-bold text-brand-black">Quel est votre objectif ?</h1>
          <p className="mt-2 text-gray-500">L'IA adaptera votre programme en conséquence.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {goals.map(g => {
              const Icon = g.icon
              return (
                <button
                  key={g.value}
                  onClick={() => { update({ goal: g.value }); next() }}
                  className={`rounded-2xl border-2 p-4 text-left transition-all hover:border-brand-green ${
                    data.goal === g.value ? 'border-brand-green bg-brand-green/5' : 'border-gray-200'
                  }`}
                >
                  <Icon size={24} className="text-brand-green" />
                  <p className="mt-2 font-poppins font-semibold text-brand-black">{g.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{g.desc}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="font-poppins text-2xl font-bold text-brand-black">Votre type de régime</h1>
          <p className="mt-2 text-gray-500">Pour des recettes 100% adaptées à vos habitudes.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {diets.map(d => {
              const Icon = d.icon
              return (
                <button
                  key={d.value}
                  onClick={() => update({ dietType: d.value })}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-4 transition-all hover:border-brand-green ${
                    data.dietType === d.value ? 'border-brand-green bg-brand-green/5' : 'border-gray-200'
                  }`}
                >
                  <Icon size={20} className="text-brand-green shrink-0" />
                  <p className="font-poppins font-semibold text-brand-black">{d.label}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="font-poppins text-2xl font-bold text-brand-black">Allergies et intolérances</h1>
          <p className="mt-2 text-gray-500">Sélectionnez tout ce qui s'applique (ou aucun).</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {commonAllergies.map(allergy => {
              const active = data.allergies?.includes(allergy)
              return (
                <button
                  key={allergy}
                  onClick={() => {
                    const current = data.allergies || []
                    update({ allergies: active ? current.filter(a => a !== allergy) : [...current, allergy] })
                  }}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                    active ? 'border-brand-green bg-brand-green text-brand-white' : 'border-gray-200 text-gray-700 hover:border-brand-green'
                  }`}
                >
                  {allergy}
                </button>
              )
            })}
          </div>
          <p className="mt-4 text-sm text-gray-400">
            {data.allergies?.length === 0 ? 'Aucune allergie sélectionnée' : `${data.allergies?.length} sélectionnée(s)`}
          </p>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="font-poppins text-2xl font-bold text-brand-black">Votre niveau d'activité</h1>
          <p className="mt-2 text-gray-500">Pour calculer vos besoins caloriques précisément.</p>
          <div className="mt-6 space-y-3">
            {activities.map(a => (
              <button
                key={a.value}
                onClick={() => update({ activityLevel: a.value })}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all hover:border-brand-green ${
                  data.activityLevel === a.value ? 'border-brand-green bg-brand-green/5' : 'border-gray-200'
                }`}
              >
                <p className="font-poppins font-semibold text-brand-black">{a.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h1 className="font-poppins text-2xl font-bold text-brand-black">Vos informations physiques</h1>
          <p className="mt-2 text-gray-500">Pour calculer votre métabolisme de base (formule Mifflin-St Jeor).</p>
          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-brand-black">Genre</p>
              <div className="flex gap-3">
                {[{ v: 'male', l: 'Homme' }, { v: 'female', l: 'Femme' }].map(g => (
                  <button
                    key={g.v}
                    onClick={() => update({ gender: g.v as 'male' | 'female' })}
                    className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                      data.gender === g.v ? 'border-brand-green bg-brand-green/5 text-brand-green' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {g.l}
                  </button>
                ))}
              </div>
            </div>

            {[
              { key: 'age', label: 'Âge', placeholder: '25', unit: 'ans', min: 10, max: 120 },
              { key: 'weight', label: 'Poids', placeholder: '70', unit: 'kg', min: 30, max: 300 },
              { key: 'height', label: 'Taille', placeholder: '170', unit: 'cm', min: 100, max: 250 },
            ].map(field => (
              <div key={field.key}>
                <label className="mb-1 block text-sm font-medium text-brand-black">{field.label}</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    value={(data as any)[field.key] || ''}
                    onChange={e => update({ [field.key]: Number(e.target.value) } as any)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                  />
                  <span className="text-sm text-gray-500 w-8">{field.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <Button variant="ghost" onClick={prev}>← Retour</Button>
        )}
        <div className={step > 1 ? '' : 'ml-auto'}>
          {step < TOTAL_STEPS ? (
            <Button onClick={next} disabled={
              (step === 2 && !data.dietType) ||
              (step === 4 && !data.activityLevel)
            }>
              Continuer →
            </Button>
          ) : (
            <Button onClick={handleSubmit} isLoading={isLoading}>
              Générer mon programme
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
