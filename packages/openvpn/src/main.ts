import 'reflect-metadata';
import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import { container } from 'tsyringe';
import { App } from '@/app';

export const bootstrap = async (): Promise<void> => {
  logger.setService('OpenVPN');
  const app = container.resolve(App);
  await app.start();
  process.on('SIGTERM', app.stop);
};

bootstrap().catch(() => process.exit(1));
