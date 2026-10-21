import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { MaskedHeading } from '../components/MaskedHeading'
import { AccentBlock } from '../components/AccentBlock'
import { HandNote } from '../components/HandNote'
import { gsap, useMotionEffect } from '../motion/MotionProvider'
import { assets, site } from '../config/site'
import { programme } from '../data/programme'
import { notes } from '../data/notes'

/**
 * About Us — a long-form feature, asymmetric on desktop and a single column
 * on mobile. Photography appears only where a photograph exists; the three
 * purpose words (M17 accent blocks) and the journey line carry the page.
 */

const purpose = [
  {
    word: 'Learning',
    tone: 'solid',
    line: 'Find out how you actually work when the plan changes: what you notice, what you decide, and what you do when the room splits.',
  },
  {
    word: 'Connection',
    tone: 'outlined',
    line: 'Spend the event with delegates working through the same problems, from teams you would not otherwise meet.',
  },
  {
    word: 'Leadership',
    tone: 'forest',
    line: 'Take something specific back to your own team. The practice does not stop when the event does.',
  },
]

export function AboutPage() {
  usePageMeta(
    `About Us — ${site.fullName}`,
    `What ${site.fullName} is: a youth leadership experience built from four parts — leadership sessions, outbound training, global exchange exploration and delegate recognition.`,
  )

  const journeyRef = useRef<HTMLDivElement | null>(null)

  /* The journey line draws itself left to right, once. */
  useMotionEffect(
    () => {
      const root = journeyRef.current
      const path = root?.querySelector<SVGPathElement>('.journey2__path')
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      })
    },
    [],
    journeyRef,
  )

  const feature = assets.feature.src
  const moment = assets.moment.src

  return (
    <>
      {/* ---------------- 1. Opening ---------------- */}
      <section className="section about-open" data-theme="paper" aria-labelledby="about-title">
        <div className="wrap grid about-open__grid">
          <div className="about-open__head">
            <p className="label">About</p>
            <MaskedHeading
              as="h1"
              id="about-title"
              className="display display--page about-open__title"
              when="now"
              lines={['Why we come', 'together.']}
            />
          </div>

          {feature ? (
            <figure className="about-open__photo">
              <img
                src={feature}
                alt={assets.feature.alt}
                width={1200}
                height={1600}
                loading="eager"
                decoding="async"
              />
            </figure>
          ) : null}

          <div className="about-open__intro">
            <p className="lede">
              LeaCon 2.0 is a leadership experience, not a programme to sit through. It exists
              because the way people lead is shaped by the room they are in — who they meet, what
              they are asked to do, and what happens when the plan changes.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 2. The story ---------------- */}
      <section className="section about-story" data-theme="paper" aria-labelledby="story-title">
        <div className="wrap grid about-story__grid">
          <article className="about-story__article prose">
            <p className="label">The story</p>
            <h2 id="story-title" className="display display--section">
              What LeaCon is
            </h2>

            <p>
              {site.fullName} runs on participation. Delegates respond, challenge and shape the
              room instead of watching it from the back. The programme only puts them in the same
              room; the work in front of them is theirs.
            </p>

            <p>
              Four parts carry the event: {programme[0].title.toLowerCase()},{' '}
              {programme[1].title.toLowerCase()}, {programme[2].title.toLowerCase()}, and{' '}
              {programme[3].title.toLowerCase()}. They are run as one experience rather than four
              separate items on a programme.
            </p>

            <h3 className="about-story__sub">Who it is for</h3>
            <p>
              It is built for delegates who would rather do the work than hear about it — people
              who will take something specific back to the team they already work with.
            </p>

            <h3 className="about-story__sub">Recognition that follows taking part</h3>
            <p>
              {site.fullName} pays attention to how delegates take part. The Most Engaging
              Delegate recognition is built on that contribution. Categories and judging
              criteria are published once they are confirmed.
            </p>

            <p className="about-story__honest">
              Dates, the venue and the schedule are confirmed by the organisers and published on
              the Event page. Nothing on this site is estimated.
            </p>

            <Link className="link link--static" to="/event">
              See the event
            </Link>
          </article>

          <aside className="about-story__margin">
            {moment ? (
              <figure className="about-story__small">
                <img
                  src={moment}
                  alt={assets.moment.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ) : null}
            <p className="about-story__margin-note">
              Every part of this page is written from what the organisers have confirmed. The
              parts that are still open say so.
            </p>
          </aside>
        </div>
      </section>

      {/* ---------------- 3. The purpose ---------------- */}
      <section className="section purpose" data-theme="paper" aria-labelledby="purpose-title">
        <div className="wrap">
          <p className="label">The purpose</p>
          <h2 className="sr-only" id="purpose-title">
            The purpose
          </h2>

          <ul className="purpose__list" role="list">
            {purpose.map((theme) => (
              <li className={`purpose__row purpose__row--${theme.tone}`} key={theme.word}>
                <MaskedHeading
                  as="p"
                  className={`display display--page purpose__word${
                    theme.tone === 'outlined' ? ' outlined' : ''
                  }`}
                  lines={[
                    <>
                      {theme.word} <AccentBlock side="right" />
                    </>,
                  ]}
                />
                <p className="purpose__line">{theme.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- 4. The human element ---------------- */}
      <section className="section human" data-theme="paper" aria-labelledby="human-title">
        <div className="wrap grid human__grid">
          <div className="human__text">
            <p className="label">The human element</p>
            <MaskedHeading
              as="h2"
              id="human-title"
              className="display display--section"
              lines={['It is the people, not the schedule.']}
            />
            <p className="prose">
              Sessions, outbound tasks and late decisions are only half of it. The other half is
              the conversations between them: who you end up working with, what you disagree about,
              and what you carry back afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 5. The journey ---------------- */}
      <section className="section journey2" data-theme="forest" ref={journeyRef}>
        <div className="wrap">
          <p className="label">The journey</p>
          <MaskedHeading
            as="h2"
            className="display display--section journey2__title"
            lines={['Two editions.']}
          />

          <div className="journey2__rail">
            <svg
              className="journey2__line"
              viewBox="0 0 1000 4"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path className="journey2__path" d="M0 2 H1000" />
            </svg>

            <ol className="journey2__nodes" role="list">
              <li className="journey2__node">
                <span className="display journey2__num">1.0</span>
                <p>LeaCon 1.0 was the first edition. The photographs from it live in the archive.</p>
                <HandNote note={notes.journey} mark="arrow" point="right" />
              </li>
              <li className="journey2__node">
                <span className="display journey2__num">2.0</span>
                <p>
                  LeaCon 2.0 takes the same delegates further, with more of the event built around
                  what happens in the room.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- 6. Closing ---------------- */}
      <section className="section about-close" data-theme="paper">
        <div className="wrap">
          <MaskedHeading
            as="h2"
            className="display display--page about-close__title"
            lines={['Two editions.', 'One direction.']}
          />
          <div className="about-close__actions">
            <p>
              The programme and the practical details live on the Event page; the registration
              route sits on the Register page. Both are published as they are confirmed.
            </p>
            <div className="about-close__links">
              <Link className="btn" to="/event">
                See the event
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link className="link link--static" to="/register">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
