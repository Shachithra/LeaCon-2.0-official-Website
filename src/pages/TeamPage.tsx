import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { team } from '../data/team'
import { site } from '../config/site'

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

      <section className="section" aria-labelledby="team-heading">
        <div className="container">
          {team.length === 0 ? (
            <div className="roster__empty">
              <p className="eyebrow eyebrow--teal">Roster</p>
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
                  <p className="eyebrow eyebrow--teal">Roster</p>
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
    </>
  )
}
