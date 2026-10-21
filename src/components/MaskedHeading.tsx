import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useMotionEffect } from '../motion/MotionProvider'

/**
 * MaskedHeading — the reveal used for every display line (M2 / M17).
 *
 * Each line sits in an overflow-hidden mask. The final state is in the HTML:
 * GSAP animates FROM translateY(105%), so with motion paused, reduced, or JS
 * dead, the heading is simply there.
 */
type Props = {
  lines: ReactNode[]
  as?: ElementType
  className?: string
  id?: string
  /** "now" plays on mount (hero), "view" plays once when it scrolls in,
      "hold" waits until the page releases it (the entry sequence). */
  when?: 'now' | 'view' | 'hold'
  delay?: number
  duration?: number
  stagger?: number
}

export function MaskedHeading({
  lines,
  as: Tag = 'h2',
  className,
  id,
  when = 'view',
  delay = 0,
  duration = 0.8,
  stagger = 0.08,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null)

  useMotionEffect(
    () => {
      const root = rootRef.current
      if (!root) return
      const inners = Array.from(root.querySelectorAll<HTMLElement>('.mask__inner'))
      if (!inners.length || when === 'hold') return

      gsap.from(inners, {
        yPercent: 105,
        duration,
        ease: 'expo.out',
        delay,
        stagger,
        ...(when === 'view'
          ? {
              scrollTrigger: { trigger: root, start: 'top 85%', once: true },
            }
          : {}),
      })
    },
    [when, delay, duration, stagger],
    rootRef,
  )

  return (
    <Tag ref={rootRef} className={className} id={id}>
      {lines.map((line, index) => (
        <span className="mask" key={index}>
          <span className="mask__inner">{line}</span>
        </span>
      ))}
    </Tag>
  )
}
