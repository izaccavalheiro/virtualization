import { default as React, JSX } from 'react';

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
};
export declare const Virtualization: ({ items, className, itemClassName, style, itemStyle }: TVirtualization) => import("react/jsx-runtime").JSX.Element;
export {};
