import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import * as Bull from 'bull';
import { singleton } from 'tsyringe';
import { QUEUE_NAME, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@/config';

@singleton()
export class QueueService {
  private readonly queue: Bull.Queue<string>;

  constructor() {
    const redis = {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    };
    this.queue = new Bull(QUEUE_NAME, { redis });
  }

  public async deleteUsers(uuids: string[]): Promise<void> {
    for (const uuid of uuids) {
      logger.log(`Delete user ${uuid}`, 'QueueService');
      await this.queue.add('delete', uuid);
    }
  }
}
