import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-brand-green p-12 lg:flex">
        <Link href="/" className="font-poppins text-2xl font-bold text-brand-white">
          HealthEat
        </Link>
        <div>
          <p className="font-poppins text-4xl font-bold text-brand-white leading-tight">
            Mangez mieux,<br />Vivez mieux.
          </p>
          <p className="mt-4 text-brand-white/70 leading-relaxed">
            Rejoignez 50 000 personnes qui ont transformé leur alimentation grâce à notre IA nutritionnelle.
          </p>
          <div className="mt-8 space-y-3">
            {['Plan nutritionnel personnalisé par IA', 'Suivi des macros en temps réel', 'Recettes adaptées à vos objectifs'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-white/20 text-brand-white text-xs">✓</span>
                <span className="text-brand-white/90 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-brand-white/40">© 2026 HealthEat — Tous droits réservés</p>
      </div>

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 block font-poppins text-xl font-bold text-brand-black lg:hidden">
            HealthEat
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
