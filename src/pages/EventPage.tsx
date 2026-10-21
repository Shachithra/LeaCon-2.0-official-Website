import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { MaskedHeading } from '../components/MaskedHeading'
import { AccentBlock } from '../components/AccentBlock'
import { HandNote } from '../components/HandNote'
import { ChapterIndex } from '../components/ChapterIndex'
import { ContactSheet } from '../components/ContactSheet'
import { InfoList, PartnerList, RegisterCta, type InfoRow } from '../components/Content'
import { gsap, useMotionEffect } from '../motion/MotionProvider'
import { site, siteConfig } from '../config/site'
import { programme, recognition, type ProgrammeBlock as Block } from '../data/programme'
import { leaconOneGallery } from '../data/gallery'
import { partners } from '../data/partners'
import { notes } from '../data/notes'
import { strings } from '../data/strings'

/**
 * Event — the conference experience: editorial on the left of every decision,
 * practical on the right. A sticky chapter index keeps track of where you are
 * in the programme; the LeaCon 1.0 contact sheet and the partner row appear
 * only when their photographs and logos exist.
 */

const overview: InfoRow[] = [
  { term: 'Date', value: null, pending: strings.detailsPending },
  { term: 'Venue', value: null, pending: strings.detailsPending },
  { term: 'Audience', value: null, pending: strings.detailsPending },
  { term: 'Registration', value: siteConfig.registrationUrl, pending: strings.registrationPending },
]

const practical: InfoRow[] = [
  { term: 'Venue', value: null, pending: strings.detailsPending },
  { term: 'Schedule', value: null, pending: strings.schedulePending },
  { term: 'Requirements', value: null, omit: true },
  { term: 'Fees', value: null, pending: strings.detailsPending },
  {
    term: 'Contact',
    value: siteConfig.contactEmail,
    pending: strings.contactPending,
    render: (value) => (
      <a href={`mailto:${value}`}>{value}</a>
    ),
  },
]

const indexItems = [...programme.map((block) => ({ id: block.id, nav: block.nav })), { id: recognition.id, nav: recognition.nav }]

/** One programme block, with the outlined number that fills on entry (M18). */
function ProgrammeBlock({ block }: { block: Block }) {
  const ref = useRef<HTMLElement | null>(null)
  const isOgx = block.id === 'ogx'

  useMotionEffect(
    () => {
      const root = ref.current
      if (!root) return
      const fill = root.querySelector<HTMLElement>('.block__num-fill')
      if (fill) {
        gsap.fromTo(
          fill,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: root, start: 'top 60%', once: true },
          },
        )
      }
      const media = root.querySelector<HTMLElement>('.block__media')
      if (media) {
        gsap.from(media, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.7,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: media, start: 'top 85%', once: true },
        })
      }
    },
    [block.id],
    ref,
  )

  return (
    <article
      className={`block${isOgx ? ' block--ogx' : ''}`}
      id={block.id}
      ref={ref}
      aria-labelledby={`${block.id}-title`}
    >
      <div className="block__head">
        <span className="block__num display" aria-hidden="true">
          <span className="block__num-outline">{block.index}</span>
          <span className="block__num-fill">{block.index}</span>
        </span>
        <div>
          <p className="label">{block.nav}</p>
          <MaskedHeading
            as="h3"
            id={`${block.id}-title`}
            className={`display display--section block__title${isOgx ? ' block__title--big' : ''}`}
            lines={isOgx ? ['Global exchange'] : [block.title]}
          />
        </div>
      </div>

      <div className="block__body prose">
        {block.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {block.image.src ? (
        <figure className="block__media" style={{ aspectRatio: block.image.ratio }}>
          <img src={block.image.src} alt={block.image.alt} loading="lazy" decoding="async" />
        </figure>
      ) : null}
    </article>
  )
}

export function EventPage() {
  usePageMeta(
    `Event — ${site.fullName}`,
    `${site.fullName}: leadership sessions, outbound training, global exchange exploration, delegate engagement and the Most Engaging Delegate recognition.`,
  )

  const hasArchive = leaconOneGallery.length > 0
  const openingPhoto = hasArchive ? leaconOneGallery[0] : null

  return (
    <>
      {/* ---------------- 1. Opening ---------------- */}
      <section className="event-open" data-theme="forest" aria-labelledby="event-title">
        <div className="wrap">
          <div className="event-open__top">
            <MaskedHeading
              as="h1"
              id="event-title"
              className="display event-open__title"
              when="now"
              lines={[site.fullName]}
            />

            <div className="event-open__rail">
              <p className="event-open__desc">
                One experience in four parts: sessions, outbound tasks, global exchange, and the
                engagement that recognition is built on.
              </p>
              <Link className="btn btn--paper" to="/register">
                Register now
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <HandNote note={notes.eventInfo} mark="underline" />
            </div>
          </div>

          {openingPhoto ? (
            <figure
              className="event-open__strip"
              style={{ aspectRatio: `${openingPhoto.width} / ${openingPhoto.height}` }}
            >
              <img
                src={openingPhoto.src}
                alt={openingPhoto.alt}
                width={openingPhoto.width}
                height={openingPhoto.height}
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>
      </section>

      {/* ---------------- 2. Overview ---------------- */}
      <section className="section section--tight event-overview" data-theme="paper" aria-labelledby="overview-title">
        <div className="wrap">
          <p className="label">Overview</p>
          <h2 className="display display--section" id="overview-title">
            The practical details
          </h2>
          <InfoList rows={overview} columns={4} className="event-overview__list" />
          <p className="event-note">
            No date, venue, time, agenda, fee, deadline or speaker detail is published here until
            the organisers confirm it.
          </p>
        </div>
      </section>

      {/* ---------------- 3. Programme experiences ---------------- */}
      <section className="section programme" data-theme="paper" aria-labelledby="programme-title">
        <div className="wrap">
          <div className="programme__head">
            <p className="label">Programme</p>
            <MaskedHeading
              as="h2"
              id="programme-title"
              className="display display--section"
              lines={['What happens, and where you are in it.']}
            />
          </div>

          <div className="programme__layout">
            <ChapterIndex items={indexItems} label="Index" />

            <div className="programme__blocks">
              {programme.map((block) => (
                <ProgrammeBlock block={block} key={block.id} />
              ))}

              {/* Recognition */}
              <article
                className="block block--recognition"
                id={recognition.id}
                aria-labelledby={`${recognition.id}-title`}
              >
                <Recognition />
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. LeaCon 1.0 archive ---------------- */}
      {hasArchive ? (
        <section className="section archive" data-theme="forest" id="archive" aria-labelledby="archive-title">
          <div className="wrap">
            <div className="archive__head">
              <div>
                <p className="label">LeaCon 1.0</p>
                <MaskedHeading
                  as="h2"
                  id="archive-title"
                  className="display display--section"
                  lines={['The contact sheet.']}
                />
              </div>
              <p className="archive__intro">
                Every frame from the first edition, labelled in order. Open one to look at it
                properly.
              </p>
            </div>
            <ContactSheet items={leaconOneGallery} />
          </div>
        </section>
      ) : null}

      {/* ---------------- 5. Partners ---------------- */}
      {partners.length > 0 ? (
        <section className="section section--tight partners-section" data-theme="paper" aria-labelledby="partners-title">
          <div className="wrap">
            <p className="label" id="partners-title">
              Supported by
            </p>
            <PartnerList />
          </div>
        </section>
      ) : null}

      {/* ---------------- 6. Practical information ---------------- */}
      <section className="section section--tight practical" data-theme="paper" aria-labelledby="practical-title">
        <div className="wrap grid">
          <div className="practical__intro">
            <p className="label">Practical information</p>
            <h2 className="display display--section" id="practical-title">
              Before you come.
            </h2>
            <p className="practical__note">
              Only confirmed details are published. Where something is not final, the row says so.
            </p>
          </div>
          <div className="practical__list">
            <InfoList rows={practical} />
          </div>
        </div>
      </section>

      {/* ---------------- 7. Registration CTA ---------------- */}
      <section className="section event-cta" data-theme="forest" aria-labelledby="event-cta-title">
        <div className="wrap">
          <MaskedHeading
            as="h2"
            id="event-cta-title"
            className="display display--page event-cta__title"
            when="view"
            lines={[
              <>Register for <AccentBlock side="right" /> at</>,
              <>{site.fullName}.</>,
            ]}
          />
          <RegisterCta className="event-cta__action" />
        </div>
      </section>
    </>
  )
}

/** Recognition rows, with rules that draw in once (scaleX). */
function Recognition() {
  const ref = useRef<HTMLDivElement | null>(null)

  useMotionEffect(
    () => {
      const root = ref.current
      if (!root) return
      const rows = Array.from(root.querySelectorAll<HTMLElement>('.recognition__row'))
      rows.forEach((row) => {
        gsap.from(row.querySelector('.recognition__rule'), {
          scaleX: 0,
          duration: 0.5,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        })
      })
    },
    [],
    ref,
  )

  return (
    <div ref={ref}>
      <div className="block__head">
        <span className="block__num display" aria-hidden="true">
          <span className="block__num-outline">{recognition.index}</span>
          <span className="block__num-fill">{recognition.index}</span>
        </span>
        <div>
          <p className="label">
            {recognition.proposed ? 'Proposed recognition' : 'Recognition'}
          </p>
          <MaskedHeading
            as="h3"
            id={`${recognition.id}-title`}
            className="display display--section block__title"
            lines={[recognition.title]}
          />
        </div>
      </div>

      <div className="block__body prose">
        <p>{recognition.intro}</p>
      </div>

      <dl className="recognition">
        {recognition.rows.map((row) => (
          <div className="recognition__row" key={row.term}>
            <dt className="recognition__term">{row.term}</dt>
            <span className="recognition__rule" aria-hidden="true" />
            <dd className="recognition__detail">{row.detail}</dd>
          </div>
        ))}
      </dl>

      <p className="event-note">{recognition.pending}</p>
    </div>
  )
}
