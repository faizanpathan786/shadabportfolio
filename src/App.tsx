import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import PlatformsSection from './components/PlatformsSection'
import ProjectsSection from './components/ProjectsSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <PlatformsSection />
      <ProjectsSection />
      <PricingSection />
      <ContactSection />
    </div>
  )
}
