import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { Frame } from '../components/Frame'
import { team } from '../data/team'
import { assets, site } from '../config/site'

export function TeamPage() {
  usePageMeta(
    `Team — ${site.fullName}`,
    `The people behind ${site.fullName}. Confirmed names, roles and portraits are published here as soon as the organiser approves them.`,
  )

  return (
    <>
      <PageHead
        eyebrow="Team"
        title="The people running the room."
        lede="Confirmed names, roles and portraits only. Every profile on this page is published once the organiser approves it."
      />

      {/* ---------------- Introduction against the group photograph ---------------- */}
      <section className="section team-intro" aria-labelledby="collective-intro">
        <div className="container team-intro__grid">
          <div className="team-intro__text">
            <p className="eyebrow eyebrow--green">The collective</p>
            <h2 className="team-intro__title" id="collective-intro">
              An edition is a group effort.
            </h2>
            <p className="team-intro__body">
              Sessions, formats, timing and the room itself are carried by a team rather than a
              single name. The people who do that work are published here — as a roster of
              confirmed roles, not as profiles written in advance.
            </p>
          </div>

          <Reveal variant="crop" className="team-intro__media">
            <Frame
              src={assets.collective.src}
              alt={assets.collective.alt}
              plate={site.edition}
              tone="outlined"
              ratio="4 / 3"
              priority
              decorative={!assets.collective.src}
            />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="team-heading">
        <div className="container">
          {team.length === 0 ? (
            <div className="roster__empty">
              <p className="eyebrow eyebrow--green">Roster</p>
              <h2 id="team-heading">Meet the team soon.</h2>
              <p>
                The {site.fullName} team page is populated from a local data file, so names and
                portraits appear here the moment they are confirmed — and nothing else ever
                does.
              </p>
            </div>
          ) : (
            <>
              <div className="section-head">
                <div>
                  <p className="eyebrow eyebrow--green">Roster</p>
                  <h2 className="section-head__title" id="team-heading">
                    Confirmed team
                  </h2>
                </div>
                <p className="section-head__lede">
                  Names, roles and portraits as approved by the organisers.
                </p>
              </div>

              <Reveal variant="fade">
                <ul className="roster" role="list">
                  {team.map((member, index) => (
                    <li className="roster__item" key={member.id}>
                      <span className="roster__index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="roster__ident">
                        {member.portrait.src ? (
                          <img
                            className="roster__portrait"
                            src={member.portrait.src}
                            alt={member.portrait.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        <span className="roster__name">{member.name}</span>
                      </span>

                      <span className="roster__role">{member.role}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </>
          )}

          <div className="about-note">
            <p>
              Portraits belong in public/images/team/. No biography, testimonial or profile is
              written for anyone on this site.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Full-width typographic close ---------------- */}
      <section className="section section--xl collective" aria-labelledby="collective-title">
        <div className="container collective__inner">
          <p className="accent-phrase collective__phrase">The team</p>
          <h2 className="collective__statement" id="collective-title">
            No one runs an edition alone.
          </h2>
          <p className="collective__body">
            The roster above fills in as the organisers confirm each person. Until a name is
            approved it stays off the page, so this section carries the statement instead of
            invented ones.
          </p>
        </div>
      </section>
    </>
  )
}
