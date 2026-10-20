import { usePageMeta } from '../hooks/usePageMeta'
import { PageHead } from '../components/PageHead'
import { Frame } from '../components/Frame'
import { Reveal } from '../components/Reveal'
import { products } from '../data/products'
import { site } from '../config/site'

/**
 * Static merchandise showcase. No cart, no checkout, no stock, no payment.
 * Every field is optional, so an item renders only what the organiser has
 * confirmed and describes the rest as coming soon.
 */
export function ShopPage() {
  usePageMeta(
    `Shop — ${site.fullName}`,
    `Official ${site.fullName} merchandise, shown as a static catalogue. Details are published as each item is confirmed.`,
  )

  return (
    <>
      <PageHead
        eyebrow="Shop"
        title="The event catalogue."
        lede="Official LeaCon merchandise, shown as a small editorial catalogue rather than a store. Nothing is sold on this site."
      />

      <section className="section" aria-labelledby="catalogue-heading">
        <div className="container">
          {products.length === 0 ? (
            <>
              <div className="catalogue">
                <div className="catalogue__state">
                  <div>
                    <p className="eyebrow eyebrow--teal">Catalogue</p>
                    <h2 id="catalogue-heading">Details coming soon.</h2>
                  </div>
                  <p>
                    Approved items appear here with photography from public/images/products/.
                  </p>
                </div>
              </div>

              <dl className="catalogue__outline">
                <div className="catalogue__column">
                  <dt>Photography</dt>
                  <dd>
                    One frame per item
                    <span>Cropped to the product, never a stock photograph.</span>
                  </dd>
                </div>
                <div className="catalogue__column">
                  <dt>Item</dt>
                  <dd>
                    Name and description
                    <span>Confirmed names only, with a short plain description.</span>
                  </dd>
                </div>
                <div className="catalogue__column">
                  <dt>Details</dt>
                  <dd>
                    Price, sizes, link
                    <span>Shown only when confirmed. Otherwise the row says so.</span>
                  </dd>
                </div>
              </dl>

              <p className="event-note">
                This is not a store: no cart, no checkout, no stock and no prices are invented.
                An item becomes informational unless an official purchase or enquiry link is
                supplied.
              </p>
            </>
          ) : (
            <>
              <div className="catalogue">
                <div className="catalogue__state">
                  <div>
                    <p className="eyebrow eyebrow--teal">Catalogue</p>
                    <h2 id="catalogue-heading">Official merchandise</h2>
                  </div>
                  <p>Static showcase. Availability is confirmed through the organiser.</p>
                </div>
              </div>

              <ul className="product-index" role="list">
                {products.map((product) => (
                  <li className="product-index__item" key={product.id}>
                    <div>
                      <h3 className="product-index__name">{product.name}</h3>
                      <p className="product-index__meta">{product.description}</p>
                    </div>

                    <div className="product-index__meta">
                      {product.price ? (
                        <span>{product.price}</span>
                      ) : (
                        <span>Price to be announced</span>
                      )}
                      {product.sizes && product.sizes.length > 0 ? (
                        <span> · {product.sizes.join(', ')}</span>
                      ) : null}
                    </div>

                    <div>
                      {product.purchaseUrl ? (
                        <a
                          className="btn btn--secondary btn--sm"
                          href={product.purchaseUrl}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          Purchase details
                        </a>
                      ) : (
                        <span className="product-index__meta">Informational only</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* One graphic plate keeps the sheet from ending on text alone. */}
      <section className="section section--compact sheet--sunk" aria-hidden="true">
        <div className="container shop-plate-row">
          <Reveal variant="crop">
            <Frame src={null} alt="" plate="LeaCon 2.0" tone="teal" ratio="16 / 7" decorative />
          </Reveal>
        </div>
      </section>
    </>
  )
}
