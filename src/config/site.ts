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
  /** Small edition label used on the cover. */
  editionLabel: 'The Leadership Edition',
  /**
   * Neutral descriptor standing in for the official theme. When the
   * organisers publish the LeaCon 2.0 theme or slogan, replace this string —
   * no slogan is invented anywhere in this build.
   */
  tagline: 'A youth leadership experience.',
  description:
    'LeaCon 2.0 is a youth leadership experience built around leadership sessions, outbound training, global exchange exploration and delegate recognition.',
} as const

/**
 * Photography that sits outside the data files.
 *
 * Every `src` is null until an approved file exists, so the site renders the
 * designed plate instead of requesting anything. Drop the photograph into the
 * folder named on each comment and set `src` — the layout already reserves the
 * ratio, so nothing shifts when it loads.
 */
export const assets = {
  /** Home cover. public/images/brand/cover.jpg — portrait, 1200×1500 or larger. */
  cover: {
    src: null as string | null,
    alt: 'Delegates of LeaCon 2.0 together at the event',
  },
  /** About page opening. public/images/brand/feature.jpg — landscape, 1600×700 or larger. */
  feature: {
    src: null as string | null,
    alt: 'Delegates of LeaCon 2.0 in session',
  },
  /** About split-screen. public/images/brand/moment.jpg — portrait, 1200×1500 or larger. */
  moment: {
    src: null as string | null,
    alt: 'A LeaCon 2.0 delegate working through a task with their team',
  },
  /** Team page group photograph. public/images/team/group.jpg — landscape. */
  collective: {
    src: null as string | null,
    alt: 'The LeaCon 2.0 organising team together',
  },
  /** Shop opening image. public/images/products/hero.jpg — landscape. */
  merchandise: {
    src: null as string | null,
    alt: 'Official LeaCon 2.0 merchandise',
  },
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
