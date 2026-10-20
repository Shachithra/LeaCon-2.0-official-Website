import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Frame } from './Frame'
import { Reveal } from './Reveal'
import { glimpseItems } from '../data/glimpse'

/**
 * LeaCon 1.0 photo strip.
 *
 * The strip renders graphic plates until real photographs are added to
 * public/images/leacon-1/. The expand control only exists for frames whose
 * photograph actually loaded, so there is never a control that does nothing.
 * Native horizontal scrolling handles touch, trackpad, Shift+wheel and the
 * arrow keys of the focusable scroll region.
 */
export function Glimpse() {
  const [loaded, setLoaded] = useState<string[]>([])
  const [active, setActive] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const withImages = useMemo(
    () => glimpseItems.filter((item) => item.src !== null && loaded.includes(item.id)),
    [loaded],
  )

  const markLoaded = useCallback((id: string) => {
    setLoaded((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active !== null && !dialog.open) dialog.showModal()
    else if (active === null && dialog.open) dialog.close()
  }, [active])

  const step = (delta: number) => {
    setActive((current) => {
      if (current === null || withImages.length === 0) return current
      return (current + delta + withImages.length) % withImages.length
    })
  }

  const current = active !== null ? (withImages[active] ?? null) : null

  return (
    <>
      <Reveal variant="fade" className="glimpse__reveal">
        <div
          className="glimpse__scroller"
          role="region"
          aria-label="Photographs from LeaCon 1.0"
          tabIndex={0}
        >
          <ul className="glimpse__track" role="list">
            {glimpseItems.map((item) => {
              const ready = item.src !== null && loaded.includes(item.id)
              const position = withImages.findIndex((entry) => entry.id === item.id)
              const total = withImages.length

              return (
                <li className="glimpse__item" key={item.id}>
                  <Frame
                    src={item.src}
                    alt={item.alt}
                    plate={item.plate}
                    tone="outlined"
                    ratio={item.ratio}
                    caption="LeaCon 1.0"
                    decorative={!ready}
                    onLoad={() => markLoaded(item.id)}
                  >
                    {ready ? (
                      <button
                        type="button"
                        className="glimpse__open"
                        onClick={() => setActive(position)}
                        aria-label={`Open photograph ${position + 1} of ${total} from LeaCon 1.0`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                        </svg>
                      </button>
                    ) : null}
                  </Frame>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photograph viewer"
        onClose={() => setActive(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1)
          if (event.key === 'ArrowLeft') step(-1)
        }}
      >
        <div className="lightbox__bar">
          <button
            type="button"
            className="lightbox__close"
            autoFocus
            onClick={() => setActive(null)}
            aria-label="Close photograph viewer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="lightbox__stage">
          {current ? (
            <img src={current.src as string} alt={current.alt} />
          ) : (
            <span className="lightbox__empty" />
          )}
        </div>

        <div className="lightbox__foot">
          <button
            type="button"
            className="lightbox__step"
            onClick={() => step(-1)}
            aria-label="Previous photograph"
            disabled={active === null}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <p className="lightbox__count meta" aria-live="polite">
            {active !== null && withImages.length > 0
              ? `${active + 1} of ${withImages.length}`
              : ''}
          </p>

          <button
            type="button"
            className="lightbox__step"
            onClick={() => step(1)}
            aria-label="Next photograph"
            disabled={active === null}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  )
}
