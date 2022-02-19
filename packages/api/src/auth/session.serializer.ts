import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@/entity/user.entity';
import { UserService } from '@/services/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  public serializeUser(user: User, done: Function): void {
    done(null, user.id);
  }

  public async deserializeUser(id: number, done: Function): Promise<void> {
    const user = await this.userService.findById(id);
    done(null, user);
  }
}
