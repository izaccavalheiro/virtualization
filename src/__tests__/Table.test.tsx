import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { VirtualizationTable } from '../components/Table';
import type { SortState } from '../components/Table/Table.types';

type Person = { name: string; age: number };

const people: Person[] = [
  { name: 'Carol', age: 41 },
  { name: 'Alice', age: 29 },
  { name: 'Bob', age: 35 },
];

function Header({ onSort, sortState }: { onSort: (column: string) => void; sortState: SortState }) {
  return (
    <>
      <button onClick={() => onSort('name')}>Name</button>
      <button onClick={() => onSort('age')}>Age</button>
      <span data-testid="sort-state">{`${sortState.column}:${sortState.direction}`}</span>
    </>
  );
}

function Row({ item }: { item: Person; index: number }) {
  return <div data-testid="row">{item.name}</div>;
}

const renderedNames = () => screen.getAllByTestId('row').map((row) => row.textContent);

describe('VirtualizationTable', () => {
  beforeAll(() => {
    // jsdom does not implement ResizeObserver.
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders header, rows and footer', () => {
    render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        Footer={() => <div>Total: {people.length}</div>}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(renderedNames()).toEqual(['Carol', 'Alice', 'Bob']);
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  it('omits the footer when none is given', () => {
    render(<VirtualizationTable data={people} Header={Header} Row={Row} />);
    expect(screen.queryByText(/Total/)).not.toBeInTheDocument();
  });

  it('cycles sorting asc -> desc -> none on the same column', () => {
    render(<VirtualizationTable data={people} Header={Header} Row={Row} />);
    const nameButton = screen.getByText('Name');

    fireEvent.click(nameButton);
    expect(screen.getByTestId('sort-state')).toHaveTextContent('name:asc');
    expect(renderedNames()).toEqual(['Alice', 'Bob', 'Carol']);

    fireEvent.click(nameButton);
    expect(screen.getByTestId('sort-state')).toHaveTextContent('name:desc');
    expect(renderedNames()).toEqual(['Carol', 'Bob', 'Alice']);

    fireEvent.click(nameButton);
    expect(screen.getByTestId('sort-state')).toHaveTextContent('name:null');
    expect(renderedNames()).toEqual(['Carol', 'Alice', 'Bob']);
  });

  it('restarts at ascending when switching columns', () => {
    render(<VirtualizationTable data={people} Header={Header} Row={Row} />);

    fireEvent.click(screen.getByText('Name'));
    fireEvent.click(screen.getByText('Name'));
    fireEvent.click(screen.getByText('Age'));

    expect(screen.getByTestId('sort-state')).toHaveTextContent('age:asc');
    expect(renderedNames()).toEqual(['Alice', 'Bob', 'Carol']);
  });

  it('honours the default sort column and direction', () => {
    render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        defaultSortColumn="age"
        defaultSortDirection="desc"
      />
    );

    expect(renderedNames()).toEqual(['Carol', 'Bob', 'Alice']);
  });

  it('uses the given column widths as the grid template', () => {
    const { container } = render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        columnWidths={['200px', '100px']}
      />
    );

    const grids = Array.from(container.querySelectorAll<HTMLElement>('div')).filter(
      (el) => el.style.display === 'grid'
    );
    expect(grids.length).toBeGreaterThan(0);
    grids.forEach((grid) => expect(grid.style.gridTemplateColumns).toBe('200px 100px'));
  });

  it('scales column widths up to fill a wider container', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 600,
      height: 400,
    } as DOMRect);

    const { container } = render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        columnWidths={['200px', '100px']}
      />
    );

    const header = container.querySelector<HTMLElement>('div[style*="grid"]')!;
    expect(header.style.gridTemplateColumns).toBe('400px 200px');
  });

  it('applies columnWidths changes after mount', () => {
    const { container, rerender } = render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        columnWidths={['200px', '100px']}
      />
    );

    rerender(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        columnWidths={['150px', '150px', '50px']}
      />
    );

    const header = container.querySelector<HTMLElement>('div[style*="grid"]')!;
    expect(header.style.gridTemplateColumns).toBe('150px 150px 50px');
  });

  it('falls back to the default template when columnWidths is removed', () => {
    const { container, rerender } = render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        columnWidths={['200px', '100px']}
      />
    );

    rerender(<VirtualizationTable data={people} Header={Header} Row={Row} />);

    const header = container.querySelector<HTMLElement>('div[style*="grid"]')!;
    expect(header.style.gridTemplateColumns).not.toContain('200px');
  });

  it('syncs horizontal scroll from the body to header and footer', () => {
    const { container } = render(
      <VirtualizationTable
        data={people}
        Header={Header}
        Row={Row}
        Footer={() => <div>footer</div>}
      />
    );

    const [header, body, footer] = Array.from(
      container.firstElementChild!.children
    ) as HTMLElement[];

    act(() => {
      body.scrollLeft = 120;
      fireEvent.scroll(body);
    });

    expect(header.scrollLeft).toBe(120);
    expect(footer.scrollLeft).toBe(120);
  });
});
