import React, { useEffect, useState } from 'react';
import { AnimationSpace } from '@/components/animation/components/AnimationSpace';
import { UiMainLayout } from '@/components/ui/UiMainLayout';
import { classname } from '@/utils/react.utils';

export const AnimationLayoutSpace: React.FC = ({ children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimeout = window.setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => {
      window.clearTimeout(contentTimeout);
    };
  }, []);

  return <React.Fragment>
    <UiMainLayout colored centerContent>
      <div
        className={
          classname(
            'transform',
            'transition',
            'ease-linear',
            'duration-500',
            !showContent && 'opacity-0',
            !showContent && 'translate-y-10',
          )
        }>
        { children }
      </div>
    </UiMainLayout>
    <AnimationSpace />
  </React.Fragment>;
};
