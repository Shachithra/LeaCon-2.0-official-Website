import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export type RevealVariant = 'fade' | 'lines' | 'rule' | 'crop' | 'chapter' | 'step'

type Props = {
  variant?: RevealVariant
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Called once, the first time the element enters the viewport. */
  onShown?: () => void
}

/**
 * Plays one of the six motion behaviours exactly once, then stops observing.
 * The hidden state only exists when JS is running (html.js), so content is
 * never withheld from a visitor whose browser or preference opts out.
 */
export function Reveal({ variant = 'fade', className = '', style, children, onShown }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
            onShown?.()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onShown])

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant}${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
