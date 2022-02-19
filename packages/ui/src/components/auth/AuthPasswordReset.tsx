import { ResetPasswordArgs } from '@xyz27900/bluevpn-common/dist/es/dto/auth.dto';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { AuthCard } from '@/components/auth/AuthCard';
import { UiButton } from '@/components/ui/UiButton';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiInput } from '@/components/ui/UiInput';
import { useToast } from '@/hooks/toast.hooks';
import { getError } from '@/utils/api.utils';

export const AuthPasswordReset: React.FC = () => {
  const [resetPassword, { isLoading }] = authApi.useResetPasswordMutation();

  const [search] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const args: ResetPasswordArgs = {
        password,
        token: search.get('token') ?? '',
      };

      await resetPassword(args);
      navigate('/auth/login');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return <UiContainer compact>
    <AuthCard title="Consider a new password 🤔" onSubmit={handleSubmit}>
      <UiInput
        name="user[password]"
        label="Password"
        type="password"
        pattern=".{8,}"
        autoComplete="new-password"
        aria-autocomplete="none"
        required
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
      />
      <UiInput
        name="user[password_confirmation]"
        label="Password"
        type="password"
        pattern=".{8,}"
        autoComplete="new-password"
        aria-autocomplete="none"
        required
        value={passwordRepeat}
        onChange={(e): void => setPasswordRepeat(e.target.value)}
      />
      <UiButton
        type="submit"
        variant="primary"
        loading={isLoading}
        disabled={isLoading}
        block
      >
        Continue
      </UiButton>
    </AuthCard>
  </UiContainer>;
};
