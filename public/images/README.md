# Image drop-in folders

Put approved photography here and the site picks it up from the matching data
file. Nothing is requested until a data file points at a file, so these
folders may stay empty — and while they are empty, the sections that need
photographs hide themselves completely. No plates, no broken slots, no stock.

| Folder | Used by | Expected files |
| --- | --- | --- |
| `brand/` | `assets` in `src/config/site.ts` (hero / feature / moment) and `index.html` | `hero.jpg` (portrait 1200×1500+), `feature.jpg` (portrait 1200×1500+), `moment.jpg` (landscape 1200×800+), `og.jpg` (1200×630), favicon variants |
| `leacon-1/` | `src/data/gallery.ts` (Home roll and Event contact sheet) | LeaCon 1.0 photographs, landscape and portrait mixed |
| `team/` | `src/data/team.ts` and `assets.collective` | Portraits at 800×1000 or larger, `name.jpg`; `group.jpg` landscape for the Team opening |
| `partners/` | `src/data/partners.ts` | Approved logos, PNG/SVG with transparency preferred |

Photography that is not part of a data file lives in one place: the `assets`
map in `src/config/site.ts`. Every entry starts with `src: null`, which is
why the sections that need them do not render at all. Set the `src` to the
file above and the photograph takes over at the same aspect ratio,
including the alt text.

Rules that the build assumes:

- Use only real, supplied, approved images. No stock, no generated event
  photos.
- Reference files with a root-absolute path, e.g. `/images/team/aya.jpg`.
- Every frame reserves its ratio in CSS, so a mismatched crop is visible
  immediately.
- The entry sequence fills with `brand/hero.jpg` when it exists; without it
  the frame simply draws and the counter still runs.
