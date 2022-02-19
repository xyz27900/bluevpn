import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invite } from '@/entity/invite.entity';

@Injectable()
export class InviteService {
  private readonly inviteRepository: Repository<Invite>;

  constructor(@InjectRepository(Invite) inviteRepository: Repository<Invite>) {
    this.inviteRepository = inviteRepository;
  }

  public async findByCode(code: string): Promise<Invite | null> {
    return await this.inviteRepository.findOne({
      where: { code },
      relations: ['accessOption'],
    }) ?? null;
  }
}
