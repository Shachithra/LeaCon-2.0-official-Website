import { Reveal } from './Reveal'
import { Frame } from './Frame'
import type { Chapter as ChapterData } from '../data/chapters'

export type ChapterVariant = 'a' | 'b' | 'c' | 'd'

/**
 * A restrained connected path used once, in the Outbound Training chapter.
 * `pathLength="1"` lets the stroke draw without measuring the path in JS.
 */
function RouteLine() {
  return (
    <Reveal variant="fade" className="route">
      <svg className="route__svg" viewBox="0 0 640 92" aria-hidden="true" focusable="false">
        <path
          className="route__path"
          pathLength={1}
          d="M4 74 H118 L176 26 H310 L368 74 H500 L552 34 H636"
        />
        <circle className="route__dot" cx="118" cy="74" r="4.5" />
        <circle className="route__dot" cx="176" cy="26" r="4.5" />
        <circle className="route__dot" cx="310" cy="26" r="4.5" />
        <circle className="route__dot" cx="368" cy="74" r="4.5" />
        <circle className="route__dot" cx="500" cy="74" r="4.5" />
        <circle className="route__dot" cx="552" cy="34" r="4.5" />
      </svg>
    </Reveal>
  )
}

type Props = {
  data: ChapterData
  variant: ChapterVariant
}

export function Chapter({ data, variant }: Props) {
  const onField = variant === 'b'

  return (
    <article
      id={data.id}
      className={`chapter chapter--${variant}${onField ? ' chapter--field' : ''}`}
      data-field={onField ? 'forest' : undefined}
    >
      <div className="container">
        <div className="chapter__grid">
          <Reveal variant="chapter" className="chapter__index">
            <span aria-hidden="true">{data.index}</span>
          </Reveal>

          <div className="chapter__text">
            <div className="chapter__head">
              <p className="eyebrow verbatim">{data.meta}</p>
              <h3 className="chapter__title">{data.title}</h3>
            </div>

            <Reveal variant="fade" className="chapter__body body-copy">
              {data.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            {data.id === 'obt' ? <RouteLine /> : null}
          </div>

          <div className="chapter__media">
            <Reveal variant="crop">
              <Frame
                src={data.image.src}
                alt={data.image.alt}
                plate={data.plate}
                tone={data.tone}
                ratio={data.ratio}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  )
}
