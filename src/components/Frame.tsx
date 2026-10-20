import { useState, type CSSProperties, type ReactNode } from 'react'

export type FrameTone = 'indigo' | 'teal' | 'green' | 'outlined'

type Props = {
  /** Leave null until the file exists in public/. Nothing is requested otherwise. */
  src?: string | null
  alt?: string
  plate?: string
  tone?: FrameTone
  /** CSS aspect-ratio, reserves space so nothing shifts when a photo loads. */
  ratio?: string
  caption?: string
  priority?: boolean
  className?: string
  style?: CSSProperties
  /** True when the frame carries no information for assistive technology. */
  decorative?: boolean
  children?: ReactNode
  onLoad?: () => void
}

/**
 * An image frame that is complete without its photograph.
 *
 * The plate is a designed graphic, so a missing file reads as intentional
 * artwork rather than a broken slot. Supplying `src` layers the photograph on
 * top at the same aspect ratio; a failed load falls back to the plate without
 * leaving a broken-image icon or a console error.
 */
export function Frame({
  src,
  alt = '',
  plate,
  tone = 'outlined',
  ratio = '4 / 3',
  caption,
  priority = false,
  className = '',
  style,
  decorative = true,
  children,
  onLoad,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const toneClass = tone === 'outlined' ? 'frame--outlined' : `frame--${tone}`
  const showImage = Boolean(src) && !failed

  return (
    <div
      className={`frame ${toneClass}${className ? ` ${className}` : ''}`.trim()}
      style={{ aspectRatio: ratio, ...style }}
      aria-hidden={decorative ? true : undefined}
    >
      {plate ? <span className="frame__plate">{plate}</span> : null}

      {showImage ? (
        <img
          className={`frame__img${loaded ? ' is-loaded' : ''}`}
          src={src as string}
          alt={decorative ? '' : alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => {
            setLoaded(true)
            onLoad?.()
          }}
          onError={() => setFailed(true)}
        />
      ) : null}

      {caption ? <span className="frame__caption">{caption}</span> : null}
      {children}
    </div>
  )
}
