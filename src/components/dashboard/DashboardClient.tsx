'use client'

import Link from 'next/link'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import type { MacroSummary } from '@/types'

interface Props {
  userName: string
  profile: any
  todayLogs: any[]
  macros: MacroSummary
}

const MEAL_LABELS: Record<string, string> = {
  BREAKFAST: '🌅 Petit-déjeuner',
  LUNCH: '☀️ Déjeuner',
  DINNER: '🌙 Dîner',
  SNACK: '🍎 Collation',
}

const GOAL_LABELS: Record<string, string> = {
  LOSE_WEIGHT: 'Perte de poids',
  MAINTAIN: 'Maintien',
  GAIN_MUSCLE: 'Prise de muscle',
  EAT_HEALTHIER: 'Mieux manger',
}

export default function DashboardClient({ userName, profile, todayLogs, macros }: Props) {
  const caloriePercent = Math.min(100, Math.round((macros.calories / macros.targetCalories) * 100))
  const proteinTarget = Math.round(macros.targetCalories * 0.3 / 4)
  const carbsTarget = Math.round(macros.targetCalories * 0.4 / 4)
  const fatTarget = Math.round(macros.targetCalories * 0.3 / 9)

  const chartData = [{ name: 'Calories', value: caloriePercent, fill: '#253836' }]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="font-poppins text-2xl font-bold text-brand-black">
          {greeting}, {userName.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-gray-500">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <p className="font-poppins font-semibold text-brand-black">Calories du jour</p>
          <div className="mt-4 h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={chartData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#f3f4f6' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="font-poppins text-3xl font-bold text-brand-green">{Math.round(macros.calories)}</p>
          <p className="text-sm text-gray-500">/ {macros.targetCalories} kcal</p>
          <Badge variant={caloriePercent > 100 ? 'orange' : 'green'} className="mt-3">
            {macros.targetCalories - Math.round(macros.calories) > 0
              ? `${macros.targetCalories - Math.round(macros.calories)} kcal restantes`
              : 'Objectif atteint 🎉'}
          </Badge>
        </Card>

        <Card className="lg:col-span-2">
          <p className="font-poppins font-semibold text-brand-black mb-4">Macronutriments</p>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">🥩 Protéines</span>
                <span className="text-gray-500">{Math.round(macros.protein)}g / {proteinTarget}g</span>
              </div>
              <ProgressBar value={macros.protein} max={proteinTarget} color="green" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">🍞 Glucides</span>
                <span className="text-gray-500">{Math.round(macros.carbs)}g / {carbsTarget}g</span>
              </div>
              <ProgressBar value={macros.carbs} max={carbsTarget} color="blue" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">🫒 Lipides</span>
                <span className="text-gray-500">{Math.round(macros.fat)}g / {fatTarget}g</span>
              </div>
              <ProgressBar value={macros.fat} max={fatTarget} color="orange" />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-brand-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-brand-black">Mon objectif</p>
                <p className="text-xs text-gray-500">{GOAL_LABELS[profile.goal] || profile.goal}</p>
              </div>
              <Badge>{profile.dietType}</Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="font-poppins font-semibold text-brand-black">Repas d'aujourd'hui</p>
            <Button href="/tracking" variant="ghost" size="sm">Ajouter +</Button>
          </div>
          {todayLogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl">🍽️</p>
              <p className="mt-2 text-gray-500 text-sm">Aucun repas enregistré aujourd'hui.</p>
              <Button href="/tracking" size="sm" className="mt-3">Logger mon premier repas</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{MEAL_LABELS[log.mealType] || log.mealType}</p>
                    <p className="text-xs text-gray-500">{(log.foods as any[]).length} aliment(s)</p>
                  </div>
                  <Badge variant="green">{Math.round(log.totalCalories)} kcal</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <p className="font-poppins font-semibold text-brand-black mb-4">Actions rapides</p>
          <div className="space-y-3">
            <Link href="/program" className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:border-brand-green hover:bg-brand-green/5 transition-colors">
              <span className="text-2xl">🥗</span>
              <div>
                <p className="font-medium text-brand-black">Voir mon programme</p>
                <p className="text-xs text-gray-500">Plan nutritionnel de la semaine</p>
              </div>
            </Link>
            <Link href="/tracking" className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:border-brand-green hover:bg-brand-green/5 transition-colors">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-medium text-brand-black">Logger un repas</p>
                <p className="text-xs text-gray-500">Rechercher et ajouter des aliments</p>
              </div>
            </Link>
            <Link href="/profile" className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 hover:border-brand-green hover:bg-brand-green/5 transition-colors">
              <span className="text-2xl">👤</span>
              <div>
                <p className="font-medium text-brand-black">Mon profil</p>
                <p className="text-xs text-gray-500">Mettre à jour mes informations</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
