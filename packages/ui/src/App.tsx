import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLogin } from '@/components/auth/AuthLogin';
import { AuthPasswordReset } from '@/components/auth/AuthPasswordReset';
import { AuthPasswordRestore } from '@/components/auth/AuthPasswordRestore';
import { AuthSignUp } from '@/components/auth/AuthSignUp';
import { MiddlewareAuth } from '@/components/middleware/MiddlewareAuth';
import { MiddlewareMain } from '@/components/middleware/MiddlewareMain';
import { OrderInvite } from '@/components/order/OrderInvite';
import { OrderPayment } from '@/components/order/OrderPayment';
import { PageAccess } from '@/pages/PageAccess';
import { PageAuth } from '@/pages/PageAuth';
import { PageDashboard } from '@/pages/PageDashboard';
import { PageMain } from '@/pages/PageMain';
import { PageNotFound } from '@/pages/PageNotFound';
import { PageOrder } from '@/pages/PageOrder';

export const App: React.FC = () => {
  return<BrowserRouter>
    <Routes>
      <Route path="/404" element={<PageNotFound />} />
      <Route element={<MiddlewareMain />}>
        <Route path="auth" element={<PageAuth />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="sign-up" element={<AuthSignUp />} />
          <Route path="restore-password" element={<AuthPasswordRestore />} />
          <Route path="reset-password" element={<AuthPasswordReset />} />
          <Route path="" element={<Navigate to="/auth/login" replace />} />
        </Route>
        <Route element={<MiddlewareAuth />}>
          <Route element={<PageMain />}>
            <Route path="access" element={<PageAccess />} />
            <Route path="order/*" element={<PageOrder />}>
              <Route path="invite" element={<OrderInvite />} />
              <Route path=":id" element={<OrderPayment />} />
            </Route>
            <Route path="" element={<PageDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>;
};
