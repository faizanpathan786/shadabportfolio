import { useEffect, useRef, useState } from 'react'

// Row 1 — client website screenshots (dark, professional)
const ROW1_BASE = [
  '/images/ferrao-1.jpg',
  '/images/thum-nate-marquee.jpg',
  '/images/ferrao-3.jpg',
  '/images/thum-nate-waterfall.jpg',
  '/images/ferrao-5.jpg',
  '/images/thum-nate-wc.jpg',
  '/images/ferrao-website-preview.png',
  '/images/ferrao-4.jpg',
  '/images/platform-bokun.jpg',
  '/images/platform-musement.jpg',
]

// Row 2 — real tour photos (varied, vibrant)
const ROW2_BASE = [
  '/images/nate-alpine.png',
  '/images/ferrao-2.jpg',
  '/images/nate-waterfall.jpg',
  '/images/ferrao-6.jpg',
  '/images/nate-van.png',
  '/images/ferrao-7.jpg',
  '/images/nate-tour.jpg',
  '/images/platform-headout.jpg',
  '/images/thum-nate.jpg',
  '/images/ferrao-4.jpg',
]

const ROW1 = [...ROW1_BASE, ...ROW1_BASE, ...ROW1_BASE]
const ROW2 = [...ROW2_BASE, ...ROW2_BASE, ...ROW2_BASE]

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      {/* Row 1 — moves right on scroll */}
      <div
        className="flex gap-3 mb-3"
        style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {ROW1.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover object-top flex-shrink-0"
            style={{ width: 420, height: 270 }}
          />
        ))}
      </div>

      {/* Row 2 — moves left on scroll */}
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {ROW2.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover object-top flex-shrink-0"
            style={{ width: 420, height: 270 }}
          />
        ))}
      </div>
    </section>
  )
}
