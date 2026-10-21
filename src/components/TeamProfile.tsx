import type { TeamMember } from '../data/team'
import { strings } from '../data/strings'

/**
 * TeamProfile — one person, one frame.
 *
 * Portrait, full name, confirmed role, optional approved bio. The bio sits
 * over the lower part of the portrait on hover and keyboard focus, and sits
 * plainly below it on touch and small screens: nothing is hover-only.
 * Without a supplied portrait the frame keeps its ratio and states the plate
 * note — no stand-in person, ever.
 */
type Props = {
  member: TeamMember
  size?: 'lead' | 'std'
  className?: string
}

export function TeamProfile({ member, size = 'std', className }: Props) {
  const { src, alt } = member.portrait

  return (
    <article className={`team-profile team-profile--${size}${className ? ` ${className}` : ''}`}>
      <div className="team-profile__frame">
        {src ? (
          <img
            className="team-profile__portrait"
            src={src}
            alt={alt}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="plate team-profile__plate">
            <span className="plate__note">{strings.noPhotograph}</span>
          </div>
        )}
        <span className="frame__tab" aria-hidden="true">
          Frame
        </span>
        {member.bio ? <p className="team-profile__bio">{member.bio}</p> : null}
      </div>

      <div className="team-profile__text">
        <h3 className="team-profile__name">{member.name}</h3>
        <p className="team-profile__role">{member.role}</p>
        {member.social ? (
          <a
            className="link"
            href={member.social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {member.social.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
