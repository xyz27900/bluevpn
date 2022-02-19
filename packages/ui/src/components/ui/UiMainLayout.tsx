import React from 'react';
import { UiNavbar } from '@/components/ui/UiNavbar';
import { classname } from '@/utils/react.utils';

type UiMainLayoutProps = {
  colored?: boolean;
  centerContent?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const UiMainLayout: React.FC<UiMainLayoutProps> = ({
  colored = false,
  centerContent = false,
  className,
  children,
  ...props
}) => {
  return <div
    className={
      classname(
        className,
        'relative',
        'flex',
        'flex-col',
        'gap-4',
        'sm:gap-10',
        'min-h-full',
        'overflow-hidden',
        colored && 'bg-gradient-to-b',
        colored && 'from-blue-start',
        colored && 'to-blue-stop',
      )
    }
    {...props}
  >
    <UiNavbar
      whiteLogo={colored}
      className={
        classname(
          centerContent && 'absolute',
          centerContent && 'inset-x-0',
          centerContent && 'top-0',
        )
      }
    />
    <div className={
      classname(
        'relative',
        'z-index-1',
        'flex',
        'flex-col',
        'flex-grow',
        centerContent && 'justify-center',
      )
    }>
      { children }
    </div>
  </div>;
};
