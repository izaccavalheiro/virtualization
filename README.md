# Simple Virtualization Component for React

## Overview

This package provides two powerful virtualization components for React applications:
1. `Virtualization`: A core component for rendering large lists efficiently
2. `VirtualizationTable`: A specialized component for handling large datasets in tabular format

Both components are designed to optimize performance by rendering only the visible portions of your content.

## Features

### Core Virtualization Features
- Dynamic viewport rendering
- Variable height item support
- Efficient scroll handling with requestAnimationFrame
- Support for multiple content types:
  - String content
  - React Elements
  - Function components
  - Complex components with props
- Customizable overscan (buffer) zones
- Automatic height calculation and caching
- Smooth scrolling optimization
- Isomorphic layout effect support
- Error boundary protection for item rendering

### VirtualizationTable Features
- Sortable columns with multiple states (asc/desc/none)
- Customizable header, row, and footer components
- Synchronized horizontal scrolling across sections
- Dynamic column width calculations
- Responsive design support
- Custom styling for all table sections
- Row virtualization for optimal performance
- Support for distributed footer layouts
- Built-in ResizeObserver integration
- TypeScript support with comprehensive types

## Installation

```bash
npm install react-virtualization
# or
yarn add react-virtualization
```

## Basic Usage

### Virtualization Component

```typescript
import { Virtualization } from 'react-virtualization';

function SimpleList() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

  return (
    <Virtualization
      items={items}
      className="virtual-list"
      estimatedItemHeight={40}
      overscanCount={5}
    />
  );
}
```

### VirtualizationTable Component

```typescript
import { VirtualizationTable } from 'react-virtualization';

function DataTable() {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random() * 100
  }));

  return (
    <VirtualizationTable
      data={data}
      Header={({ onSort, sortState }) => (
        <div className="header-row">
          <div onClick={() => onSort('name')}>Name</div>
          <div onClick={() => onSort('value')}>Value</div>
        </div>
      )}
      Row={({ item, index }) => (
        <>
          <div>{item.name}</div>
          <div>{item.value.toFixed(2)}</div>
        </>
      )}
      columnWidths={['200px', '150px']}
      tableHeight="500px"
    />
  );
}
```

## Component Props

### Virtualization Props

```typescript
interface VirtualizationProps {
  items: ReactComponentOrElement[];
  className?: string;
  itemClassName?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  overscanCount?: number;
  initialRenderCount?: number;
  estimatedItemHeight?: number;
}
```

### VirtualizationTable Props

```typescript
interface VirtualizationTableProps<T> {
  data: T[];
  Header: React.ComponentType<{
    onSort: (column: string) => void;
    sortState: SortState;
  }>;
  Footer?: React.ComponentType;
  Row: React.ComponentType<{ item: T; index: number }>;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  tableHeight?: string | number;
  estimatedRowHeight?: number;
  overscanCount?: number;
  columnWidths?: string[];
  footerDistributed?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: SortDirection;
}
```

## Advanced Features

### Dynamic Height Calculation

Both components automatically measure and adapt to varying content heights:

```typescript
<Virtualization
  items={items}
  estimatedItemHeight={50}  // Initial estimate
  // Heights are automatically measured and cached
/>
```

### Sorting in VirtualizationTable

```typescript
<VirtualizationTable
  data={data}
  defaultSortColumn="name"
  defaultSortDirection="asc"
  Header={({ onSort, sortState }) => (
    <div className="header-row">
      <div onClick={() => onSort('name')}>
        Name {sortState.column === 'name' ? sortState.direction : ''}
      </div>
    </div>
  )}
  // ...
/>
```

### Custom Column Widths

```typescript
<VirtualizationTable
  columnWidths={['200px', '150px', '100px']}
  // Columns will resize proportionally when container width changes
/>
```

### Scroll Synchronization

The table component automatically synchronizes horizontal scrolling between header, body, and footer sections:

```typescript
<VirtualizationTable
  Header={HeaderComponent}
  Footer={FooterComponent}
  // Horizontal scroll will be synchronized across all sections
/>
```

## Performance Optimizations

### Virtualization Component
- Binary search for efficient item positioning
- Cached height measurements
- Scroll direction-aware rendering
- Minimal DOM updates
- RequestAnimationFrame for smooth scrolling
- Stable callback optimizations

### VirtualizationTable Component
- Virtualized row rendering
- Optimized scroll synchronization
- Efficient column width calculations
- Debounced resize handling
- Memoized sorting operations

## Browser Support

Supports all modern browsers with these features:
- ResizeObserver API
- RequestAnimationFrame
- CSS Grid
- Flexbox

## TypeScript Support

Both components include comprehensive TypeScript definitions:

```typescript
// Example type usage
type YourDataType = {
  id: number;
  name: string;
  // ...
};

<VirtualizationTable<YourDataType>
  data={yourData}
  // TypeScript will ensure type safety
/>
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and feature requests, please use the GitHub issue tracker.