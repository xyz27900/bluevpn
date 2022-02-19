import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessOption } from '@/entity/access-option.entity';

@Injectable()
export class AccessService {
  private readonly accessOptionRepository: Repository<AccessOption>;

  constructor(@InjectRepository(AccessOption) accessOptionRepository: Repository<AccessOption>) {
    this.accessOptionRepository = accessOptionRepository;
  }

  public async findById(id: number): Promise<AccessOption | null> {
    return await this.accessOptionRepository.findOne(id) ?? null;
  }

  public async getAll(): Promise<AccessOption[]> {
    return await this.accessOptionRepository.find();
  }
}
