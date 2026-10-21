# LeaCon 2.0 — official website

A five-route editorial site for LeaCon 2.0, built to the website blueprint
(v3.1, concept "FRAMES"): a photographic roll of a site rather than a generic
event landing page. React 19 + Vite + TypeScript, no backend, no database, no
auth, **no shop**.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server. It takes the first free port and prints it (5173 is not guaranteed). |
| `npm run build` | Type-checks, then builds into `dist/`. |
| `npm run preview` | Serves the built `dist/`. |
| `npm run typecheck` | TypeScript only, no emit (both tsconfigs). |

QA scripts are Playwright-based and expect a running server. They default to
`http://localhost:5176` and can be pointed elsewhere with the `LEACON_BASE`
environment variable.

| Script | What it checks |
| --- | --- |
| `python scripts/capture_all.py` | Every route × 390 / 768 / 1440: full-page screenshots into `qa/v2/`, horizontal overflow, console errors. Plus one entry-sequence capture. |
| `python scripts/entry_shot.py` | The entry sequence mid-run (first visit, motion allowed). |
| `python scripts/qa_check.py` | Every route × five viewports: horizontal overflow, console errors, heading structure, screenshots. |
| `python scripts/a11y_check.py` | Tab order, skip link, menu open/Escape/focus return, reduced motion. |
| `python scripts/focus_probe.py` | Focus visibility, SPA route-change focus, deep-link hashes. |
| `python scripts/shot.py <route> [w] [h] [name] [view]` | One screenshot for review (`view` = viewport only). |
| `python scripts/shoot_sections.py` | Section-level screenshots. |

All screenshots and `qa/report.json` are written to `qa/`.

## Routes

`/` `/about` `/team` `/event` `/register` (plus a 404). Five pages, one
masthead, one footer, one type scale, one spacing scale. There is no shop
route, no shop link in the navigation or footer, and no merchandise data —
the shop was removed on purpose.

## Where facts live

Nothing about the event is written inside a component. Every fact is either
confirmed content or an explicit placeholder.

| File | Holds |
| --- | --- |
| `src/config/site.ts` | Edition tag, neutral tagline, registration URL, contact address, social links, and the `assets` photography map. |
| `src/data/programme.ts` | The four programme blocks and the recognition rows. |
| `src/data/team.ts` | Confirmed names, roles, bios and portraits. Empty until the organiser approves the roster. |
| `src/data/partners.ts` | Confirmed partners and approved logos. Empty until confirmed. |
| `src/data/gallery.ts` | LeaCon 1.0 photographs (Home roll, Event contact sheet). Empty until supplied. |
| `src/data/notes.ts` | The handwritten margin notes. |
| `src/data/faq.ts` | Verified questions and answers. |
| `src/data/strings.ts` | The pending-state lines. |

**Rules the build enforces:** leave a value `null` and the page hides the
field or states that it is pending. Do not add a date, venue, time, price,
deadline, speaker, partner, testimonial or theme slogan that has not been
published by the organisers. A value that is guessed is a bug, not a
placeholder.

**Photo-dependent sections hide themselves.** With no photograph supplied,
the hero photo, the LeaCon 1.0 roll and contact sheet, the Team group photo
and portraits, and the partner row do not render a plate or a broken slot —
they do not render at all. Each switches on automatically the moment its
data file carries a `src`.

## Photography

Put approved images in `public/images/` (see `public/images/README.md`).
Every image frame is sized by the data file, so layout does not move when a
photograph arrives.

- Gallery photography: `src/data/gallery.ts`
- Team portraits and group photo: `src/data/team.ts` + `assets.collective`
- Everything else (hero, feature, moment): the `assets` map in
  `src/config/site.ts`

## Fonts

Source of truth is `src/styles/tokens.css`.

- **Raleway** — text, loaded from `@fontsource`.
- **Lemon Milk** (display) and **AndYou** (handwritten accent) are licensed
  and are **not** in this repository. The site never claims they are loaded.
  Drop the `.woff2` files into `public/fonts/`, then uncomment the import in
  `src/main.tsx` (see `src/styles/licensed-fonts.css`).
- Until then the display fallback chain is *Archivo Variable* → *Arial Black*
  (recorded interim fallback, not a silent substitution) and the hand notes
  fall back to a system cursive.
- After installing Lemon Milk, re-check the footer wordmark cut
  (`.site-footer__mark` in `src/styles/chrome.css`): the `clip-path` is tuned to
  18% of the line box for the fallback's baseline, so that the cut lands just
  above the baseline and the letters still read **LEACON 2.0**. Verify against
  `scripts/mark_probe.py` with the real font.

## Design system

No component declares a colour, space, radius or duration of its own.

- **Palette:** exact contract — green `#166534`, forest `#123B2A`, paper
  `#F6F2E9`. Three surfaces only (paper ~60%, forest ~30%, green ~8%).
- **Form:** one radius (0), 2px borders, no shadows, no gradients except the
  text scrim over photographs.
- **Type:** display scale sized by the longest word; labels at 12px/0.1em.
- **Motion:** GSAP only (core, ScrollTrigger, Flip). The entry sequence,
  masked line reveals, frame-open lightbox, contact-sheet reveals, accent
  blocks, chapter index, page wipe and hand-drawn marks all read from one
  `enabled` switch.

### Motion rules (blueprint Part 9)

- Nothing important is hover-only; nothing is drag-only.
- No custom cursor, no "CLICK" button, no audio, no camera imagery — the
  recurring object is a photographic *frame*.
- Every animated element's final state lives in the HTML: GSAP animates
  *from* a hidden state, so pausing motion or killing JS leaves the page
  complete.
- Two switches stop everything: the OS `prefers-reduced-motion` setting and
  the visible **[ Pause motion ]** control in the footer (persisted).
- The entry sequence runs once per session, can be skipped with Skip /
  Escape / Enter, and never traps focus.

## Accessibility

Semantic landmarks and heading order, one `h1` per route, visible focus
(`:focus-visible`), keyboard-operable menu, accordion, lightbox (native
`<dialog>` with focus return) and frame strip, alt text on photographs,
decorative SVG hidden from assistive technology, and AA contrast throughout.
Where the blueprint's literal colour failed contrast — green strokes and the
active menu bar on forest sit at ~1.75:1 — the build uses paper instead; this
deviation is documented in `src/styles/chrome.css`.

## Deployment

Static-host friendly: clean URLs need an SPA fallback (Netlify `_redirects`,
Vercel rewrites, or any host's 404 fallback to `index.html`).
