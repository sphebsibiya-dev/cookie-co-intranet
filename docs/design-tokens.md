# Design Tokens

Sourced from `Cookie_Co_Brand_UIUX_Guidelines.docx` (consumer brand audit) and `Cookie_Co_SharePoint_Design_Brief.docx` (SharePoint-specific translation). See [`decisions.md`](./decisions.md) for open items affecting these values.

> All hex values below were **visually sampled** from the public cookieco.co.za site, not taken from original brand source files. Treat them as close approximations until confirmed by Cookie Co.'s brand owner — see "Open items" at the bottom of this file.

## Colour palette

| Name | Hex | Usage |
|---|---|---|
| Cookie Red | `#A82C2C` | Primary brand colour — hero banners, primary buttons, section dividers, nav active state. Hero moments only, never a full-page/body-text background. |
| Ink Black | `#111111` | Wordmark, headlines, body copy on white, footer background. |
| Paper White | `#FFFFFF` | Primary background; text colour on red/black. |
| Blush Cream | `#FBEAEA` | Soft callout backgrounds — compliance/HR/allergy notices. |
| Cookie-Co Pink | `#E23874` | Inline text links only ("Read more"). Never a button, banner, or large-area fill. |
| Warm Grey | `#6B6B6B` | Secondary body copy, captions, metadata, last-modified dates. |

**Usage principles:**
- Red carries the most visual weight — reserve it for hero moments, primary CTAs, and section banners so it keeps its impact.
- Black/white carry the majority of reading text, keeping product photography as the visual focus.
- Pink is a link/accent colour only — never a button or banner fill.
- Avoid introducing additional saturated hues (blue, green, purple) into UI chrome.

## SharePoint theme JSON

`CookieCo_SharePoint_Theme.json` (project root) is the full Fluent UI theme generated from the palette above:

```json
{
    "themePrimary": "#A82C2C",
    "themeLighterAlt": "#F9F1F1",
    "themeLighter": "#F3E2E2",
    "themeLight": "#EBCDCD",
    "themeTertiary": "#CC8484",
    "themeSecondary": "#B34747",
    "themeDarkAlt": "#982828",
    "themeDark": "#7E2121",
    "themeDarker": "#601919",
    "neutralPrimary": "#111111",
    "neutralSecondary": "#585858",
    "white": "#FFFFFF"
}
```

The design brief's simpler theme snippet (for the SharePoint Admin Center theme UI) maps `link` to the Cookie-Co Pink accent (`#E23874`) — worth reconciling with the fuller Fluent palette above when the theme is actually applied to the tenant.

Apply as an **organisation-level theme** in the SharePoint Admin Center so it's available to any future site, not just this one.

## Typography

| Role | Style | Used for |
|---|---|---|
| Display / headline | Bold, rounded, slightly hand-drawn display face, all-caps | Hero titles, section banners, page titles — short bursts of copy only, never long paragraphs |
| Body / UI | Clean geometric/humanist sans-serif, sentence case | Paragraph copy, nav labels, card/product descriptions, buttons |

- SharePoint modern pages render in the tenant's configured font (Segoe UI-based by default) and don't support a fully custom display face without SPFx. The design brief treats a bold/all-caps/largest-heading-size native style as the pragmatic v1 stand-in for the display face, with true web-font embedding (matching the mockup's `--font-display`) as a v2 enhancement pending brand/IT approval.
- Use **bold weight, not colour**, to distinguish item names from descriptions in cards.
- Keep body copy left-aligned; centre-alignment is reserved for short, hero-style statements.

## Iconography

- Single-weight outline (line) icons, rounded stroke caps, no fill.
- White icons on red/dark backgrounds; red or black icons on white backgrounds.
- Pair every icon with a short, bold, all-caps label beneath it (matches the Cookies/Coffee/Candy pattern and the mockup's Quick Link tiles).
- Keep stroke weight consistent within one icon set — don't mix thin and bold strokes in the same row.

## Components (brand pattern → SharePoint/SPFx equivalent)

| Component | Brand spec | SharePoint/SPFx equivalent |
|---|---|---|
| Primary button | Pill-shaped, Cookie Red fill, bold white label, no border | `Button` component in the mockup's design system; no square or outline buttons for primary actions |
| Text link | Cookie-Co Pink, bold, no underline (underline only on hover) | Standard link styling, pink accent |
| Section banner | Full-width red band, centred white heading + one supporting sentence | `Callout`/section-banner pattern used between mockup sections |
| Card | Circular or rounded-square image, bold title, one grey description line | `Card` / `NewsCard` components in the mockup |
| Callout / compliance panel | Blush Cream, rounded corners, bold black label + plain text | `Callout` component (allergy warning in the mockup) |
| Loyalty / promo block | Red band, physical-card illustration, benefit-first headline with one bold emphasis word | Loyalty promo section in the mockup |

## Accessibility notes

- Verify Cookie Red on white / white-on-red against WCAG AA (4.5:1 body text, 3:1 large text) once exact hex values are confirmed — current sampled `#A82C2C` is close to the threshold.
- Check the pink accent link colour for contrast before using it at body-text size; keep it to short, bold, larger link phrases as done today.
- Never rely on colour alone to convey meaning (the allergy/compliance callout pairs colour with a distinct shape + bold label, not colour alone).
- Minimum 44×44px tap targets for all buttons and card links (shared back-of-house tablet/phone use).

## Open items (carried from the brand guidelines / design brief)

These are still unresolved as of the source documents (September 2026) — flag before treating any value above as final:

1. Exact hex/Pantone values — current palette is visually sampled from site screenshots, pending brand-owner sign-off.
2. Licensed font family names for the display and body typefaces (so SharePoint and print stay in sync).
3. Vector logo source files (AI/EPS) for the site header, favicon, and any print collateral.
