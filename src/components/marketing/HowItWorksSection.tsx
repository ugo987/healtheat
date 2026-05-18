const steps = [
  {
    number: '01',
    icon: '👤',
    title: 'Créez votre profil',
    description: 'Renseignez vos objectifs, vos préférences alimentaires, vos intolérances et votre niveau d\'activité en 2 minutes.',
  },
  {
    number: '02',
    icon: '🤖',
    title: 'L\'IA génère votre plan',
    description: 'Notre intelligence artificielle analyse vos données et crée un programme nutritionnel sur-mesure pour la semaine.',
  },
  {
    number: '03',
    icon: '📈',
    title: 'Suivez vos progrès',
    description: 'Enregistrez vos repas, visualisez vos macros et laissez l\'IA ajuster votre plan en fonction de votre progression.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-brand-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Comment ça marche</p>
          <h2 className="mt-3 font-poppins text-3xl font-bold text-brand-black md:text-4xl">
            Simple, rapide et efficace
          </h2>
          <p className="mt-4 text-gray-600">
            De l'inscription à votre premier plan nutritionnel, il suffit de quelques minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full translate-x-1/2 bg-brand-green/20 md:block" />
              )}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-green shadow-lg">
                <span className="text-4xl">{step.icon}</span>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-black font-poppins text-xs font-bold text-brand-white">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 font-poppins text-xl font-semibold text-brand-black">{step.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
