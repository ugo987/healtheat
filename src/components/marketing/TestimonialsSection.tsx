import Card from '@/components/ui/Card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Infirmière, 32 ans',
    avatar: 'M',
    quote: "J'ai perdu 8kg en 3 mois sans me priver. L'IA a compris que je travaille en horaires décalés et a adapté mon plan. Bluffant.",
    stars: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Sportif amateur, 27 ans',
    avatar: 'T',
    quote: "Enfin une appli qui prend en compte ma prise de masse ET mes entraînements. Les macros sont parfaitement calibrées.",
    stars: 5,
  },
  {
    name: 'Sophie M.',
    role: 'Végétarienne, 41 ans',
    avatar: 'S',
    quote: "HealthEat respecte mon régime végétarien et mes intolérances au lactose. Les recettes sont délicieuses et faciles.",
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-brand-white py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Témoignages</p>
          <h2 className="mt-2 font-poppins text-2xl font-bold text-brand-black md:text-4xl">
            Ils ont transformé leur alimentation
          </h2>
        </div>

        {/* Mobile : scroll horizontal */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory">
          {testimonials.map(t => (
            <div key={t.name} className="w-72 shrink-0 snap-start rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex mb-2">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed italic">"{t.quote}"</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green font-poppins text-sm font-bold text-brand-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop : grille */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.map(t => (
            <Card key={t.name} hover>
              <div className="flex mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
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
