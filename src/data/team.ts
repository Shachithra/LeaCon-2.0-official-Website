/**
 * Team roster. Confirmed names, roles and portraits only.
 *
 * The page renders a "Meet the team soon" state while this array is empty.
 * To publish the team, add entries in this shape:
 *
 *   {
 *     id: 'name-in-url-form',
 *     name: 'Full Name',
 *     role: 'Confirmed role title',
 *     portrait: { src: '/images/team/name.jpg', alt: 'Portrait of Full Name' },
 *   }
 *
 * Portraits belong in public/images/team/ at 800x1000 or larger.
 * Do not add a person, a role or a biography that has not been approved.
 */

export type TeamMember = {
  id: string
  name: string
  role: string
  portrait: { src: string | null; alt: string }
}

export const team: TeamMember[] = []
