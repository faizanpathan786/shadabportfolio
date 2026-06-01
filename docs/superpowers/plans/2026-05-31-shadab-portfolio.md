# Shadab 3D Creator Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-page dark-theme 3D Creator portfolio for "Shadab" using React 18, TypeScript, Tailwind CSS v3, Framer Motion v12, and Lucide React — with five sections: Hero, Marquee, About, Services, and Projects.

**Architecture:** Single-page React app scaffolded with Vite. Each section is a standalone component. Five reusable primitives (FadeIn, Magnet, AnimatedText, ContactButton, LiveProjectButton) are shared across sections. No routing, no backend, no state management library needed.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, Framer Motion v12, Lucide React, Google Fonts (Kanit)

> **Note on testing:** This is a purely visual project. "Test" steps are visual verification in the browser (run `npm run dev`, open browser, check appearance). No unit tests are written.

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Google Fonts link (Kanit 300–900), page title |
| `src/main.tsx` | React root mount |
| `src/App.tsx` | Compose all 5 sections inside main wrapper |
| `src/index.css` | Global reset, body/html/root bg, `.hero-heading` class |
| `tailwind.config.js` | Extend with Kanit font family |
| `src/components/ui/FadeIn.tsx` | Framer Motion scroll-triggered fade wrapper |
| `src/components/ui/Magnet.tsx` | Mouse-following magnetic hover effect |
| `src/components/ui/AnimatedText.tsx` | Character-by-character scroll-driven opacity animation |
| `src/components/ui/ContactButton.tsx` | Gradient pill CTA button |
| `src/components/ui/LiveProjectButton.tsx` | Ghost outline pill button |
| `src/components/HeroSection.tsx` | Full-viewport hero: nav, heading, portrait, bottom bar |
| `src/components/MarqueeSection.tsx` | Scroll-driven two-row image marquee |
| `src/components/AboutSection.tsx` | Centered about with animated text + corner 3D decoratives |
| `src/components/ServicesSection.tsx` | White-bg vertical service list with stagger |
| `src/components/ProjectsSection.tsx` | Sticky-stacking 3 project cards |

---

## Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: Initialize project with Vite**

```bash
cd "C:/Users/Lenovo/Desktop/shadab porfolio"
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty. Remove existing files and continue?" — select **Yes**.
Accept all other defaults.

- [ ] **Step 2: Install all dependencies**

```bash
npm install framer-motion@^12.0.0 lucide-react@^0.344.0
npm install -D tailwindcss@^3.4.1 postcss autoprefixer
```

- [ ] **Step 3: Initialize Tailwind**

```bash
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts at `http://localhost:5173`. Open browser — Vite default React page visible. Stop server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold vite react-ts project with framer-motion and tailwind"
```

---

## Task 2: Configure Tailwind, global styles, and Google Fonts

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Update tailwind.config.js**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Replace src/index.css with global styles**

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#root {
  background-color: #0C0C0C;
  font-family: 'Kanit', sans-serif;
}

.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 3: Update index.html — add title and font preconnect**

Replace the contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <title>Shadab -- 3D Creator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Update src/main.tsx**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Create placeholder App.tsx**

```tsx
export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C]">
      <p className="text-white font-kanit p-8">Shadab Portfolio — building…</p>
    </div>
  )
}
```

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Expected: Dark `#0C0C0C` background. "Shadab Portfolio — building…" text in Kanit font. Browser tab title reads "Shadab -- 3D Creator".

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: configure tailwind, global styles, kanit font, page title"
```

---

## Task 3: Build reusable UI components

**Files:**
- Create: `src/components/ui/FadeIn.tsx`
- Create: `src/components/ui/Magnet.tsx`
- Create: `src/components/ui/AnimatedText.tsx`
- Create: `src/components/ui/ContactButton.tsx`
- Create: `src/components/ui/LiveProjectButton.tsx`

- [ ] **Step 1: Create src/components/ui/FadeIn.tsx**

```tsx
import { motion, Variants } from 'framer-motion'
import { ElementType, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: ElementType
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
}: FadeInProps) {
  const MotionComponent = motion.create(as as ElementType)

  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <MotionComponent
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
    >
      {children}
    </MotionComponent>
  )
}
```

- [ ] **Step 2: Create src/components/ui/Magnet.tsx**

```tsx
import { useRef, ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    el.style.transition = activeTransition
    el.style.transform = `translate3d(${distX / strength}px, ${distY / strength}px, 0)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transition = inactiveTransition
    el.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create src/components/ui/AnimatedText.tsx**

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')

  return (
    <p ref={ref} className={className} aria-label={text}>
      {characters.map((char, i) => {
        const start = i / characters.length
        const end = (i + 1) / characters.length
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        return (
          <span key={i} style={{ position: 'relative', display: 'inline' }}>
            <span style={{ opacity: 0 }}>{char === ' ' ? ' ' : char}</span>
            <motion.span
              style={{ opacity, position: 'absolute', left: 0, top: 0 }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}
```

- [ ] **Step 4: Create src/components/ui/ContactButton.tsx**

```tsx
export default function ContactButton() {
  return (
    <button
      className="rounded-full font-kanit font-medium uppercase tracking-widest text-white
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        cursor-pointer"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  )
}
```

- [ ] **Step 5: Create src/components/ui/LiveProjectButton.tsx**

```tsx
export default function LiveProjectButton() {
  return (
    <button
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
        font-kanit font-medium uppercase tracking-widest
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        hover:bg-[#D7E2EA]/10 transition-colors duration-200
        cursor-pointer"
    >
      Live Project
    </button>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: add reusable ui components (FadeIn, Magnet, AnimatedText, ContactButton, LiveProjectButton)"
```

---

## Task 4: Build HeroSection

**Files:**
- Create: `src/components/HeroSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/HeroSection.tsx**

```tsx
import FadeIn from './ui/FadeIn'
import Magnet from './ui/Magnet'
import ContactButton from './ui/ContactButton'

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact']

export default function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav">
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
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
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} className="overflow-hidden">
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none
            whitespace-nowrap w-full
            text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]
            mt-6 sm:mt-4 md:-mt-5"
        >
          Hi, i&apos;m shadab
        </h1>
      </FadeIn>

      {/* Bottom bar */}
      <div className="flex-1 relative">
        {/* Portrait — centered absolutely */}
        <FadeIn
          delay={0.6}
          y={30}
          className="absolute left-1/2 -translate-x-1/2 z-10
            w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]
            top-1/2 -translate-y-1/2
            sm:top-auto sm:translate-y-0 sm:bottom-0"
        >
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Shadab portrait"
              className="w-full h-auto"
              draggable={false}
            />
          </Magnet>
        </FadeIn>

        {/* Bottom bar content */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              a 3d creator driven by crafting striking and unforgettable projects
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
```

- [ ] **Step 2: Add HeroSection to App.tsx**

```tsx
import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] font-kanit">
      <HeroSection />
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected:
- Full-viewport dark section
- Nav with 4 links evenly spaced, #D7E2EA color, uppercase
- Giant gradient heading "HI, I'M SHADAB" filling most of viewport width
- Portrait image centered (magnetic on hover)
- Left: small description text
- Right: purple gradient "Contact Me" pill button

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx src/App.tsx
git commit -m "feat: add hero section with navbar, heading, portrait, and bottom bar"
```

---

## Task 5: Build MarqueeSection

**Files:**
- Create: `src/components/MarqueeSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/MarqueeSection.tsx**

```tsx
import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const ROW1 = [...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11)]
const ROW2 = [...IMAGES.slice(11), ...IMAGES.slice(11), ...IMAGES.slice(11)]

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
      {/* Row 1 — moves right */}
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {ROW1.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: 420, height: 270 }}
          />
        ))}
      </div>

      {/* Row 2 — moves left */}
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {ROW2.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: 420, height: 270 }}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add MarqueeSection to App.tsx**

```tsx
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll down past the hero. Expected: Two rows of 420×270 GIF tiles. Row 1 slides right, Row 2 slides left as you scroll. Rows are separated by 12px gap.

- [ ] **Step 4: Commit**

```bash
git add src/components/MarqueeSection.tsx src/App.tsx
git commit -m "feat: add scroll-driven marquee section with two rows of gif images"
```

---

## Task 6: Build AboutSection

**Files:**
- Create: `src/components/AboutSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/AboutSection.tsx**

```tsx
import FadeIn from './ui/FadeIn'
import AnimatedText from './ui/AnimatedText'
import ContactButton from './ui/ContactButton'

const ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center
        px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Top-left: Moon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
```

> Note: `AnimatedText` must accept an optional `style` prop. Update `src/components/ui/AnimatedText.tsx` to add `style?: React.CSSProperties` to `AnimatedTextProps` and spread `style` onto the `<p>` element.

- [ ] **Step 2: Update AnimatedText to accept style prop**

In `src/components/ui/AnimatedText.tsx`, update the interface and component:

```tsx
import { useRef, CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {characters.map((char, i) => {
        const start = i / characters.length
        const end = (i + 1) / characters.length
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        return (
          <span key={i} style={{ position: 'relative', display: 'inline' }}>
            <span style={{ opacity: 0 }}>{char === ' ' ? ' ' : char}</span>
            <motion.span
              style={{ opacity, position: 'absolute', left: 0, top: 0 }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}
```

- [ ] **Step 3: Add AboutSection to App.tsx**

```tsx
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
    </div>
  )
}
```

- [ ] **Step 4: Verify in browser**

Scroll to About. Expected:
- "ABOUT ME" in large gradient text
- Body text reveals character-by-character as you scroll
- 4 corner 3D decoratives slide in from edges
- Contact Me button at bottom

- [ ] **Step 5: Commit**

```bash
git add src/components/AboutSection.tsx src/components/ui/AnimatedText.tsx src/App.tsx
git commit -m "feat: add about section with animated text and 3d corner decoratives"
```

---

## Task 7: Build ServicesSection

**Files:**
- Create: `src/components/ServicesSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/ServicesSection.tsx**

```tsx
import FadeIn from './ui/FadeIn'

const SERVICES = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
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
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
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
```

- [ ] **Step 2: Add ServicesSection to App.tsx**

```tsx
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Services. Expected:
- White section with rounded top corners
- "SERVICES" heading in large black text
- 5 rows with large number + service name + description
- Rows separated by thin borders, staggered fade-in

- [ ] **Step 4: Commit**

```bash
git add src/components/ServicesSection.tsx src/App.tsx
git commit -m "feat: add services section with staggered service list on white background"
```

---

## Task 8: Build ProjectsSection

**Files:**
- Create: `src/components/ProjectsSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/ProjectsSection.tsx**

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LiveProjectButton from './ui/LiveProjectButton'

interface Project {
  number: string
  name: string
  category: string
  col1Images: [string, string]
  col2Image: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    ],
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    ],
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    ],
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
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
          <LiveProjectButton />
        </div>

        {/* Image grid */}
        <div className="flex gap-3 md:gap-4 flex-1 min-h-0">
          {/* Left column — 40% */}
          <div className="flex flex-col gap-3 md:gap-4" style={{ flex: '0 0 40%' }}>
            <img
              src={project.col1Images[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1Images[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex-1 min-h-0"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          {/* Right column — 60% */}
          <div style={{ flex: '0 0 60%' }}>
            <img
              src={project.col2Image}
              alt={`${project.name} main preview`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
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
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
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
```

- [ ] **Step 2: Add ProjectsSection to App.tsx**

```tsx
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Projects. Expected:
- "PROJECT" in large gradient text
- 3 cards stack with border, dark bg, each sticky as you scroll
- Cards scale down slightly as you scroll past them
- Each card: number + category + project name + Live Project button on top row
- Two-column image grid below: left 40% (2 stacked images), right 60% (tall image)

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsSection.tsx src/App.tsx
git commit -m "feat: add projects section with sticky stacking cards and image grids"
```

---

## Task 9: Final cleanup and production build

**Files:**
- Modify: `src/App.tsx` (add section ids for nav links)
- Delete: `src/App.css` (Vite default — unused)
- Delete: `public/vite.svg` (optional — keep if no custom favicon)

- [ ] **Step 1: Delete unused Vite boilerplate**

```bash
rm src/App.css
```

Remove `import './App.css'` from `src/App.tsx` if present.

- [ ] **Step 2: Verify all nav anchor links work**

The nav has links to `#about`, `#price`, `#projects`, `#contact`. Verify:
- `id="about"` is on `<section>` in `AboutSection.tsx` ✓
- `id="price"` is on `<section>` in `ServicesSection.tsx` ✓  
- `id="projects"` is on `<section>` in `ProjectsSection.tsx` ✓
- `#contact` — ContactButton has no id yet; this is fine (clicking scrolls to bottom)

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build completes with no TypeScript errors. Output in `dist/`.

- [ ] **Step 4: Preview production build**

```bash
npm run preview
```

Open browser. Scroll through all 5 sections. Verify:
- Hero: nav, heading, portrait, bottom bar
- Marquee: scroll-driven rows of GIFs
- About: gradient heading, animated text, 3D corner decoratives
- Services: white section, numbered service list
- Projects: sticky cards with image grids

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete shadab 3d creator portfolio — all 5 sections"
```
