import { useRef } from 'react'
import { gsap, useMotionEffect } from '../motion/MotionProvider'

/**
 * FrameWireframe — one shared SVG for the entry sequence (M14) and the menu
 * overlay (M19). A 35mm-style photographic frame: outer edge, image area, a
 * row of square film perforations and a label tab. Stroke only, never filled.
 * Square perforations on purpose: round ones read as camera dials, and the
 * concept is a frame, never a camera.
 *
 * Stroke colour follows the contrast rule rather than M14's literal green on
 * forest: green text and thin green lines on forest sit at about 1.7:1, so on
 * forest the outline is drawn in paper and on paper it is drawn in green.
 */

type Props = {
  /** Draw the outline stroke-by-stroke when it enters. Static when false. */
  animate?: boolean
  /** Which surface the wireframe sits on. */
  on?: 'paper' | 'forest'
  duration?: number
  className?: string
}

const OUTER = 'M12 12 H388 V288 H12 Z'
const INNER = 'M44 44 H356 V240 H44 Z'
/* The perforation row of a 35mm strip, below the image area */
const PERFORATIONS = [
  'M56 254 h18 v18 h-18 Z',
  'M96 254 h18 v18 h-18 Z',
  'M136 254 h18 v18 h-18 Z',
  'M176 254 h18 v18 h-18 Z',
]
const TAB = 'M280 250 H356 V278 H280 Z'

export function FrameWireframe({
  animate = false,
  on = 'forest',
  duration = 1.4,
  className,
}: Props) {
  const rootRef = useRef<SVGSVGElement | null>(null)

  useMotionEffect(
    () => {
      const root = rootRef.current
      if (!root || !animate) return
      const shapes = Array.from(root.querySelectorAll<SVGPathElement>('path'))
      shapes.forEach((shape, index) => {
        const length = shape.getTotalLength()
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(shape, {
          strokeDashoffset: 0,
          duration,
          ease: 'power2.inOut',
          delay: index * 0.1,
        })
      })
    },
    [animate, duration],
    rootRef,
  )

  return (
    <svg
      ref={rootRef}
      className={`frame-wire${className ? ` ${className}` : ''}`}
      viewBox="0 0 400 300"
      role="presentation"
      aria-hidden="true"
      data-tone={on}
      focusable="false"
    >
      <path d={OUTER} />
      <path d={INNER} />
      {PERFORATIONS.map((d) => (
        <path key={d} d={d} />
      ))}
      <path d={TAB} />
    </svg>
  )
}
