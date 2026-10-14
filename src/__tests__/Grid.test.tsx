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

  it('never renders cells outside the dimensions', () => {
    const renderCell = jest.fn(() => null);
    render(<VirtualizationGrid dimensions={{ rowCount: 3, columnCount: 2 }} renderCell={renderCell} />);

    for (const [row, col] of renderCell.mock.calls as unknown as [number, number][]) {
      expect(row).toBeLessThan(3);
      expect(col).toBeLessThan(2);
    }
  });

  describe('variable cell sizes', () => {
    // Rows 0-499 are 20px tall, rows 500+ are 80px. Columns alternate 100px / 200px.
    const getRowHeight = (row: number) => (row < 500 ? 20 : 80);
    const getColumnWidth = (col: number) => (col % 2 === 0 ? 100 : 200);

    it('sizes the scroll area and cells from the size functions', () => {
      const { container } = render(
        <VirtualizationGrid
          dimensions={{ rowCount: 1000, columnCount: 10 }}
          getRowHeight={getRowHeight}
          getColumnWidth={getColumnWidth}
          estimatedRowHeight={999}
          estimatedColumnWidth={999}
          renderCell={(row, col) => `${row}:${col}`}
        />
      );

      const scrollArea = container.firstElementChild!.firstElementChild as HTMLElement;
      expect(scrollArea.style.height).toBe('50000px');
      expect(scrollArea.style.width).toBe('1500px');

      expect(screen.getByText('0:0').style.width).toBe('100px');
      expect(screen.getByText('0:1').style.width).toBe('200px');
      expect(screen.getByText('0:1').style.height).toBe('20px');
    });

    it('finds the rendered window by offset when scrolled', () => {
      const { container } = render(
        <VirtualizationGrid
          dimensions={{ rowCount: 1000, columnCount: 100 }}
          getRowHeight={getRowHeight}
          getColumnWidth={getColumnWidth}
          overscanCount={1}
          renderCell={(row, col) => `${row}:${col}`}
        />
      );

      const grid = container.firstElementChild as HTMLElement;
      setViewport(grid, { width: 300, height: 150 });
      // Row 510 starts at 500 * 20 + 10 * 80 = 10800; column 20 starts at 10 * 300 = 3000.
      grid.scrollTop = 10800;
      grid.scrollLeft = 3000;
      fireEvent.scroll(grid);

      expect(screen.getByText('510:20')).toBeInTheDocument();
      expect(screen.getByText('510:20').style.height).toBe('80px');
      expect(screen.getByText('509:19')).toBeInTheDocument();
      expect(screen.queryByText('508:20')).not.toBeInTheDocument();
      expect(screen.queryByText('510:18')).not.toBeInTheDocument();

      const window = grid.firstElementChild!.firstElementChild as HTMLElement;
      expect(window.style.paddingTop).toBe('10720px');
      expect(window.style.paddingLeft).toBe('2800px');
    });

    it('mixes a size function on one axis with a fixed size on the other', () => {
      const { container } = render(
        <VirtualizationGrid
          dimensions={{ rowCount: 4, columnCount: 3 }}
          getRowHeight={(row) => (row + 1) * 10}
          estimatedColumnWidth={70}
          renderCell={(row, col) => `${row}:${col}`}
        />
      );

      const scrollArea = container.firstElementChild!.firstElementChild as HTMLElement;
      expect(scrollArea.style.height).toBe('100px');
      expect(scrollArea.style.width).toBe('210px');
      expect(screen.getByText('2:2').style.height).toBe('30px');
      expect(screen.getByText('2:2').style.width).toBe('70px');
    });
  });
});
