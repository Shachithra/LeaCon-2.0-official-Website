import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems, registerItem, site } from '../config/site'
import { MenuOverlay } from './MenuOverlay'

/**
 * SiteHeader — one masthead on every page.
 *
 * Transparent over the opening of a page, then it takes the theme of the
 * section underneath it (M6: paper over paper, forest over forest) and
 * compacts from 80px to 64px once the visitor scrolls. Nav links wear
 * brackets that slide in from 8px outside on hover and focus (M3).
 * Below 1024px the inline nav is replaced by the [ MENU ] button.
 */
export function SiteHeader() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  /* M6 — the header reads the section sitting under it. */
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const root = document.documentElement
      const probe = 40 /* just under the masthead bar */
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'))
      let theme: 'paper' | 'forest' = 'paper'
      for (const section of sections) {
        const box = section.getBoundingClientRect()
        if (box.top <= probe && box.bottom > probe) {
          theme = section.dataset.theme === 'forest' ? 'forest' : 'paper'
          break
        }
      }
      root.dataset.chrome = theme
      root.dataset.scrolled = window.scrollY > 16 ? 'true' : 'false'
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [location.pathname])

  /* Route change closes the overlay before anything else happens. */
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash])

  const triggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <header className="masthead">
      <div className="masthead__inner">
        <Link to="/" className="wordmark" aria-label={`${site.fullName} — home`}>
          <span className="wordmark__name">{site.wordmark}</span>
          <span className="wordmark__ed">{site.edition}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <ul className="nav__list" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                >
                  <span className="nav__bracket nav__bracket--l" aria-hidden="true">
                    [
                  </span>
                  <span className="nav__label">{item.label}</span>
                  <span className="nav__bracket nav__bracket--r" aria-hidden="true">
                    ]
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="masthead__actions">
          <Link to={registerItem.to} className="btn btn--sm masthead__register">
            {registerItem.label}
          </Link>
          <button
            type="button"
            ref={triggerRef}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="menu-toggle__text">
              [ {menuOpen ? 'Close' : 'Menu'} ]
            </span>
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <MenuOverlay
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false)
          triggerRef.current?.focus()
        }}
        triggerRef={triggerRef}
      />
    </header>
  )
}
