import React from 'react';
import { PaymentHistory } from '@/components/payment/PaymentHistory';
import { ProfileAccessStatus } from '@/components/profile/ProfileAccessStatus';
import { ProfileInstructions } from '@/components/profile/ProfileInstructions';
import { UiContainer } from '@/components/ui/UiContainer';
import { useAppSelector } from '@/hooks/redux.hooks';
import { getUser } from '@/store/app';

export const PageDashboard: React.FC = () => {
  const user = useAppSelector(getUser);

  return user ?
    <UiContainer className="mb-4">
      <ProfileAccessStatus user={user} />
      <ProfileInstructions user={user} />
      <PaymentHistory />
    </UiContainer> :
    null;
};
