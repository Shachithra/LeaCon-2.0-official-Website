/**
 * LeaCon 1.0 photography.
 *
 * Drop the real photographs into public/images/leacon-1/ and set `src` on each
 * entry. Until `src` is set the strip renders graphic plates, which is the
 * designed placeholder state. Do not add photographs from any other event.
 *
 * `ratio` values differ on purpose so the sequence reads as an editorial
 * spread rather than a uniform grid.
 */

export type GlimpseItem = {
  id: string
  src: string | null
  alt: string
  plate: string
  ratio: string
}

export const glimpseItems: GlimpseItem[] = [
  {
    id: 'leacon-1-01',
    src: null,
    alt: 'LeaCon 1.0 photograph',
    plate: '01',
    ratio: '3 / 4',
  },
  {
    id: 'leacon-1-02',
    src: null,
    alt: 'LeaCon 1.0 photograph',
    plate: '02',
    ratio: '4 / 3',
  },
  {
    id: 'leacon-1-03',
    src: null,
    alt: 'LeaCon 1.0 photograph',
    plate: '03',
    ratio: '1 / 1',
  },
  {
    id: 'leacon-1-04',
    src: null,
    alt: 'LeaCon 1.0 photograph',
    plate: '04',
    ratio: '4 / 3',
  },
  {
    id: 'leacon-1-05',
    src: null,
    alt: 'LeaCon 1.0 photograph',
    plate: '05',
    ratio: '3 / 4',
  },
]
