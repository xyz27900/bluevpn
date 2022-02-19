import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@/entity/user.entity';
import { UserService } from '@/services/user.service';

@Injectable()
export class AuthService {
  private readonly usersService: UserService;

  constructor(userService: UserService) {
    this.usersService = userService;
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(login);
    if (user && await this.usersService.verifyPassword(password, user)) {
      return user;
    } else {
      return null;
    }
  }
}
