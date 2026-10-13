# Setup

## Prerequisites

Confirmed working on this machine (2026-09-15):

| Tool | Version |
|---|---|
| Node.js | v22.23.1 |
| npm | 10.9.8 |
| `@microsoft/generator-sharepoint` (global) | 1.23.0 |
| `yo` (global) | 7.0.1 |
| `@rushstack/heft` | 1.2.17 (project-local; `package.json` pins this via an `overrides` entry even though a newer `@rushstack/heft` may resolve transitively) |

`package.json` pins `"engines": { "node": ">=22.14.0 < 23.0.0" }` — Node 22.x is required; Node 23+ is not supported by this generated project.

No global tooling needs installing on a fresh machine beyond `yo` and `@microsoft/generator-sharepoint` — both were already present globally when this solution was scaffolded.

## Toolchain

This project uses **Heft**, not Gulp — see [`decisions.md`](./decisions.md#2026-09-15--heft-over-gulp) for why.

Actual `package.json` scripts as generated:

```bash
npm install                # install dependencies
npm run start               # alias for `heft start --clean` → `heft build-watch --serve`; serves against the SharePoint Workbench
npm run build                # `heft test --clean --production && heft package-solution --production`
npm run clean                 # `heft clean`
npm run eject-webpack          # `heft eject-webpack` — drop to a standalone webpack.config.js for full control
```

Other useful `heft` commands not wired into `package.json` scripts (run directly, e.g. `npx heft build`):

```bash
npx heft build                # compile + bundle without packaging or running tests
npx heft trust-dev-cert        # trust the local HTTPS dev certificate (needed once per machine)
npx heft package-solution       # produce the .sppkg package
```

## Scaffolding

This has already been done for this project (2026-09-15) — kept here for reference/future projects:

```bash
yo @microsoft/sharepoint \
  --solution-name "cookie-co-intranet" \
  --component-type "webpart" \
  --component-name "Hero" \
  --component-description "Cookie Co Intranet home page hero" \
  --framework "react" \
  --environment "spo" \
  --package-manager "npm" \
  --skip-install
```

Note: `yo @microsoft/sharepoint` creates a **new subfolder** named after `--solution-name`. Since `spfx-comps` itself is meant to be the solution root, the generated contents were moved up one level (`mv cookie-co-intranet/* .` then removing the now-empty subfolder) so `spfx-comps` holds `package.json`, `src/`, `config/`, etc. directly.

The `--use-gulp` flag was intentionally **not** passed — Heft is the default toolchain as of generator 1.23.0 and is what this project uses.

## Verified working (2026-09-15)

- `npm install` — completed (1309 packages; 8 moderate `npm audit` advisories, all in transitive SPFx-pinned dependencies — not addressed, since `npm audit fix --force` would break the versions SPFx 1.23 requires).
- `npx heft build` — clean build, 0 TypeScript errors.
- `npx heft trust-dev-cert` — certificate trusted.
- `npm run start` — webpack dev server started successfully at `https://localhost:4321/`. `config/serve.json`'s `initialPage` has since been set to the real dev/test site (`https://firstdigitaldev.sharepoint.com/sites/NewCookieLaunch/_layouts/workbench.aspx`), so `npm run start` now opens the **hosted** workbench directly rather than the local loopback one.

**Known Windows quirk:** stopping the `npm run start` process (e.g. via Ctrl+C, or a task-runner's "stop") doesn't always kill the underlying `node.exe` that `webpack-dev-server` spawns — it can keep holding port 4321. If a later `npm run start` fails with `EADDRINUSE: address already in use ::1:4321`, find and kill the stray process: `netstat -ano | grep 4321` (or `findstr` in PowerShell) to get its PID, then `taskkill //F //PID <pid>`.

## Theme

Once a site exists, apply `CookieCo_SharePoint_Theme.json` (project root, one level up from `spfx-comps`) as an organisation-level theme in the SharePoint Admin Center — see [`design-tokens.md`](./design-tokens.md#sharepoint-theme-json).
