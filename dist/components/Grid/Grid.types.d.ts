import { CSSProperties } from 'react';

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
