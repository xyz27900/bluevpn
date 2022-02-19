import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode, ApiErrorData } from '@xyz27900/bluevpn-common/dist/cjs/api/error';

export class ApiError {
  public data: ApiErrorData;
  public status: HttpStatus;
  public clearCookie: boolean;

  constructor(data: ApiErrorData, status: HttpStatus, clearCookie = false) {
    this.data = data;
    this.status = status;
    this.clearCookie = clearCookie;
  }

  public static create(message: string, code: ApiErrorCode, status: HttpStatus, clearCookie = false): ApiError {
    return new ApiError({ code, message }, status, clearCookie);
  }
}
