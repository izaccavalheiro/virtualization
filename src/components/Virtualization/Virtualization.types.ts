import { CSSProperties, ReactElement, ReactNode } from "react";

export type ReactComponentOrElement = 
  | string 
  | ReactElement 
  | ReactNode
  | ((props: { index: number }) => ReactNode)
  | {
      component?: (props: { index: number } & Record<string, any>) => ReactNode;
      render?: (props: { index: number } & Record<string, any>) => ReactNode;
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
