import React from 'react';
import { Link } from 'react-router-dom';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiContainer } from '@/components/ui/UiContainer';
import { UiMainLayout } from '@/components/ui/UiMainLayout';
import { UiText } from '@/components/ui/UiText';

export const PageNotFound: React.FC = () => {
  return <UiMainLayout colored centerContent>
    <UiContainer compact>
      <UiCard className="flex flex-col gap-4">
        <UiText type="large-title" align="center" normal>Oops</UiText>
        <UiText color="gray-1" align="center">We can&apos;t find the page 😕</UiText>
        <Link to="/">
          <UiButton
            type="button"
            variant="primary"
            block
          >
              Go to main
          </UiButton>
        </Link>
      </UiCard>
    </UiContainer>
  </UiMainLayout>;
};
