# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Copilot, Cursor, Gemini, etc.) and humans working in this repository. Tool-specific files such as [CLAUDE.md](CLAUDE.md) import this file; keep shared guidance here.

## Project

`simple-virtualization` is a zero-dependency React library published to npm. It exports exactly three components from [src/index.ts](src/index.ts):

| Export | Source | What it does |
| --- | --- | --- |
| `Virtualization` | [src/components/Virtualization/](src/components/Virtualization/) | Vertical list with variable, measured item heights. Accepts strings (rendered as HTML), elements, function components and `{ component \| render, props }` objects. |
| `VirtualizationGrid` | [src/components/Grid/](src/components/Grid/) | 2D grid with fixed `estimatedRowHeight` × `estimatedColumnWidth` cells, virtualized on both axes. |
| `VirtualizationTable` | [src/components/Table/](src/components/Table/) | CSS-grid table built on top of `Virtualization`, with sorting (asc → desc → none), synced horizontal scroll and proportional column widths. |

`react` and `react-dom` `^18.0.0` are **peer** dependencies. There are no runtime dependencies; keep it that way.

## Commands

Use the Node version in [.node-version](.node-version). Always `npm ci`, never `npm install` without a reason (lockfile is committed).

| Task | Command |
| --- | --- |
| Install | `npm ci` |
| Lint (ESLint, warnings ratcheted via `--max-warnings`) | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Unit tests | `npm test` / `npm run test:coverage` |
| Single test file | `npx jest src/__tests__/Table.test.tsx` |
| Build `dist/` | `npm run build` |
| Bundle size budget | `npm run size-check` |
| Validate package exports/types (publint + attw) | `npm run lint:package` |
| Install the packed tarball and render it (ESM + CJS) | `npm run test:smoke` |
| **Everything CI runs** | `npm run validate` |
| Example app (Vite) | `npm run example` |

## Definition of done

A change is ready when:

1. `npm run validate` passes locally.
2. `dist/` is rebuilt and committed if anything under `src/` changed. `dist/` is tracked in git on purpose; CI fails when it is out of sync with `src/`.
3. Tests cover the behaviour you added or changed (tests live in [src/__tests__/](src/__tests__/), React Testing Library + Jest/jsdom).
4. [CHANGELOG.md](CHANGELOG.md) has an entry under `## [Unreleased]`.

## Compatibility contract (SemVer)

This package follows [Semantic Versioning](https://semver.org). The public API is:

- the three named exports above and the shape/behaviour of their props;
- the `exports`, `main`, `module` and `types` entry points in [package.json](package.json);
- the supported `peerDependencies` range.

| Change | Release |
| --- | --- |
| Bug fix, internal refactor, docs, tooling, CI, smaller bundle, more accurate types that accept the same inputs | patch |
| New optional prop, new export (including exporting prop types), new feature | minor |
| Removing/renaming a prop or export, changing a default value, changing rendered DOM structure consumers may style against, narrowing the peer range, dropping a module format | major |

When unsure, treat it as the higher bump and say so in the PR. Never bump `version` in [package.json](package.json) as part of a feature change; releases are separate (see [CONTRIBUTING.md](CONTRIBUTING.md#releasing)).

## Code conventions

- TypeScript `strict`. Function components and hooks only. Named exports only.
- **Every `.tsx` file must `import React from 'react'`.** The build uses the classic JSX runtime (`React.createElement`) so `react/jsx-runtime` is never bundled; `tsconfig.json` uses `"jsx": "react"` so `tsc` fails if `React` is not in scope.
- Styling is inline `CSSProperties` objects. Do not add CSS files or CSS-in-JS dependencies.
- Props types live in `<Component>.types.ts` next to the component. Each component folder has an `index.ts` barrel.
- Keep components SSR-safe: no `window`/`document` access during render, only in effects and handlers.
- Match the existing style of the file you are editing (2-space indent, single quotes, semicolons); see [.editorconfig](.editorconfig).

## Known issues (do not "fix" incidentally)

These are tracked deliberately and should be fixed in focused PRs with tests, because they change runtime behaviour:

- `Virtualization.tsx` uses `useCallback(..., [])` for position/range helpers, so they capture the first render's `items.length`, `totalHeight`, `estimatedItemHeight` and `overscanCount`. Changing `items` length after mount can produce wrong ranges. These show up as `react-hooks/exhaustive-deps` warnings.
- `Table.tsx` puts pseudo-selectors (`'&::-webkit-scrollbar'`) in inline styles; React ignores them and warns in development.
- `Table.tsx` `calculateColumnWidths` ignores later changes to the `columnWidths` prop.
- Prop types (`VirtualizationProps`, etc.) are not exported from the package entry. Exporting them is a **minor** release.

The ESLint warning count is capped in the `lint` script. If you fix a warning, lower the `--max-warnings` number in [package.json](package.json); never raise it.

## Safety rules for agents

- Do not run `npm publish`, create git tags, or push to `main`. Releases go through the tag-triggered [release workflow](.github/workflows/release.yml).
- Do not edit files in `dist/` by hand. Regenerate with `npm run build`.
- Do not add runtime `dependencies`. Dev tooling goes in `devDependencies`.
- Do not modify `package-lock.json` by hand.
- Do not lower coverage thresholds in [jest.config.ts](jest.config.ts) or raise the lint warning cap to make CI pass.
- Do not change public prop names, defaults or the `peerDependencies` range without an explicit request; see the compatibility contract above.
