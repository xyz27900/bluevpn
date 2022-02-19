import * as fs from 'fs';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { CreateOpenVPNClientArgs, CreateOpenVPNClientReply } from '@xyz27900/bluevpn-common/dist/cjs/dto/openvpn.dto';
import { Queue } from 'bull';
import { CONFIGS_DIR, QUEUE_NAME } from '@/config';
import { User } from '@/entity/user.entity';

@Injectable()
export class OpenVpnService {
  private readonly queue: Queue<CreateOpenVPNClientArgs | string>;

  constructor(@InjectQueue(QUEUE_NAME) queue: Queue<CreateOpenVPNClientArgs>) {
    this.queue = queue;
  }

  public async createClient(user: User, password: string): Promise<void> {
    const args: CreateOpenVPNClientArgs = { uuid: user.uuid, password };
    const res = await this.queue.add('create', args);
    const config = await res.finished() as CreateOpenVPNClientReply;
    fs.writeFileSync(`${CONFIGS_DIR}/${user.uuid}.ovpn`, config, { encoding: 'utf-8' });
  }

  public async deleteClient(user: User): Promise<void> {
    await this.queue.add('delete', user.uuid);
  }
}
