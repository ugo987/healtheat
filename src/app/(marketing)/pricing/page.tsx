import type { Metadata } from 'next'
import PricingSection from '@/components/marketing/PricingSection'
import CTASection from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'Tarifs — HealthEat',
  description: 'Découvrez nos offres gratuite et premium. Commencez gratuitement, évoluez quand vous voulez.',
}

const faq = [
  { q: 'Puis-je annuler à tout moment ?', a: 'Oui, sans frais ni engagement. Vous conservez l\'accès jusqu\'à la fin de la période payée.' },
  { q: 'Le plan gratuit est-il vraiment gratuit ?', a: 'Oui, pour toujours. Pas de carte bancaire requise pour s\'inscrire.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Absolument. Chiffrement bout en bout et conformité RGPD. Nous ne vendons jamais vos données.' },
  { q: 'L\'IA fonctionne-t-elle pour les régimes spéciaux ?', a: 'Oui : végan, keto, sans gluten, paleo, végétarien, pescétarien et bien d\'autres.' },
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-brand-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-poppins text-4xl font-bold text-brand-black md:text-6xl">
            Des tarifs simples et honnêtes
          </h1>
          <p className="mt-4 text-lg text-gray-600">Aucune surprise. Commencez gratuitement, payez seulement si vous voulez plus.</p>
        </div>
      </section>

      <PricingSection />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-poppins text-2xl font-bold text-brand-black">Questions fréquentes</h2>
          <div className="mt-8 space-y-4">
            {faq.map(item => (
              <div key={item.q} className="rounded-2xl border border-gray-100 p-6">
                <p className="font-poppins font-semibold text-brand-black">{item.q}</p>
                <p className="mt-2 text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
