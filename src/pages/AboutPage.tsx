import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { Frame } from '../components/Frame'
import { Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { assets, site } from '../config/site'

/**
 * Three editorial themes for the purpose spread. These are page structure,
 * not published event pillars — replace the wording if the organisers publish
 * their own.
 */
const themes = [
  {
    index: '01',
    title: 'Discover',
    body: 'Find out how you actually work when the plan changes: what you notice, what you decide, and what you do when the room splits.',
  },
  {
    index: '02',
    title: 'Connect',
    body: 'Spend the event with delegates working through the same problems, from teams you would not otherwise meet.',
  },
  {
    index: '03',
    title: 'Lead',
    body: 'Take something specific back to your own team. The practice does not stop when the event does.',
  },
]

export function AboutPage() {
  usePageMeta(
    `About Us — ${site.fullName}`,
    'What LeaCon 2.0 is: a youth leadership experience built from four parts — leadership sessions, outbound training, global exchange exploration and delegate recognition.',
  )

  return (
    <>
      <PageHead
        eyebrow="About Us"
        title="More than an event. A leadership experience."
        lede="LeaCon 2.0 is built for delegates who would rather do the work than hear about it. Four parts carry the event, and each one asks something different of the people in the room."
      />

      {/* ---------------- Opening photograph ---------------- */}
      <section className="about-cover">
        <div className="container">
          <Reveal variant="crop">
            <Frame
              src={assets.feature.src}
              alt={assets.feature.alt}
              plate={site.edition}
              tone="forest"
              ratio="16 / 7"
              priority
              decorative={!assets.feature.src}
            />
          </Reveal>
          <p className="about-cover__label">{site.editionLabel}</p>
        </div>
      </section>

      {/* ---------------- The story ---------------- */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container about-body">
          <p className="about-body__label" aria-hidden="true">
            The edition
          </p>

          <div className="about-prose">
            <h2 id="about-heading">What LeaCon is</h2>

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

            <h2>Recognition that follows taking part</h2>

            <p>
              {site.fullName} pays attention to how delegates take part. The Most Engaging
              Delegate award recognises that contribution directly. Categories and judging
              criteria are published on the Event page once they are confirmed.
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

      {/* ---------------- The purpose: three themes ---------------- */}
      <section className="section sheet--sunk" aria-labelledby="purpose-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--green">The purpose</p>
              <h2 className="section-head__title" id="purpose-heading">
                Why the room exists
              </h2>
            </div>
            <p className="section-head__lede">
              Three reasons people show up. Each one asks something different of the people who
              do.
            </p>
          </div>

          <ul className="themes" role="list">
            {themes.map((theme, index) => (
              <li
                className={`theme${index === 0 ? ' theme--feature' : ' theme--minor'}`}
                key={theme.title}
              >
                <span className="theme__index" aria-hidden="true">
                  {theme.index}
                </span>
                <h3 className="theme__title">{theme.title}</h3>
                <p className="theme__body">{theme.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Split: statement against photography ---------------- */}
      <section className="section meaning" data-field="forest" aria-labelledby="meaning-heading">
        <div className="container meaning__grid">
          <div className="meaning__text">
            <p className="eyebrow">What makes it meaningful</p>
            <h2 className="meaning__title" id="meaning-heading">
              The room does the work.
            </h2>
            <p className="meaning__body">
              Learning happens between people: in the sessions, on the outbound task, and in how
              a team recovers when the plan changes halfway through it. Delegates are the ones
              doing that — the programme only puts them in the same room.
            </p>
          </div>

          <Reveal variant="crop" className="meaning__media">
            <Frame
              src={assets.moment.src}
              alt={assets.moment.alt}
              plate={site.edition}
              tone="green"
              ratio="4 / 5"
              decorative={!assets.moment.src}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- The journey ---------------- */}
      <section className="section journey" aria-labelledby="journey-heading">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--green">The journey</p>
              <h2 className="section-head__title" id="journey-heading">
                From 1.0 to 2.0
              </h2>
            </div>
            <p className="section-head__lede">
              LeaCon 1.0 was the first edition. LeaCon 2.0 takes the same delegates further,
              with more of the event built around what happens in the room.
            </p>
          </div>

          <ol className="journey__line" role="list">
            <li className="journey__stop">
              <Frame plate="1.0" tone="outlined" ratio="4 / 3" caption="LeaCon 1.0" />
            </li>
            <li className="journey__arrow" aria-hidden="true">
              <span />
            </li>
            <li className="journey__stop journey__stop--now">
              <Frame plate={site.edition} tone="forest" ratio="4 / 3" caption="LeaCon 2.0" />
            </li>
          </ol>
        </div>
      </section>

      {/* ---------------- Closing statement ---------------- */}
      <section className="section section--xl about-close" data-field="forest">
        <div className="container">
          <h2 className="about-close__title">
            Two editions.
            <br />
            One direction.
          </h2>

          <div className="about-close__action">
            <p>
              Dates, venue and the programme live on the Event page, and the registration route
              sits on the Register page. Both are published as they are confirmed.
            </p>
            <div className="btn-row">
              <Link className="btn btn--onForest" to="/event">
                See the event
              </Link>
              <Link className="btn btn--ghostForest" to="/register">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
