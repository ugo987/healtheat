import Card from '@/components/ui/Card'

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Infirmière, 32 ans',
    avatar: 'M',
    quote: 'J\'ai perdu 8kg en 3 mois sans me priver. L\'IA a compris que je travaille en horaires décalés et a adapté mon plan en conséquence. Bluffant.',
    stars: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Sportif amateur, 27 ans',
    avatar: 'T',
    quote: 'Enfin une appli qui prend en compte ma prise de masse ET mes entraînements. Les macros sont parfaitement calibrées pour mes séances.',
    stars: 5,
  },
  {
    name: 'Sophie M.',
    role: 'Végétarienne, 41 ans',
    avatar: 'S',
    quote: 'HealthEat respecte mon régime végétarien et mes intolérances au lactose. Les recettes sont délicieuses et faciles à préparer.',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-brand-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Témoignages</p>
          <h2 className="mt-3 font-poppins text-3xl font-bold text-brand-black md:text-4xl">
            Ils ont transformé leur alimentation
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map(t => (
            <Card key={t.name} hover>
              <div className="flex mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-poppins font-bold text-brand-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-brand-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
