import React from 'react';
import { UiText } from '@/components/ui/UiText';
import { classname } from '@/utils/react.utils';

type UiInputProps = {
  label?: string;
  extra?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const UiInput: React.FC<UiInputProps> = ({
  label,
  extra = null,
  className,
  ...props
}) => {
  return <div>
    <div className="flex justify-between mb-2">
      {
        label &&
          <label>
            <UiText type="footnote" color="gray-1">
              { label }
            </UiText>
          </label>
      }
      { extra }
    </div>
    <input
      className={
        classname(
          className,
          'px-4',
          'h-10',
          'block',
          'w-full',
          'border',
          'border-solid',
          'border-separator',
          'focus:border-blue',
          'rounded-lg',
          'bg-gray-6',
          'focus:bg-white',
        )
      }
      {...props}
    />
  </div>;
};
