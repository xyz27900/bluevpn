import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux.hooks';
import { getUser } from '@/store/app';

export const MiddlewareOrder: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const user = useAppSelector(getUser);

  useEffect(() => {
    if (user?.expireDate) {
      navigate('/');
    }
  }, [user?.expireDate]);

  return <React.Fragment>
    { children }
  </React.Fragment>;
};
