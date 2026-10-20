import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { site, siteConfig } from '../config/site'

const path = [
  {
    title: 'Read the experience',
    body: 'The Event page carries the four parts, the recognition and every confirmed logistics detail.',
  },
  {
    title: 'Wait for the official link',
    body: 'Registration is handled through one official link, published here as soon as the organisers confirm it.',
  },
  {
    title: 'Register once, directly',
    body: 'The link opens the organiser’s own registration. This site never collects personal details.',
  },
]

export function RegisterPage() {
  usePageMeta(
    `Register Now — ${site.fullName}`,
    `Register for ${site.fullName} through the official registration link. No form, no personal data and no invented deadline on this site.`,
  )

  const registrationUrl = siteConfig.registrationUrl

  return (
    <>
      <PageHead
        eyebrow="Register Now"
        title="One link. That is the whole process."
        lede={`${site.fullName} registration runs through a single official link. This page carries it — and nothing else asks you for anything.`}
      />

      <section className="section" aria-labelledby="register-heading">
        <div className="container register-sheet">
          <div>
            <p className="eyebrow eyebrow--teal">How registration works</p>

            <ol className="register-path">
              {path.map((step) => (
                <li className="register-path__item" key={step.title}>
                  <div>
                    <h2 id={step.title === 'Read the experience' ? 'register-heading' : undefined}>
                      {step.title}
                    </h2>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="register-facts" role="list">
              <li>
                <span className="schedule__term">Personal data</span>
                <span className="schedule__detail">Nothing is collected on this site</span>
              </li>
              <li>
                <span className="schedule__term">Deadline</span>
                <span className="schedule__detail schedule__detail--pending">
                  To be announced
                </span>
              </li>
              <li>
                <span className="schedule__term">Questions</span>
                <span className="schedule__detail">
                  {siteConfig.contactEmail ? (
                    <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                  ) : (
                    <span className="schedule__detail--pending">
                      Contact details coming soon
                    </span>
                  )}
                </span>
              </li>
            </ul>
          </div>

          <aside className="register-action" aria-labelledby="register-action-heading">
            <p className="register-action__kicker">Official registration</p>

            <h2 className="register-action__title" id="register-action-heading">
              {site.fullName}
            </h2>

            <p>
              {registrationUrl
                ? 'This is the only official route. It opens the organiser’s registration page.'
                : 'The registration link has not been published yet, so this page states that plainly instead of pretending otherwise.'}
            </p>

            <div className="register-action__cta">
              {registrationUrl ? (
                <a
                  className="btn btn--primary"
                  href={registrationUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Open registration
                </a>
              ) : (
                <span
                  className="btn btn--primary btn--inert"
                  role="status"
                  aria-disabled="true"
                >
                  Registration link coming soon
                </span>
              )}

              {registrationUrl ? (
                <span className="register-action__hint">Opens the official page in a new tab.</span>
              ) : (
                <span className="register-action__hint">
                  It will replace this state the moment it is supplied.
                </span>
              )}
            </div>

            <ul className="register-facts" role="list">
              <li>
                <span className="schedule__term">Status</span>
                <span className="schedule__detail">
                  {registrationUrl ? 'Link published' : 'Link pending'}
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
