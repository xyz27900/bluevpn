import { CreateOpenVPNClientArgs } from '@xyz27900/bluevpn-common/dist/cjs/dto/openvpn.dto';
import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import * as Bull from 'bull';
import { inject, singleton } from 'tsyringe';
import { QUEUE_NAME, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@/config';
import { OpenVpnService } from '@/services/openvpn.service';

@singleton()
export class QueueService {
  private readonly queue: Bull.Queue<CreateOpenVPNClientArgs | string>;
  private readonly openVpnService: OpenVpnService;

  constructor(@inject(OpenVpnService) openVpnService: OpenVpnService) {
    const redis = {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    };
    this.queue = new Bull(QUEUE_NAME, { redis });
    this.openVpnService = openVpnService;
  }

  private async processCreate(job: Bull.Job<CreateOpenVPNClientArgs>): Promise<string | null> {
    logger.log(`Create new client ${job.data.uuid}`, 'QueueService');
    await this.openVpnService.createClient(job.data.uuid, job.data.password);
    logger.log('Client created', 'QueueService');
    return await this.openVpnService.getClientConfig(job.data.uuid);
  }

  private async processDelete(job: Bull.Job<string>): Promise<void> {
    logger.log(`Delete client ${job.data}`, 'QueueService');
    await this.openVpnService.revokeClient(job.data);
  }

  public start(): void {
    this.queue.process('create', this.processCreate.bind(this));
    this.queue.process('delete', this.processDelete.bind(this));
    this.queue.on('error', error => logger.error(error.message, 'QueueService'));
    this.queue.on('failed', job => logger.error(job.failedReason ?? `Job ${job.name} failed`));
  }

  public async stop(): Promise<void> {
    await this.queue.close();
  }
}
