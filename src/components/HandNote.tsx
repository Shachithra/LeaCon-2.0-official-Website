import { useRef } from 'react'
import { gsap, useMotionEffect } from '../motion/MotionProvider'
import type { HandNoteCopy } from '../data/notes'

/**
 * HandNote (M8) — a person wrote this.
 *
 * Real AndYou text beside a hand-drawn mark that draws itself once on entry.
 * The mark never carries information; the arrow must physically point at
 * what the note refers to, so the page chooses the direction.
 */
type Props = {
  note: HandNoteCopy
  mark?: 'underline' | 'arrow'
  /** Direction the arrow points, from the note towards its target. */
  point?: 'left' | 'right'
  className?: string
}

const UNDERLINE = ['M4 12 C 48 4, 150 3, 196 9']
const ARROW = ['M6 10 C 62 8, 132 20, 178 46', 'M178 46 l -24 -4', 'M178 46 l -5 -21']

export function HandNote({
  note,
  mark = 'underline',
  point = 'right',
  className,
}: Props) {
  const rootRef = useRef<HTMLSpanElement | null>(null)

  useMotionEffect(
    () => {
      const root = rootRef.current
      if (!root) return
      const paths = Array.from(root.querySelectorAll<SVGPathElement>('path'))
      const text = root.querySelector<HTMLElement>('.hand__text')
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 90%', once: true },
      })

      paths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        timeline.to(path, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 0)
      })

      if (text) timeline.from(text, { autoAlpha: 0, duration: 0.3 }, 0.45)
    },
    [mark],
    rootRef,
  )

  const paths = mark === 'arrow' ? ARROW : UNDERLINE

  return (
    <span
      ref={rootRef}
      className={`hand${className ? ` ${className}` : ''}`}
      data-point={point}
    >
      <span className="hand__text">{note.text}</span>
      <svg
        className="hand__mark"
        viewBox={mark === 'arrow' ? '0 0 200 60' : '0 0 200 20'}
        aria-hidden="true"
        focusable="false"
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  )
}
