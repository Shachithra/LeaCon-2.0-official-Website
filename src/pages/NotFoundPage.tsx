import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { site, navItems, registerItem } from '../config/site'

export function NotFoundPage() {
  usePageMeta(`Page not found — ${site.fullName}`, 'This page does not exist.')

  return (
    <section className="section" aria-labelledby="notfound-heading">
      <div className="container notfound">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <p className="eyebrow eyebrow--teal">Page not found</p>
        <h1 className="notfound__title" id="notfound-heading">
          This page isn’t part of the edition.
        </h1>
        <p className="notfound__body">
          The address may have changed, or the link may be from an earlier version of the site.
        </p>

        <nav className="notfound__actions" aria-label="Recover">
          <Link className="btn btn--primary" to="/">
            Back to home
          </Link>
          <Link className="btn btn--secondary" to={registerItem.to}>
            {registerItem.label}
          </Link>
          <Link className="btn btn--secondary" to={navItems[1].to}>
            {navItems[1].label}
          </Link>
        </nav>
      </div>
    </section>
  )
}
