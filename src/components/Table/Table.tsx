import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Virtualization } from '../..';
import { CSSPropertiesWithPseudo, SortState, VirtualizationTableProps } from './Table.types';

export function VirtualizationTable<T>({
  data,
  Header,
  Footer,
  Row,
  style = {},
  headerStyle = {},
  footerStyle = {},
  rowStyle = {},
  tableHeight = '400px',
  estimatedRowHeight = 40,
  overscanCount = 5,
  columnWidths: initialColumnWidths,
  footerDistributed = true,
  defaultSortColumn = '',
  defaultSortDirection = null
}: VirtualizationTableProps<T>) {
  const [columnCount] = useState<number>(0);
  const [columnWidths, setColumnWidths] = useState<string[]>(initialColumnWidths || []);
  const [sortState, setSortState] = useState<SortState>({
    column: defaultSortColumn,
    direction: defaultSortDirection
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const footerWrapperRef = useRef<HTMLDivElement>(null);

  const calculateColumnWidths = useCallback(() => {
    if (!headerWrapperRef.current || !containerRef.current || !initialColumnWidths) {
      return;
    }

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const scrollbarWidth = (bodyWrapperRef.current?.offsetWidth && bodyWrapperRef.current?.clientWidth && (bodyWrapperRef.current?.offsetWidth - bodyWrapperRef.current?.clientWidth)) || 0;
    const availableWidth = containerWidth - scrollbarWidth;

    const totalSpecifiedWidth = initialColumnWidths.reduce((sum, width) => {
      return sum + parseInt(width, 10);
    }, 0);

    if (availableWidth > totalSpecifiedWidth) {
      const scale = availableWidth / totalSpecifiedWidth;
      const newColumnWidths = initialColumnWidths.map(width => {
        const scaledWidth = Math.floor(parseInt(width, 10) * scale);
        return `${scaledWidth}px`;
      });
      setColumnWidths(newColumnWidths);
    } else {
      setColumnWidths(initialColumnWidths);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        calculateColumnWidths();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateColumnWidths]);

  useEffect(() => {
    requestAnimationFrame(() => {
      calculateColumnWidths();
    });
  }, [calculateColumnWidths]);

  const gridTemplateColumns = columnWidths.length > 0
    ? columnWidths.join(' ')
    : `repeat(${columnCount}, 1fr)`;

  const totalWidth = columnWidths.reduce((sum, width) => {
    const numWidth = parseInt(width);
    return sum + (isNaN(numWidth) ? 0 : numWidth);
  }, 0);

  const baseStyles: {[a: string]: CSSPropertiesWithPseudo} = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      ...style
    },
    headerWrapper: {
      position: 'relative',
      overflow: 'auto',
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: '#fff',
      width: '100%',
      ...headerStyle
    },
    bodyWrapper: {
      position: 'relative',
      height: tableHeight,
      overflow: 'auto',
      width: '100%',
      ...rowStyle
    },
    footerWrapper: {
      position: 'relative',
      overflow: 'auto',
      borderTop: '1px solid #e2e8f0',
      backgroundColor: '#fff',
      width: '100%',
      ...footerStyle
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns,
      width: containerRef.current && initialColumnWidths
        ? Math.max(
            containerRef.current.getBoundingClientRect().width,
            initialColumnWidths.reduce((sum, width) => sum + parseInt(width, 10), 0)
          ) + 'px'
        : '100%'
    }
  };

  const [scrollLeft, setScrollLeft] = useState(0);

  const syncHorizontalScroll = useCallback((scrollLeft: number) => {
    setScrollLeft(scrollLeft);
    requestAnimationFrame(() => {
      if (headerWrapperRef.current) {
        headerWrapperRef.current.scrollLeft = scrollLeft;
      }
      if (bodyWrapperRef.current) {
        bodyWrapperRef.current.scrollLeft = scrollLeft;
      }
      if (footerWrapperRef.current) {
        footerWrapperRef.current.scrollLeft = scrollLeft;
      }
    });
  }, []);

  const handleScroll = useCallback((event: Event) => {
    const newScrollLeft = (event.target as HTMLDivElement).scrollLeft;
    if (newScrollLeft !== scrollLeft) {
      syncHorizontalScroll(newScrollLeft);
    }
  }, [scrollLeft, syncHorizontalScroll]);

  useEffect(() => {
    const headerEl = headerWrapperRef.current;
    const bodyEl = bodyWrapperRef.current;
    const footerEl = footerWrapperRef.current;

    headerEl?.addEventListener('scroll', handleScroll);
    bodyEl?.addEventListener('scroll', handleScroll);
    footerEl?.addEventListener('scroll', handleScroll);

    return () => {
      headerEl?.removeEventListener('scroll', handleScroll);
      bodyEl?.removeEventListener('scroll', handleScroll);
      footerEl?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleSort = (column: string) => {
    setSortState(prevState => ({
      column,
      direction: 
        prevState.column === column
          ? prevState.direction === 'asc'
            ? 'desc'
            : prevState.direction === 'desc'
              ? null
              : 'asc'
          : 'asc'
    }));
  };

  const sortedData = React.useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortState.column as keyof T];
      const bValue = b[sortState.column as keyof T];

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState.column, sortState.direction]);

  const renderableItems = sortedData.map((item) => ({
    component: ({ index: virtualIndex }: { index: number }) => (
      <div style={baseStyles.gridContainer}>
        <Row item={item} index={virtualIndex} />
      </div>
    )
  }));

  const scrollTimeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollStyles = {
    horizontalScroll: {
      overflowY: 'hidden' as const,
      scrollbarWidth: 'none' as const,
      msOverflowStyle: 'none' as const,
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  };

  return (
    <div ref={containerRef} style={baseStyles.container}>
      <div
        ref={headerWrapperRef}
        style={{
          ...baseStyles.headerWrapper,
          ...scrollStyles.horizontalScroll
        }}
      >
        <div style={{
          ...baseStyles.gridContainer,
          minWidth: totalWidth || undefined
        }}>
          <Header onSort={handleSort} sortState={sortState} />
        </div>
      </div>

      <div
        ref={bodyWrapperRef}
        style={baseStyles.bodyWrapper}
      >
        <div style={{ 
          width: totalWidth ? `${totalWidth}px` : '100%',
          minWidth: '100%'
        }}>
          <Virtualization
            items={renderableItems}
            estimatedItemHeight={estimatedRowHeight}
            overscanCount={overscanCount}
            style={{
              height: tableHeight,
              width: '100%'
            }}
          />
        </div>
      </div>

      {Footer && (
        <div
          ref={footerWrapperRef}
          style={{
            ...baseStyles.footerWrapper,
            ...scrollStyles.horizontalScroll
          }}
        >
          <div style={{
            ...baseStyles.gridContainer,
            minWidth: totalWidth || undefined,
            ...(footerDistributed ? { display: 'block' } : {})
          }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
