/**
 * LeaCon 1.0 photography — the archive roll (blueprint: leaconOneGallery).
 *
 * Real photographs only. One entry exists per genuine file: the frame counter
 * ("03 / 12") counts this array, so a placeholder entry would make the counter
 * lie. Until photographs are supplied the array stays empty and the Home
 * memory section and the Event archive hide themselves — no filler plates, no
 * stock, no generated people.
 *
 * Entry shape (copy this when a photograph is approved):
 *
 *   {
 *     id: 'leacon-1-01',
 *     src: '/images/leacon-1/01.jpg',
 *     alt: 'What is actually visible in the photograph.',
 *     width: 1600,
 *     height: 1067,
 *     objectPosition: '50% 40%',
 *     caption: 'Verified caption, sentence case. Or null.',
 *   }
 *
 * Ratios are set from width/height. Mixed orientations are wanted.
 */

export type GalleryFrame = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  /** Keeps faces out of the crop, e.g. "50% 35%". */
  objectPosition?: string
  caption?: string | null
}

export const leaconOneGallery: GalleryFrame[] = []
