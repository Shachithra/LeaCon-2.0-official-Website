import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { MaskedHeading } from '../components/MaskedHeading'
import { HandNote } from '../components/HandNote'
import { ClockText, CopyEmail } from '../components/Details'
import { FaqAccordion, RegisterCta, type InfoRow } from '../components/Content'
import { site, siteConfig } from '../config/site'
import { buildFaq } from '../data/faq'
import { notes } from '../data/notes'
import { strings } from '../data/strings'

/**
 * Register Now — one clear action, quieter than every other page.
 *
 * Forest first: the statement, three lines of explanation, the details the
 * organisers have confirmed (and nothing else), one button. Then paper: the
 * questions with verified answers, and the contact route with the Sri Lanka
 * clock. No local form, no data collected, no fake success state.
 */

/** Confirmed rows only — an unconfirmed row is left out entirely. */
const details: InfoRow[] = [
  { term: 'Who can register', value: null, omit: true },
  { term: 'Date', value: null, omit: true },
  { term: 'Venue', value: null, omit: true },
  { term: 'Deadline', value: null, omit: true },
  { term: 'Fee', value: null, omit: true },
]

export function RegisterPage() {
  usePageMeta(
    `Register Now — ${site.fullName}`,
    `Register for ${site.fullName} through the official registration link. No form, no personal data and no invented deadline on this site.`,
  )

  const confirmedRows = details.filter((row) => row.value !== null)
  const faqs = buildFaq()

  return (
    <>
      {/* ---------------- Forest: the one action ---------------- */}
      <section className="register-open" data-theme="forest" aria-labelledby="register-title">
        <div className="wrap grid register-open__grid">
          <div className="register-open__main">
            <p className="label">Register Now</p>
            <MaskedHeading
              as="h1"
              id="register-title"
              className="display display--page register-open__title"
              when="now"
              lines={['Register for', `${site.fullName}.`]}
            />
            <p className="register-open__lede">
              One official link carries the whole process. This site never asks you for details,
              and it never shows a deadline, a fee or a date that has not been confirmed.
            </p>
            <RegisterCta />
          </div>

          <aside className="register-open__rail" aria-labelledby="register-details-title">
            <h2 className="label" id="register-details-title">
              The details
            </h2>

            {confirmedRows.length > 0 ? (
              <dl className="register-open__list">
                {confirmedRows.map((row) => (
                  <div key={row.term}>
                    <dt className="label label--paper">{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="pending">{strings.detailsPending}</p>
            )}

            <HandNote note={notes.registerCta} mark="underline" />
          </aside>
        </div>
      </section>

      {/* ---------------- Paper: questions and contact ---------------- */}
      <section className="section register-questions" data-theme="paper" aria-labelledby="faq-title">
        <div className="wrap grid register-questions__grid">
          <div className="register-questions__intro">
            <p className="label">Questions</p>
            <MaskedHeading
              as="h2"
              id="faq-title"
              className="display display--section"
              lines={['Before you register.']}
            />
            <p className="register-questions__note">
              Only answers that are already true are published here. Anything the organisers have
              not confirmed is left out rather than filled in.
            </p>
          </div>

          <div className="register-questions__body">
            <FaqAccordion items={faqs} idPrefix="register-faq" />

            <div className="register-contact">
              <h3 className="label">Contact</h3>
              {siteConfig.contactEmail ? (
                <>
                  <CopyEmail />
                  <p className="register-contact__hint">Click the address to copy it.</p>
                </>
              ) : (
                <p className="pending">{strings.contactPending}</p>
              )}
              <ClockText />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Closing route ---------------- */}
      <section className="section section--tight register-close" data-theme="paper">
        <div className="wrap register-close__inner">
          <p>Everything the event publishes sits on one page.</p>
          <Link className="link link--static" to="/event">
            See the event
          </Link>
        </div>
      </section>
    </>
  )
}
