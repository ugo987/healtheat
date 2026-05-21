import Button from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="bg-brand-green py-10 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-poppins text-3xl font-bold text-brand-white md:text-5xl">
          Prêt à transformer votre alimentation ?
        </h2>
        <p className="mt-4 text-lg text-brand-white/80">
          Rejoignez 50 000 personnes qui ont déjà adopté une nutrition intelligente avec HealthEat.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/register" variant="white" size="lg">
            Commencer gratuitement →
          </Button>
          <Button href="/about" size="lg" className="border-2 border-brand-white/40 text-brand-white hover:bg-brand-white/10 bg-transparent">
            En savoir plus
          </Button>
        </div>
        <p className="mt-4 text-sm text-brand-white/50">Gratuit pour toujours · Sans engagement</p>
      </div>
    </section>
  )
}
