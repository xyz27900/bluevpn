import 'reflect-metadata';
import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import { container } from 'tsyringe';
import { App } from '@/app';
import { POSTGRES, postgresConnection } from '@/connections/postgres.connection';

const bootstrap = async (): Promise<void> => {
  container.register(POSTGRES, { useValue: await postgresConnection });
  logger.setService('Cron');
  const app = container.resolve(App);
  await app.run();
};

bootstrap()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
