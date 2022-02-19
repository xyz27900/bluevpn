import React from 'react';
import { ReactComponent as IconSpinner } from '@/assets/spinner.svg';
import { UiText } from '@/components/ui/UiText';
import { Color } from '@/typings/styles';
import { classname } from '@/utils/react.utils';

type UiButtonProps = {
  variant?: 'default' | 'primary' | 'outline' | 'danger';
  block?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const UiButton: React.FC<UiButtonProps> = ({
  variant = 'default',
  block = false,
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const background: Color = variant === 'primary'
    ? 'blue'
    : variant === 'outline'
      ? 'white'
      : 'gray-6';

  const border: Color = variant === 'outline'
    ? 'blue'
    : background;

  const color: Color = variant === 'primary'
    ? 'white'
    : variant === 'danger'
      ? 'red'
      : 'blue';

  return <button
    className={
      classname(
        className,
        'relative',
        'px-4',
        'h-10',
        'border',
        'border-solid',
        'rounded-lg',
        `border-${border}`,
        `bg-${background}`,
        block && 'block',
        block && 'w-full',
        disabled && 'opacity-80',
        disabled && 'pointer-events-none',
      )
    }
    {...props}
  >
    {
      loading ?
        <span className="absolute block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <IconSpinner
            className={
              classname(
                'w-6',
                'h-6',
                `text-${color}`,
                'animate-spin',
              )
            }
          />
        </span> :
        <UiText
          className={classname(loading && 'invisible')}
          color={color}
          strong
          truncate
        >
          { children }
        </UiText>
    }
  </button>;
};
