import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import { DateTime } from 'luxon';
import { inject, singleton } from 'tsyringe';
import { Connection, In, LessThan, Repository } from 'typeorm';
import { POSTGRES } from '@/connections/postgres.connection';
import { User } from '@/entity/user.entity';

@singleton()
export class SubscriptionService {
  private readonly connection: Connection;
  private readonly userRepository: Repository<User>;

  constructor(@inject(POSTGRES) connection: Connection) {
    this.connection = connection;
    this.userRepository = connection.getRepository(User);
  }

  public async getExpired(): Promise<User[]> {
    logger.log('Looking for users with expired subscription', 'SubscriptionService');
    const now = DateTime.now().toJSDate();
    return await this.userRepository.find({ where: { expireDate: LessThan(now) } });
  }

  public async resetSubscription(users: User[]): Promise<void> {
    const uuids = users.map(user => user.uuid);
    if (uuids.length > 0) {
      logger.log(`Found ${uuids.length} users with expired subscription`, 'SubscriptionService');
      logger.log(`Reset subscription for user ${uuids.join(', ')}`, 'SubscriptionService');
      await this.userRepository.update(
        { uuid: In(uuids) },
        { expireDate: null }
      );
    } else {
      logger.log('No users with expired subscriptions found', 'SubscriptionService');
    }
  }
}
