import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Virtualization } from './';

type CSSProperties = React.CSSProperties;
type PseudoProperties = {
  '&:hover'?: CSSProperties;
  '&:active'?: CSSProperties;
  '&:focus'?: CSSProperties;
  '&:before'?: CSSProperties;
  '&:after'?: CSSProperties;
  '&:first-child'?: CSSProperties;
  '&:last-child'?: CSSProperties;
};

type CSSPropertiesWithPseudo = CSSProperties & PseudoProperties;

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

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

      // Calculate column widths based on container width and specified column widths
  const calculateColumnWidths = useCallback(() => {
    if (!headerWrapperRef.current || !containerRef.current || !initialColumnWidths) {
      return;
    }

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const scrollbarWidth = (bodyWrapperRef.current?.offsetWidth && bodyWrapperRef.current?.clientWidth && (bodyWrapperRef.current?.offsetWidth - bodyWrapperRef.current?.clientWidth)) || 0;
    const availableWidth = containerWidth - scrollbarWidth;

    // Calculate total width from specified column widths
    const totalSpecifiedWidth = initialColumnWidths.reduce((sum, width) => {
      return sum + parseInt(width, 10);
    }, 0);

    // If container is wider than total specified width, adjust columns proportionally
    if (availableWidth > totalSpecifiedWidth) {
      const scale = availableWidth / totalSpecifiedWidth;
      const newColumnWidths = initialColumnWidths.map(width => {
        const scaledWidth = Math.floor(parseInt(width, 10) * scale);
        return `${scaledWidth}px`;
      });
      setColumnWidths(newColumnWidths);
    } else {
      // Use original specified widths
      setColumnWidths(initialColumnWidths);
    }
  }, []);

  // Use ResizeObserver for container resizing
  useEffect(() => {
    console.log('Setting up ResizeObserver');
    
    const resizeObserver = new ResizeObserver(entries => {
      console.log('Resize observed:', entries[0].contentRect.width);
      requestAnimationFrame(() => {
        calculateColumnWidths();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      console.log('Observing container');
    }

    return () => {
      console.log('Cleaning up ResizeObserver');
      resizeObserver.disconnect();
    };
  }, [calculateColumnWidths]);

  // Calculate initial column widths after header mount
  useEffect(() => {
    console.log('Initial column width calculation');
    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      calculateColumnWidths();
    });
  }, [calculateColumnWidths]);

  // Generate grid template columns
  const gridTemplateColumns = columnWidths.length > 0
    ? columnWidths.join(' ')
    : `repeat(${columnCount}, 1fr)`;

  // Calculate total width
  const totalWidth = columnWidths.reduce((sum, width) => {
    const numWidth = parseInt(width);
    return sum + (isNaN(numWidth) ? 0 : numWidth);
  }, 0);

  // Base styles
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

  // Function to sync horizontal scroll
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

  // Handle scroll events
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const newScrollLeft = (event.target as HTMLDivElement).scrollLeft;
    if (newScrollLeft !== scrollLeft) {
      syncHorizontalScroll(newScrollLeft);
    }
  }, [scrollLeft, syncHorizontalScroll]);

  // Watch for horizontal scroll
  useEffect(() => {
    const headerEl = headerWrapperRef.current;
    const bodyEl = bodyWrapperRef.current;
    const footerEl = footerWrapperRef.current;

    headerEl?.addEventListener('scroll', handleScroll as any);
    bodyEl?.addEventListener('scroll', handleScroll as any);
    footerEl?.addEventListener('scroll', handleScroll as any);

    return () => {
      headerEl?.removeEventListener('scroll', handleScroll as any);
      bodyEl?.removeEventListener('scroll', handleScroll as any);
      footerEl?.removeEventListener('scroll', handleScroll as any);
    };
  }, [handleScroll]);

  // Sort handler
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

  // Sort data
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

  // Transform data items into renderable components
  const renderableItems = sortedData.map((item) => ({
    component: ({ index: virtualIndex }: { index: number }) => (
      <div style={baseStyles.gridContainer}>
        <Row item={item} index={virtualIndex} />
      </div>
    )
  }));

  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<number>();

  const syncScroll = useCallback((scrollLeft: number, source: 'header' | 'body' | 'footer') => {
    if (isScrolling.current) return;
    
    isScrolling.current = true;
    
    // Use requestAnimationFrame for smooth synchronization
    requestAnimationFrame(() => {
      if (source !== 'header' && headerWrapperRef.current) {
        headerWrapperRef.current.scrollLeft = scrollLeft;
      }
      if (source !== 'body' && bodyWrapperRef.current) {
        bodyWrapperRef.current.scrollLeft = scrollLeft;
      }
      if (source !== 'footer' && footerWrapperRef.current) {
        footerWrapperRef.current.scrollLeft = scrollLeft;
      }

      // Reset scrolling flag after a short delay
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrolling.current = false;
      }, 50) as unknown as number;
    });
  }, []);

  // Scroll event handlers for each section
  const createScrollHandler = (source: 'header' | 'body' | 'footer') => (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    syncScroll(target.scrollLeft, source);
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Apply scroll styles
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
      {/* Header */}
      <div
        ref={headerWrapperRef}
        style={{
          ...baseStyles.headerWrapper,
          ...scrollStyles.horizontalScroll
        }}
        onScroll={createScrollHandler('header')}
      >
        <div style={{
          ...baseStyles.gridContainer,
          minWidth: totalWidth || undefined
        }}>
          <Header onSort={handleSort} sortState={sortState} />
        </div>
      </div>

      {/* Body */}
      <div
        ref={bodyWrapperRef}
        style={baseStyles.bodyWrapper}
        onScroll={createScrollHandler('body')}
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

      {/* Footer */}
      {Footer && (
        <div
          ref={footerWrapperRef}
          style={{
            ...baseStyles.footerWrapper,
            ...scrollStyles.horizontalScroll
          }}
          onScroll={createScrollHandler('footer')}
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
