import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { In, LessThan, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { User } from '@/entity/user.entity';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  public async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.uuid = v4();
    user.email = email;
    user.hash = await bcrypt.hash(password, 10);
    return user;
  }

  public async verifyPassword(password: string, user: User): Promise<boolean> {
    return await bcrypt.compare(password, user.hash);
  }

  public async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne(id) ?? null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email }) ?? null;
  }

  public async getExpired(): Promise<User[]> {
    const now = DateTime.now().toJSDate();
    return await this.userRepository.find({ where: { expireDate: LessThan(now) } });
  }

  public async resetSubscription(users: User[]): Promise<void> {
    const uuids = users.map(user => user.uuid);
    if (uuids.length > 0) {
      await this.userRepository.update(
        { uuid: In(uuids) },
        { expireDate: null }
      );
    }
  }
}
