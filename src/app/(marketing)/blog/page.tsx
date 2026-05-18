import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Blog Nutrition — HealthEat',
  description: 'Conseils nutrition, recettes saines et guides bien-être par les experts HealthEat.',
}

const articles = [
  {
    slug: 'proteines-vegetales-guide',
    title: 'Guide complet des protéines végétales',
    excerpt: 'Comment atteindre vos besoins en protéines sans viande ? Tofu, légumineuses, quinoa : tout ce qu\'il faut savoir.',
    category: 'Nutrition',
    date: '12 mai 2026',
    readTime: '8 min',
  },
  {
    slug: 'alimentation-sport-performance',
    title: 'Alimentation et performance sportive',
    excerpt: 'Les stratégies nutritionnelles pour améliorer vos performances, accélérer la récupération et éviter les blessures.',
    category: 'Sport',
    date: '5 mai 2026',
    readTime: '10 min',
  },
  {
    slug: 'diabete-alimentation-equilibree',
    title: 'Diabète : comment bien manger au quotidien',
    excerpt: 'Conseils pratiques pour gérer sa glycémie grâce à une alimentation équilibrée, validés par nos experts nutritionnistes.',
    category: 'Santé',
    date: '28 avril 2026',
    readTime: '6 min',
  },
  {
    slug: 'regime-keto-debutant',
    title: 'Le régime keto pour les débutants',
    excerpt: 'Qu\'est-ce que le régime cétogène ? Avantages, risques et comment démarrer progressivement avec l\'aide de l\'IA HealthEat.',
    category: 'Régimes',
    date: '20 avril 2026',
    readTime: '7 min',
  },
  {
    slug: 'manger-sain-budget-limite',
    title: 'Manger sain avec un budget limité',
    excerpt: 'Des conseils concrets pour adopter une alimentation équilibrée sans se ruiner : aliments à privilégier, astuces shopping.',
    category: 'Pratique',
    date: '15 avril 2026',
    readTime: '5 min',
  },
  {
    slug: 'micronutriments-oublies',
    title: 'Ces micronutriments que vous ignorez (à tort)',
    excerpt: 'Magnésium, zinc, vitamine D, oméga-3 : découvrez pourquoi ces nutriments sont essentiels et où les trouver.',
    category: 'Nutrition',
    date: '8 avril 2026',
    readTime: '9 min',
  },
]

const categoryColors: Record<string, 'green' | 'blue' | 'orange' | 'gray'> = {
  Nutrition: 'green',
  Sport: 'blue',
  Santé: 'orange',
  Régimes: 'gray',
  Pratique: 'gray',
}

export default function BlogPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold uppercase tracking-widest text-brand-green">Blog</p>
          <h1 className="mt-3 font-poppins text-4xl font-bold text-brand-black">Conseils nutrition & bien-être</h1>
          <p className="mt-4 text-gray-600">Articles rédigés et validés par nos experts nutritionnistes.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card hover className="h-full">
                <div className="flex items-center justify-between">
                  <Badge variant={categoryColors[article.category] || 'gray'}>{article.category}</Badge>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <h2 className="mt-3 font-poppins text-lg font-semibold text-brand-black leading-snug">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{article.excerpt}</p>
                <p className="mt-4 text-xs text-gray-400">{article.date}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
