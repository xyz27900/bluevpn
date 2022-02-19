import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { errUnauthorized } from '@/errors/auth.errors';

@Injectable()
export class LoggedInGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const isAuthenticated = context.switchToHttp().getRequest().isAuthenticated();
    if (!isAuthenticated) {
      throw errUnauthorized;
    }

    return isAuthenticated;
  }
}
