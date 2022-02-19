import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '@/entity/user.entity';
import { errInvalidCredentials } from '@/errors/auth.errors';
import { AuthService } from '@/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    super({ usernameField: 'email' });
    this.authService = authService;
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw errInvalidCredentials;
    } else {
      return user;
    }
  }
}
