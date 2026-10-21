/**
 * Central event configuration.
 *
 * Every fact that has not been confirmed by the organisers lives here as an
 * editable placeholder. Leave a value `null` and the site hides the field or
 * shows a plain coming-soon state. Never replace `null` with a guessed value:
 * a guessed date, venue, fee, deadline, speaker, partner or email is a bug,
 * not a placeholder.
 */

export type SiteConfig = {
  /** Official registration URL. `null` renders the "coming soon" state. */
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
  /** Small edition label used above the hero photograph (blueprint 7.1). */
  editionTag: 'EDITION 02',
  /**
   * Neutral descriptor standing in for the official theme. No slogan is
   * invented anywhere in this build.
   */
  tagline: 'A youth leadership experience.',
  description:
    'LeaCon 2.0 is a youth leadership experience built around leadership sessions, outbound training, global exchange exploration and delegate recognition.',
} as const

/**
 * Photography that sits outside the data files.
 *
 * Every `src` is null until an approved file exists, so the site renders the
 * designed state instead of requesting anything — no stock, no generated
 * people, no filler. Drop the photograph into the folder named on each
 * comment and set the `src`; the layout already reserves the ratio.
 */
export const assets = {
  /** Home hero. public/images/hero.jpg — portrait or near-portrait, 2400px+. */
  hero: {
    src: null as string | null,
    alt: 'A LeaCon delegate mid-conversation with their group',
  },
  /** About opening. public/images/feature.jpg — portrait 3:4, 1600px+. */
  feature: {
    src: null as string | null,
    alt: 'Delegates of LeaCon working through a session',
  },
  /** About story. public/images/moment.jpg — landscape or portrait. */
  moment: {
    src: null as string | null,
    alt: 'A LeaCon delegate working through a task with their team',
  },
  /** Team page group photograph. public/images/team/group.jpg — 21:9 wide. */
  collective: {
    src: null as string | null,
    alt: 'The LeaCon 2.0 organising team together',
  },
} as const

export type NavItem = { label: string; to: string }

/** The five pages. There is no shop, no cart and no product data. */
export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Event', to: '/event' },
]

export const registerItem: NavItem = { label: 'Register Now', to: '/register' }
