import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'HealthEat — Mangez mieux, Vivez mieux',
  description: 'Coaching nutritionnel personnalisé par intelligence artificielle. Créez votre plan alimentaire unique adapté à vos objectifs de santé.',
  keywords: ['nutrition', 'IA', 'régime', 'coaching', 'santé', 'alimentation personnalisée'],
  openGraph: {
    title: 'HealthEat — Mangez mieux, Vivez mieux',
    description: 'Coaching nutritionnel personnalisé par intelligence artificielle.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${roboto.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
