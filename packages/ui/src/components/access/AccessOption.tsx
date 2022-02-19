import React from 'react';
import { ReactComponent as IconEthereum } from '@/assets/ethereum.svg';
import { UiText } from '@/components/ui/UiText';

type AccessOptionProps = {
  price: string;
  description: string;
}

export const AccessOption: React.FC<AccessOptionProps> = ({ price, description }) => {
  return <div className="flex flex-col items-center">
    <div className="flex justify-center items-center gap-2">
      <IconEthereum className="block w-7 h-7" />
      <UiText type="large-title">
        { price }
      </UiText>
    </div>
    <UiText color="gray-1">
      { description }
    </UiText>
  </div>;
};
