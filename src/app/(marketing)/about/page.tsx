import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import CTASection from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'À propos — HealthEat',
  description: 'L\'histoire et la vision de HealthEat, la startup française de nutrition personnalisée par IA.',
}

const team = [
  { name: 'Charles-Antoine Lefèvre Manond', role: 'Directeur Général', avatar: 'C', description: 'Visionnaire passionné par l\'innovation technologique et la santé.' },
  { name: 'Ugo Blanchon', role: 'Directeur Artistique', avatar: 'U', description: 'Créateur de l\'identité visuelle et de l\'expérience utilisateur HealthEat.' },
  { name: 'Mathis Moine', role: 'Secrétaire Général', avatar: 'M', description: 'Garant de la stratégie opérationnelle et de la conformité réglementaire.' },
  { name: 'Matthieu De France', role: 'Directeur Marketing', avatar: 'Ma', description: 'Stratège de la croissance et des partenariats marque.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Notre histoire</p>
          <h1 className="mt-3 font-poppins text-4xl font-bold text-brand-black md:text-5xl">
            Révolutionner la nutrition par l'intelligence artificielle
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            HealthEat est né d'une conviction simple : chaque personne mérite un programme nutritionnel adapté à sa vie,
            ses objectifs et ses contraintes — sans passer par un nutritionniste à 150€ la consultation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-poppins text-3xl font-bold text-brand-black">Notre vision</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                D'ici 5 ans, HealthEat ambitionne de devenir la référence de la nutrition personnalisée en France et en Europe,
                avec une IA capable d'anticiper vos besoins nutritionnels avant même que vous ne les exprimiez.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                À 10 ans, nous voulons révolutionner durablement la manière dont les individus gèrent leur alimentation,
                avec un écosystème complet nutrition + activité physique + bien-être mental.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Marché en 2032', value: '46 Mds $', sub: 'Nutrition personnalisée mondiale' },
                { label: 'Croissance annuelle', value: '+14,8%', sub: 'CAGR 2023-2032' },
                { label: 'Objectif 5 ans', value: '1M', sub: 'Utilisateurs actifs' },
                { label: 'Objectif 10 ans', value: '10M', sub: 'Utilisateurs mondiaux' },
              ].map(stat => (
                <Card key={stat.label} className="text-center">
                  <p className="font-poppins text-2xl font-bold text-brand-green">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-brand-black">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.sub}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-poppins text-3xl font-bold text-brand-black">Notre équipe fondatrice</h2>
          <p className="mt-3 text-center text-gray-600">Une équipe complémentaire réunie autour d'une même ambition.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(member => (
              <Card key={member.name} hover className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green font-poppins text-xl font-bold text-brand-white">
                  {member.avatar}
                </div>
                <p className="mt-4 font-poppins font-semibold text-brand-black">{member.name}</p>
                <p className="text-sm text-brand-green font-medium">{member.role}</p>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
