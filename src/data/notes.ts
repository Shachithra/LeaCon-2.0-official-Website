/**
 * Handwritten notes (blueprint M8).
 *
 * Real text, set in AndYou, always beside a hand-drawn arrow or underline.
 * Exactly six exist on the whole site — the blueprint's maximum — and each is
 * at least two screens apart from the next. A note never carries information a
 * reader needs; three of the six only appear once the corresponding
 * photograph exists.
 */

export type HandNoteCopy = {
  id: string
  text: string
}

export const notes: Record<
  'hero' | 'archive' | 'team' | 'eventInfo' | 'registerCta' | 'journey',
  HandNoteCopy
> = {
  hero: {
    id: 'note-hero',
    text: 'be in the room.',
  },
  archive: {
    id: 'note-archive',
    text: 'this is where it started.',
  },
  team: {
    id: 'note-team',
    text: 'meet the people.',
  },
  eventInfo: {
    id: 'note-event-info',
    text: 'nothing is guessed here.',
  },
  registerCta: {
    id: 'note-register-cta',
    text: 'one link, that is all.',
  },
  journey: {
    id: 'note-journey',
    text: 'the same room, twice.',
  },
}
