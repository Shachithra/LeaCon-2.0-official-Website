import { useRef } from 'react'
import type { GalleryFrame } from '../data/gallery'

/**
 * Frame — the recurring object of the site: a photograph with a true frame
 * number, a green label tab and a caption.
 *
 * Hover and keyboard focus both scale the image inside its mask (M10); the
 * caption under the frame is always visible, so nothing is hover-only.
 */
type Props = {
  frame: GalleryFrame
  index: number
  total: number
  onOpen: (index: number, source: HTMLImageElement) => void
  className?: string
  /** Shows the frame straight away (used for the lead frame of a sheet). */
  eager?: boolean
}

export function Frame({ frame, index, total, onOpen, className, eager = false }: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null)

  const number = String(index + 1).padStart(2, '0')
  const of = String(total).padStart(2, '0')

  return (
    <figure
      className={`frame${className ? ` ${className}` : ''}`}
      style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
    >
      <button
        type="button"
        className="frame__hit"
        onClick={() => {
          if (imageRef.current) onOpen(index, imageRef.current)
        }}
        aria-label={`Open frame ${number} of ${of} — ${frame.alt}`}
      >
        <span className="frame__media">
          <img
            ref={imageRef}
            className="frame__img"
            src={frame.src}
            alt={frame.alt}
            width={frame.width}
            height={frame.height}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            style={frame.objectPosition ? { objectPosition: frame.objectPosition } : undefined}
          />
          <span className="frame__tab" aria-hidden="true">
            Frame
          </span>
        </span>
      </button>

      <figcaption className="frame__caption">
        <span className="frame__caption-line">
          Frame {number} / {of} — LeaCon 1.0
        </span>
        {frame.caption ? <span className="frame__caption-note">{frame.caption}</span> : null}
      </figcaption>
    </figure>
  )
}
