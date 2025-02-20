# Simple Virtualization for React

## Overview

This package provides three powerful virtualization components for React applications:
1. `Virtualization`: A core component for rendering large lists efficiently
2. `VirtualizationTable`: A specialized component for handling large datasets in tabular format
3. `VirtualizationGrid`: A component for efficiently rendering large two-dimensional grids

All components are designed to optimize performance by rendering only the visible portions of your content.

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
- Compatible with older React versions via polyfills
- Binary search for efficient item positioning
- Scroll direction-aware rendering optimization

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
- Smooth scroll synchronization between sections
- Advanced sorting with null state support
- Optimized scroll event handling
- Automatic column width distribution

### VirtualizationGrid Features
- Efficient rendering of large two-dimensional data sets
- Independent row and column virtualization
- Customizable cell dimensions
- Dynamic viewport calculation
- Optimized scroll performance
- Flexible cell rendering API
- Customizable styling for grid and cells
- Built-in overscan support for smooth scrolling
- Efficient memory usage for large datasets
- Responsive to container size changes

## Installation

```bash
npm install simple-virtualization
# or
yarn add simple-virtualization
```

## Example App

The package includes a comprehensive example application that showcases all features of both the Virtualization and VirtualizationTable components. You can run the example locally using:

```bash
npm run example
```

The example app demonstrates:
- Basic and advanced usage of Virtualization component
- Table virtualization with sorting and custom column widths
- Dynamic height calculations
- Custom styling examples
- Performance optimization techniques
- Different types of content rendering
- Responsive design patterns
- Integration with TypeScript

## Basic Usage

### Virtualization Component

```typescript
import { Virtualization } from 'simple-virtualization';

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
import { VirtualizationTable } from 'simple-virtualization';

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

### VirtualizationGrid Component

```typescript
import { VirtualizationGrid } from 'simple-virtualization';

function DataGrid() {
  return (
    <VirtualizationGrid
      dimensions={{
        rowCount: 1000,
        columnCount: 1000
      }}
      estimatedColumnWidth={100}
      estimatedRowHeight={50}
      overscanCount={2}
      renderCell={(rowIndex, columnIndex) => (
        `Cell ${rowIndex},${columnIndex}`
      )}
      className="virtual-grid"
      style={{ height: '500px' }}
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

### VirtualizationGrid Props

```typescript
interface VirtualizationGridProps {
  dimensions: {
    rowCount: number;
    columnCount: number;
  };
  estimatedColumnWidth?: number;
  estimatedRowHeight?: number;
  overscanCount?: number;
  renderCell: (rowIndex: number, columnIndex: number) => React.ReactNode;
  className?: string;
  style?: CSSProperties;
  cellClassName?: string;
  cellStyle?: CSSProperties;
}
```

## Advanced Features

### Dynamic Height Calculation

Both list and table components automatically measure and adapt to varying content heights:

```typescript
<Virtualization
  items={items}
  estimatedItemHeight={50}  // Initial estimate
  // Heights are automatically measured and cached
/>
```

### Grid Cell Customization

```typescript
<VirtualizationGrid
  dimensions={{ rowCount: 100, columnCount: 100 }}
  cellStyle={{
    border: '1px solid #ccc',
    padding: '8px'
  }}
  renderCell={(row, col) => (
    <div className="custom-cell">
      {/* Custom cell content */}
    </div>
  )}
/>
```

### Table Sorting and Column Management

```typescript
<VirtualizationTable
  defaultSortColumn="name"
  defaultSortDirection="asc"
  columnWidths={['200px', '150px', '100px']}
  // Columns will resize proportionally when container width changes
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

### VirtualizationGrid Component
- Efficient viewport calculation
- Minimal cell re-rendering
- Optimized scroll handling
- Memory-efficient cell management
- Smart overscan implementation

## Browser Support

Supports all modern browsers with these features:
- ResizeObserver API
- RequestAnimationFrame
- CSS Grid
- Flexbox
- IntersectionObserver (optional)

## TypeScript Support

All components include comprehensive TypeScript definitions:

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
