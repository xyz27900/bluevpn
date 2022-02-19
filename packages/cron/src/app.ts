import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import { inject, singleton } from 'tsyringe';
import { QueueService } from '@/services/queue.service';
import { SubscriptionService } from '@/services/subscription.service';

@singleton()
export class App {
  private readonly subscriptionService: SubscriptionService;
  private readonly queueService: QueueService;

  constructor(@inject(SubscriptionService) subscriptionService: SubscriptionService, @inject(QueueService) queueService: QueueService) {
    this.subscriptionService = subscriptionService;
    this.queueService = queueService;
  }

  public async run(): Promise<void> {
    logger.log('BlueVPN Cron service started', 'App');
    const users = await this.subscriptionService.getExpired();
    await this.queueService.deleteUsers(users.map(user => user.uuid));
    await this.subscriptionService.resetSubscription(users);
  }
}
