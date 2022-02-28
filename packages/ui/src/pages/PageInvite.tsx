import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessApi } from '@/api/access';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiInput } from '@/components/ui/UiInput';
import { UiText } from '@/components/ui/UiText';
import { useAppDispatch } from '@/hooks/redux.hooks';
import { useToast } from '@/hooks/toast.hooks';
import { setUser } from '@/store/app';
import { getError } from '@/utils/api.utils';

export const PageInvite: React.FC = () => {
  const [redeemInvite, { isLoading }] = accessApi.useRedeemInviteMutation();

  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const args = {
        code,
        password,
      };

      const res = await redeemInvite(args).unwrap();
      dispatch(setUser(res));
      navigate('/');
      toast.success('Thanks for using BlueVPN 🤍');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return <UiContainer compact>
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
          Redeem invite code
        </UiText>
        <UiText color="gray-1">
          <p>You are going to get the access to BlueVPN</p>
          <p>This operation requires password input</p>
        </UiText>
        <UiInput
          name="invite_code"
          label="Invite code"
          type="text"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          autoFocus={true}
          value={code}
          onChange={(e): void => setCode(e.target.value)}
        />
        <UiInput
          name="user[password]"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e): void => setPassword(e.target.value)}
        />
        <UiButton
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Continue
        </UiButton>
      </form>
    </UiCard>
  </UiContainer>;
};
