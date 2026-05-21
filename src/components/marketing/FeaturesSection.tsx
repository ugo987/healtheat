import Card from '@/components/ui/Card'
import { Dna, Zap, BarChart2, Apple, Target, ShieldCheck, type LucideIcon } from 'lucide-react'

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Dna,
    title: 'Personnalisation IA',
    description: "L'IA analyse vos objectifs, régime et allergies pour créer un plan unique.",
  },
  {
    icon: Zap,
    title: 'Génération instantanée',
    description: 'Votre programme hebdomadaire est prêt en quelques secondes.',
  },
  {
    icon: BarChart2,
    title: 'Suivi des macros',
    description: 'Calories, protéines, glucides et lipides suivis au quotidien.',
  },
  {
    icon: Apple,
    title: 'Base alimentaire',
    description: "Des milliers d'aliments pour logger vos repas avec précision.",
  },
  {
    icon: Target,
    title: 'Objectifs adaptatifs',
    description: 'Perte de poids, prise de muscle — le plan s\'adapte à votre progression.',
  },
  {
    icon: ShieldCheck,
    title: 'Données sécurisées',
    description: 'Vos données sont chiffrées et protégées conformément au RGPD.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Fonctionnalités</p>
          <h2 className="mt-2 font-poppins text-2xl font-bold text-brand-black md:text-4xl">
            Tout ce qu'il vous faut
          </h2>
        </div>

        {/* Mobile : 2 colonnes compactes */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
          {features.map(feature => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <h3 className="mt-2 font-poppins text-sm font-semibold text-brand-black leading-tight">{feature.title}</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Desktop : grille 3 colonnes */}
        <div className="mt-16 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                  <Icon size={22} className="text-brand-green" />
                </div>
                <h3 className="mt-4 font-poppins text-lg font-semibold text-brand-black">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
