import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { PageWipe } from './PageWipe'
import { ScrollTrigger } from '../motion/MotionProvider'

export function Layout() {
  const location = useLocation()
  const lastLocation = useRef<string | null>(null)

  /* SPA route change: reset scroll (or follow the hash), then move focus to
     the new page. The visited location is remembered rather than a
     "first render" flag, so a second effect pass (StrictMode) cannot move
     focus on the initial load. */
  useEffect(() => {
    const current = `${location.pathname}${location.hash}`
    if (lastLocation.current === null || lastLocation.current === current) {
      lastLocation.current = current
      return
    }
    lastLocation.current = current

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
        target.focus({ preventScroll: true })
        return
      }
    }

    /* Instant, not smooth: the html scroll-behavior is smooth for anchor
       links, and a route change must land on the new page immediately. */
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [location.pathname, location.hash])

  /* Scroll triggers are measured against the old page until the new one is
     laid out; refresh after paint so every section sits where it should. */
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <PageWipe />
    </>
  )
}
