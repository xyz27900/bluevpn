import { LoginArgs } from '@xyz27900/bluevpn-common/dist/es/dto/auth.dto';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { AuthCard } from '@/components/auth/AuthCard';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiInput } from '@/components/ui/UiInput';
import { UiText } from '@/components/ui/UiText';
import { useAppDispatch } from '@/hooks/redux.hooks';
import { useToast } from '@/hooks/toast.hooks';
import { setUser } from '@/store/app';
import { getError } from '@/utils/api.utils';

export const AuthLogin: React.FC = () => {
  const [login, { isLoading }] = authApi.useLoginMutation();

  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const args: LoginArgs = {
        email,
        password,
      };

      const res = await login(args).unwrap();
      dispatch(setUser(res));
      navigate('/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return <UiContainer compact>
    <AuthCard title="Welcome back 👋" onSubmit={handleSubmit}>
      <UiInput
        name="user[email]"
        label="Email address"
        type="email"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="username"
        autoFocus={true}
        required
        value={email}
        onChange={(e): void => setEmail(e.target.value)}
      />
      <UiInput
        name="user[password]"
        label="Password"
        type="password"
        autoComplete="current-password"
        extra={
          <Link to="/auth/restore-password">
            <UiText type="footnote" className="text-blue hover:underline">
            Forgot password?
            </UiText>
          </Link>
        }
        required
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
      />
      <UiButton
        type="submit"
        variant="primary"
        loading={isLoading}
        disabled={isLoading}
        block
      >
        Login
      </UiButton>
    </AuthCard>
    <UiCard className="text-center">
      <UiText>
        New to BlueVPN?
      </UiText>
      &nbsp;
      <Link to="/auth/sign-up">
        <UiText className="text-blue hover:underline">
          Create an account
        </UiText>
      </Link>
    </UiCard>
  </UiContainer>;
};
