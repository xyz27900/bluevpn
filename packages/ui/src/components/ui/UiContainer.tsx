import React from 'react';
import { classname } from '@/utils/react.utils';

type UiContainerProps = {
  compact?: boolean;
} & React.ButtonHTMLAttributes<HTMLDivElement>;

export const UiContainer: React.FC<UiContainerProps> = ({
  compact = false,
  className,
  children,
  ...props
}) => {
  return <div
    className={
      classname(
        className,
        'mx-auto',
        'flex',
        'flex-col',
        'gap-4',
        'w-full',
        'px-4',
        'sm:px-0',
        !compact ?? 'mb-4',
        compact ? 'sm:w-96' : 'sm:w-screen-sm',
      )
    }
    {...props}
  >
    { children }
  </div>;
};
