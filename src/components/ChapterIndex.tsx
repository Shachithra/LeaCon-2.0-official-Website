import { useEffect, useRef, useState } from 'react'

/**
 * ChapterIndex (M7) — the sticky programme index on the Event page.
 *
 * A list of the experience names on the left; the one you are reading turns
 * solid and a 4px green marker slides to it. Clicking an item jumps to that
 * block with native scrolling — content is never pinned. On mobile it becomes
 * a horizontal chip row under the header.
 */
type Props = {
  items: { id: string; nav: string }[]
  label?: string
}

export function ChapterIndex({ items, label = 'Programme' }: Props) {
  const listRef = useRef<HTMLOListElement | null>(null)
  const [active, setActive] = useState(0)
  const [marker, setMarker] = useState({ top: 0, height: 0 })

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = sections.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActive(index)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    const list = listRef.current
    const node = list?.querySelectorAll<HTMLAnchorElement>('a')[active]
    if (!node) return
    setMarker({ top: node.offsetTop, height: node.offsetHeight })
  }, [active, items])

  return (
    <nav className="chapter-index" aria-label={label}>
      <p className="label chapter-index__label">{label}</p>
      <div className="chapter-index__rail">
        <ol className="chapter-index__list" ref={listRef} role="list">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`chapter-index__item${index === active ? ' is-active' : ''}`}
                aria-current={index === active ? 'true' : undefined}
              >
                <span className="chapter-index__no tabular">{String(index + 1).padStart(2, '0')}</span>
                <span className="chapter-index__name">{item.nav}</span>
              </a>
            </li>
          ))}
        </ol>
        <span
          className="chapter-index__marker"
          aria-hidden="true"
          style={{ transform: `translateY(${marker.top}px)`, height: `${marker.height}px` }}
        />
      </div>
    </nav>
  )
}
