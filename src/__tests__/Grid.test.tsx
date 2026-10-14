import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { VirtualizationGrid } from '../components/Grid';

function setViewport(element: HTMLElement, { width, height }: { width: number; height: number }) {
  Object.defineProperty(element, 'clientWidth', { configurable: true, value: width });
  Object.defineProperty(element, 'clientHeight', { configurable: true, value: height });
}

describe('VirtualizationGrid', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders only a window of a large grid', () => {
    render(
      <VirtualizationGrid
        dimensions={{ rowCount: 1000, columnCount: 1000 }}
        overscanCount={2}
        renderCell={(row, col) => `${row}:${col}`}
      />
    );

    expect(screen.getByText('0:0')).toBeInTheDocument();
    expect(screen.queryByText('999:999')).not.toBeInTheDocument();
    // jsdom reports a 0x0 viewport, so only the overscan window (rows/cols 0-2) remains.
    expect(screen.getAllByText(/^\d+:\d+$/)).toHaveLength(9);
  });

  it('sizes the scroll area from dimensions and estimated cell size', () => {
    const { container } = render(
      <VirtualizationGrid
        dimensions={{ rowCount: 10, columnCount: 20 }}
        estimatedRowHeight={30}
        estimatedColumnWidth={80}
        renderCell={() => null}
      />
    );

    const scrollArea = container.firstElementChild!.firstElementChild as HTMLElement;
    expect(scrollArea.style.height).toBe('300px');
    expect(scrollArea.style.width).toBe('1600px');
  });

  it('applies container and cell class names and styles', () => {
    const { container } = render(
      <VirtualizationGrid
        dimensions={{ rowCount: 1, columnCount: 1 }}
        renderCell={() => 'cell'}
        className="grid"
        style={{ height: 200 }}
        cellClassName="cell"
        cellStyle={{ color: 'red' }}
      />
    );

    const grid = container.firstElementChild as HTMLElement;
    expect(grid).toHaveClass('grid');
    expect(grid.style.height).toBe('200px');

    const cell = screen.getByText('cell');
    expect(cell).toHaveClass('cell');
    expect(cell.style.color).toBe('red');
  });

  it('moves the rendered window when scrolled', () => {
    const { container } = render(
      <VirtualizationGrid
        dimensions={{ rowCount: 1000, columnCount: 1000 }}
        estimatedRowHeight={50}
        estimatedColumnWidth={100}
        overscanCount={1}
        renderCell={(row, col) => `${row}:${col}`}
      />
    );

    const grid = container.firstElementChild as HTMLElement;
    setViewport(grid, { width: 300, height: 150 });
    grid.scrollTop = 5000;
    grid.scrollLeft = 10000;
    fireEvent.scroll(grid);

    expect(screen.getByText('100:100')).toBeInTheDocument();
    expect(screen.queryByText('0:0')).not.toBeInTheDocument();
  });
});
