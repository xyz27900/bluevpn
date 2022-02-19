import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimationLayoutSpace } from '@/components/animation/components/AnimationLayoutSpace';

export const PageAuth: React.FC = () => {
  return <AnimationLayoutSpace>
    <Outlet />
  </AnimationLayoutSpace>;
};
