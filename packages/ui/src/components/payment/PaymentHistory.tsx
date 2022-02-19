import React from 'react';
import { paymentsApi } from '@/api/payments';
import { PaymentHistoryItem } from '@/components/payment/PaymentHistoryItem';
import { UiCard } from '@/components/ui/UiCard';
import { UiText } from '@/components/ui/UiText';

export const PaymentHistory: React.FC = () => {
  const { data } = paymentsApi.useGetPaymentsHistoryQuery({});

  return data && data.length > 0 ?
    <UiCard className="flex flex-col">
      <UiText
        className="mb-4"
        type="title-3"
        normal
      >
        Payments history
      </UiText>
      {
        data.map(item => {
          return <PaymentHistoryItem key={item.id} item={item} />;
        })
      }
    </UiCard> :
    null;
};
