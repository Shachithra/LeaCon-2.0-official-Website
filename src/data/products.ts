/**
 * Official LeaCon merchandise. Static catalogue only: no cart, no checkout,
 * no stock, no payment.
 *
 * The page renders a "catalogue coming soon" state while this array is empty.
 * Every field below is optional except `id`, `name` and `description`.
 * Leave `price`, `sizes` and `purchaseUrl` null when they are not confirmed,
 * and the row hides them rather than showing a placeholder.
 *
 * Product photography belongs in public/images/products/.
 */

export type Product = {
  id: string
  name: string
  description: string
  image: { src: string | null; alt: string }
  /** Omit entirely by leaving null when the price is not confirmed. */
  price: string | null
  sizes: string[] | null
  /** Official purchase or enquiry link. No fake buy button is ever rendered. */
  purchaseUrl: string | null
}

export const products: Product[] = []
