import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '/mois',
    description: 'Pour découvrir HealthEat',
    features: [
      'Génération de 1 plan par mois',
      'Suivi alimentaire basique',
      'Base de données alimentaire',
      'Dashboard macros',
    ],
    missing: [
      'Plans illimités',
      'Ajustements IA adaptatifs',
      'Recettes personnalisées',
      'Support prioritaire',
    ],
    cta: 'Commencer gratuitement',
    href: '/register',
    featured: false,
  },
  {
    name: 'Premium',
    price: '9,99€',
    period: '/mois',
    description: 'Pour atteindre vos objectifs',
    features: [
      'Plans nutritionnels illimités',
      'Ajustements IA en temps réel',
      'Recettes personnalisées',
      'Intégration wearables',
      'Analyse nutritionnelle avancée',
      'Support prioritaire',
      'Accès blog nutrition expert',
    ],
    missing: [],
    cta: 'Essayer 14 jours gratuits',
    href: '/register?plan=premium',
    featured: true,
  },
]

export default function PricingSection() {
  return (
    <section className="py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Tarifs</p>
          <h2 className="mt-3 font-poppins text-3xl font-bold text-brand-black md:text-4xl">
            Simple et transparent
          </h2>
          <p className="mt-4 text-gray-600">Commencez gratuitement, évoluez quand vous voulez.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:max-w-3xl md:mx-auto">
          {plans.map(plan => (
            <Card key={plan.name} padding="lg" className={plan.featured ? 'border-2 border-brand-green relative' : ''}>
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-green px-4 py-1 text-xs font-bold text-brand-white">
                  LE PLUS POPULAIRE
                </div>
              )}
              <p className="font-poppins text-lg font-semibold text-brand-black">{plan.name}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-poppins text-4xl font-bold text-brand-green">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 text-brand-green">✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-0.5">✗</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={plan.href}
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
