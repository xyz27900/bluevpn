import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { UiText } from '@/components/ui/UiText';
import { useAppDispatch } from '@/hooks/redux.hooks';
import { setUser } from '@/store/app';

export const MiddlewareMain: React.FC = () => {
  const [whoami] = authApi.useWhoamiMutation();

  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState(false);

  const getUserState = async (): Promise<void> => {
    try {
      const res = await whoami({}).unwrap();
      dispatch(setUser(res));
    } finally {
      setIsReady(true);
    }
  };

  const init = async (): Promise<void> => {
    await Promise.all([
      getUserState(),
    ]);
  };

  useEffect(() => {
    (async (): Promise<void> => await init())();
  }, []);

  return isReady ?
    <Outlet /> :
    <div className="flex flex-col h-full items-center justify-center px-12 sm:px-0">
      <UiText type="title-3" className="tracking-wide">Loading</UiText>
    </div>;
};
