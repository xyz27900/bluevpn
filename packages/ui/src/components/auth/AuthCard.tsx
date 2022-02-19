import React from 'react';
import { UiCard } from '@/components/ui/UiCard';
import { UiText } from '@/components/ui/UiText';

type AuthCardProps = {
  title: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, onSubmit, children }) => {
  return <UiCard>
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <UiText
        type="title-3"
        align="center"
        strong
      >
        { title }
      </UiText>
      { children }
    </form>
  </UiCard>;
};
