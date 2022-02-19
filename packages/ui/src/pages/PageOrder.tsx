import React from 'react';
import { Outlet } from 'react-router-dom';
import { MiddlewareOrder } from '@/components/middleware/MiddlewareOrder';

export const PageOrder: React.FC = () => {
  return <MiddlewareOrder>
    <Outlet />
  </MiddlewareOrder>;
};
