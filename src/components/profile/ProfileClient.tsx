'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const GOAL_LABELS: Record<string, string> = {
  LOSE_WEIGHT: '⬇️ Perte de poids',
  MAINTAIN: '⚖️ Maintien',
  GAIN_MUSCLE: '💪 Prise de muscle',
  EAT_HEALTHIER: '🥗 Mieux manger',
}

const DIET_LABELS: Record<string, string> = {
  OMNIVORE: '🍖 Omnivore',
  VEGETARIAN: '🥦 Végétarien',
  VEGAN: '🌱 Vegan',
  PESCATARIAN: '🐟 Pescétarien',
  KETO: '🥑 Keto',
  PALEO: '🥩 Paléo',
}

const ACTIVITY_LABELS: Record<string, string> = {
  SEDENTARY: 'Sédentaire',
  LIGHT: 'Légèrement actif',
  MODERATE: 'Modérément actif',
  ACTIVE: 'Actif',
  VERY_ACTIVE: 'Très actif',
}

interface Props {
  user: { name?: string | null; email?: string | null }
  profile: any
}

export default function ProfileClient({ user, profile }: Props) {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    weight: profile?.weight || '',
    height: profile?.height || '',
    age: profile?.age || '',
  })

  const updateField = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }))

  const save = async () => {
    setIsSaving(true)
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setIsSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="font-poppins text-2xl font-bold text-brand-black mb-6">Mon profil</h1>

      <div className="space-y-6">
        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-4">Informations personnelles</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Nom</span>
              <span className="text-sm font-medium">{user.name || '—'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Objectif</span>
              <span className="text-sm font-medium">{GOAL_LABELS[profile?.goal] || '—'}</span>
            </div>
          </div>
        </Card>

        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-4">Informations nutritionnelles</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-brand-green/5 p-4 text-center">
              <p className="font-poppins text-2xl font-bold text-brand-green">{profile?.targetCalories || '—'}</p>
              <p className="text-xs text-gray-500 mt-1">Calories cibles / jour</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="font-poppins text-2xl font-bold text-brand-black">{ACTIVITY_LABELS[profile?.activityLevel] || '—'}</p>
              <p className="text-xs text-gray-500 mt-1">Niveau d'activité</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{DIET_LABELS[profile?.dietType] || 'Non défini'}</Badge>
            {(profile?.allergies || []).map((a: string) => (
              <Badge key={a} variant="orange">{a}</Badge>
            ))}
          </div>
        </Card>

        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-4">Mettre à jour mes mensurations</p>
          <div className="space-y-4">
            {[
              { key: 'age', label: 'Âge', unit: 'ans', placeholder: '25' },
              { key: 'weight', label: 'Poids', unit: 'kg', placeholder: '70' },
              { key: 'height', label: 'Taille', unit: 'cm', placeholder: '170' },
            ].map(f => (
              <div key={f.key} className="flex items-center gap-4">
                <label className="w-20 text-sm text-gray-600">{f.label}</label>
                <input
                  type="number"
                  value={(form as any)[f.key]}
                  onChange={e => updateField(f.key, Number(e.target.value))}
                  placeholder={f.placeholder}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                />
                <span className="w-8 text-sm text-gray-400">{f.unit}</span>
              </div>
            ))}
            <Button onClick={save} isLoading={isSaving} variant={saved ? 'secondary' : 'primary'} className="w-full justify-center">
              {saved ? '✓ Sauvegardé !' : 'Sauvegarder'}
            </Button>
          </div>
        </Card>

        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-3">Refaire l'onboarding</p>
          <p className="text-sm text-gray-500 mb-4">
            Vos objectifs ont changé ? Refaites le questionnaire initial pour recalibrer votre programme IA.
          </p>
          <Button href="/onboarding" variant="secondary">Refaire le questionnaire</Button>
        </Card>
      </div>
    </div>
  )
}
