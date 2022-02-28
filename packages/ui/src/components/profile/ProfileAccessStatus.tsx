import { UserModel } from '@xyz27900/bluevpn-common/dist/es/models/user.model';
import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiText } from '@/components/ui/UiText';

type ProfileAccessStatusProps = {
  user: UserModel;
}

export const ProfileAccessStatus: React.FC<ProfileAccessStatusProps> = ({ user }) => {
  const expireDate = user.expireDate ? DateTime.fromISO(user.expireDate).toFormat('MMM d, yyyy HH:mm') : null;

  return <UiCard className="flex flex-col sm:flex-row sm:items-center gap-4">
    <div className="flex flex-col flex-grow">
      <UiText
        className="mb-2"
        type="title-3"
        normal
      >
        Your access
      </UiText>
      <UiText color="gray-1">
        {
          expireDate ?
            <React.Fragment>
              Expires at <UiText color="blue" strong>{ expireDate }</UiText>
            </React.Fragment> :
            <React.Fragment>
              You don&apos;t have access yet 🙁
            </React.Fragment>
        }
      </UiText>
    </div>
    {
      !expireDate &&
        <Link to="/invite">
          <UiButton
            type="button"
            variant="primary"
            block
          >
            Redeem an invite
          </UiButton>
        </Link>
    }
  </UiCard>;
};
