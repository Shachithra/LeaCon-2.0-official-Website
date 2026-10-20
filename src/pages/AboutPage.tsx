import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { site } from '../config/site'

export function AboutPage() {
  usePageMeta(
    `About Us — ${site.fullName}`,
    'What LeaCon 2.0 is: a youth leadership experience built from four parts — leadership sessions, outbound training, global exchange exploration and delegate recognition.',
  )

  return (
    <>
      <PageHead
        eyebrow="About Us"
        title="A leadership experience, not a lecture."
        lede="LeaCon 2.0 is built for delegates who would rather do the work than hear about it. Four parts carry the event, and each one asks something different of the people in the room."
      />

      <section className="section" aria-labelledby="about-heading">
        <div className="container about-body">
          <p className="about-body__label" aria-hidden="true">
            The edition
          </p>

          <div className="about-prose">
            <h2 id="about-heading">Think together. Move forward.</h2>

            <p>
              {site.fullName} is a leadership experience. The event runs on participation:
              delegates respond, challenge and shape the room instead of watching it from the
              back.
            </p>

            <p>
              Four parts carry the event: leadership sessions, outbound training, global
              exchange, and recognition for the delegates who take part most. They are run as
              one experience rather than four separate items on a programme.
            </p>

            <h2>The four parts</h2>

            <ul className="schedule" role="list">
              {chapters.map((chapter) => (
                <li className="schedule__row" key={chapter.id}>
                  <span className="schedule__term verbatim">
                    <span aria-hidden="true">{chapter.index}</span> {chapter.meta}
                  </span>
                  <span className="schedule__detail">{chapter.title}</span>
                </li>
              ))}
            </ul>

            <h2>Recognition that follows the taking part</h2>

            <p>
              {site.fullName} pays attention to how delegates take part. The Most Engaging
              Delegate award recognises that contribution directly. Categories and judging
              criteria are published on the Event page once they are confirmed.
            </p>

            <h2>From 1.0 to 2.0</h2>

            <p>
              LeaCon 1.0 was the first edition. LeaCon 2.0 takes the same delegates further,
              with more of the event built around what happens in the room. A first chapter. A
              bigger next step.
            </p>

            <Reveal variant="rule" className="about-rule" />

            <div className="about-note">
              <p>
                Dates, the venue and logistics are confirmed by the organisers and published on
                the Event page. Nothing on this site is estimated.
              </p>
              <Link className="btn btn--secondary" to="/event">
                See the event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
