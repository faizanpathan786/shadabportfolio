import FadeIn from './ui/FadeIn'
import Magnet from './ui/Magnet'
import ContactButton from './ui/ContactButton'

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact']

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="flex justify-between px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 md:pt-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider
              text-xs sm:text-sm md:text-lg lg:text-[1.4rem]
              hover:opacity-70 transition-opacity duration-200"
          >
            {link}
          </a>
        ))}
      </FadeIn>

      {/* Heading */}
      <div className="overflow-hidden px-2">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none
              whitespace-nowrap w-full text-center
              text-[9vw] sm:text-[10vw] md:text-[11vw] lg:text-[12vw]
              mt-4 sm:mt-4 md:-mt-5"
          >
            Hi, i&apos;m shadab
          </h1>
        </FadeIn>
      </div>

      {/* Avatar + bottom bar */}
      <div className="flex-1 relative flex flex-col">

        {/* Avatar — centred, responsive sizing */}
        <FadeIn
          delay={0.6}
          y={30}
          className="flex-1 flex items-end justify-center relative translate-x-[8%]"
        >
          <div
            className="relative z-10 mx-auto
              w-[200px] xs:w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px]"
          >
            <Magnet strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
              <div className="relative">
                <img
                  src="/images/avatar-3d.png"
                  alt="Shadab 3D avatar"
                  draggable={false}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />

                {/* Name badge — hidden on very small screens */}
                <div className="absolute left-3 bottom-3 sm:left-5 sm:bottom-5 flex items-center gap-2 sm:gap-3
                  bg-white/80 backdrop-blur-sm rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-lg">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs sm:text-base">S</div>
                  <div className="flex flex-col">
                    <div className="text-xs sm:text-sm font-semibold text-slate-900">Shadab</div>
                    <a href="#contact" className="text-[10px] sm:text-xs text-slate-700 uppercase tracking-wider">Let&apos;s talk</a>
                  </div>
                </div>
              </div>
            </Magnet>
          </div>
        </FadeIn>

        {/* Bottom bar */}
        <div className="flex justify-between items-end pb-5 sm:pb-7 md:pb-10 px-5 sm:px-8 md:px-10 mt-4 sm:mt-0">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                max-w-[130px] xs:max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.6rem, 1.4vw, 1.2rem)' }}
            >
              former Bókun trainer scaling luxury tour operators to page 1 visibility
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
