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
    col2Image: '/images/ferrao-website-preview.png',
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
    col2Image: '/images/ferrao-website-preview.png',
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
      className="h-[85vh] sticky"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.div
        style={{ scale }}
        className="h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
          border-2 border-[#D7E2EA] bg-[#0C0C0C]
          p-4 sm:p-6 md:p-8 flex flex-col gap-4 md:gap-6"
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <span
              className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-xs sm:text-sm opacity-60">
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-black uppercase leading-tight truncate"
                style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)' }}
              >
                {project.name}
              </span>
            </div>
          </div>
          {project.href && <LiveProjectButton href={project.href} />}
        </div>

        {/* Image grid */}
        <div className="flex gap-3 md:gap-4 flex-1 min-h-0">
          {/* Left column — 40% */}
          <div className="flex flex-col gap-3 md:gap-4" style={{ flex: '0 0 40%' }}>
            <div className="relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
                <img
                  src={project.col1Images[0]}
                  alt={`${project.name} preview 1`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/thum-viator.jpg' }}
                />
              <div className="absolute left-3 bottom-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">{project.name}</div>
            </div>

            <div className="relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-1 min-h-0" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
              <img
                src={project.col1Images[1]}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/thum-viator.jpg' }}
              />
              <div className="absolute left-3 bottom-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">{project.category}</div>
            </div>
          </div>
          {/* Right column — 60% */}
          <div style={{ flex: '0 0 60%' }}>
            <div className="relative h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
              <img
                src={project.col2Image}
                alt={`${project.name} main preview`}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/thum-viator.jpg' }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <div className="text-center">
                  <div className="text-white font-semibold text-lg sm:text-xl">{project.name}</div>
                  {project.href && (
                    <a href={project.href} target="_blank" rel="noreferrer" className="mt-3 inline-block px-4 py-2 bg-white/10 border border-white/30 text-white rounded-md text-sm uppercase tracking-wider">Open</a>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 text-sm px-3 py-1 rounded-full shadow">{project.number}</div>
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
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-10
        px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <h2
        className="hero-heading font-black uppercase text-center leading-none tracking-tight
          mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(2.2rem, 8vw, 110px)' }}
      >
        Project
      </h2>

      <div className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
