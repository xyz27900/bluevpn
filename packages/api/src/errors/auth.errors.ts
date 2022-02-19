import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '@xyz27900/bluevpn-common/dist/cjs/api/error';
import { ApiError } from '@/errors/index';

export const errInvalidCredentials = ApiError.create(
  'Invalid credentials',
  ApiErrorCode.InvalidCredentials,
  HttpStatus.UNAUTHORIZED
);

export const errUnauthorized = ApiError.create(
  'Unauthorized',
  ApiErrorCode.Unauthorized,
  HttpStatus.UNAUTHORIZED
);

export const errInvalidEmail = ApiError.create(
  'Invalid email',
  ApiErrorCode.InvalidEmail,
  HttpStatus.BAD_REQUEST
);

export const errInvalidPassword = ApiError.create(
  'Invalid  password',
  ApiErrorCode.InvalidPassword,
  HttpStatus.BAD_REQUEST
);

export const errEmailAlreadyTaken = ApiError.create(
  'Email already taken',
  ApiErrorCode.EmailAlreadyTaken,
  HttpStatus.FORBIDDEN
);

export const errEmailNotFound = ApiError.create(
  'Email not found',
  ApiErrorCode.EmailNotFound,
  HttpStatus.NOT_FOUND
);

export const errInvalidToken = ApiError.create(
  'Invalid token',
  ApiErrorCode.InvalidToken,
  HttpStatus.FORBIDDEN
);

export const errExpiredToken = ApiError.create(
  'Expired token',
  ApiErrorCode.ExpiredToken,
  HttpStatus.FORBIDDEN
);
