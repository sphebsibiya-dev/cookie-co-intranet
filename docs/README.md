# Cookie Co Intranet — Project Documentation

Living documentation for the Cookie Co Intranet SharePoint site, built with SPFx (React + TypeScript) using the **Heft** build toolchain (not Gulp).

This is a working set of docs — update it as decisions are made and as the solution gets built, don't let it drift from reality.

## Status (2026-09-15)

- Home page **mockup only** — `Cookie Co Intranet Home.dc.html` (in the project root, one level up from `spfx-comps`) is a Claude Design canvas, not shipped code.
- `spfx-comps` (this folder) has **no SPFx solution scaffolded yet** — that's the next step after these docs.
- Source brand/design material already exists in the project root:
  - `Cookie_Co_Brand_UIUX_Guidelines.docx` — the underlying consumer-brand audit (colour, type, components, voice).
  - `Cookie_Co_SharePoint_Design_Brief.docx` — the brand guidelines translated into a SharePoint-specific design system (theme JSON, page templates, web part mapping).
  - `CookieCo_SharePoint_Theme.json` — a Fluent UI theme palette generated from the brand colours.

## Docs index

- [`architecture.md`](./architecture.md) — how the home page mockup maps to SPFx web parts/sections, and the shared component approach.
- [`design-tokens.md`](./design-tokens.md) — brand colour palette, typography, and the SharePoint theme, sourced from the brand/design-brief documents.
- [`decisions.md`](./decisions.md) — running decision log, including places where this project diverges from the original design brief.
- [`setup.md`](./setup.md) — local dev environment and prerequisites (to be filled in once the SPFx solution is scaffolded).

## Keeping this up to date

When a decision is made or changed (tooling, IA, data source, theming), record it in `decisions.md` with a date. When the actual web part structure changes, update `architecture.md` to match — treat mismatches between these docs and the real code as a bug to fix, not a doc problem to ignore.
