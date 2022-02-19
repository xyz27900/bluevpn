import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import { inject, singleton } from 'tsyringe';
import { QueueService } from '@/services/queue.service';

@singleton()
export class App {
  private readonly queueService: QueueService;

  constructor(@inject(QueueService) queueService: QueueService) {
    this.queueService = queueService;
  }

  public async start(): Promise<void> {
    logger.log('BlueVPN OpenVPN service started', 'App');
    await this.queueService.start();
  }

  public async stop(): Promise<void> {
    await this.queueService.stop();
    logger.log('BlueVPN OpenVPN service stopped', 'App');
  }
}
