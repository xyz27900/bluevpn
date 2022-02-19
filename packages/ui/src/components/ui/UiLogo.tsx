import React from 'react';
import { ReactComponent as IconLogoColored } from '@/assets/logo-colored.svg';
import { ReactComponent as IconLogoWhite } from '@/assets/logo-white.svg';
import { UiText } from '@/components/ui/UiText';
import { classname, omitChildren } from '@/utils/react.utils';

type UiLogoProps = {
  white?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const UiLogo: React.FC<UiLogoProps> = ({
  white = false,
  className,
  ...props
}) => {
  const propsWithoutChildren = omitChildren(props);
  const iconLogoClassName = 'block w-9 h-9';

  return <div
    className={
      classname(
        className,
        'flex',
        'items-center',
        'gap-4',
      )
    }
    {...propsWithoutChildren}
  >
    {
      white ?
        <IconLogoWhite className={iconLogoClassName} /> :
        <IconLogoColored className={iconLogoClassName} />
    }
    <div className="flex items-center gap-1">
      <UiText type="title-2" color={white ? 'white' : 'black'}>
        bluevpn
      </UiText>
      <div className={
        classname(
          'relative',
          'w-1.25',
          'h-1.25',
          'rounded-full',
          'top-0.5',
          white ? 'bg-white' : 'bg-blue',
        )
      }
      />
      <UiText type="title-2" color={white ? 'white' : 'black'}>
        tech
      </UiText>
    </div>
  </div>;
};
