import Link from 'next/link'
import { Heart } from 'lucide-react'

const links = {
  Produit: [
    { href: '/features', label: 'Fonctionnalités' },
    { href: '/pricing', label: 'Tarifs' },
    { href: '/blog', label: 'Blog' },
  ],
  Entreprise: [
    { href: '/about', label: 'À propos' },
  ],
  Légal: [
    { href: '/privacy', label: 'Confidentialité' },
    { href: '/terms', label: 'CGU' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-brand-black text-brand-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-poppins text-xl font-bold">HealthEat</p>
            <p className="mt-2 text-sm text-brand-white/70">Mangez mieux - Vivez Mieux</p>
            <p className="mt-4 text-sm text-brand-white/60 leading-relaxed">
              Coaching nutritionnel personnalisé par intelligence artificielle, accessible à tous.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="font-poppins text-sm font-semibold text-brand-white">{category}</p>
              <ul className="mt-4 space-y-3">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-brand-white/60 transition-colors hover:text-brand-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-white/10 pt-8 md:flex-row">
          <p className="text-sm text-brand-white/50">
            © {new Date().getFullYear()} HealthEat. Tous droits réservés.
          </p>
          <p className="text-sm text-brand-white/50">
            Fait avec <Heart size={13} className="inline text-red-400 mx-0.5" /> par l'équipe HealthEat
          </p>
        </div>
      </div>
    </footer>
  )
}
