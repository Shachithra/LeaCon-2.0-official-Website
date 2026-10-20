/**
 * Confirmed partners and approved logos only.
 *
 * The page renders "Partner announcements coming soon" while this array is
 * empty. Logos belong in public/images/partners/ as SVG or transparent PNG.
 * Use the official name and the verified official URL, or leave `url` null.
 * Do not invent partner tiers, logos or links.
 */

export type Partner = {
  id: string
  name: string
  logo: { src: string | null }
  url: string | null
}

export const partners: Partner[] = []
