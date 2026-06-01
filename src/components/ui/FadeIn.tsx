import { motion, Variants } from 'framer-motion'
import { ElementType, ReactNode, useMemo } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: ElementType
  className?: string
  style?: React.CSSProperties
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}: FadeInProps) {
  // Memoised so the same component type is reused across re-renders.
  // Calling motion.create() on every render creates a new type each time,
  // which forces React to unmount + remount the whole subtree.
  const MotionComponent = useMemo(() => motion.create(as as ElementType), [as])

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
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
    >
      {children}
    </MotionComponent>
  )
}
