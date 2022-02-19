import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '@xyz27900/bluevpn-common/dist/cjs/api/error';
import { ApiError } from '@/errors/index';

export const errInvalidAccessOption = ApiError.create(
  'Invalid access option',
  ApiErrorCode.InvalidAccessOption,
  HttpStatus.NOT_FOUND
);

export const errInvalidInvite = ApiError.create(
  'Invalid invite',
  ApiErrorCode.InvalidInvite,
  HttpStatus.NOT_FOUND
);

export const errInvalidTransaction = ApiError.create(
  'Invalid transaction data',
  ApiErrorCode.InvalidTransaction,
  HttpStatus.BAD_REQUEST
);
