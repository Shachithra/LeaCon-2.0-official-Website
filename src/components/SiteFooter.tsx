import { Link } from 'react-router-dom'
import { navItems, registerItem, site, siteConfig } from '../config/site'
import { useMotion } from '../motion/MotionProvider'
import { ClockText, CopyEmail } from './Details'

/**
 * SiteFooter — forest, on every page.
 *
 * A full-width cut-off LEACON 2.0 wordmark (the cropped 18% carries no
 * information), then the five page links, confirmed socials and verified
 * contact, then the base row: the live Sri Lanka clock, the click-to-copy
 * address, and the identity line. No newsletter, no shop, no invented links.
 */
export function SiteFooter() {
  const { paused, toggle } = useMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" data-theme="forest">
      <div className="wrap">
        <span className="site-footer__mark display" aria-hidden="true">
          {site.fullName}
        </span>

        <div className="site-footer__grid">
          <nav aria-label="Footer" className="site-footer__col">
            <h2 className="label label--paper">Pages</h2>
            <ul className="site-footer__list" role="list">
              {[...navItems, registerItem].map((item) => (
                <li key={item.to}>
                  <Link className="site-footer__link" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {siteConfig.social.length > 0 ? (
            <div className="site-footer__col">
              <h2 className="label label--paper">Follow</h2>
              <ul className="site-footer__list" role="list">
                {siteConfig.social.map((profile) => (
                  <li key={profile.url}>
                    <a
                      className="site-footer__link"
                      href={profile.url}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {profile.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="site-footer__col">
            <h2 className="label label--paper">Registration</h2>
            <p className="site-footer__note">
              {siteConfig.registrationUrl
                ? 'The official registration link is live.'
                : 'Registration details coming soon.'}
            </p>
          </div>

          <div className="site-footer__col">
            <h2 className="label label--paper">Motion</h2>
            <button type="button" className="motion-toggle" onClick={toggle}>
              <span aria-hidden="true">[ {paused ? 'Play motion' : 'Pause motion'} ]</span>
              <span className="sr-only">
                {paused ? 'Play site motion' : 'Pause site motion'}
              </span>
            </button>
          </div>
        </div>

        <div className="site-footer__base">
          <ClockText />
          <CopyEmail />
          <p className="site-footer__identity">AIESEC in Saegis</p>
          <p className="site-footer__identity">
            &copy; {year} {site.fullName}
          </p>
        </div>
      </div>
    </footer>
  )
}
