import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { MaskedHeading } from '../components/MaskedHeading'
import { navItems, registerItem, site } from '../config/site'

export function NotFoundPage() {
  usePageMeta(`Page not found — ${site.fullName}`, 'This page does not exist.')

  return (
    <section className="section notfound" data-theme="paper" aria-labelledby="notfound-title">
      <div className="wrap">
        <p className="label">404 — not in the roll</p>
        <MaskedHeading
          as="h1"
          id="notfound-title"
          className="display display--page notfound__title"
          when="now"
          lines={['This page', 'is not part of', 'the edition.']}
        />
        <p className="notfound__body">
          The address may have changed, or the link may come from an earlier version of the site.
        </p>

        <nav className="notfound__actions" aria-label="Recover">
          <Link className="btn" to="/">
            Back to home
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link className="link link--static" to={registerItem.to}>
            {registerItem.label}
          </Link>
          <Link className="link link--static" to={navItems[1].to}>
            {navItems[1].label}
          </Link>
        </nav>
      </div>
    </section>
  )
}
