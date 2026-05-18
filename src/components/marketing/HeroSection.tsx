'use client'

import Button from '@/components/ui/Button'
import { useSession } from 'next-auth/react'

export default function HeroSection() {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-white via-white to-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-brand-green/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-36">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-sm font-medium text-brand-green">
          <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
          IA nutritionnelle de nouvelle génération
        </div>

        <h1 className="mx-auto max-w-4xl font-poppins text-5xl font-bold leading-tight text-brand-black md:text-7xl">
          Mangez mieux,{' '}
          <span className="text-brand-green">Vivez mieux</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
          HealthEat crée votre programme nutritionnel personnalisé grâce à l'intelligence artificielle.
          Adapté à vos objectifs, votre mode de vie et vos préférences — en quelques minutes.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={session ? '/dashboard' : '/register'} size="lg">
            Commencer gratuitement →
          </Button>
          <Button href="/features" variant="secondary" size="lg">
            Voir les fonctionnalités
          </Button>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Aucune carte bancaire requise · Résultats en 2 minutes
        </p>

        <div className="mt-20 grid grid-cols-3 gap-8 md:grid-cols-3">
          {[
            { value: '50 000+', label: 'Utilisateurs actifs' },
            { value: '4.9/5', label: 'Note moyenne' },
            { value: '94%', label: 'Atteignent leurs objectifs' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-poppins text-3xl font-bold text-brand-green md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
