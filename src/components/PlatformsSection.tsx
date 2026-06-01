import FadeIn from './ui/FadeIn'

const PLATFORMS = [
  {
    name: 'Bókun',
    role: 'Booking Software & Channel Manager',
    screenshot: '/images/platform-bokun.jpg',
    url: 'https://bokun.io',
    tag: 'Former Trainer',
  },
  {
    name: 'Viator',
    role: 'OTA — Page 1 Ranking Specialist',
    screenshot: '/images/nate-waterfall.jpg',
    url: 'https://www.viator.com',
    tag: 'Algorithm Expert',
  },
  {
    name: 'GetYourGuide',
    role: 'OTA — Rejection Recovery & Growth',
    screenshot: '/images/ferrao-2.jpg',
    url: 'https://www.getyourguide.com',
    tag: '90%+ Success Rate',
  },
  {
    name: 'Airbnb Experiences',
    role: 'Multi-Channel Distribution',
    screenshot: '/images/nate-van.png',
    url: 'https://www.airbnb.com/experiences',
    tag: 'Integrated',
  },
  {
    name: 'Musement',
    role: 'Global Distribution Network',
    screenshot: '/images/platform-musement.jpg',
    url: 'https://www.musement.com',
    tag: 'Distribution',
  },
  {
    name: 'Headout',
    role: 'Premium Experience Distribution',
    screenshot: '/images/platform-headout.jpg',
    url: 'https://www.headout.com',
    tag: 'Mapped',
  },
]

export default function PlatformsSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 110px)' }}
        >
          Platforms
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-[#D7E2EA] font-light uppercase tracking-widest text-center mb-16 sm:mb-20 md:mb-28 opacity-60"
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
        >
          OTA & booking ecosystems I specialize in
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {PLATFORMS.map((platform, i) => (
          <FadeIn key={platform.name} delay={i * 0.08} y={40}>
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[32px] border border-[#D7E2EA]/15 overflow-hidden
                bg-[#111111] hover:border-[#D7E2EA]/40 transition-all duration-300"
            >
              <div className="overflow-hidden" style={{ height: 'clamp(160px, 20vw, 240px)' }}>
                <img
                  src={platform.screenshot}
                  alt={`${platform.name} platform`}
                  className="w-full h-full object-cover object-top
                    group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 md:p-6 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[#D7E2EA] font-black uppercase leading-tight"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
                  >
                    {platform.name}
                  </span>
                  <span
                    className="text-[#D7E2EA] font-light opacity-50 leading-snug"
                    style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}
                  >
                    {platform.role}
                  </span>
                </div>
                <span
                  className="flex-shrink-0 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]
                    font-medium uppercase tracking-wider px-3 py-1 opacity-70
                    group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)' }}
                >
                  {platform.tag}
                </span>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
