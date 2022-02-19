import React from 'react';
import { UiCard } from '@/components/ui/UiCard';

export const AccessOptionCard: React.FC = ({ children }) => {
  return <UiCard className="flex flex-col items-center gap-6">
    {children}
  </UiCard>;
};
