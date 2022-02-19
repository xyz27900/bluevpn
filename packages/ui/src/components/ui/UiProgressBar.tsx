import React from 'react';
import { classname } from '@/utils/react.utils';

type UiProgressBarProps = {
  value: number;
} & React.HTMLAttributes<HTMLElement>;

export const UiProgressBar: React.FC<UiProgressBarProps> = ({ value, className }) => {
  return <div
    className={
      classname(
        className,
        'relative',
        'h-2',
        'bg-gray-4',
        'rounded-full',
        'overflow-hidden',
      )
    }
  >
    <div
      className="absolute h-full top-0 bottom-0 left-0 bg-blue rounded-full transition"
      style={{ width: `${100 * value}%` }}
    />
  </div>;
};
