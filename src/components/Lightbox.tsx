import { useEffect, useLayoutEffect, useRef } from 'react'
import { Flip, gsap, useMotionEnabled } from '../motion/MotionProvider'
import type { GalleryFrame } from '../data/gallery'

/**
 * Lightbox / Frame-Open (M5) — the signature.
 *
 * A photograph opens from the exact position and size it had on the page and
 * grows to fit the viewport, and closes by travelling back. Dialog semantics
 * come from native <dialog>: focus trap, Escape, and focus returned to the
 * photograph that opened it. Arrow keys and swipe move through the roll.
 */
type Props = {
  items: GalleryFrame[]
  index: number | null
  onIndex: (index: number | null) => void
  /** The <img> that was clicked — where the frame opens from and returns to. */
  source: HTMLImageElement | null
}

export function Lightbox({ items, index, onIndex, source }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const enabled = useMotionEnabled()
  const stateRef = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const pointerStart = useRef<number | null>(null)

  const open = index !== null && index >= 0 && index < items.length
  const item = open ? items[index] : null

  /* Record the source geometry before the dialog exists. */
  useEffect(() => {
    if (open && source && enabled && typeof Flip !== 'undefined') {
      stateRef.current = Flip.getState(source)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  /* Grow the dialog image from the recorded geometry (0.7s, ease-inout). */
  useLayoutEffect(() => {
    if (!open || !enabled || !stateRef.current || !imageRef.current) return
    const context = gsap.context(() => {
      Flip.from(stateRef.current as ReturnType<typeof Flip.getState>, {
        targets: imageRef.current as HTMLImageElement,
        duration: 0.7,
        ease: 'power4.inOut',
        absolute: true,
      })
      gsap.fromTo(
        dialogRef.current,
        { backgroundColor: 'rgba(18,59,42,0)' },
        { backgroundColor: 'rgba(18,59,42,1)', duration: 0.4, ease: 'none' },
      )
      gsap.from('.lightbox__meta > *', {
        autoAlpha: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.35,
        ease: 'power3.out',
      })
    })
    return () => context.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, enabled])

  useEffect(() => {
    return () => {
      stateRef.current = null
    }
  }, [])

  function close() {
    if (!enabled || !stateRef.current || !imageRef.current) {
      onIndex(null)
      return
    }
    const context = gsap.context(() => {
      Flip.to(stateRef.current as ReturnType<typeof Flip.getState>, {
        targets: imageRef.current as HTMLImageElement,
        duration: 0.6,
        ease: 'power4.inOut',
        absolute: true,
        onComplete: () => onIndex(null),
      })
    })
    window.setTimeout(() => context.revert(), 700)
  }

  const step = (delta: number) => {
    if (index === null) return
    const next = (index + delta + items.length) % items.length
    const current = dialogRef.current?.querySelector<HTMLImageElement>('.lightbox__img')
    stateRef.current = current && enabled ? Flip.getState(current) : null
    onIndex(next)
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Photograph"
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          step(1)
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault()
          step(-1)
        }
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX
      }}
      onPointerUp={(event) => {
        const start = pointerStart.current
        pointerStart.current = null
        if (start === null) return
        const delta = event.clientX - start
        if (Math.abs(delta) > 60) step(delta < 0 ? 1 : -1)
      }}
    >
      {item ? (
        <figure className="lightbox__figure">
          <img
            ref={imageRef}
            className="lightbox__img"
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
          />
          <figcaption className="lightbox__meta">
            <span className="label label--paper tabular">
              Frame {String((index ?? 0) + 1).padStart(2, '0')} /{' '}
              {String(items.length).padStart(2, '0')} — LeaCon 1.0
            </span>
            <span className="lightbox__caption">{item.caption ?? ''}</span>
          </figcaption>
        </figure>
      ) : null}

      <div className="lightbox__controls">
        <button type="button" className="lightbox__btn" onClick={() => step(-1)}>
          <span aria-hidden="true">[ &lt; ]</span>
          <span className="sr-only">Previous frame</span>
        </button>
        <button type="button" className="lightbox__btn" onClick={close}>
          <span aria-hidden="true">[ Close ]</span>
          <span className="sr-only">Close photograph</span>
        </button>
        <button type="button" className="lightbox__btn" onClick={() => step(1)}>
          <span aria-hidden="true">[ &gt; ]</span>
          <span className="sr-only">Next frame</span>
        </button>
      </div>
    </dialog>
  )
}
