import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '@xyz27900/bluevpn-common/dist/cjs/api/error';
import { ApiError } from '@/errors/index';

export const errInvalidInvite = ApiError.create(
  'Invalid invite',
  ApiErrorCode.InvalidInvite,
  HttpStatus.NOT_FOUND
);
