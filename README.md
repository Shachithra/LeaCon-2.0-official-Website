# LeaCon 2.0 — official website

A six-route editorial site for LeaCon 2.0, built as "The Leadership Edition":
a contemporary publication about young leaders rather than a generic event
landing page. React 19 + Vite + TypeScript, no backend, no database, no auth.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. It takes the first free port and prints it (5173 is not guaranteed). |
| `npm run build` | Type-checks, then builds into `dist/`. |
| `npm run preview` | Serves the built `dist/`. |
| `npm run typecheck` | TypeScript only, no emit. |

QA scripts are Playwright-based and expect a running server. They default to
`http://localhost:5176` and can be pointed elsewhere with the `LEACON_BASE`
environment variable.

| Script | What it checks |
| --- | --- |
| `python scripts/qa_check.py` | Every route × five viewports: horizontal overflow, console errors, heading structure, screenshots. |
| `python scripts/a11y_check.py` | Tab order, skip link, menu open/Escape/focus return, reduced motion, disabled CTA state. |
| `python scripts/focus_probe.py` | Focus visibility, SPA route-change focus, deep-link hashes. |
| `python scripts/shot.py <route> [w] [h] [name] [view]` | One screenshot for review (`view` = viewport only). |
| `python scripts/shoot_sections.py` | Section-level screenshots. |

All screenshots and `qa/report.json` are written to `qa/`.

## Routes

`/` `/about` `/team` `/event` `/shop` `/register` (plus a 404). Each page has
its own composition; they share one masthead, footer, type scale and spacing
scale.

## Where facts live

Nothing about the event is written inside a component. Every fact is either
confirmed content or an explicit placeholder.

| File | Holds |
| --- | --- |
| `src/config/site.ts` | Edition label, neutral tagline, registration URL, contact address, social links, and the `assets` photography map. |
| `src/data/chapters.ts` | The four parts of the experience. |
| `src/data/team.ts` | Confirmed names, roles and portraits. Empty until the organiser approves the roster. |
| `src/data/partners.ts` | Confirmed partners and approved logos. |
| `src/data/products.ts` | Confirmed merchandise rows. |
| `src/data/glimpse.ts` | LeaCon 1.0 photographs. |

**Rules the build enforces:** leave a value `null` and the page hides the field
or states that it is pending. Do not add a date, venue, time, price, deadline,
speaker, partner, testimonial or theme slogan that has not been published by
the organisers. A value that is guessed is a bug, not a placeholder.

## Photography

Put approved images in `public/images/` (see `public/images/README.md`). Every
image frame is complete without its file: it renders a designed plate instead
of a broken slot, and switches to the photograph as soon as `src` is set —
aspect ratio and layout do not move.

- Data-file photography: `src/data/*`
- Everything else (cover, feature, moment, group, merchandise): the `assets`
  map in `src/config/site.ts`

## Design system

Source of truth is `src/styles/tokens.css`. No component declares a colour,
space, radius or duration of its own.

- **Palette:** primary green `#166534`, deep forest `#123B2A`, warm paper
  `#F6F2E9`. White, charcoal and muted grey support them; no other hue.
- **Type:** one 1.250 major-third scale.
  - *Lemon Milk* — display, and *AndYou* — handwritten accent, are licensed and
    not in this repository. Drop the `.woff2` files in, then uncomment the
    import in `src/main.tsx` (see `src/styles/licensed-fonts.css`). Until then
    Archivo Variable is the declared display fallback; it is not a silent
    substitution and must not be swapped without being recorded.
  - *Raleway* — text, loaded from `@fontsource`.
- **Form:** one radius (2px), no shadows, no gradients, no glassmorphism.
- **Motion:** three durations, two easings, and everything is disabled under
  `prefers-reduced-motion`.

## Accessibility

Semantic landmarks and heading order, one `h1` per route, visible focus
(`:focus-visible`), keyboard-operable menu and accordion, alt text on
informative images, decorative frames hidden from assistive technology, and AA
contrast throughout. `scripts/a11y_check.py` and `scripts/focus_probe.py`
verify this; both must report zero problems.
