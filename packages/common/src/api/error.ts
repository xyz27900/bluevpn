export type ApiErrorData = {
  code: ApiErrorCode;
  message: string;
}

export enum ApiErrorCode {
  /* Auth */
  InvalidCredentials = 1001,
  Unauthorized = 1002,
  InvalidEmail = 1003,
  InvalidPassword = 1004,
  EmailAlreadyTaken = 1005,
  EmailNotFound = 1006,
  InvalidToken = 1007,
  ExpiredToken = 1008,

  /* Payments */
  InvalidAccessOption = 3001,
  InvalidInvite = 3002,
  TransactionError = 3003,
  InvalidTransaction = 3004,
}
