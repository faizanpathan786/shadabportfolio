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
        const end = Math.min((i + 1) / characters.length, 1)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        return (
          <span key={i} style={{ position: 'relative', display: 'inline' }}>
            <span style={{ opacity: 0 }}>{char}</span>
            <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
              {char}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}
