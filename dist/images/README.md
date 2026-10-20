# Image drop-in folders

Put approved photography here and the site picks it up from the matching data
file. Nothing is requested until a data file points at a file, so these folders
may stay empty without producing broken images.

| Folder | Used by | Expected files |
| --- | --- | --- |
| `brand/` | `assets` in `src/config/site.ts` (cover / feature / moment) and `index.html` | `cover.jpg` (portrait 1200×1500+), `feature.jpg` (landscape 1600×700+), `moment.jpg` (portrait 1200×1500+), `og.jpg` (1200×630), favicon variants |
| `leacon-1/` | `src/data/glimpse.ts` (Home and Event pages) | LeaCon 1.0 photographs, landscape and portrait mixed |
| `team/` | `src/data/team.ts` and `assets.collective` | Portraits at 800×1000 or larger, `name.jpg`; `group.jpg` landscape for the team opening |
| `partners/` | `src/data/partners.ts` | Approved logos, PNG/SVG with transparency preferred |
| `products/` | `src/data/products.ts` and `assets.merchandise` | Official merchandise photography; `hero.jpg` landscape for the Shop opening |

Photography that is not part of a data file lives in one place: the `assets`
map in `src/config/site.ts`. Every entry starts with `src: null`, which is why
the site draws a designed plate instead of requesting anything. Set the `src`
to the file above and the photograph takes over at the same aspect ratio,
including the alt text.

Rules that the build assumes:

- Use only real, supplied, approved images. No stock, no generated event photos.
- Reference files with a root-absolute path, e.g. `/images/team/aya.jpg`.
- Keep the original aspect ratio in mind: every frame reserves its ratio in CSS,
  so a mismatched crop is visible immediately.
