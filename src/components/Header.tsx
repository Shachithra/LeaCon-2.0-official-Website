import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems, registerItem, site } from '../config/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const progressRef = useRef<HTMLSpanElement | null>(null)

  /* Reading progress: one custom property, written inside a rAF tick. */
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const root = document.documentElement
      const scrollable = root.scrollHeight - root.clientHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, root.scrollTop / scrollable)) : 0
      progressRef.current?.style.setProperty('--progress', String(progress))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* Native <dialog> supplies the focus trap, Esc handling and focus return. */
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [open])

  return (
    <header className="masthead">
      <div className="masthead__inner container">
        <Link to="/" className="wordmark" aria-label={`${site.fullName} home`}>
          <span className="wordmark__name">{site.wordmark}</span>{' '}
          <span className="wordmark__ed">{site.edition}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <ul className="nav__list" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className="nav__link"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="masthead__actions">
          <Link to={registerItem.to} className="btn btn--primary btn--sm">
            {registerItem.label}
          </Link>
          <button
            ref={triggerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="burger__box" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <span ref={progressRef} className="masthead__progress" aria-hidden="true" />

      <dialog
        id="site-menu"
        ref={dialogRef}
        className={`menu${open ? ' is-open' : ''}`}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="menu__inner">
          <div className="menu__top">
            <span className="wordmark wordmark--invert" aria-hidden="true">
              <span className="wordmark__name">{site.wordmark}</span>
              <span className="wordmark__ed">{site.edition}</span>
            </span>
            <button
              type="button"
              className="menu__close"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul className="menu__list" role="list">
              {[...navItems, registerItem].map((item, index) => (
                <li
                  className="menu__item"
                  key={item.to}
                  style={{ '--i': index } as CSSProperties}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className="menu__link"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu__foot">
            <Link
              to={registerItem.to}
              className="btn btn--onIndigo btn--block"
              onClick={() => setOpen(false)}
            >
              Register for {site.fullName}
            </Link>
          </div>
        </div>
      </dialog>
    </header>
  )
}
