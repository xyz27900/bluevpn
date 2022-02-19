import React from 'react';
import { classname } from '@/utils/react.utils';

type UiCardProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export const UiCard: React.FC<UiCardProps> = ({
  className,
  children,
}) => {
  return <div
    className={
      classname(
        className,
        'rounded-xl',
        'bg-white',
        'p-8',
        'shadow',
      )
    }
  >
    { children }
  </div>;
};
