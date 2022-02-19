import { NestFactory } from '@nestjs/core';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import * as redis from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, SESSION_SECRET } from '@/config';
import { ApiErrorFilter } from '@/filters/api-error.filter';
import { AppModule } from '@/modules/app.module';
import { migrate } from '@/tools/migration';
import { logger } from '@/utils/logger';

const bootstrap = async (): Promise<void> => {
  const log = (message: string): void => logger.log(message, 'Bootstrap');

  log('Check migrations');
  await migrate();

  log('Create application');
  const app = await NestFactory.create(AppModule, { logger });
  app.useGlobalFilters(new ApiErrorFilter());

  log('Connect to redis');
  const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  });

  log('Set up session middleware');
  app.use(
    session({
      store: new (connectRedis(session))({ client: redisClient }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
      },
    }),
  );

  log('Initialize passport authentication');
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
};

bootstrap().catch(() => {
  process.exit(1);
});
