# Decision Log

Running log of decisions made during the build. Newest first. Add a dated entry whenever a non-obvious choice is made or changed — the reasoning matters more than the decision itself.

---

## 2026-10-13 — Countdown web part built

`src/webparts/countdown/`: red band with headline/subtext and a days/hrs/min/sec timer, per the mockup. Reuses the Hero patterns (no web font, no CDN, inline styles from the same palette).

1. **Target date is an ISO 8601 text field** (e.g. `2026-09-20T08:00:00+02:00`) with validation, rather than a PnP date/time picker — same "no new dependency" reasoning as the Hero image URL.
2. **Default target is the mockup's 2026-09-20 date, which has already passed**, so a freshly added web part shows the "finished" text ("We're open!") until an editor sets a new date.
3. **Palette constants are now duplicated** in `Hero.module.scss` and `Countdown.module.scss`; extract to `src/common/styles/_tokens.scss` before or with the next web part.

Compiles cleanly (`npx heft build`); not yet checked visually in the workbench.

## 2026-09-15 — Hero web part built

Replaced the generator's placeholder content in `src/webparts/hero/` with the real banner from the mockup (tag, headline, subtext, CTA button, background image), configurable via the property pane. Three implementation decisions worth carrying forward to the next web part:

1. **Background image is a plain URL text field**, not a `@pnp/spfx-property-controls` file picker — avoids a new npm dependency for now. Editors paste a URL to an image already uploaded to a Site Assets/Images library. Revisit if the authoring UX becomes a real friction point.
2. **No custom display font** — uses bold/uppercase/native-font styling rather than embedding a web font, per the design brief's own v1 recommendation ([`design-tokens.md`](./design-tokens.md#typography)); the licensed font family is still an open item.
3. **No external icon CDN** (e.g. unpkg) — the button's arrow is a small inline SVG bundled with the component, not fetched at runtime, consistent with the CSP/offline concern already flagged in [`architecture.md`](./architecture.md).

**How to apply:** reuse these three patterns for the remaining web parts (Countdown, Quick Links, News, Documents, Product cards, Callout, Promo band, Footer) unless a specific reason emerges to deviate.

## 2026-09-15 — SPFx solution scaffolded

Ran `yo @microsoft/sharepoint` to scaffold the real solution: name `cookie-co-intranet`, first web part `Hero` (React), Heft toolchain (default, no `--use-gulp`). Verified end-to-end: `npm install`, `npx heft build` (0 TypeScript errors), `npx heft trust-dev-cert`, and `npm run start` (webpack dev server at `https://localhost:4321/`) all worked cleanly on the already-installed toolchain (`@microsoft/generator-sharepoint@1.23.0`, `@rushstack/heft@1.2.17`, Node v22.23.1).

**Why `Hero` first:** matches the top of the home page mockup and the first row of `architecture.md`'s section-to-web-part mapping — a natural starting point rather than an arbitrary placeholder.

**Note:** the generator creates a new subfolder named after `--solution-name`; since `spfx-comps` is meant to be the solution root (not a container for it), the generated files were moved up one level immediately after scaffolding. See [`setup.md`](./setup.md#scaffolding) for the exact commands.

**How to apply:** `docs/setup.md` now reflects the real generated `package.json` scripts and confirmed working versions — treat that file, not this entry, as the source of truth for day-to-day commands.

## 2026-09-15 — Reusable cross-project SPFx template dropped from scope

Considered building a separate, generic SPFx + Heft project template (outside this project) for reuse on future client projects. Decided to abandon it for now and focus only on this project's documentation.

**Why:** premature to generalize tooling/structure before this project has an actual scaffolded solution to learn from.

**Revisit:** once `spfx-comps` has a working solution, it may be worth extracting the parts that turned out to be genuinely reusable (folder conventions, lint/prettier config, README checklist) into a template rather than starting from a blank guess.

## 2026-09-15 — Building custom SPFx web parts, not OOTB-only

`Cookie_Co_SharePoint_Design_Brief.docx` (§1, "Out of scope") explicitly assumed **out-of-the-box and PnP-supported web parts + theming only**, with "Custom SPFx development" called out as out of scope unless flagged. This project is instead building custom SPFx web parts (React + TypeScript + Heft).

**Why:** the home page mockup (`Cookie Co Intranet Home.dc.html`) relies on a bespoke component library (`CookieCoDesignSystem_20b905.*` — custom pill buttons, `NewsCard`, `QuickLinkTile`, circle-cropped `Card`, a live countdown timer, etc.) that OOTB web parts and theming alone can't reproduce faithfully. The design brief itself flags the fully-custom display typeface as a "v2 enhancement... pending brand/IT approval" achievable "if brand/IT later approve web-font embedding via SPFx" — i.e. it already anticipated SPFx might be needed for full brand fidelity.

**How to apply:** treat the design brief as the source of brand/content truth (palette, IA intent, voice, component patterns), but not as a constraint against custom code — SPFx web parts are the implementation vehicle here.

## 2026-09-15 — Heft over Gulp

Using Heft as the SPFx build toolchain instead of the legacy Gulp-based toolchain.

**Why:** Heft is Microsoft's current recommended toolchain for SPFx projects going forward.

**How to apply:** any tooling docs, npm scripts, or setup instructions should reference `heft build` / `heft test` / `heft start`, not `gulp serve`/`gulp bundle`.

## Open — navigation mismatch between mockup and design brief

Not yet resolved. See [`architecture.md`](./architecture.md#known-gaps-between-the-mockup-and-the-design-brief) for the detail: mockup nav is `Home · News · Documents · Recipes & Specs · Work tracker`, design brief proposes `Home · News · Recipes & Specs · Store Operations · Marketing Hub`. Needs a decision before the nav/IA is built, since the brand guidelines cap navigation at five items maximum.

## Open — News/Documents data source

Not yet resolved. Static (matching the mockup) vs. live SharePoint list/library data (matching the design brief's intent) is still an open question — decide before building those web parts.

## Carried-over open items from the brand/design source documents

Not decisions for this project to make — tracked here so they aren't lost, and so any values in [`design-tokens.md`](./design-tokens.md) are understood as provisional until these are resolved by Cookie Co.'s brand owner:

1. Exact hex/Pantone brand colour values (current palette is visually sampled from the public site, not sourced from brand files).
2. Licensed font family names for the display and body typefaces.
3. Vector logo source files (AI/EPS).
