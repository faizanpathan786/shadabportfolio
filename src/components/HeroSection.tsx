import FadeIn from './ui/FadeIn'
import Magnet from './ui/Magnet'
import ContactButton from './ui/ContactButton'

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact']

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider
              text-sm md:text-lg lg:text-[1.4rem]
              hover:opacity-70 transition-opacity duration-200"
          >
            {link}
          </a>
        ))}
      </FadeIn>

      {/* Heading */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none
              whitespace-nowrap w-full text-center
              text-[9vw] sm:text-[10vw] md:text-[11vw] lg:text-[12vw]
              mt-6 sm:mt-4 md:-mt-5 px-2"
          >
            Hi, i&apos;m shadab
          </h1>
        </FadeIn>
      </div>

      {/* Flex grow area — portrait + bottom bar */}
      <div className="flex-1 relative">
        {/* 3D avatar — local copy */}
        <FadeIn
          delay={0.6}
          y={30}
          className="absolute left-1/2 -translate-x-1/2 z-10
            w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]
            top-1/2 -translate-y-1/2
            sm:top-auto sm:translate-y-0 sm:bottom-0"
        >
          <Magnet strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <div className="relative">
              <img
                src="/images/avatar-3d.png"
                alt="Shadab 3D avatar"
                draggable={false}
                className="w-full h-auto rounded-2xl object-cover"
              />

              {/* Overlay card to add visual interest when image looks empty */}
              <div className="absolute left-6 bottom-6 flex items-center gap-3 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">S</div>
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Shadab</div>
                  <a href="#contact" className="text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">Let's talk</a>
                </div>
              </div>
            </div>
          </Magnet>
        </FadeIn>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
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
