import { useRef } from 'react'
import { gsap, useMotionEffect } from '../motion/MotionProvider'

/**
 * AccentBlock (M17) — a solid green rectangle that slides in beside a word in
 * a large statement. It carries no text and never covers a letter: it is
 * visual weight, like a highlighter mark. Maximum two per statement.
 */
type Props = {
  side?: 'left' | 'right'
  /** Match the delay of the line it belongs to (M17: +0.2s). */
  delay?: number
  className?: string
}

export function AccentBlock({ side = 'right', delay = 0.2, className }: Props) {
  const blockRef = useRef<HTMLSpanElement | null>(null)

  useMotionEffect(
    () => {
      const block = blockRef.current
      if (!block) return
      gsap.from(block, {
        x: side === 'left' ? -24 : 24,
        duration: 0.6,
        ease: 'expo.out',
        delay,
        scrollTrigger: { trigger: block, start: 'top 88%', once: true },
      })
    },
    [side, delay],
    blockRef,
  )

  return (
    <span
      ref={blockRef}
      aria-hidden="true"
      className={`accent-block${className ? ` ${className}` : ''}`}
      data-side={side}
    />
  )
}
