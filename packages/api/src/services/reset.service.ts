import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { ResetToken } from '@/entity/reset-token.entity';
import { User } from '@/entity/user.entity';

@Injectable()
export class ResetService {
  private readonly resetTokenRepository: Repository<ResetToken>;

  constructor(@InjectRepository(ResetToken) resetTokenRepository: Repository<ResetToken>) {
    this.resetTokenRepository = resetTokenRepository;
  }

  public createToken(user: User): ResetToken {
    const token = new ResetToken();
    token.token = crypto.randomBytes(20).toString('hex');
    token.user = user;
    token.expireDate = DateTime.now().plus({ hours: 1 }).toJSDate();
    return token;
  }

  public async findToken(token: string): Promise<ResetToken | null> {
    return await this.resetTokenRepository.findOne({ token }, { relations: ['user'] }) ?? null;
  }
}
