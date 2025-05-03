import React, { 
  useCallback, 
  useRef, 
  useState,
  ReactNode,
  CSSProperties,
  useEffect
} from 'react';
import { VirtualizationProps } from './Virtualization.types';

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

  const getItemHeight = useCallback((index: number) => 
    heightsMap.current.get(index) || estimatedItemHeight
  , []);

  const calculatePositions = useCallback(() => {
    let currentPosition = 0;
    positionsMap.current.clear();
    
    for (let i = 0; i < items.length; i++) {
      positionsMap.current.set(i, currentPosition);
      currentPosition += getItemHeight(i);
    }
    
    return currentPosition;
  }, []);

  const measureItem = useCallback((index: number, element: HTMLDivElement | null) => {
    if (!element) return;
    
    const height = element.getBoundingClientRect().height;
    if (height > 0 && heightsMap.current.get(index) !== height) {
      heightsMap.current.set(index, height);
      
      const totalHeight = calculatePositions();
      setTotalHeight(totalHeight);
    }
  }, []);

  const findIndexForPosition = useCallback((position: number) => {
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
  }, []);

  const updateRenderRange = useCallback(() => {
    if (!containerRef.current) return;

    scrollingDirection.current = containerRef.current.scrollTop > previousScrollTop.current ? 'down' : 'up';
    previousScrollTop.current = containerRef.current.scrollTop;

    const distanceFromBottom = totalHeight - (containerRef.current.scrollTop + containerRef.current.clientHeight);
    const isNearBottom = distanceFromBottom < containerRef.current.clientHeight * 1.5;
    const baseBuffer = containerRef.current.clientHeight;
    const topBuffer = scrollingDirection.current === 'up' ? baseBuffer * 1.5 : baseBuffer;
    const bottomBuffer = isNearBottom ? containerRef.current.clientHeight * 2 : baseBuffer;

    const startIndex = Math.max(0, findIndexForPosition(containerRef.current.scrollTop - topBuffer));
    let endIndex = Math.min(
      items.length - 1,
      findIndexForPosition((containerRef.current.scrollTop + containerRef.current.clientHeight) + bottomBuffer)
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
  }, []);

  const handleScroll = () => {
    requestAnimationFrame(updateRenderRange);
  };

  useEffect(() => {
    heightsMap.current.clear();
    calculatePositions();
    updateRenderRange();
  }, [calculatePositions, items, updateRenderRange]);

  const visibleItems = items.slice(renderRange.start, renderRange.end + 1);
  const topPadding = positionsMap.current.get(renderRange.start) || 0;

  const renderItem = useCallback((item: any, index: number) => {
    try {
      if (typeof item === 'string') {
        return <div key={`string-${renderRange.start + index}`} dangerouslySetInnerHTML={{ __html: item }} data-testid={`item-${index}`} />;
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

      return <div key={`default-${renderRange.start + index}`} data-testid={`item-${index}`}>{String(item)}</div>;
    } catch (error) {
      console.error('Error rendering virtualization item:', error);
      return <div key={`error-${renderRange.start + index}`}>Render Error</div>;
    }
  }, []);

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
