import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';

type TVirtualization = {
  items: (string | JSX.Element | (({ index }: {
    index: number;
}) => JSX.Element) | {
    component: ({ index }: {
      index: number;
    }) => JSX.Element;
    props: {
        customProp: string;
    };
})[];
  className?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export const Virtualization = ({ 
  items, 
  className = '',
  itemClassName = '',
  style,
  itemStyle
}: TVirtualization) => {
  const containerRef = useRef(null);
  const heightsMap = useRef(new Map());
  const [renderRange, setRenderRange] = useState({ start: 0, end: 20 });
  const [totalHeight, setTotalHeight] = useState(0);
  const previousScrollTop = useRef(0);
  const scrollingDirection = useRef('down');
  const positionsMap = useRef(new Map());

  const getItemHeight = (index: number) => heightsMap.current.get(index) || 100;

  const calculatePositions = useCallback(() => {
    let currentPosition = 0;
    positionsMap.current.clear();
    
    for (let i = 0; i < items.length; i++) {
      positionsMap.current.set(i, currentPosition);
      currentPosition += getItemHeight(i);
    }
    
    return currentPosition;
  }, [items.length]);

  const measureItem = (index: number, element: HTMLDivElement | null) => {
    if (!element) return;
    
    const height = element.getBoundingClientRect().height;
    if (height > 0 && heightsMap.current.get(index) !== height) {
      heightsMap.current.set(index, height);
      
      const totalHeight = calculatePositions();
      setTotalHeight(totalHeight);
    }
  };

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
  }, [items.length, totalHeight]);

  const updateRenderRange = useCallback(() => {
    if (!containerRef.current) return;

    const containerRefCurrent: unknown = containerRef.current;

    const scrollTop = (containerRefCurrent as HTMLElement).scrollTop;
    const viewportHeight = (containerRefCurrent as HTMLElement).clientHeight;
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
      end: endIndex
    });
  }, [findIndexForPosition, items.length, totalHeight]);

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

  const renderItem = (item: any, index: number) => {
    if (typeof item === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: item }} />;
    }

    if (React.isValidElement(item)) {
      return item;
    }

    if (typeof item === 'function') {
      const ItemComponent = item;
      return <ItemComponent />;
    }

    if (item && (item.render || item.component)) {
      const Component = item.render || item.component;
      return <Component {...item.props} index={renderRange.start + index} />;
    }

    return String(item);
  };

  const containerStyle = {
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
