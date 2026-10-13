# Architecture

## Current state

The solution is scaffolded (`cookie-co-intranet`, Heft toolchain) with one built web part, `Hero` (`src/webparts/hero/`), matching the mockup's banner section. Everything else in this document still describes the *intended* shape based on the home page mockup (`Cookie Co Intranet Home.dc.html`) and `Cookie_Co_SharePoint_Design_Brief.docx` — correct each row as its web part actually gets built.

See [`decisions.md`](./decisions.md) for why this project uses custom SPFx web parts rather than the out-of-the-box-only approach the original design brief assumed, and for the scaffolding decision itself.

## Shared component library

The mockup references a design-system namespace, `CookieCoDesignSystem_20b905.*`, with these components:

- `Button` (primary, pill-shaped, red fill — see [`design-tokens.md`](./design-tokens.md))
- `QuickLinkTile` (icon + label tile)
- `NewsCard` (image, category, title, date, author, excerpt)
- `Card` (circular/rounded image, title, short description — used for both product cards and generic content cards)
- `Callout` (label + body text, Blush Cream background — compliance/HR notices)
- `Footer` (logo, legal text)

**Intended approach:** build these as a shared React component library (e.g. `src/common/components/`) consumed by every web part, rather than duplicating styling per web part. This keeps the red/black/white system, pill buttons, and card anatomy consistent across web parts without re-implementing them each time — mirrors the "reusable component library" principle from the design brief's §7 (Component Library).

## Home page — section-to-web-part mapping

The mockup's home page reads top to bottom as:

| # | Section (mockup) | Design brief zone | Intended web part |
|---|---|---|---|
| 1 | Header: logo, nav, search, "Quick links" button | Top navigation (§7) | Native SharePoint nav + custom header/search web part, or theming of the standard suite bar |
| 2 | Hero: "Choc Chip Supreme is coming" | Hero (§6.1) | **Built** — `src/webparts/hero/`. Configurable via the property pane (tag, headline, subtext, button label/link, background image URL); falls back to a brand-colour gradient when no image is set. Defaults match the mockup's copy. |
| 3 | Countdown to launch (red band, live timer) | Not in design brief — mockup addition | Custom SPFx web part (client-side countdown against a configurable target date) |
| 4 | Quick links grid (Recipes & specs / Store ops / Marketing / People & HR) | Pillar shortcuts (§6.1) | Quick Links web part, 4 icon tiles |
| 5 | News + Documents two-column | Latest updates (§6.1) + Recipes & Specs hub pattern (§6.2) | News web part (list-backed) + a document-library card list |
| 6 | Launch pack product cards | Recipes & Specs hub card anatomy (§6.2) | Card grid web part, circle-cropped images |
| 7 | Food allergy warning callout | Compliance/HR notice (§6.1) | Highlighted Content / Callout web part, Blush Cream background |
| 8 | Loyalty promo band ("Your 10th coffee is free") | Loyalty/recognition promo (§6.1) | Call to Action / Hero (secondary) web part, red band |
| 9 | Footer | Footer (§7) | Custom or themed footer web part |

## Known gaps between the mockup and the design brief

Flagged here rather than silently resolved — confirm with whoever owns the IA before building nav:

- **Top nav differs.** Mockup: `Home · News · Documents · Recipes & Specs · Work tracker`. Design brief §3 proposes: `Home · News · Recipes & Specs · Store Operations · Marketing Hub`. These aren't the same five items — needs a decision, see [`decisions.md`](./decisions.md).
- **Countdown timer** and a dedicated **Documents** section (list of documents, separate from News) don't appear in the design brief's home page template — both are mockup additions worth confirming as intentional scope, not drift.
- **Data source.** The mockup hardcodes News and Documents content. Whether these should be wired to a real SharePoint Announcements list / document library (as the design brief's §6.1 "News web part, pulling from a central Announcements list" implies) or stay static longer-term is still open.

## Countdown timer

The mockup implements this as vanilla JS (`setInterval`, target date `2026-09-20T08:00:00+02:00` hardcoded in a `<script>` tag). In SPFx this should become a React component with the target date exposed as a web part property (property pane), not a hardcoded value, so content editors can reuse it for future launches without a code change.
