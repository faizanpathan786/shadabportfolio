import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LiveProjectButton from './ui/LiveProjectButton'

interface Project {
  number: string
  name: string
  category: string
  col1Images: [string, string]
  col2Image: string
  href?: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Nate Tours',
    category: 'Switzerland · Luxury Alpine',
    href: 'https://www.nate-tours.com',
    col1Images: [
      '/images/thum-nate.jpg',
      '/images/nate-waterfall.jpg',
    ],
    col2Image: '/images/thum-nate-waterfall.jpg',
  },
  {
    number: '02',
    name: 'Ferrao Boats',
    category: 'Portugal · Boat Charters',
    href: 'https://www.caisdoferrao.com/',
    col1Images: [
      '/images/ferrao-1.jpg',
      '/images/ferrao-6.jpg',
    ],
    col2Image: '/images/ferrao-2.jpg',
  },
  {
    number: '03',
    name: 'Cais do Ferrão',
    category: 'Portugal · Maritime Hub',
    href: 'https://www.caisdoferrao.com/',
    col1Images: [
      '/images/ferrao-3.jpg',
      '/images/ferrao-5.jpg',
    ],
    col2Image: '/images/ferrao-4.jpg',
  },
]

const TOTAL = PROJECTS.length

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={ref}
      className="h-[72vh] sm:h-[80vh] md:h-[85vh] sticky"
      style={{ top: `${60 + index * 18}px` }}
    >
      <motion.div
        style={{ scale }}
        className="h-full rounded-[24px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px]
          border-2 border-[#D7E2EA] bg-[#0C0C0C]
          p-3 sm:p-5 md:p-7 lg:p-8
          flex flex-col gap-3 sm:gap-4 md:gap-5"
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0">
            <span
              className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 120px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col min-w-0">
              <span
                className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-60"
                style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.875rem)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-black uppercase leading-tight truncate"
                style={{ fontSize: 'clamp(0.8rem, 2.5vw, 2.5rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          {project.href && (
            <div className="flex-shrink-0 hidden sm:block">
              <LiveProjectButton href={project.href} />
            </div>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 sm:hidden rounded-full border border-[#D7E2EA]/50
                text-[#D7E2EA] font-medium uppercase tracking-widest text-[10px] px-3 py-1.5"
            >
              Visit
            </a>
          )}
        </div>

        {/* Image area — fills remaining height */}
        <div className="flex gap-2 sm:gap-3 md:gap-4 flex-1 min-h-0">

          {/* Left column — hidden on mobile */}
          <div className="hidden md:flex flex-col gap-3 lg:gap-4" style={{ flex: '0 0 40%' }}>
            <div
              className="relative rounded-[28px] lg:rounded-[40px] overflow-hidden flex-shrink-0"
              style={{ height: 'clamp(100px, 13vw, 220px)' }}
            >
              <img
                src={project.col1Images[0]}
                alt={`${project.name} 1`}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/ferrao-3.jpg' }}
              />
              <div className="absolute left-3 bottom-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                {project.name}
              </div>
            </div>

            <div className="relative rounded-[28px] lg:rounded-[40px] overflow-hidden flex-1 min-h-0">
              <img
                src={project.col1Images[1]}
                alt={`${project.name} 2`}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/ferrao-3.jpg' }}
              />
              <div className="absolute left-3 bottom-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                {project.category}
              </div>
            </div>
          </div>

          {/* Right / main image — full width on mobile */}
          <div className="flex-1 min-h-0">
            <div className="relative h-full rounded-[20px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden">
              <img
                src={project.col2Image}
                alt={`${project.name} main`}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/ferrao-3.jpg' }}
              />

              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center
                    bg-black/40 hover:bg-black/55 transition-colors duration-200 group"
                >
                  <div className="text-center px-4">
                    <div className="text-white font-semibold text-sm sm:text-lg md:text-xl mb-2">
                      {project.name}
                    </div>
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2
                      bg-white/10 border border-white/30 text-white rounded-md
                      text-xs sm:text-sm uppercase tracking-wider
                      group-hover:bg-white/20 transition-colors duration-200">
                      Visit Site
                    </span>
                  </div>
                </a>
              )}

              {!project.href && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="text-white font-semibold text-sm sm:text-xl">{project.name}</div>
                </div>
              )}

              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 text-xs sm:text-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow">
                {project.number}
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[28px] sm:rounded-t-[40px] md:rounded-t-[50px] lg:rounded-t-[60px]
        -mt-7 sm:-mt-10 md:-mt-12 lg:-mt-14 relative z-10
        px-3 sm:px-6 md:px-10 pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-16 sm:pb-20"
    >
      <h2
        className="hero-heading font-black uppercase text-center leading-none tracking-tight
          mb-10 sm:mb-16 md:mb-20 lg:mb-24"
        style={{ fontSize: 'clamp(2rem, 8vw, 110px)' }}
      >
        Projects
      </h2>

      <div className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
