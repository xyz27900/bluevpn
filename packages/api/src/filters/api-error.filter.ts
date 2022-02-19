import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApiErrorData } from '@xyz27900/bluevpn-common/dist/cjs/api/error';
import { ApiError } from '@/errors';
import { ExpressResponse } from '@/types/express';

@Catch(ApiError)
export class ApiErrorFilter implements ExceptionFilter {
  public catch(exception: ApiError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse<ApiErrorData>>();
    res.status(exception.status).json(exception.data);
  }
}
