import Card from '@/components/ui/Card'

const features = [
  {
    icon: '🧬',
    title: 'Personnalisation ultra-précise',
    description: 'L\'IA analyse vos objectifs, régime, allergies, et niveau d\'activité pour créer un plan unique. Plus elle vous connaît, plus elle est précise.',
  },
  {
    icon: '⚡',
    title: 'Génération en temps réel',
    description: 'Votre programme nutritionnel hebdomadaire est généré en quelques secondes, avec des recettes adaptées à la cuisine française.',
  },
  {
    icon: '📊',
    title: 'Suivi des macros',
    description: 'Visualisez vos calories, protéines, glucides et lipides au quotidien. Des graphiques clairs pour comprendre votre alimentation.',
  },
  {
    icon: '🍎',
    title: 'Base de données alimentaire',
    description: 'Accès à des milliers d\'aliments pour logger vos repas avec précision, via la recherche intelligente Edamam.',
  },
  {
    icon: '🎯',
    title: 'Objectifs adaptatifs',
    description: 'Que vous visiez la perte de poids, la prise de muscle ou simplement manger mieux, le programme s\'adapte à votre progression.',
  },
  {
    icon: '🔒',
    title: 'Données 100% sécurisées',
    description: 'Vos données de santé sont chiffrées et protégées conformément au RGPD. Nous ne vendons jamais vos informations.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Fonctionnalités</p>
          <h2 className="mt-3 font-poppins text-3xl font-bold text-brand-black md:text-4xl">
            Tout ce qu'il vous faut pour réussir
          </h2>
          <p className="mt-4 text-gray-600">
            Une application complète pensée pour rendre la nutrition simple et accessible.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <Card key={feature.title} hover>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mt-4 font-poppins text-lg font-semibold text-brand-black">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
