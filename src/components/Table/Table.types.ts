import { CSSProperties } from "react";

type PseudoProperties = {
  '&:hover'?: CSSProperties;
  '&:active'?: CSSProperties;
  '&:focus'?: CSSProperties;
  '&:before'?: CSSProperties;
  '&:after'?: CSSProperties;
  '&:first-child'?: CSSProperties;
  '&:last-child'?: CSSProperties;
};

export type CSSPropertiesWithPseudo = CSSProperties & PseudoProperties;

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export interface VirtualizationTableProps<T> {
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
