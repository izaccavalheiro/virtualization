import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';

declare interface GridDimensions {
    rowCount: number;
    columnCount: number;
}

declare type ReactComponentOrElement = string | ReactElement | ReactNode | ((props: {
    index: number;
}) => ReactNode) | {
    component?: (props: {
        index: number;
    } & Record<string, any>) => ReactNode;
    render?: (props: {
        index: number;
    } & Record<string, any>) => ReactNode;
    props?: Record<string, any>;
};

declare type SortDirection = 'asc' | 'desc' | null;

declare interface SortState {
    column: string | null;
    direction: SortDirection;
}

export declare function Virtualization({ items, className, itemClassName, style, itemStyle, overscanCount, initialRenderCount, estimatedItemHeight }: VirtualizationProps): default_2.JSX.Element;

export declare function VirtualizationGrid({ dimensions, estimatedColumnWidth, estimatedRowHeight, overscanCount, renderCell, className, style, cellClassName, cellStyle }: VirtualizationGridProps): default_2.JSX.Element;

declare interface VirtualizationGridProps {
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

declare interface VirtualizationProps {
    items: ReactComponentOrElement[];
    className?: string;
    itemClassName?: string;
    style?: CSSProperties;
    itemStyle?: CSSProperties;
    overscanCount?: number;
    initialRenderCount?: number;
    estimatedItemHeight?: number;
}

export declare function VirtualizationTable<T>({ data, Header, Footer, Row, style, headerStyle, footerStyle, rowStyle, tableHeight, estimatedRowHeight, overscanCount, columnWidths: initialColumnWidths, footerDistributed, defaultSortColumn, defaultSortDirection }: VirtualizationTableProps<T>): default_2.JSX.Element;

declare interface VirtualizationTableProps<T> {
    data: T[];
    Header: React.ComponentType<{
        onSort: (column: string) => void;
        sortState: SortState;
    }>;
    Footer?: React.ComponentType;
    Row: React.ComponentType<{
        item: T;
        index: number;
    }>;
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

export { }
