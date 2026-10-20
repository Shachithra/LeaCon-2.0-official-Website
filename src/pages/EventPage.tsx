import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Chapter, type ChapterVariant } from '../components/Chapter'
import { Glimpse } from '../components/Glimpse'
import { chapters } from '../data/chapters'
import { partners } from '../data/partners'
import { site, siteConfig } from '../config/site'

const variants: ChapterVariant[] = ['a', 'b', 'c', 'd']

/** Logistics are only shown when the organiser supplies them. */
const logistics: { term: string; value: string | null; pending: string }[] = [
  { term: 'Date', value: null, pending: 'To be announced' },
  { term: 'Venue', value: null, pending: 'To be announced' },
  { term: 'Schedule', value: null, pending: 'Schedule to be announced' },
  { term: 'Registration', value: siteConfig.registrationUrl, pending: 'Registration link coming soon' },
]

export function EventPage() {
  usePageMeta(
    `Event — ${site.fullName}`,
    `${site.fullName}: leadership sessions, outbound training, global exchange exploration, delegate engagement and the Most Engaging Delegate recognition.`,
  )

  return (
    <>
      <PageHead
        eyebrow="Event"
        title="What happens, and what it asks of you."
        lede="One experience in four parts. This page carries only what the organisers have confirmed; everything else states its own status."
      />

      {/* ---------------- Overview + logistics ---------------- */}
      <section className="section sheet--sunk" aria-labelledby="logistics-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">Overview</p>
              <h2 className="section-head__title" id="logistics-heading">
                The parts, and the practical details
              </h2>
            </div>
            <p className="section-head__lede">
              Delegates take part in four linked parts: sessions, outbound training, global
              exchange exploration, and the engagement that recognition is built on.
            </p>
          </div>

          <ul className="schedule" role="list">
            {logistics.map((row) => (
              <li className="schedule__row" key={row.term}>
                <span className="schedule__term">{row.term}</span>
                {row.value ? (
                  <span className="schedule__detail">
                    <a href={row.value} rel="noreferrer noopener" target="_blank">
                      Open the official registration
                    </a>
                  </span>
                ) : (
                  <span className="schedule__detail schedule__detail--pending">
                    {row.pending}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="event-note">
            No date, venue, time, agenda, price, deadline, speaker or eligibility detail is
            published on this site until it is confirmed by the organisers.
          </p>
        </div>
      </section>

      {/* ---------------- The four parts ---------------- */}
      <section className="section chapters" aria-labelledby="parts-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">The experience</p>
              <h2 className="section-head__title" id="parts-heading">
                Leadership Sessions to Delegate Engagement
              </h2>
            </div>
            <p className="section-head__lede">
              Run as one experience. Each part asks something different of the people in the
              room.
            </p>
          </div>
        </div>

        <div>
          {chapters.map((chapter, index) => (
            <Chapter key={chapter.id} data={chapter} variant={variants[index]} />
          ))}
        </div>
      </section>

      {/* ---------------- Recognition ---------------- */}
      <section className="section" aria-labelledby="recognition-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">Recognition</p>
              <h2 className="section-head__title" id="recognition-heading">
                Most Engaging Delegate
              </h2>
            </div>
            <p className="section-head__lede">
              {site.fullName} pays attention to how delegates take part, and the award
              recognises that contribution directly.
            </p>
          </div>

          <ul className="schedule" role="list">
            <li className="schedule__row">
              <span className="schedule__term">Award</span>
              <span className="schedule__detail">Most Engaging Delegate</span>
            </li>
            <li className="schedule__row">
              <span className="schedule__term">Open to</span>
              <span className="schedule__detail">All {site.fullName} delegates</span>
            </li>
            <li className="schedule__row">
              <span className="schedule__term">Categories</span>
              <span className="schedule__detail schedule__detail--pending">
                To be announced
              </span>
            </li>
          </ul>

          <p className="event-note">
            Categories and judging criteria are published here once they are confirmed.
          </p>
        </div>
      </section>

      {/* ---------------- LeaCon 1.0 glimpse ---------------- */}
      <section className="section sheet--raised" aria-labelledby="glimpse-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">LeaCon 1.0</p>
              <h2 className="section-head__title" id="glimpse-heading">
                A first chapter. A bigger next step.
              </h2>
            </div>
            <p className="section-head__lede">
              LeaCon 1.0 was the first edition. LeaCon 2.0 takes the same delegates further,
              with more of the event built around what happens in the room.
            </p>
          </div>

          <Glimpse />
        </div>
      </section>

      {/* ---------------- Supporters ---------------- */}
      <section className="section" aria-labelledby="supporters-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">Supporters</p>
              <h2 className="section-head__title" id="supporters-heading">
                Partners and supporters
              </h2>
            </div>

            {partners.length === 0 ? (
              <p className="section-head__lede">
                Partner announcements coming soon. Only confirmed partners and approved logos
                are published here.
              </p>
            ) : (
              <p className="section-head__lede">
                Confirmed partners of {site.fullName}.
              </p>
            )}
          </div>

          {partners.length > 0 ? (
            <ul className="partners__list" role="list">
              {partners.map((partner) => (
                <li key={partner.id}>
                  {partner.logo.src ? (
                    <img
                      className="partners__logo"
                      src={partner.logo.src}
                      alt={partner.name}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="partners__name">{partner.name}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section section--compact final-cta" data-field="indigo">
        <div className="container final-cta__grid">
          <div>
            <p className="eyebrow">Registration</p>
            <h2 className="final-cta__title">Take part in {site.fullName}</h2>
          </div>
          <div className="final-cta__action">
            <p>
              Registration runs through one official link, carried on the Register page as soon
              as it is live.
            </p>
            <Link className="btn btn--onIndigo" to="/register">
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
