import { useRef, useState } from 'react'
import { gsap, useMotionEffect } from '../motion/MotionProvider'
import type { GalleryFrame } from '../data/gallery'
import { Frame } from './Frame'
import { Lightbox } from './Lightbox'

/**
 * ContactSheet (M11) — the LeaCon 1.0 archive on the Event page.
 *
 * A 12-column sheet: one lead frame across eight columns, the rest in mixed
 * widths. Each frame is laid down with a clip-path reveal as it enters, once
 * only, staggered in reading order, with its green label tab appearing after.
 * Nothing is a uniform grid of equal thumbnails.
 */
type Props = { items: GalleryFrame[] }

/** Deliberately irregular column spans for the supporting frames. */
const SPANS = [4, 4, 4, 6, 6, 3, 3, 4, 5, 4, 3, 4]

export function ContactSheet({ items }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const sourceRef = useRef<HTMLImageElement | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useMotionEffect(
    () => {
      const root = rootRef.current
      if (!root) return
      const cells = Array.from(root.querySelectorAll<HTMLElement>('.sheet__cell'))
      cells.forEach((cell, index) => {
        const delay = 0.06 * (index % 4)
        const trigger = { trigger: cell, start: 'top 85%', once: true } as const
        gsap.from(cell, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut', delay, scrollTrigger: trigger })
        const tab = cell.querySelector('.frame__tab')
        if (tab) gsap.from(tab, { autoAlpha: 0, duration: 0.3, delay: delay + 0.2, scrollTrigger: trigger })
      })
    },
    [items.length],
    rootRef,
  )

  if (items.length === 0) return null

  return (
    <div className="sheet" ref={rootRef}>
      {items.map((frame, index) => (
        <div
          className={`sheet__cell${index === 0 ? ' sheet__cell--lead' : ''}`}
          key={frame.id}
          style={{ gridColumn: index === 0 ? undefined : `span ${SPANS[index % SPANS.length]} / span 12` }}
        >
          <Frame
            frame={frame}
            index={index}
            total={items.length}
            eager={index < 3}
            onOpen={(openAt, source) => {
              sourceRef.current = source
              setOpenIndex(openAt)
            }}
          />
        </div>
      ))}

      <Lightbox items={items} index={openIndex} onIndex={setOpenIndex} source={sourceRef.current} />
    </div>
  )
}
