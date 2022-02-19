import { AccessOptionModel } from '@xyz27900/bluevpn-common/dist/es/models/access-option.model';
import { UserModel } from '@xyz27900/bluevpn-common/dist/es/models/user.model';
import React, { useEffect, useState } from 'react';
import { batch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { paymentsApi } from '@/api/payments';
import { UiProgressBar } from '@/components/ui/UiProgressBar';
import { UiText } from '@/components/ui/UiText';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { useToast } from '@/hooks/toast.hooks';
import { getIsReady, setAccessOptions, setIsReady, setUser, setWallet } from '@/store/app';
import { getError } from '@/utils/api.utils';

export const MiddlewareMain: React.FC = () => {
  const [whoami, { isLoading: whoamiLoading }] = authApi.useWhoamiMutation();
  const [getWallet] = paymentsApi.useGetWalletMutation();
  const [getAccessOptions] = paymentsApi.useGetAccessOptionsMutation();

  const toast = useToast();

  const isReady = useAppSelector(getIsReady);
  const dispatch = useAppDispatch();
  const [isAppReady, setIsAppReady] = useState(false);
  const [user, setUserState] = useState<UserModel | null>(null);
  const [wallet, setWalletState] = useState<string | null>(null);
  const [accessOptions, setAccessOptionsState] = useState<AccessOptionModel[] | null>(null);
  const necessaryValues = [wallet, accessOptions];
  const progressValue = necessaryValues.filter(item => !!item).length / necessaryValues.length;

  const getUserState = async (): Promise<void> => {
    try {
      const res = await whoami({}).unwrap();
      setUserState(res);
    } catch (error) {
      // Ignore - it's ok
    }
  };

  const getWalletState = async (): Promise<void> => {
    try {
      const res = await getWallet({}).unwrap();
      setWalletState(res.wallet);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const getAccessOptionsState = async (): Promise<void> => {
    try {
      const res = await getAccessOptions({}).unwrap();
      setAccessOptionsState(res);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const init = async (): Promise<void> => {
    await Promise.all([
      getUserState(),
      getWalletState(),
      getAccessOptionsState(),
    ]);
  };

  useEffect(() => {
    (async (): Promise<void> => await init())();
  }, []);

  useEffect(() => {
    if (!whoamiLoading && !!wallet && !!accessOptions) {
      batch(() => {
        dispatch(setUser(user));
        dispatch(setWallet(wallet));
        dispatch(setAccessOptions(accessOptions));
        dispatch(setIsReady(true));
      });
    }
  }, [whoamiLoading, wallet, accessOptions]);

  useEffect(() => {
    if (isReady) {
      const timeout = window.setTimeout(() => {
        setIsAppReady(true);
      }, 500);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [isReady]);

  return isAppReady ?
    <Outlet /> :
    <div className="flex flex-col h-full items-center justify-center gap-4 px-12 sm:px-0">
      <UiText type="title-3" className="tracking-wide">Loading</UiText>
      <UiProgressBar value={progressValue} className="w-full sm:w-72" />
    </div>;
};
