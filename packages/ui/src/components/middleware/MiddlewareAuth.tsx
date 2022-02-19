import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux.hooks';
import { getUser } from '@/store/app';

export const MiddlewareAuth: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);

  return user ?
    <Outlet /> :
    null;
};
