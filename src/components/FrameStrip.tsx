import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useMotion } from '../motion/MotionProvider'
import type { GalleryFrame } from '../data/gallery'
import { Frame } from './Frame'
import { Lightbox } from './Lightbox'

/**
 * FrameStrip (M4) — the LeaCon 1.0 roll.
 *
 * It never moves on its own: native horizontal scrolling, trackpad, mouse
 * drag, the previous / next buttons, arrow keys when focused, and swipe.
 * The frame nearest the centre sits at full size; the others sit back at
 * scale .94 and opacity .6. The counter counts the centred frame and comes
 * from the data file, so "03 / 12" is always true.
 */
type Props = {
  items: GalleryFrame[]
  /** Label rendered to the left of the counter. */
  title?: ReactNode
}

export function FrameStrip({ items, title }: Props) {
  const { enabled } = useMotion()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const drag = useRef<{ id: number; x: number; left: number; moved: boolean } | null>(null)
  const [active, setActive] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sourceRef = useRef<HTMLImageElement | null>(null)

  const total = items.length

  /* Which frame is closest to the middle of the strip. */
  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track || total === 0) return
    const centre = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDistance = Number.POSITIVE_INFINITY
    Array.from(track.children).forEach((child, index) => {
      const element = child as HTMLElement
      const middle = element.offsetLeft + element.offsetWidth / 2
      const distance = Math.abs(middle - centre)
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    })
    setActive((current) => (current === best ? current : best))
  }, [total])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0
          measure()
        })
    }
    measure()
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [measure])

  const stepBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const frames = Array.from(track.children) as HTMLElement[]
    const next = Math.min(Math.max(active + direction, 0), frames.length - 1)
    const target = frames[next]
    if (!target) return
    track.scrollTo({
      left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
      behavior: enabled ? 'smooth' : 'auto',
    })
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || event.pointerType === 'touch') return
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      left: track.scrollLeft,
      moved: false,
    }
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    const state = drag.current
    if (!track || !state || state.id !== event.pointerId) return
    const delta = event.clientX - state.x
    if (Math.abs(delta) > 3) state.moved = true
    track.scrollLeft = state.left - delta
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (track && drag.current?.id === event.pointerId && track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
    drag.current = null
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      stepBy(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      stepBy(-1)
    }
  }

  if (total === 0) return null

  return (
    <div className="strip">
      <div className="strip__head">
        {title}
        <p className="strip__counter display tabular" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>

      <div
        className="strip__track"
        ref={trackRef}
        role="region"
        aria-label="LeaCon 1.0 photographs"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((frame, index) => (
          <div
            className={`strip__cell${index === active ? ' is-active' : ''}`}
            key={frame.id}
            data-motion-focus={enabled ? 'on' : 'off'}
          >
            <Frame
              frame={frame}
              index={index}
              total={total}
              onOpen={(openAt, source) => {
                sourceRef.current = source
                setOpenIndex(openAt)
              }}
            />
          </div>
        ))}
      </div>

      <div className="strip__controls">
        <button type="button" className="strip__btn" onClick={() => stepBy(-1)}>
          <span aria-hidden="true">[ &lt; ]</span>
          <span className="sr-only">Previous frame</span>
        </button>
        <button type="button" className="strip__btn" onClick={() => stepBy(1)}>
          <span aria-hidden="true">[ &gt; ]</span>
          <span className="sr-only">Next frame</span>
        </button>
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onIndex={setOpenIndex}
        source={sourceRef.current}
      />
    </div>
  )
}
