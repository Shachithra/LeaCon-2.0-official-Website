/**
 * The programme experiences (blueprint: `programme`).
 *
 * Confirmed items only. Each block is referenced by the sticky chapter index
 * on the Event page, so `index` and `title` must stay in step with the list.
 * Nothing here invents a date, venue, topic list, game, speaker or point
 * system.
 */

export type ProgrammeBlock = {
  id: string
  /** Chapter index number, true to the order of this array. */
  index: string
  /** Short name used in the sticky index. */
  nav: string
  title: string
  body: string[]
  /** Optional confirmed detail list — leave empty when nothing is confirmed. */
  points?: string[]
  image: { src: string | null; alt: string; ratio: string }
}

export const programme: ProgrammeBlock[] = [
  {
    id: 'leadership-sessions',
    index: '01',
    nav: 'Leadership sessions',
    title: 'Leadership Sessions',
    body: [
      'Sessions put delegates inside the decisions leadership asks for. How a team agrees. How a plan holds when the problem changes. What you contribute when the room splits.',
      'The work covers teamwork, adaptability, problem-solving and personal branding, so the session is something you use rather than something you sit through.',
    ],
    image: {
      src: null,
      alt: 'Delegates working together during a LeaCon 2.0 leadership session',
      ratio: '16 / 9',
    },
  },
  {
    id: 'outbound-training',
    index: '02',
    nav: 'Outbound training',
    title: 'Outbound Training',
    body: [
      'Outbound training moves the group out of the hall and into tasks that change while you are solving them. Roles get reassigned, information arrives late, and the way through is together.',
      'It is the part of the event that tests adaptability and problem-solving under pressure, walked as one team.',
    ],
    image: {
      src: null,
      alt: 'A LeaCon 2.0 outbound training team working through a task outdoors',
      ratio: '3 / 4',
    },
  },
  {
    id: 'ogx',
    index: '03',
    nav: 'oGX',
    title: 'Global Exchange',
    body: [
      'oGX introduces delegates to global exchange: what it is, what it asks of someone, and how leadership practice changes once the context does.',
      'Delegates explore the exchange on their own terms and leave knowing whether it is a path they want.',
    ],
    image: {
      src: null,
      alt: 'Delegates exploring global exchange at LeaCon 2.0',
      ratio: '4 / 5',
    },
  },
  {
    id: 'delegate-engagement',
    index: '04',
    nav: 'Delegate engagement',
    title: 'Delegate Engagement',
    body: [
      'The event runs on participation. Delegates respond, challenge and shape the room instead of watching it from the back.',
      'Engagement is what the recognition at the end of the event is built on.',
    ],
    image: {
      src: null,
      alt: 'Delegates taking part in a LeaCon 2.0 group discussion',
      ratio: '3 / 2',
    },
  },
]

/**
 * Recognition. `proposed` stays true until the organisers finalise the rules:
 * while it is true the block carries the "Proposed recognition" label and
 * publishes no points, weights, leaderboard or prizes.
 */
export const recognition = {
  id: 'most-engaging-delegate',
  index: '05',
  nav: 'Most Engaging Delegate',
  title: 'Most Engaging Delegate',
  proposed: true,
  intro:
    'LeaCon 2.0 pays attention to how delegates take part, and the recognition at the end of the event is built on that contribution.',
  rows: [
    {
      term: 'Sub-activity score',
      detail: 'How a delegate takes part in the parts of the programme that run beside the main sessions.',
    },
    {
      term: 'Product engagement',
      detail: 'How closely a delegate works with what the event puts in front of them.',
    },
    {
      term: 'Social echo',
      detail: 'How far a delegate carries the event into the conversations happening around it.',
    },
  ],
  pending: 'Categories, scoring and judging criteria are published here once they are confirmed.',
}
