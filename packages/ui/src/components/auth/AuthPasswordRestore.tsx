import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { AuthCard } from '@/components/auth/AuthCard';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiInput } from '@/components/ui/UiInput';
import { UiText } from '@/components/ui/UiText';
import { useToast } from '@/hooks/toast.hooks';
import { getError } from '@/utils/api.utils';

export const AuthPasswordRestore: React.FC = () => {
  const [restorePassword, { isLoading, isSuccess }] = authApi.useRestorePasswordMutation();

  const toast = useToast();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await restorePassword({ email });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return <UiContainer compact>
    {
      isSuccess ?
        <UiCard className="flex flex-col gap-4">
          <UiText
            type="title-3"
            align="center"
            strong
          >
            Check your inbox 📮
          </UiText>
          <UiText color="gray-1">
            Password recovery instructions have been sent to <UiText color="blue" normal>{ email }</UiText>
          </UiText>
          <UiText color="gray-1">
            Check your inbox and follow the instructions
          </UiText>
          <Link to="/auth/login">
            <UiButton
              type="button"
              variant="default"
              block
            >
              Back to login
            </UiButton>
          </Link>
        </UiCard> :
        <AuthCard title="Restore password 🧐" onSubmit={handleSubmit}>
          <UiInput
            name="user[email]"
            label="Email address"
            type="email"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="username"
            required
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
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
    }
  </UiContainer>;
};
