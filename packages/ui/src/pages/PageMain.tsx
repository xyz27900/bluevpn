import React from 'react';
import { Outlet } from 'react-router-dom';
import { UiMainLayout } from '@/components/ui/UiMainLayout';

export const PageMain: React.FC = () => {
  return <UiMainLayout>
    <Outlet />
  </UiMainLayout>;
};
