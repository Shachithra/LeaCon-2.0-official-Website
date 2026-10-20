import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()
  const lastLocation = useRef<string | null>(null)

  /* SPA route change: reset scroll, then move focus to the new page.
     The visited location is remembered rather than a "first render" flag, so
     a second effect pass (StrictMode) cannot move focus on the initial load. */
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
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo(0, 0)
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [location.pathname, location.hash])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
