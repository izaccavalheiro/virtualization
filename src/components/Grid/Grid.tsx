import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  CSSProperties,
  useEffect
} from 'react';
import { VirtualizationGridProps } from './Grid.types';
import { createGridAxis } from './gridAxis';

export function VirtualizationGrid({
  dimensions,
  estimatedColumnWidth = 100,
  estimatedRowHeight = 50,
  getColumnWidth,
  getRowHeight,
  overscanCount = 2,
  renderCell,
  className = '',
  style,
  cellClassName = '',
  cellStyle
}: VirtualizationGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [visibleRange, setVisibleRange] = useState({
    rowStart: 0,
    rowEnd: 10,
    columnStart: 0,
    columnEnd: 10
  });

  const { rowCount, columnCount } = dimensions;

  const rowAxis = useMemo(
    () => createGridAxis(rowCount, getRowHeight ?? estimatedRowHeight),
    [rowCount, getRowHeight, estimatedRowHeight]
  );

  const columnAxis = useMemo(
    () => createGridAxis(columnCount, getColumnWidth ?? estimatedColumnWidth),
    [columnCount, getColumnWidth, estimatedColumnWidth]
  );

  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const {
      scrollTop,
      scrollLeft,
      clientHeight,
      clientWidth
    } = containerRef.current;

    const rowStart = rowAxis.startIndexAt(scrollTop);
    const rowEnd = Math.min(
      rowCount - 1,
      rowAxis.endIndexAt(scrollTop + clientHeight)
    );

    const columnStart = columnAxis.startIndexAt(scrollLeft);
    const columnEnd = Math.min(
      columnCount - 1,
      columnAxis.endIndexAt(scrollLeft + clientWidth)
    );

    setVisibleRange({
      rowStart: Math.max(0, rowStart - overscanCount),
      rowEnd: Math.min(rowCount - 1, rowEnd + overscanCount),
      columnStart: Math.max(0, columnStart - overscanCount),
      columnEnd: Math.min(columnCount - 1, columnEnd + overscanCount)
    });
  }, [rowAxis, columnAxis, rowCount, columnCount, overscanCount]);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(calculateVisibleRange);
  }, [calculateVisibleRange]);

  useLayoutEffect(() => {
    calculateVisibleRange();
  }, [calculateVisibleRange]);

  const totalHeight = rowAxis.total;
  const totalWidth = columnAxis.total;
  const topPadding = rowAxis.offsetOf(visibleRange.rowStart);
  const leftPadding = columnAxis.offsetOf(visibleRange.columnStart);

  // The initial range is a guess made before layout; never render past the grid.
  const lastRow = Math.min(visibleRange.rowEnd, rowCount - 1);
  const lastColumn = Math.min(visibleRange.columnEnd, columnCount - 1);

  const rows: React.ReactNode[] = [];
  for (let rowIndex = visibleRange.rowStart; rowIndex <= lastRow; rowIndex++) {
    const cells: React.ReactNode[] = [];
    const rowHeight = rowAxis.sizeOf(rowIndex);

    for (let colIndex = visibleRange.columnStart; colIndex <= lastColumn; colIndex++) {
      cells.push(
        <div
          key={`${rowIndex}-${colIndex}`}
          className={cellClassName}
          style={{
            ...cellStyle,
            display: 'inline-block',
            width: columnAxis.sizeOf(colIndex),
            height: rowHeight,
            verticalAlign: 'top'
          }}
        >
          {renderCell(rowIndex, colIndex)}
        </div>
      );
    }

    rows.push(
      <div
        key={rowIndex}
        style={{
          height: rowHeight,
          whiteSpace: 'nowrap'
        }}
      >
        {cells}
      </div>
    );
  }

  const containerStyle: CSSProperties = {
    overflow: 'auto',
    width: '100%',
    height: '100%',
    ...style
  };

  useEffect(() => {
    const containerEl = containerRef.current;
    containerEl?.addEventListener('scroll', handleScroll);

    return () => {
      containerEl?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, width: totalWidth }}>
        <div style={{ paddingTop: topPadding, paddingLeft: leftPadding }}>
          {rows}
        </div>
      </div>
    </div>
  );
}
