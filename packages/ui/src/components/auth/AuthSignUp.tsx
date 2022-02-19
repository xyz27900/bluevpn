import { SignUpArgs } from '@xyz27900/bluevpn-common/dist/es/dto/auth.dto';
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

export const AuthSignUp: React.FC = () => {
  const [signUp, { isLoading }] = authApi.useSignUpMutation();

  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      toast.error('Passwords mismatch');
      return;
    }

    try {
      const args: SignUpArgs = {
        email,
        password,
      };

      const res = await signUp(args).unwrap();
      dispatch(setUser(res));
      navigate('/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return <UiContainer compact>
    <AuthCard title="Join Us 🤙" onSubmit={handleSubmit}>
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
        pattern=".{8,}"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
      />
      <UiInput
        name="user[password_confirmation]"
        label="Repeat password"
        type="password"
        pattern=".{8,}"
        autoComplete="new-password"
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
    <UiCard className="text-center">
      <UiText>
        Already have an account?
      </UiText>
      &nbsp;
      <Link to="/auth/login">
        <UiText className="text-blue hover:underline">
          Login
        </UiText>
      </Link>
    </UiCard>
  </UiContainer>;
};
