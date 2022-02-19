import { Request, Response } from 'express';
import { User } from '@/entity/user.entity';

export interface ExpressRequest<T = any> extends Request<Record<string, string>, any, Partial<T>> {
  user?: User;
}

export type ExpressResponse<T = any> = Response<T>
