/**
 * Central event configuration.
 *
 * Every fact that has not been confirmed by the organisers lives here as an
 * editable placeholder. Leave a value `null` and the site hides the field or
 * shows a plain coming-soon state. Never replace `null` with a guessed value.
 */

export type SiteConfig = {
  /** Official registration URL. `null` renders the disabled "coming soon" state. */
  registrationUrl: string | null
  /** Organiser contact address, shown only when supplied. */
  contactEmail: string | null
  /** Verified social profiles. Empty array renders nothing. */
  social: { label: string; url: string }[]
}

export const siteConfig: SiteConfig = {
  registrationUrl: null,
  contactEmail: null,
  social: [],
}

export const site = {
  name: 'LeaCon',
  edition: '2.0',
  fullName: 'LeaCon 2.0',
  wordmark: 'LeaCon',
  description:
    'LeaCon 2.0 is a youth leadership experience built around leadership sessions, outbound training, global exchange exploration and delegate recognition.',
  tagline: "Leadership isn't a title. It's what you do next.",
} as const

export type NavItem = { label: string; to: string }

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Event', to: '/event' },
  { label: 'Shop', to: '/shop' },
]

export const registerItem: NavItem = { label: 'Register Now', to: '/register' }
