import React, { 
  useCallback, 
  useRef, 
  useState,
  ReactNode,
  ReactElement,
  CSSProperties
} from 'react';

export * from './Table'

// Compatibility check for hooks
const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

// Polyfill for older React versions
const useStableCallback = <T extends (...args: any[]) => any>(callback: T): T => {
  const ref = useRef<T>(callback);
  
  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  });
  
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args);
  }, []) as T;
};

// Compatibility type for wider React version support
type ReactComponentOrElement = 
  | string 
  | ReactElement 
  | ReactNode 
  | ((props: { index: number }) => ReactNode)
  | {
      component?: (props: { index: number } & Record<string, any>) => ReactNode;
      render?: (props: { index: number } & Record<string, any>) => ReactNode;
      props?: Record<string, any>;
    };

export interface VirtualizationProps {
  items: ReactComponentOrElement[];
  className?: string;
  itemClassName?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  
  // Optional props for more granular control
  overscanCount?: number;
  initialRenderCount?: number;
  estimatedItemHeight?: number;
}

export function Virtualization({ 
  items, 
  className = '',
  itemClassName = '',
  style,
  itemStyle,
  overscanCount = 5,
  initialRenderCount = 20,
  estimatedItemHeight = 100
}: VirtualizationProps) {
  // Ensure React is available and fully initialized
  if (!React.useState) {
    throw new Error('React hooks are not available. Ensure you are using a compatible version of React.');
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const heightsMap = useRef(new Map<number, number>());
  const [renderRange, setRenderRange] = useState({ 
    start: 0, 
    end: initialRenderCount 
  });
  const [totalHeight, setTotalHeight] = useState(0);
  const previousScrollTop = useRef(0);
  const scrollingDirection = useRef<'up' | 'down'>('down');
  const positionsMap = useRef(new Map<number, number>());

  const getItemHeight = useStableCallback((index: number) => 
    heightsMap.current.get(index) || estimatedItemHeight
  );

  const calculatePositions = useStableCallback(() => {
    let currentPosition = 0;
    positionsMap.current.clear();
    
    for (let i = 0; i < items.length; i++) {
      positionsMap.current.set(i, currentPosition);
      currentPosition += getItemHeight(i);
    }
    
    return currentPosition;
  });

  const measureItem = useStableCallback((index: number, element: HTMLDivElement | null) => {
    if (!element) return;
    
    const height = element.getBoundingClientRect().height;
    if (height > 0 && heightsMap.current.get(index) !== height) {
      heightsMap.current.set(index, height);
      
      const totalHeight = calculatePositions();
      setTotalHeight(totalHeight);
    }
  });

  const findIndexForPosition = useStableCallback((position: number) => {
    let low = 0;
    let high = items.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const itemPos = positionsMap.current.get(mid) || 0;
      const nextPos = positionsMap.current.get(mid + 1) || totalHeight;

      if (position >= itemPos && position < nextPos) {
        return mid;
      }

      if (position < itemPos) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return 0;
  });

  const updateRenderRange = useStableCallback(() => {
    if (!containerRef.current) return;

    const containerElement = containerRef.current;
    const scrollTop = containerElement.scrollTop;
    const viewportHeight = containerElement.clientHeight;
    const scrollBottom = scrollTop + viewportHeight;
    
    scrollingDirection.current = scrollTop > previousScrollTop.current ? 'down' : 'up';
    previousScrollTop.current = scrollTop;

    const distanceFromBottom = totalHeight - scrollBottom;
    const isNearBottom = distanceFromBottom < viewportHeight * 1.5;

    const baseBuffer = viewportHeight;
    const topBuffer = scrollingDirection.current === 'up' ? baseBuffer * 1.5 : baseBuffer;
    const bottomBuffer = isNearBottom ? viewportHeight * 2 : baseBuffer;

    const startIndex = Math.max(0, findIndexForPosition(scrollTop - topBuffer));
    let endIndex = Math.min(
      items.length - 1,
      findIndexForPosition(scrollBottom + bottomBuffer)
    );

    if (isNearBottom) {
      endIndex = items.length - 1;
    }

    if (endIndex > items.length - 4) {
      endIndex = items.length - 1;
    }

    setRenderRange({
      start: startIndex,
      end: endIndex + overscanCount
    });
  });

  const handleScroll = () => {
    requestAnimationFrame(updateRenderRange);
  };

  useIsomorphicLayoutEffect(() => {
    heightsMap.current.clear();
    calculatePositions();
    updateRenderRange();
  }, [calculatePositions, items, updateRenderRange]);

  const visibleItems = items.slice(renderRange.start, renderRange.end + 1);
  const topPadding = positionsMap.current.get(renderRange.start) || 0;

  const renderItem = useStableCallback((item: any, index: number) => {
    // Robust item rendering with extensive fallbacks
    try {
      if (typeof item === 'string') {
        return <div key={`string-${renderRange.start + index}`} dangerouslySetInnerHTML={{ __html: item }} />;
      }

      if (React.isValidElement(item)) {
        return React.cloneElement(item, { key: `element-${renderRange.start + index}` });
      }

      if (typeof item === 'function') {
        const ItemComponent = item as (props: { index: number }) => ReactNode;
        return <React.Fragment key={`func-${renderRange.start + index}`}>
          {ItemComponent({ index: renderRange.start + index })}
        </React.Fragment>;
      }

      if (item && (item.render || item.component)) {
        const Component = item.render || item.component;
        const props = item.props || {};
        return <React.Fragment key={`complex-${renderRange.start + index}`}>
          {Component({ ...props, index: renderRange.start + index })}
        </React.Fragment>;
      }

      return <div key={`default-${renderRange.start + index}`}>{String(item)}</div>;
    } catch (error) {
      console.error('Error rendering virtualization item:', error);
      return <div key={`error-${renderRange.start + index}`}>Render Error</div>;
    }
  });

  const containerStyle: CSSProperties = {
    overflow: 'auto',
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ paddingTop: topPadding }}>
          {visibleItems.map((item, index) => (
            <div
              key={renderRange.start + index}
              ref={el => measureItem(renderRange.start + index, el)}
              className={itemClassName}
              style={itemStyle}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
