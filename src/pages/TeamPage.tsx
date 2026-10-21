import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { MaskedHeading } from '../components/MaskedHeading'
import { AccentBlock } from '../components/AccentBlock'
import { TeamProfile } from '../components/TeamProfile'
import { assets, site } from '../config/site'
import { team } from '../data/team'
import { strings } from '../data/strings'

/**
 * Team — the people.
 *
 * The headline sits over the top edge of the group photograph and the letters
 * flip to paper where they cross it (same mechanism as the Home hero). With no
 * confirmed roster the page shows the headline, the honest line and a route to
 * register: no fictional people, no stand-in portraits.
 */
export function TeamPage() {
  usePageMeta(
    `Team — ${site.fullName}`,
    `The people behind ${site.fullName}. Team details are published here once they are confirmed by the organisers.`,
  )

  const groupPhoto = assets.collective.src
  const leaders = team.filter((member) => member.leadership)
  const committee = team.filter((member) => !member.leadership)

  /* Where the photograph starts, so the duplicate headline clips to it. */
  const stageRef = useRef<HTMLDivElement | null>(null)
  const photoRef = useRef<HTMLDivElement | null>(null)
  const [flipTop, setFlipTop] = useState(0)

  useEffect(() => {
    if (!groupPhoto) return
    const measure = () => {
      const stage = stageRef.current
      const photo = photoRef.current
      if (!stage || !photo) return
      const top = photo.getBoundingClientRect().top - stage.getBoundingClientRect().top
      setFlipTop(Math.max(0, Math.round(top)))
    }
    measure()
    window.addEventListener('resize', measure)
    const timer = window.setTimeout(measure, 400) /* after fonts settle */
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(timer)
    }
  }, [groupPhoto])

  const headlineLines = ['The people', 'behind the', 'movement.']

  return (
    <>
      {/* ---------------- 1. Opening ---------------- */}
      <section className="team-open" data-theme="paper" aria-labelledby="team-title">
        <div className="wrap">
          <div className="team-open__stage" ref={stageRef}>
            <div className="team-open__head">
              <p className="label">The people</p>
              <MaskedHeading
                as="h1"
                id="team-title"
                className="display display--page team-open__title"
                when="now"
                lines={headlineLines}
              />
              <p className="team-open__intro">
                LeaCon 2.0 is run by a team that plans the sessions, holds the outbound tasks and
                keeps the room moving.
              </p>
            </div>

            {groupPhoto ? (
              <div className="team-open__photo" ref={photoRef}>
                <img
                  src={groupPhoto}
                  alt={assets.collective.alt}
                  width={2100}
                  height={900}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            ) : null}

            {groupPhoto ? (
              <div
                className="team-open__flip"
                aria-hidden="true"
                style={{ clipPath: `inset(${flipTop}px 0 0 0)` }}
              >
                <div className="team-open__flip-copy">
                  <p className="label">The people</p>
                  <MaskedHeading
                    as="p"
                    className="display display--page team-open__title"
                    when="now"
                    lines={headlineLines}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {team.length === 0 ? (
        /* ---------------- Empty state ---------------- */
        <section className="section team-empty" data-theme="paper">
          <div className="wrap team-empty__inner">
            <p className="pending">{strings.teamPending}</p>
            <p className="team-empty__body">{strings.teamPendingLong}</p>
            <Link className="btn" to="/register">
              Register now
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* ---------------- 2. Leadership ---------------- */}
          {leaders.length > 0 ? (
            <section className="section team-block" data-theme="paper" aria-labelledby="leaders-title">
              <div className="wrap">
                <p className="label">Leadership</p>
                <h2 className="sr-only" id="leaders-title">
                  Leadership
                </h2>
                <div className="team-lead">
                  {leaders.map((member, index) => (
                    <TeamProfile
                      key={member.id}
                      member={member}
                      size="lead"
                      className={index % 2 === 1 ? 'team-lead__b' : 'team-lead__a'}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* ---------------- 3. Committee ---------------- */}
          {committee.length > 0 ? (
            <section className="section team-block team-committee" data-theme="paper" aria-labelledby="committee-title">
              <div className="wrap">
                <p className="label">Organising committee</p>
                <h2 className="sr-only" id="committee-title">
                  Organising committee
                </h2>
                <div className="team-grid">
                  {committee.map((member, index) => (
                    <TeamProfile
                      key={member.id}
                      member={member}
                      className={`team-grid__cell team-grid__cell--${(index % 5) + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* ---------------- 5. The collective ---------------- */}
          <section className="section team-collective" data-theme="forest">
            <div className="wrap">
              <MaskedHeading
                as="h2"
                className="display display--page team-collective__title"
                when="view"
                lines={[
                  <>We did this <AccentBlock side="left" /> together.</>,
                ]}
              />
            </div>
          </section>
        </>
      )}

      {/* ---------------- 6. Closing ---------------- */}
      <section className="section team-close" data-theme="paper">
        <div className="wrap team-close__inner">
          <p className="team-close__line">
            The programme, the practical details and the registration route are one page each.
          </p>
          <div className="team-close__links">
            <Link className="link link--static" to="/event">
              See the event
            </Link>
            <Link className="btn" to="/register">
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
