import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Faq, type FaqItem } from '../components/Faq'
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

  /* Answers are limited to things that are true today. A question the
     organisers have not answered yet is not published at all. */
  const faqs: FaqItem[] = [
    {
      question: 'How do I register?',
      answer: registrationUrl
        ? 'Open the official registration button above. It goes straight to the organiser’s own registration page — nothing on this site takes your details.'
        : 'Registration runs through one official link. It replaces the coming-soon state on this page the moment the organisers publish it.',
    },
    {
      question: 'When and where is the event?',
      answer:
        'Date and venue are confirmed by the organisers and published on the Event page. Nothing on this site is estimated, so no date appears until it is fixed.',
    },
    {
      question: 'Does this site collect my details?',
      answer:
        'No. There is no form, no account and no payment step here — this site only points you to the official registration route.',
    },
    {
      question: 'Who can I contact with a question?',
      answer: siteConfig.contactEmail
        ? `Write to ${siteConfig.contactEmail} and the organisers will answer.`
        : 'Organiser contact details are published on this page as soon as they are confirmed.',
    },
  ]

  return (
    <>
      <PageHead
        tone="forest"
        eyebrow="Register Now"
        title="One link. That is the whole process."
        lede={`${site.fullName} registration runs through a single official link. This page carries it — and nothing else asks you for anything.`}
      />

      <section className="section" aria-labelledby="register-heading">
        <div className="container register-sheet">
          <div>
            <p className="eyebrow eyebrow--green">How registration works</p>

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

      {/* ---------------- Questions ---------------- */}
      <section className="section sheet--sunk" aria-labelledby="faq-heading">
        <div className="container faq-sheet">
          <div className="faq-sheet__intro">
            <p className="eyebrow eyebrow--green">Questions</p>
            <h2 className="faq-sheet__title" id="faq-heading">
              Before you register.
            </h2>
            <p className="faq-sheet__body">
              Only answers that are already true are published here. Anything the organisers
              have not confirmed is left out rather than filled in.
            </p>
          </div>

          <div>
            <Faq items={faqs} />

            <div className="faq-sheet__support">
              <p className="meta">Still unsure about something?</p>
              {siteConfig.contactEmail ? (
                <a className="btn btn--secondary btn--sm" href={`mailto:${siteConfig.contactEmail}`}>
                  Contact the organisers
                </a>
              ) : (
                <p className="meta">
                  Organiser contact details are published on this page once they are confirmed.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
