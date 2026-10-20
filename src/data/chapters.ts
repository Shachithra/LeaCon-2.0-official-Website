/**
 * The four parts of the LeaCon 2.0 experience.
 *
 * `tone` drives the graphic plate behind the frame. When photography is
 * supplied, set `image.src` to a file inside public/images/ and the plate is
 * replaced automatically. Plates render when `src` is null, so the site never
 * requests a file that does not exist.
 */

export type ChapterTone = 'forest' | 'green' | 'outlined'

export type Chapter = {
  id: string
  index: string
  meta: string
  title: string
  body: string[]
  /** Words set in the plate when no photograph has been supplied. */
  plate: string
  tone: ChapterTone
  /** CSS aspect ratio for the media frame. */
  ratio: string
  image: { src: string | null; alt: string }
}

export const chapters: Chapter[] = [
  {
    id: 'sessions',
    index: '01',
    meta: 'Sessions',
    title: 'Leadership Sessions',
    body: [
      'Sessions put delegates inside the decisions leadership asks for. How a team agrees. How a plan holds when the problem changes. What you contribute when the room splits.',
      'The work covers teamwork, adaptability, problem-solving and personal branding, so the session is something you use rather than something you sit through.',
    ],
    plate: '01',
    tone: 'forest',
    ratio: '4 / 3',
    image: { src: null, alt: 'Delegates working together during a LeaCon 2.0 leadership session' },
  },
  {
    id: 'obt',
    index: '02',
    meta: 'OBT',
    title: 'Outbound Training',
    body: [
      'Outbound training moves the group out of the hall and into tasks that change while you are solving them. Roles get reassigned, information arrives late, and the way through is together.',
      'It is the part of the event that tests adaptability and problem-solving under pressure, walked as one team.',
    ],
    plate: '02',
    tone: 'green',
    ratio: '4 / 3',
    image: { src: null, alt: 'A LeaCon 2.0 outbound training team working through a task outdoors' },
  },
  {
    id: 'ogx',
    index: '03',
    meta: 'oGX',
    title: 'Global Exchange',
    body: [
      'oGX introduces delegates to global exchange: what it is, what it asks of someone, and how leadership practice changes once the context does.',
      'Delegates explore the exchange on their own terms and leave knowing whether it is a path they want.',
    ],
    plate: '03',
    tone: 'outlined',
    ratio: '4 / 3',
    image: { src: null, alt: 'Delegates exploring global exchange at LeaCon 2.0' },
  },
  {
    id: 'engagement',
    index: '04',
    meta: 'Delegates',
    title: 'Delegate Engagement',
    body: [
      'The event runs on participation. Delegates respond, challenge and shape the room instead of watching it from the back.',
      'Engagement is what the recognition at the end of the event is built on.',
    ],
    plate: '04',
    tone: 'forest',
    ratio: '4 / 3',
    image: { src: null, alt: 'Delegates taking part in a LeaCon 2.0 group discussion' },
  },
]
