# Image drop-in folders

Put approved photography here and the site picks it up from the matching data
file. Nothing is requested until a data file points at a file, so these folders
may stay empty without producing broken images.

| Folder | Used by | Expected files |
| --- | --- | --- |
| `leacon-1/` | `src/data/glimpse.ts` (Home and Event pages) | LeaCon 1.0 photographs, landscape and portrait mixed |
| `team/` | `src/data/team.ts` | Portraits at 800×1000 or larger, `name.jpg` |
| `partners/` | `src/data/partners.ts` | Approved logos, PNG/SVG with transparency preferred |
| `products/` | `src/data/products.ts` | Official merchandise photography |
| `brand/` | `index.html` | `og.jpg` (1200×630) for social sharing, favicon variants |

Rules that the build assumes:

- Use only real, supplied, approved images. No stock, no generated event photos.
- Reference files with a root-absolute path, e.g. `/images/team/aya.jpg`.
- Keep the original aspect ratio in mind: every frame reserves its ratio in CSS,
  so a mismatched crop is visible immediately.
