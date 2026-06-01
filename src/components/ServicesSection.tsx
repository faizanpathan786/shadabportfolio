import FadeIn from './ui/FadeIn'

const SERVICES = [
  {
    number: '01',
    name: 'Bókun Setup & Architecture',
    description:
      'Full Bókun ecosystem implementation — resource management, availability logic, and backend architecture engineered to support complex fleets and multi-channel operations with zero overbooking risk.',
  },
  {
    number: '02',
    name: 'OTA Optimization',
    description:
      'Moving clients from Page 3 to Page 1 on Viator and GetYourGuide by optimizing Quality Scores, Review Velocity, Instant Confirmation logic, and high-intent keyword strategy.',
  },
  {
    number: '03',
    name: 'Rejection Recovery',
    description:
      '90%+ success rate appealing Similarity Rejections and DSA Compliance issues on GetYourGuide — restructuring products into unique, premium experiences that pass platform review.',
  },
  {
    number: '04',
    name: 'Multi-Channel Distribution',
    description:
      'Strategic expansion across Viator, GetYourGuide, Musement, Headout, Airbnb Experiences and B2B marketplace connections — all mapped and synced without API errors or availability conflicts.',
  },
  {
    number: '05',
    name: 'Direct Booking & Web',
    description:
      'Building direct booking websites connected to Bókun, configuring payment gateways, agent networks, and automated monthly reporting systems to reduce OTA commission dependency.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20"
    >
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-10 sm:mb-14 md:mb-18"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 110px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-5 sm:py-6 md:py-7"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(2.2rem, 7vw, 100px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 pt-2">
                <span
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </span>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
