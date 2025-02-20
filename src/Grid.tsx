import React, { 
  useCallback, 
  useRef, 
  useState,
  useLayoutEffect,
  CSSProperties
} from 'react';

export interface GridDimensions {
  rowCount: number;
  columnCount: number;
}

export interface VirtualizationGridProps {
  dimensions: GridDimensions;
  estimatedColumnWidth?: number;
  estimatedRowHeight?: number;
  overscanCount?: number;
  renderCell: (rowIndex: number, columnIndex: number) => React.ReactNode;
  className?: string;
  style?: CSSProperties;
  cellClassName?: string;
  cellStyle?: CSSProperties;
}

export function VirtualizationGrid({
  dimensions,
  estimatedColumnWidth = 100,
  estimatedRowHeight = 50,
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

  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;

    const {
      scrollTop,
      scrollLeft,
      clientHeight,
      clientWidth
    } = containerRef.current;

    const rowStart = Math.floor(scrollTop / estimatedRowHeight);
    const rowEnd = Math.min(
      dimensions.rowCount - 1,
      Math.ceil((scrollTop + clientHeight) / estimatedRowHeight)
    );

    const columnStart = Math.floor(scrollLeft / estimatedColumnWidth);
    const columnEnd = Math.min(
      dimensions.columnCount - 1,
      Math.ceil((scrollLeft + clientWidth) / estimatedColumnWidth)
    );

    setVisibleRange({
      rowStart: Math.max(0, rowStart - overscanCount),
      rowEnd: Math.min(dimensions.rowCount - 1, rowEnd + overscanCount),
      columnStart: Math.max(0, columnStart - overscanCount),
      columnEnd: Math.min(dimensions.columnCount - 1, columnEnd + overscanCount)
    });
  }, [dimensions, estimatedRowHeight, estimatedColumnWidth, overscanCount]);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(calculateVisibleRange);
  }, [calculateVisibleRange]);

  useLayoutEffect(() => {
    calculateVisibleRange();
  }, [calculateVisibleRange]);

  const totalHeight = dimensions.rowCount * estimatedRowHeight;
  const totalWidth = dimensions.columnCount * estimatedColumnWidth;
  const topPadding = visibleRange.rowStart * estimatedRowHeight;
  const leftPadding = visibleRange.columnStart * estimatedColumnWidth;

  const rows: React.ReactNode[] = [];
  for (let rowIndex = visibleRange.rowStart; rowIndex <= visibleRange.rowEnd; rowIndex++) {
    const cells: React.ReactNode[] = [];
    
    for (let colIndex = visibleRange.columnStart; colIndex <= visibleRange.columnEnd; colIndex++) {
      cells.push(
        <div
          key={`${rowIndex}-${colIndex}`}
          className={cellClassName}
          style={{
            ...cellStyle,
            display: 'inline-block',
            width: estimatedColumnWidth,
            height: estimatedRowHeight,
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
          height: estimatedRowHeight,
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
