import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/marketing/HeroSection'
import HowItWorksSection from '@/components/marketing/HowItWorksSection'
import FeaturesSection from '@/components/marketing/FeaturesSection'
import TestimonialsSection from '@/components/marketing/TestimonialsSection'
import PricingSection from '@/components/marketing/PricingSection'
import CTASection from '@/components/marketing/CTASection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
