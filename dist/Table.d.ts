import { default as React } from 'react';

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
export declare function VirtualizationTable<T>({ data, Header, Footer, Row, style, headerStyle, footerStyle, rowStyle, tableHeight, estimatedRowHeight, overscanCount, columnWidths: initialColumnWidths, footerDistributed, defaultSortColumn, defaultSortDirection }: VirtualizationTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
