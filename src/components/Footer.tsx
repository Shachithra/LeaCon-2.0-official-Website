import { Link } from 'react-router-dom'
import { navItems, registerItem, site, siteConfig } from '../config/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" data-field="indigo">
      <div className="container">
        <Link to="/" className="footer__mark">
          {site.wordmark} <span>{site.edition}</span>
        </Link>
        <p className="footer__tagline">{site.tagline}</p>

        <div className="footer__grid">
          <div>
            <h2 className="footer__heading">Explore</h2>
            <ul className="footer__list" role="list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link className="footer__link" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Registration</h2>
            <ul className="footer__list" role="list">
              <li>
                <Link className="footer__link" to={registerItem.to}>
                  {registerItem.label}
                </Link>
              </li>
            </ul>
            <p className="footer__note">
              {siteConfig.registrationUrl
                ? 'The official registration link is live.'
                : 'Registration link coming soon.'}
            </p>
          </div>

          {siteConfig.contactEmail ? (
            <div>
              <h2 className="footer__heading">Contact</h2>
              <ul className="footer__list" role="list">
                <li>
                  <a className="footer__link" href={`mailto:${siteConfig.contactEmail}`}>
                    Email the organisers
                  </a>
                </li>
              </ul>
            </div>
          ) : null}

          {siteConfig.social.length > 0 ? (
            <div>
              <h2 className="footer__heading">Follow</h2>
              <ul className="footer__list" role="list">
                {siteConfig.social.map((profile) => (
                  <li key={profile.url}>
                    <a
                      className="footer__link"
                      href={profile.url}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="footer__base">
          <p>&copy; {year} {site.fullName}</p>
          <p>Details are published as they are confirmed.</p>
        </div>
      </div>
    </footer>
  )
}
