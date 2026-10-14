# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Minor release: new optional props and new type exports. Existing props, defaults and the `peerDependencies` range are unchanged.

### Added

- Prop types are now exported from the package entry: `VirtualizationProps`, `VirtualizationGridProps`, `GridDimensions`, `VirtualizationTableProps`, `SortState` and `SortDirection`. These are type-only exports, so the runtime exports are unchanged.
- `VirtualizationGrid` supports variable row heights and column widths through the new optional `getRowHeight(rowIndex)` and `getColumnWidth(columnIndex)` props. Each one takes precedence over `estimatedRowHeight` / `estimatedColumnWidth` on its axis. Without them, the grid renders exactly as before.

### Fixed

- `VirtualizationGrid` no longer calls `renderCell` for rows or columns outside `dimensions`. Before layout, the first render (and server rendering) used a fixed 11 × 11 window, so a 3 × 2 grid called `renderCell` with indexes such as `(10, 10)` and rendered empty cells for them.

## [1.0.18] - 2026-10-14

No public API changes. Component props, defaults and the `peerDependencies` range are unchanged.

### Fixed

- `Virtualization` now handles `items` whose length changes after mount. Before this fix, its internal helpers kept the first render's item count, so items added later were never rendered and removing items left the scroll height too tall. The `key={items.length}` remount workaround is no longer needed.
- `Virtualization` now actually virtualizes. A stale total height made it treat every scroll position as "near the bottom", so it rendered every item from the scroll position to the end of the list. It now renders only the items near the viewport. **Heads-up:** items far below the viewport are no longer in the DOM. If your tests or features (for example browser find-in-page) relied on them being there, they will notice.
- `Virtualization` now passes the correct absolute `index` to function items and `{ component | render }` items after scrolling. Previously the index was relative to the first rendered item. This also fixes the `index` that `VirtualizationTable` passes to `Row`.
- `Virtualization` now picks up changes to `estimatedItemHeight` and `overscanCount` after mount.
- `VirtualizationTable` now applies changes to the `columnWidths` prop after mount, including removing it.
- `VirtualizationTable` no longer puts an `&::-webkit-scrollbar` key in an inline style. React ignored it, so nothing changes visually.

## [1.0.17] - 2026-10-14

First release since 1.0.15. Version 1.0.16 was tagged but never published to npm.

No public API changes. Component props, defaults, rendered output and the `peerDependencies` range are unchanged.

### Fixed

- The bundle no longer inlines `react/jsx-runtime`. The ES build drops from 33.2 kB to 11.4 kB (9.7 kB to 3.5 kB gzipped) and no longer references `process.env.NODE_ENV`, so it works in unbundled browser ESM.
- Type declarations now resolve under `moduleResolution: "node16"` / `"nodenext"`. Previously they used extensionless relative imports that failed to resolve.
- CommonJS consumers (`require`) now get CommonJS-flavoured type declarations (`dist/index.d.cts`) instead of ESM ones.
- Test files' type declarations are no longer published in the package.
- README rewritten to match the actual behaviour. It drops claims the code does not support (polyfills for older React, error boundaries, IntersectionObserver, debounced resize). It fixes the `VirtualizationTable` example, which wrapped header cells in a single grid item, and adds props tables with defaults, Next.js/SSR/testing/accessibility notes and known limitations.

### Added

- `sideEffects: false`, `repository` and `bugs` fields in `package.json`.
- CI on every push and PR: ESLint, typecheck, tests with coverage floors, `dist/` sync check, bundle size budget, publint, are-the-types-wrong, a packed-tarball smoke test against React 18.0.0 and latest 18.x, a Node.js LTS matrix, dependency review and CodeQL.
- Tag-driven release workflow that publishes to npm with provenance through trusted publishing, gated on the full CI suite.
- Unit tests for `VirtualizationGrid` and `VirtualizationTable`.
- Contributor and AI-agent documentation: `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` (including an AI-assisted contributions policy), `SECURITY.md`, `CODE_OF_CONDUCT.md`, issue/PR templates, Dependabot.

## [1.0.15] - 2025-05-03

Earlier releases (1.0.0 to 1.0.15) predate this changelog; see the [commit history](https://github.com/izaccavalheiro/virtualization/commits/main).

[Unreleased]: https://github.com/izaccavalheiro/virtualization/compare/v1.0.18...HEAD
[1.0.18]: https://github.com/izaccavalheiro/virtualization/releases/tag/v1.0.18
[1.0.17]: https://github.com/izaccavalheiro/virtualization/releases/tag/v1.0.17
[1.0.15]: https://www.npmjs.com/package/simple-virtualization/v/1.0.15
