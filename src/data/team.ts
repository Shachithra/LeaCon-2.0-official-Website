/**
 * Team roster. Confirmed names, roles and portraits only.
 *
 * The page renders "Team details will be announced." while this array is
 * empty. To publish the team, add entries in this shape:
 *
 *   {
 *     id: 'name-in-url-form',
 *     name: 'Full Name',
 *     role: 'Confirmed role title',
 *     leadership: true,            // only for the two leadership portraits
 *     bio: 'One approved sentence.', // or null — never invented
 *     portrait: { src: '/images/team/name.jpg', alt: 'Portrait of Full Name' },
 *   }
 *
 * Portraits belong in public/images/team/ at 800x1000 or larger.
 * Do not add a person, a role, a biography or a social link that has not been
 * approved by the organisers.
 */

export type TeamMember = {
  id: string
  name: string
  role: string
  /** Renders in the two large leadership portraits instead of the committee. */
  leadership?: boolean
  bio?: string | null
  social?: { label: string; url: string } | null
  portrait: { src: string | null; alt: string }
}

export const team: TeamMember[] = []
