import React from 'react';
import { Link } from 'react-router-dom';
import { UiLogo } from '@/components/ui/UiLogo';
import { classname } from '@/utils/react.utils';

type UiNavbarProps = {
  whiteLogo?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const UiNavbar: React.FC<UiNavbarProps> = ({
  whiteLogo = false,
  className,
  children,
  ...props
}) => {
  return <nav
    className={
      classname(
        className,
        'w-full',
        'h-20',
        'flex',
        'items-center',
        'justify-center',
      )
    }
    {...props}
  >
    <Link to="/">
      <UiLogo white={whiteLogo} />
    </Link>
    { children }
  </nav>;
};
