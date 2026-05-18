import type { Metadata } from 'next'
import FeaturesSection from '@/components/marketing/FeaturesSection'
import CTASection from '@/components/marketing/CTASection'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Fonctionnalités — HealthEat',
  description: 'Découvrez toutes les fonctionnalités de HealthEat : IA nutritionnelle, suivi des macros, recettes personnalisées.',
}

const advanced = [
  { icon: '🔄', title: 'Machine Learning adaptatif', description: 'L\'IA apprend de vos retours et ajuste vos recommandations chaque semaine pour des résultats toujours plus précis.' },
  { icon: '⌚', title: 'Intégration wearables', description: 'Synchronisation avec Google Fit, Apple Health et vos montres connectées pour un suivi complet activité + nutrition.' },
  { icon: '🧪', title: 'Analyse nutritionnelle avancée', description: '30+ micronutriments suivis : vitamines, minéraux, oméga-3, fibres. Bien au-delà des simples calories.' },
  { icon: '🎮', title: 'Gamification', description: 'Streaks, badges et défis hebdomadaires pour rester motivé. La nutrition peut aussi être amusante !' },
  { icon: '🤝', title: 'Partenariats B2B', description: 'Solutions pour les entreprises et professionnels de santé. Coaching nutritionnel pour vos équipes ou patients.' },
  { icon: '📱', title: 'Interface mobile-first', description: 'Design optimisé pour le téléphone. Logguez vos repas en 10 secondes, où que vous soyez.' },
]

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-brand-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Fonctionnalités</p>
          <h1 className="mt-3 font-poppins text-4xl font-bold text-brand-black md:text-6xl">
            Une app complète pour votre nutrition
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            HealthEat combine intelligence artificielle, science de la nutrition et design intuitif pour vous accompagner vers une alimentation plus saine.
          </p>
        </div>
      </section>

      <FeaturesSection />

      <section className="bg-brand-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-poppins text-3xl font-bold text-brand-black">Fonctionnalités avancées</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advanced.map(f => (
              <Card key={f.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-2xl">{f.icon}</div>
                <h3 className="mt-4 font-poppins text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
