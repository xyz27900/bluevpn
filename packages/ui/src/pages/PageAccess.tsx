import React from 'react';
import { Link } from 'react-router-dom';
import { AccessOption } from '@/components/access/AccessOption';
import { AccessOptionCard } from '@/components/access/AccessOptionCard';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiText } from '@/components/ui/UiText';
import { useAppSelector } from '@/hooks/redux.hooks';
import { getAccessOptions } from '@/store/app';

export const PageAccess: React.FC = () => {
  const accessOptions = useAppSelector(getAccessOptions);

  return <UiContainer>
    <UiCard className="flex flex-col">
      <UiText
        className="mb-2"
        type="title-3"
        normal
      >
        Choose a plan
      </UiText>
      <UiText color="gray-1">
        <p>You can purchase monthly or yearly access to BlueVPN</p>
        <p>Because payments are made in cryptocurrencies, we can&apos;t use a subscription model with direct withdrawals every period</p>
        <p>Therefore, we will send you reminders so that you don&apos;t forget to purchase access for the next period</p>
      </UiText>
    </UiCard>
    <div className="grid sm:grid-cols-3 gap-4 mb-4">
      {
        accessOptions.map(accessOption => {
          return <AccessOptionCard key={accessOption.id}>
            <AccessOption price={accessOption.price} description="for 1 month" />
            <Link to={`/order/${accessOption.id}`} className="block w-full">
              <UiButton
                type="button"
                variant={accessOption.highlighted ? 'primary' : 'default'}
                block
              >
                Get it now
              </UiButton>
            </Link>
          </AccessOptionCard>;
        })
      }
      <AccessOptionCard>
        <div className="flex flex-col justify-center flex-grow">
          <UiText type="title-2" align="center">
            Have an invite code?
          </UiText>
        </div>
        <Link to="/order/invite" className="block w-full">
          <UiButton
            type="button"
            block
          >
            Redeem it now
          </UiButton>
        </Link>
      </AccessOptionCard>
    </div>
  </UiContainer>;
};
