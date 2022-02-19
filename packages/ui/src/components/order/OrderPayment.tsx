import { VerifyPaymentQuery } from '@xyz27900/bluevpn-common/dist/es/dto/payments.dto';
import { AccessOptionModel } from '@xyz27900/bluevpn-common/dist/es/models/access-option.model';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentsApi } from '@/api/payments';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiInput } from '@/components/ui/UiInput';
import { UiText } from '@/components/ui/UiText';
import { usePayments } from '@/hooks/payments.hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { useToast } from '@/hooks/toast.hooks';
import { getAccessOptions, getWallet, setUser } from '@/store/app';
import { getError } from '@/utils/api.utils';

export const OrderPayment: React.FC = () => {
  const [verifyPayment, { isLoading }] = paymentsApi.useVerifyPaymentMutation();

  const { id: idStr } = useParams();
  const navigate = useNavigate();
  const [transfer, { isProcessing }] = usePayments();
  const toast = useToast();

  const wallet = useAppSelector(getWallet);
  const accessOptions = useAppSelector(getAccessOptions);
  const dispatch = useAppDispatch();
  const [hash, setHash] = useState<string | null>(null);
  const [accessOption, setAccessOption] = useState<AccessOptionModel | null>(null);
  const [password, setPassword] = useState('');

  const transferPayment = async (address: string, amount: string): Promise<string | null> => {
    const transferRes = await transfer(address, amount);
    setHash(transferRes);
    return transferRes;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!accessOption || !wallet) {
      toast.error('Invalid transaction data. Try to refresh the page');
      return;
    }

    const txHash = hash ?? await transferPayment(wallet, accessOption.price);
    if (!txHash) {
      toast.error('Transaction error');
      return;
    }

    try {
      const args: VerifyPaymentQuery = {
        id: accessOption.id,
        query: { txHash, password },
      };

      const res = await verifyPayment(args).unwrap();
      dispatch(setUser(res));
      navigate('/');
      toast.success('Thanks for using BlueVPN 🤍');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    const id = Number(idStr);
    const option = accessOptions.find(item => item.id === id);
    if (option) {
      setAccessOption(option);
    } else {
      navigate('/');
    }
  }, [idStr, accessOptions]);

  return accessOption ?
    <UiContainer compact>
      <UiCard>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="user[email]"
            type="text"
            autoComplete="username"
            className="hidden"
            hidden
          />
          <UiText
            type="title-3"
            align="center"
            strong
          >
            Get the access
          </UiText>
          <UiText color="gray-1">
            <p>You are going to get the access to BlueVPN</p>
            <p>This operation requires password input</p>
          </UiText>
          <div className="grid grid-cols-3">
            <UiText
              align="right"
              strong
            >
              { accessOption.description }
            </UiText>
            <UiText
              color="blue"
              align="center"
              strong
            >
              →
            </UiText>
            <UiText
              align="left"
              strong
            >
              { accessOption.price } ETH
            </UiText>
          </div>
          <UiInput
            name="user[password]"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            autoFocus={true}
            onChange={(e): void => setPassword(e.target.value)}
          />
          <UiButton
            type="submit"
            variant="primary"
            loading={isLoading || isProcessing}
            disabled={isLoading || isProcessing || !accessOption}
          >
            Continue
          </UiButton>
        </form>
      </UiCard>
      <UiCard className="text-center">
        <UiText color="gray-1">
          Payments provided by
          {' '}
          <a
            href="https://metamask.io/"
            rel="noreferrer"
            target="_blank"
            className="text-blue hover:underline"
          >
          Metamask
          </a>
        </UiText>
      </UiCard>
    </UiContainer> :
    null;
};
