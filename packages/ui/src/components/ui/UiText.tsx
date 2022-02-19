import React from 'react';
import { Color, Font } from '@/typings/styles';
import { classname } from '@/utils/react.utils';

type UiTextProps = {
  type?: Font;
  color?: Color;
  align?: 'left' | 'center' | 'right';
  normal?: boolean;
  strong?: boolean;
  truncate?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export const UiText: React.FC<UiTextProps> = ({
  type = 'body',
  color= 'label-primary',
  align = 'left',
  normal = false,
  strong = false,
  truncate = false,
  className,
  children,
  ...props
}) => {
  const fontWeight = (): 'light' | 'normal' | 'semibold' =>
    strong
      ? 'semibold'
      : normal
        ? 'normal'
        : 'light';

  return <span
    className={
      classname(
        className,
        `font-${type}`,
        `font-${fontWeight()}`,
        `text-${align}`,
        `text-${color}`,
        truncate && 'truncate whitespace-nowrap',
      )
    }
    {...props}
  >
    { children }
  </span>;
};
