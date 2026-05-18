import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Article — HealthEat Blog',
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: _slug } = await params
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-brand-green hover:underline">
          ← Retour au blog
        </Link>

        <Badge>Nutrition</Badge>
        <h1 className="mt-4 font-poppins text-3xl font-bold text-brand-black md:text-4xl">
          Article de blog HealthEat
        </h1>
        <p className="mt-3 text-sm text-gray-400">12 mai 2026 · 8 min de lecture</p>

        <div className="prose prose-lg mt-10 max-w-none text-gray-700">
          <p>
            Le contenu de cet article sera chargé dynamiquement depuis des fichiers MDX ou un CMS.
            Cette page est un template prêt à recevoir vos articles.
          </p>
          <p>
            Pour ajouter des articles, créez des fichiers <code>.mdx</code> dans{' '}
            <code>src/content/blog/</code> avec les métadonnées (titre, date, catégorie) en frontmatter.
          </p>
        </div>

        <div className="mt-16 rounded-2xl bg-brand-green p-8 text-center">
          <p className="font-poppins text-xl font-bold text-brand-white">
            Prêt à personnaliser votre nutrition ?
          </p>
          <p className="mt-2 text-brand-white/80">
            Créez votre plan nutritionnel IA en quelques minutes.
          </p>
          <div className="mt-4">
            <Button href="/register" variant="white">Commencer gratuitement →</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
