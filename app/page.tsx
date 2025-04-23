import HeroSection from '@/components/HeroSection'
import FeaturedPerfumes from '@/components/FeaturedPerfumes'
import OurStorySection from '@/components/OurStorySection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <div> {/* Offset for fixed navbar */}
      <HeroSection />
      <FeaturedPerfumes />
      <OurStorySection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}