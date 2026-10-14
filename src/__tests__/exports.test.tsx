import React from 'react';
import { render } from '@testing-library/react';
import * as lib from '../index';
import type {
  GridDimensions,
  SortDirection,
  SortState,
  VirtualizationGridProps,
  VirtualizationProps,
  VirtualizationTableProps
} from '../index';

// Compile-time checks: ts-jest fails this file if a type is not exported from the entry point.
type Person = { name: string };

const listProps: VirtualizationProps = { items: ['<b>a</b>'], estimatedItemHeight: 20 };
const dimensions: GridDimensions = { rowCount: 2, columnCount: 2 };
const gridProps: VirtualizationGridProps = {
  dimensions,
  getRowHeight: (row) => 10 + row,
  renderCell: (row, col) => `${row}:${col}`
};
const direction: SortDirection = 'asc';
const sortState: SortState = { column: 'name', direction };
const tableProps: VirtualizationTableProps<Person> = {
  data: [{ name: 'Ada' }],
  Header: () => <span>{sortState.column}</span>,
  Row: ({ item }) => <span>{item.name}</span>
};

describe('package entry', () => {
  it('exports exactly the three components at runtime', () => {
    expect(Object.keys(lib).sort()).toEqual(['Virtualization', 'VirtualizationGrid', 'VirtualizationTable']);
  });

  it('accepts props typed with the exported prop types', () => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;

    const { container } = render(
      <>
        <lib.Virtualization {...listProps} />
        <lib.VirtualizationGrid {...gridProps} />
        <lib.VirtualizationTable {...tableProps} />
      </>
    );

    expect(container.textContent).toContain('0:0');
    expect(container.textContent).toContain('Ada');
  });
});
