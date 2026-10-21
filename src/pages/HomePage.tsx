import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { EntrySequence } from '../components/EntrySequence'
import { MaskedHeading } from '../components/MaskedHeading'
import { AccentBlock } from '../components/AccentBlock'
import { FrameStrip } from '../components/FrameStrip'
import { HandNote } from '../components/HandNote'
import { ClockText } from '../components/Details'
import { PartnerList } from '../components/Content'
import { gsap, useMotionEffect } from '../motion/MotionProvider'
import { hasEntered, onEnter } from '../motion/entry'
import { assets, site } from '../config/site'
import { leaconOneGallery } from '../data/gallery'
import { partners } from '../data/partners'
import { notes } from '../data/notes'
import { strings } from '../data/strings'

/**
 * Home — the opening scene.
 *
 * Seven sections in the blueprint's order: entry sequence, hero, the idea,
 * what happens at LeaCon (the varied editorial spread), the LeaCon 1.0
 * memory, the people, partners, and the closing statement. Sections that need
 * a photograph hide themselves until the photograph exists — no plates, no
 * filler, no stock.
 */

const heroLines = ['Leadership,', 'in real', 'life.']

const items = [
  {
    id: 'leadership-sessions',
    index: '01',
    kind: 'Sessions',
    title: 'Leadership sessions',
    body: 'Delegates work through the decisions leadership asks for — with a team they are still getting to know.',
  },
  {
    id: 'outbound-training',
    index: '02',
    kind: 'Outbound',
    title: 'Outbound training',
    body: 'The group leaves the hall for tasks that change while you are solving them.',
  },
  {
    id: 'ogx',
    index: '03',
    kind: 'Exchange',
    title: 'oGX',
    body: 'What global exchange is, what it asks of you, and whether it is a path you want.',
  },
  {
    id: 'delegate-engagement',
    index: '04',
    kind: 'Delegates',
    title: 'Delegate engagement',
    body: 'Delegates shape the room instead of watching it from the back.',
  },
]

export function HomePage() {
  usePageMeta(
    `${site.fullName} — ${site.tagline}`,
    `${site.fullName}: leadership sessions, outbound training, global exchange exploration and delegate recognition for the delegates who take part.`,
  )

  const heroSrc = assets.hero.src
  const hasArchive = leaconOneGallery.length > 0

  /* The hero plays when the entry sequence hands over (M2). */
  const [entered, setEntered] = useState(hasEntered())
  useEffect(() => onEnter(() => setEntered(true)), [])

  const heroRef = useRef<HTMLDivElement | null>(null)
  const closingRef = useRef<HTMLDivElement | null>(null)

  /* M2 — supporting copy, edition label and clock arrive with the headline. */
  useMotionEffect(
    () => {
      if (!entered) return
      const root = heroRef.current
      if (!root) return
      const timeline = gsap.timeline({ delay: 0.7 })
      timeline.from(root.querySelectorAll('.hero__support > *'), {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      })
      timeline.from(
        root.querySelectorAll('.hero__edition, .hero__meta > *'),
        { autoAlpha: 0, duration: 0.4, ease: 'none' },
        0.3,
      )
      const note = root.querySelector('.hero__note')
      if (note) timeline.from(note, { autoAlpha: 0, duration: 0.3 }, 0.3)
    },
    [entered],
    heroRef,
  )

  /* M6 — the closing forest block's top edge rises into view, scrubbed. */
  useMotionEffect(
    () => {
      const closing = closingRef.current
      if (!closing) return
      gsap.fromTo(
        closing,
        { clipPath: 'inset(14% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: { trigger: closing, start: 'top bottom', end: 'top 60%', scrub: true },
        },
      )
    },
    [],
    closingRef,
  )

  return (
    <>
      {/* ---------------- 1. Hero ---------------- */}
      <section className="hero" data-theme="paper" ref={heroRef}>
        <EntrySequence />

        <div className="wrap">
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="label hero__edition">{site.editionTag}</p>

              <MaskedHeading
                as="h1"
                id="home-title"
                className="display display--hero hero__title"
                when={entered ? 'now' : 'hold'}
                lines={heroLines}
              />

              <div className="hero__support">
                <p className="lede">
                  LeaCon 2.0 brings delegates together for leadership sessions, practical OBT
                  activities, and opportunities to explore Global Exchange.
                </p>
                <div className="hero__actions">
                  <Link className="btn" to="/register">
                    Register now
                    <span className="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  <Link className="link link--static" to="/event">
                    See the event
                  </Link>
                </div>
              </div>

              <div className="hero__meta">
                <ClockText />
                <span className="hero__scroll" aria-hidden="true">
                  Scroll ↓
                </span>
              </div>
            </div>

            {heroSrc ? (
              <div className="hero__media">
                <img
                  className="hero__photo"
                  src={heroSrc}
                  alt={assets.hero.alt}
                  width={1600}
                  height={2000}
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="hero__note">
                  <HandNote note={notes.hero} mark="arrow" point="left" />
                </div>
              </div>
            ) : null}

            {/* Colour-flip layer (M2): identical headline, paper letters,
                clipped to the photograph so letters flip where they cross it. */}
            {heroSrc ? (
              <div className="hero__flip" aria-hidden="true">
                <div className="hero__flip-copy">
                  <p className="label hero__edition">{site.editionTag}</p>
                  <MaskedHeading
                    as="p"
                    className="display display--hero hero__title"
                    when={entered ? 'now' : 'hold'}
                    lines={heroLines}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------------- 2. The first statement ---------------- */}
      <section className="section idea" data-theme="paper" aria-labelledby="idea-title">
        <div className="wrap grid idea__grid">
          <div className="idea__main">
            <p className="label">The idea</p>
            <MaskedHeading
              as="p"
              id="idea-title"
              className="display display--statement idea__statement"
              lines={[
                'Leadership is shaped by the people we meet,',
                'the choices we make, and the experiences we share.',
              ]}
            />
          </div>
          <div className="idea__side">
            <p>
              LeaCon 2.0 is built for delegates who would rather do the work than hear about it.
              Four parts carry the event, and each one asks something different of the people in
              the room.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 3. What happens at LeaCon ---------------- */}
      <section className="section spread" data-theme="paper" aria-labelledby="spread-title">
        <div className="wrap">
          <div className="spread__head">
            <p className="label">What happens at LeaCon</p>
            <h2 className="display display--section" id="spread-title">
              Four parts, one experience.
            </h2>
          </div>

          <article className="spread__lead" aria-labelledby="spread-sessions">
            <p className="spread__meta tabular">
              {items[0].index} — {items[0].kind}
            </p>
            <MaskedHeading
              as="h3"
              id="spread-sessions"
              className="display display--page spread__title"
              lines={[items[0].title]}
            />
            <p className="spread__line">{items[0].body}</p>
            <Link className="link" to={`/event#${items[0].id}`}>
              See the event
            </Link>
          </article>

          <div className="spread__grid">
            <article className="spread__item spread__item--offset">
              <p className="spread__meta tabular">
                {items[1].index} — {items[1].kind}
              </p>
              <MaskedHeading
                as="h3"
                className="display display--section spread__title"
                lines={[items[1].title]}
              />
              <p className="spread__line">{items[1].body}</p>
              <Link className="link" to={`/event#${items[1].id}`}>
                See the event
              </Link>
            </article>

            <article className="spread__item spread__item--type">
              <p className="spread__meta tabular">
                {items[2].index} — {items[2].kind}
              </p>
              <p className="spread__big display" aria-hidden="true">
                oGX
              </p>
              <h3 className="sr-only">{items[2].title}</h3>
              <p className="spread__line">{items[2].body}</p>
              <Link className="link" to={`/event#${items[2].id}`}>
                See the event
              </Link>
            </article>

            <article className="spread__item spread__item--pair">
              <p className="spread__meta tabular">
                {items[3].index} — {items[3].kind}
              </p>
              <MaskedHeading
                as="h3"
                className="display display--section spread__title"
                lines={[items[3].title]}
              />
              <p className="spread__line">{items[3].body}</p>
              <Link className="link" to={`/event#${items[3].id}`}>
                See the event
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ---------------- 4. LeaCon 1.0 — the memory ----------------
          Hidden while there is no genuine photograph in the data file. */}
      {hasArchive ? (
        <section className="section memory" data-theme="forest" aria-labelledby="memory-title">
          <div className="wrap">
            <div className="memory__head">
              <div>
                <p className="label">LeaCon 1.0</p>
                <MaskedHeading
                  as="h2"
                  id="memory-title"
                  className="display display--section"
                  lines={['Where the first chapter started.']}
                />
              </div>
              <p className="memory__intro">
                A roll of real moments from the first edition, kept in the order they happened.
                Move through it at your own pace.
              </p>
            </div>

            <div className="memory__strip">
              <HandNote note={notes.archive} mark="arrow" point="right" />
              <FrameStrip
                items={leaconOneGallery}
                title={<p className="label label--paper">The roll</p>}
              />
            </div>

            <p className="memory__foot">
              <Link className="link" to="/event#archive">
                See the full archive
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {/* ---------------- 5. The people behind it ---------------- */}
      <section className="section people" data-theme="paper" aria-labelledby="people-title">
        <div className="wrap grid people__grid">
          <div className="people__text">
            <p className="label">The team</p>
            <MaskedHeading
              as="h2"
              id="people-title"
              className="display display--section"
              lines={['The people behind it.']}
            />
            <p className="people__body">
              LeaCon 2.0 is put together by a team that runs the sessions, the outbound tasks and
              the room itself.
            </p>
            <p className="pending">{strings.teamPending}</p>
            <Link className="link" to="/team">
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 6. Partners — hidden until confirmed ---------------- */}
      {partners.length > 0 ? (
        <section className="section section--tight partners-section" data-theme="paper">
          <div className="wrap">
            <p className="label">Supported by</p>
            <PartnerList />
          </div>
        </section>
      ) : null}

      {/* ---------------- 7. The closing scene ---------------- */}
      <section className="section closing" data-theme="forest" ref={closingRef}>
        <div className="wrap">
          <MaskedHeading
            as="h2"
            className="display display--page closing__title"
            when="view"
            lines={[
              <>
                Join us <AccentBlock side="right" /> at
              </>,
              <>{site.fullName}.</>,
            ]}
          />
          <div className="closing__action">
            <p>
              Registration runs through one official link. The event details behind it are
              published on the Event page as they are confirmed.
            </p>
            <Link className="btn btn--paper" to="/register">
              Register now
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
