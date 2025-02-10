import { default as React, ReactNode, ReactElement, CSSProperties } from 'react';

type ReactComponentOrElement = string | ReactElement | ReactNode | ((props: {
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
export declare const Virtualization: React.FC<VirtualizationProps>;
export {};
