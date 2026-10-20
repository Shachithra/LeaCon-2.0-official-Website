import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Reveal } from '../components/Reveal'
import { Chapter, type ChapterVariant } from '../components/Chapter'
import { Glimpse } from '../components/Glimpse'
import { chapters } from '../data/chapters'
import { partners } from '../data/partners'
import { site } from '../config/site'

const headline = ["Leadership isn't", 'a title. It’s what', 'you do next.']

const variants: ChapterVariant[] = ['a', 'b', 'c', 'd']

export function HomePage() {
  usePageMeta(
    `${site.fullName} — ${site.tagline}`,
    'LeaCon 2.0 is a youth leadership experience: leadership sessions, outbound training, global exchange exploration and recognition for the delegates who take part.',
  )

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__top">
            <Reveal variant="rule" className="hero__rule" />
            <p className="eyebrow eyebrow--teal">Youth leadership event</p>
          </div>

          <Reveal variant="lines" className="hero__titleReveal">
            <h1 className="hero__title" id="hero-title">
              {headline.map((line, index) => (
                <span
                  className="line"
                  key={line}
                  style={{ '--i': index } as CSSProperties}
                >
                  <span>{line}</span>
                </span>
              ))}
            </h1>
          </Reveal>

          <div className="hero__lower">
            <div className="hero__action">
              <p className="hero__lede">
                {site.fullName} is a leadership experience for delegates who would rather do the
                work than hear about it.
              </p>
              <div className="btn-row">
                <Link className="btn btn--primary" to="/register">
                  Register Now
                </Link>
                <a className="btn btn--secondary" href="#experience">
                  Explore the Experience
                </a>
              </div>
            </div>

            <div className="frame frame--indigo hero__panel" data-field="indigo">
              <span className="hero__panel-plate">{site.edition}</span>
              <ol className="hero__panel-index">
                {chapters.map((chapter) => (
                  <li className="hero__panel-row" key={chapter.id}>
                    <a className="hero__panel-link" href={`#${chapter.id}`}>
                      <span className="hero__panel-num">{chapter.index}</span>
                      <span className="hero__panel-label">{chapter.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- One-statement introduction ---------------- */}
      <section className="section section--xl intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <p className="accent-phrase intro__phrase">Think together. Move forward.</p>

          <div>
            <h2 className="intro__statement" id="intro-title">
              {site.fullName} is a leadership experience built for delegates who would rather do
              the work than hear about it.
            </h2>
            <Reveal variant="rule" className="intro__rule" />
            <p className="intro__body body-copy">
              Four parts carry the event: leadership sessions, outbound training, global exchange,
              and recognition for the delegates who take part most.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Experience chapters ---------------- */}
      <section
        className="section chapters"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">The experience</p>
              <h2 className="section-head__title" id="experience-title">
                What delegates actually do
              </h2>
            </div>
            <p className="section-head__lede">
              Four parts, run as one experience. Each one asks something different of the people
              in the room.
            </p>
          </div>
        </div>

        <div>
          {chapters.map((chapter, index) => (
            <Chapter key={chapter.id} data={chapter} variant={variants[index]} />
          ))}
        </div>
      </section>

      {/* ---------------- Most Engaging Delegate ---------------- */}
      <section
        className="section section--xl recognition"
        data-field="indigo"
        aria-labelledby="recognition-title"
      >
        <div className="container recognition__grid">
          <div>
            <p className="eyebrow">Recognition</p>
            <h2 className="recognition__title" id="recognition-title">
              Most Engaging Delegate
            </h2>
            <p className="recognition__body">
              {site.fullName} pays attention to how delegates take part. The Most Engaging Delegate
              award recognises that contribution directly.
            </p>
          </div>

          <div>
            <div className="recognition__list">
              <Reveal
                variant="fade"
                className="recognition__row"
                style={{ transitionDelay: '0ms' }}
              >
                <span className="recognition__label">Award</span>
                <span className="recognition__value">Most Engaging Delegate</span>
              </Reveal>
              <Reveal
                variant="fade"
                className="recognition__row"
                style={{ transitionDelay: '110ms' }}
              >
                <span className="recognition__label">Open to</span>
                <span className="recognition__value">All {site.fullName} delegates</span>
              </Reveal>
              <Reveal
                variant="fade"
                className="recognition__row"
                style={{ transitionDelay: '220ms' }}
              >
                <span className="recognition__label">Categories</span>
                <span className="recognition__value">To be announced</span>
              </Reveal>
            </div>
            <p className="recognition__note">
              Categories and judging criteria will be published on this page once they are
              confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- LeaCon 1.0 glimpse ---------------- */}
      <section className="section glimpse" aria-labelledby="glimpse-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--teal">LeaCon 1.0</p>
              <h2 className="section-head__title" id="glimpse-title">
                A first chapter. A bigger next step.
              </h2>
            </div>
            <p className="section-head__lede">
              LeaCon 1.0 was the first edition. LeaCon 2.0 takes the same delegates further, with
              more of the event built around what happens in the room.
            </p>
          </div>

          <Glimpse />
        </div>
      </section>

      {/* ---------------- Partners ---------------- */}
      <section className="section partners" aria-labelledby="partners-title">
        <div className="container partners__frame">
          <div>
            <p className="eyebrow eyebrow--teal">Partners</p>
            <h2 className="section-head__title" id="partners-title">
              Partners
            </h2>
          </div>

          {partners.length === 0 ? (
            <div>
              <p className="partners__state">Partner announcements coming soon.</p>
              <p className="partners__hint meta">
                Approved logos and official links are published as each partnership is confirmed.
              </p>
            </div>
          ) : (
            <ul className="partners__list" role="list">
              {partners.map((partner) => {
                const identity = partner.logo.src ? (
                  <img
                    className="partners__logo"
                    src={partner.logo.src}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="partners__name">{partner.name}</span>
                )

                return (
                  <li key={partner.id}>
                    {partner.url ? (
                      <a href={partner.url} rel="noreferrer noopener" target="_blank">
                        {identity}
                      </a>
                    ) : (
                      identity
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ---------------- Final registration CTA ---------------- */}
      <section
        className="section section--xl final-cta"
        data-field="indigo"
        aria-labelledby="final-cta-title"
      >
        <div className="container final-cta__grid">
          <div>
            <p className="eyebrow">Registration</p>
            <h2 className="final-cta__title" id="final-cta-title">
              One experience. More ways to lead.
            </h2>
          </div>
          <div className="final-cta__action">
            <p>
              Registration is handled through a single official link. The registration page
              carries it as soon as it is live.
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
