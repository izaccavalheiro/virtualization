import { ReactNode, ReactElement, CSSProperties } from 'react';

export * from './Table';
export * from './Grid';
export type ReactComponentOrElement = string | ReactElement | ReactNode | ((props: {
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
export interface VirtualizationProps {
    items: ReactComponentOrElement[];
    className?: string;
    itemClassName?: string;
    style?: CSSProperties;
    itemStyle?: CSSProperties;
    overscanCount?: number;
    initialRenderCount?: number;
    estimatedItemHeight?: number;
}
export declare function Virtualization({ items, className, itemClassName, style, itemStyle, overscanCount, initialRenderCount, estimatedItemHeight }: VirtualizationProps): import("react/jsx-runtime").JSX.Element;
