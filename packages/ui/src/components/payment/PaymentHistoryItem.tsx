import { OrderModel } from '@xyz27900/bluevpn-common/dist/es/models/order.model';
import { DateTime } from 'luxon';
import React from 'react';
import { UiText } from '@/components/ui/UiText';

type PaymentHistoryItemProps = {
  item: OrderModel;
}

export const PaymentHistoryItem: React.FC<PaymentHistoryItemProps> = ({ item }) => {
  const dateTime = DateTime.fromISO(item.datetime).toFormat('MMM d, yyyy HH:mm');

  return <div className="grid grid-cols-2 py-4">
    <div className="flex flex-col">
      <UiText color="gray-1" normal>
        { dateTime }
      </UiText>
      <UiText type="footnote" color="gray-1">
        Access for { item.description }
      </UiText>
    </div>
    <div className="flex flex-col items-end sm:items-start justify-start">
      <UiText normal>
        { item.type === 'invite' ? 'Invite code' : `${item.amount} ETH` }
      </UiText>
    </div>
  </div>;
};
