import { UserModel } from '@xyz27900/bluevpn-common/dist/es/models/user.model';
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { UiButton } from '@/components/ui/UiButton';
import { UiCard } from '@/components/ui/UiCard';
import { UiText } from '@/components/ui/UiText';
import { classname } from '@/utils/react.utils';

type ProfileInstructionsProps = {
  user: UserModel
}

export const ProfileInstructions: React.FC<ProfileInstructionsProps> = ({ user }) => {
  const [showQR, setShowQR] = useState(false);
  const link = `https://${window.location.host}/${user.uuid}.ovpn`;

  return user.expireDate ?
    <UiCard className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-grow">
          <UiText
            className="mb-2"
            type="title-3"
            normal
          >
            How to connect
          </UiText>
          <UiText color="gray-1">
            Download config file and use your <UiText strong truncate>account password</UiText> as <UiText strong truncate>private key password</UiText> in your OpenVPN-compatible client
          </UiText>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <UiButton
              type="button"
              variant="primary"
              block
            >
              Download
            </UiButton>
          </a>
          <UiButton
            type="button"
            variant="default"
            block
            onClick={(): void => setShowQR(!showQR)}
          >
            Get QR code
          </UiButton>
        </div>
      </div>
      <div
        className={
          classname(
            'm-auto',
            'overflow-hidden',
            'w-48',
            showQR ? 'h-52' : 'h-0',
            'transition-all',
          )
        }
      >
        <QRCode
          value={link}
          renderAs="svg"
          size={168}
          level="Q"
          className="mt-4"
        />
      </div>
    </UiCard> :
    null;
};
