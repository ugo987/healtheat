import { UserCircle, Brain, TrendingUp, type LucideIcon } from 'lucide-react'

const steps: { number: string; icon: LucideIcon; title: string; description: string }[] = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Créez votre profil',
    description: 'Renseignez vos objectifs, préférences et intolérances en 2 minutes.',
  },
  {
    number: '02',
    icon: Brain,
    title: "L'IA génère votre plan",
    description: 'Notre IA crée un programme nutritionnel sur-mesure pour la semaine.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Suivez vos progrès',
    description: "Enregistrez vos repas, visualisez vos macros et ajustez en temps réel.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-brand-white py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Comment ça marche</p>
          <h2 className="mt-2 font-poppins text-2xl font-bold text-brand-black md:text-4xl">
            Simple, rapide et efficace
          </h2>
        </div>

        {/* Mobile : liste verticale compacte */}
        <div className="mt-8 flex flex-col gap-4 md:hidden">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green">
                  <Icon size={22} className="text-brand-white" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-black font-poppins text-[10px] font-bold text-brand-white">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-brand-black">{step.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop : grille horizontale */}
        <div className="mt-16 hidden gap-8 md:grid md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-0.5 w-full translate-x-1/2 bg-brand-green/20 md:block" />
                )}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-green shadow-lg">
                  <Icon size={40} className="text-brand-white" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-black font-poppins text-xs font-bold text-brand-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 font-poppins text-xl font-semibold text-brand-black">{step.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
