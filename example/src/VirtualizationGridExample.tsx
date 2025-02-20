import { useState, useCallback, CSSProperties } from 'react';
import { VirtualizationGrid } from 'simple-virtualization';

type Styles = {
  [key: string]: CSSProperties
}

const getBackgroundColor = (row: number, col: number) => {
  const hue = ((row * 5 + col * 5) % 360);
  return `hsl(${hue}, 70%, 85%)`;
};

const getCellContent = (row: number, col: number) => {
  if ((row + col) % 3 === 0) {
    return `${row * col}`;
  }
  return `R${row}C${col}`;
};

const styles: Styles = {
  container: {
    width: '100%',
    height: 'auto',
    padding: '16px',
    backgroundColor: '#f3f4f6',
    boxSizing: 'border-box',
  },
  gridContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  infoPanel: {
    position: 'fixed',
    top: '32px',
    left: '32px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '8px'
  },
  infoText: {
    fontSize: '14px',
    margin: '4px 0'
  },
  selectedText: {
    color: '#2563eb'
  },
  cell: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontSize: '14px',
    color: '#1f2937',
    boxSizing: 'border-box'
  }
};

export function VirtualizationGridExample() {
  const [dimensions] = useState({
    rowCount: 1000,
    columnCount: 1000
  });

  const [selectedCell, setSelectedCell] = useState<{row: number; col: number} | null>(null);

  const renderCell = useCallback((rowIndex: number, columnIndex: number) => {
    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === columnIndex;
    const content = getCellContent(rowIndex, columnIndex);
    const backgroundColor = getBackgroundColor(rowIndex, columnIndex);

    return (
      <div 
        style={{
          ...styles.cell,
          backgroundColor,
          outline: isSelected ? '2px solid #2563eb' : 'none',
          fontWeight: isSelected ? 600 : 400
        }}
        onClick={() => setSelectedCell({ row: rowIndex, col: columnIndex })}
      >
        {content}
      </div>
    );
  }, [selectedCell]);

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        <VirtualizationGrid
          dimensions={dimensions}
          estimatedColumnWidth={128}
          estimatedRowHeight={48}
          overscanCount={2}
          renderCell={renderCell}
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'white'
          }}
        />
      </div>
    </div>
  );
}
