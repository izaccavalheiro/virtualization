# simple-virtualization

[![CI](https://github.com/izaccavalheiro/virtualization/actions/workflows/ci.yml/badge.svg)](https://github.com/izaccavalheiro/virtualization/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/simple-virtualization.svg)](https://www.npmjs.com/package/simple-virtualization)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/simple-virtualization)](https://bundlephobia.com/package/simple-virtualization)
[![types included](https://img.shields.io/npm/types/simple-virtualization)](https://www.npmjs.com/package/simple-virtualization)
[![license: MIT](https://img.shields.io/npm/l/simple-virtualization.svg)](LICENSE)

Small, dependency-free React components for rendering large lists, tables and grids. Only the rows and cells in view are mounted.

- **Three components:** `Virtualization` (list with measured, variable heights), `VirtualizationTable` (sortable table) and `VirtualizationGrid` (2D grid).
- **Zero runtime dependencies.** Under 5 KiB gzipped, with a size budget enforced in CI.
- **Modern packaging:** ESM and CommonJS builds, TypeScript types for both, `sideEffects: false` for tree-shaking. Checked with [publint](https://publint.dev) and [Are the Types Wrong?](https://arethetypeswrong.github.io).
- **Supply chain:** releases are published from CI with [npm provenance](https://docs.npmjs.com/generating-provenance-statements).
- **Styling:** inline styles plus `className`/`style` props. No CSS to import, and it works with Tailwind, CSS Modules or any CSS-in-JS.

## Install

```bash
npm install simple-virtualization
```

You need `react` and `react-dom` 18 (`^18.0.0`) installed as peer dependencies.

## Quick start

```tsx
import { Virtualization } from 'simple-virtualization';

const items = Array.from({ length: 10_000 }, (_, i) => <p>Row {i}</p>);

export function List() {
  return <Virtualization items={items} estimatedItemHeight={40} style={{ height: 480 }} />;
}
```

> The scroll container needs a fixed height (`style`, `className` or a sized parent). Otherwise it grows to fit every item and nothing is virtualized.

## Components

### `Virtualization`

A vertical list. Item heights are measured after render and cached, so items do not need to share a height.

`items` accepts any mix of these:

| Item | Rendered as |
| --- | --- |
| `string` | Raw HTML (see [Security](#security)) |
| React element | As-is (hooks allowed) |
| `({ index }) => ReactNode` | Called as a plain function |
| `{ component \| render, props }` | `component({ ...props, index })` |

Function and object items are **called as functions, not mounted**, so they must not use hooks. If an item needs state or effects, pass it as an element: `<MyRow />`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `ReactComponentOrElement[]` | required | Content to render |
| `estimatedItemHeight` | `number` | `100` | Height used before an item is measured |
| `overscanCount` | `number` | `5` | Extra items rendered below the viewport |
| `initialRenderCount` | `number` | `20` | Items rendered on the first pass (and on the server) |
| `className` / `style` | `string` / `CSSProperties` | – | Scroll container |
| `itemClassName` / `itemStyle` | `string` / `CSSProperties` | – | Wrapper around each item |

### `VirtualizationTable`

A CSS-grid table built on `Virtualization`. It keeps the header, body and footer scrolled together horizontally, and sorts on click in the order asc → desc → original order.

```tsx
import { VirtualizationTable } from 'simple-virtualization';

type User = { id: number; name: string; score: number };

const users: User[] = Array.from({ length: 10_000 }, (_, i) => ({
  id: i,
  name: `User ${i}`,
  score: Math.round(Math.random() * 100),
}));

export function Users() {
  return (
    <VirtualizationTable<User>
      data={users}
      columnWidths={['240px', '120px']}
      tableHeight={500}
      Header={({ onSort, sortState }) => (
        <>
          <button onClick={() => onSort('name')}>Name {sortState.column === 'name' && sortState.direction}</button>
          <button onClick={() => onSort('score')}>Score {sortState.column === 'score' && sortState.direction}</button>
        </>
      )}
      Row={({ item }) => (
        <>
          <div>{item.name}</div>
          <div>{item.score}</div>
        </>
      )}
    />
  );
}
```

`Header` and `Row` should return one element per column, usually inside a fragment. Each element becomes a grid cell. `Row` is mounted as a normal component, so it can use hooks.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `T[]` | required | Row data |
| `Header` | `ComponentType<{ onSort, sortState }>` | required | Header cells. Call `onSort(key)` with a key of `T` |
| `Row` | `ComponentType<{ item: T; index }>` | required | Cells for one row |
| `Footer` | `ComponentType` | – | Optional footer |
| `columnWidths` | `string[]` | – | Pixel widths such as `'200px'`. Scaled up proportionally to fill a wider container |
| `tableHeight` | `string \| number` | `'400px'` | Height of the scrolling body |
| `estimatedRowHeight` | `number` | `40` | Initial row height estimate |
| `overscanCount` | `number` | `5` | Extra rows rendered below the viewport |
| `defaultSortColumn` / `defaultSortDirection` | `string` / `'asc' \| 'desc' \| null` | `''` / `null` | Initial sort |
| `footerDistributed` | `boolean` | `true` | `true` renders the footer as a block. `false` lays it out on the column grid |
| `style` / `headerStyle` / `rowStyle` / `footerStyle` | `CSSProperties` | – | Styles for the outer container, header, body wrapper and footer |

Sorting compares `item[column]` with `<`, so it works on strings, numbers and dates. To sort anything else, sort `data` yourself.

### `VirtualizationGrid`

A 2D grid virtualized on both axes. By default every cell has the same size.

```tsx
import { VirtualizationGrid } from 'simple-virtualization';

export function Sheet() {
  return (
    <VirtualizationGrid
      dimensions={{ rowCount: 1000, columnCount: 1000 }}
      estimatedRowHeight={32}
      estimatedColumnWidth={96}
      renderCell={(row, col) => `${row},${col}`}
      style={{ height: 500 }}
    />
  );
}
```

For rows or columns of different sizes, pass `getRowHeight` and/or `getColumnWidth`. Each returns a size in px for an index. You can set one axis and keep a fixed size on the other.

```tsx
const columnWidths = [240, 96, 96, 160];

export function Report() {
  const getColumnWidth = useCallback((col: number) => columnWidths[col], []);
  const getRowHeight = useCallback((row: number) => (row === 0 ? 48 : 32), []);

  return (
    <VirtualizationGrid
      dimensions={{ rowCount: 10_000, columnCount: columnWidths.length }}
      getColumnWidth={getColumnWidth}
      getRowHeight={getRowHeight}
      renderCell={(row, col) => `${row},${col}`}
      style={{ height: 500 }}
    />
  );
}
```

The grid calls the function once per row or column and caches the offsets until the function, the count or the fixed size changes. Keep the function stable with `useCallback` (or define it outside the component). To change sizes, pass a new function. Sizes are not measured from the content, so content larger than its cell overflows.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dimensions` | `{ rowCount; columnCount }` | required | Grid size |
| `renderCell` | `(row, col) => ReactNode` | required | Content for one cell |
| `estimatedRowHeight` / `estimatedColumnWidth` | `number` | `50` / `100` | Cell size in px for every row / column |
| `getRowHeight` / `getColumnWidth` | `(index) => number` | – | Size in px of each row / column. Takes precedence over the fixed size on that axis |
| `overscanCount` | `number` | `2` | Extra rows and columns rendered on each side |
| `className` / `style` | `string` / `CSSProperties` | – | Scroll container (defaults to `100%` × `100%` of its parent) |
| `cellClassName` / `cellStyle` | `string` / `CSSProperties` | – | Each cell |

## TypeScript

Prop types are exported from the package entry:

```ts
import type {
  VirtualizationProps,
  VirtualizationGridProps,
  GridDimensions,
  VirtualizationTableProps,
  SortState,
  SortDirection,
} from 'simple-virtualization';
```

For example, type a `VirtualizationTable` header outside the JSX with `VirtualizationTableProps<User>['Header']`, or receive `SortState` in your own components.

## Framework notes

- **Next.js App Router / React Server Components:** the package has no `"use client"` directive. Import it from a file that starts with `'use client'`.
- **SSR:** nothing reads `window` or `document` during render. `Virtualization` server-renders the first `initialRenderCount` items. React 18 logs a `useLayoutEffect` warning on the server for `VirtualizationGrid`.
- **Testing (Jest / Vitest with jsdom):** `VirtualizationTable` uses `ResizeObserver`, which jsdom does not provide, so stub it in your test setup. jsdom does no layout either, so expect only the initial render range.
- **Accessibility:** the markup is plain `div`s with no ARIA roles. Add `role="row"`, `role="columnheader"` and `role="cell"` (or real `<button>`s for sorting) in the content you render. As with any virtualized list, off-screen rows are not in the DOM, so in-page find and screen readers cannot reach them.

## Security

Strings in `items` are injected as HTML via `dangerouslySetInnerHTML`. Never pass untrusted strings. Pass React elements instead, or sanitize first, for example with [DOMPurify](https://github.com/cure53/DOMPurify). To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Limitations

- `VirtualizationGrid` does not measure cells. Sizes come from `estimatedRowHeight` / `estimatedColumnWidth` or from `getRowHeight` / `getColumnWidth`. For content-measured heights, use `Virtualization` or `VirtualizationTable`.

If you need headless hooks, horizontal or windowed-element scrolling, sticky rows, or React 19, a hook-based library such as [TanStack Virtual](https://tanstack.com/virtual) may suit you better.

## Development

```bash
npm ci
npm run example    # Vite demo app with all three components
npm run validate   # lint, typecheck, tests + coverage, build, size budget, package lint
```

Contributions are welcome, including AI-assisted ones. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and [AGENTS.md](AGENTS.md) for conventions and the SemVer contract. Release notes are in [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE) © Izac Cavalheiro
