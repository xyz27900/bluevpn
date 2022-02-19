import { createConnection } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@/config';
import { User1644882348395 } from '@/migrations/1644882348395-User';
import { ResetToken1644882378203 } from '@/migrations/1644882378203-ResetToken';
import { AccessOption1644882438474 } from '@/migrations/1644882438474-AccessOption';
import { Order1644882492723 } from '@/migrations/1644882492723-Order';
import { Invite1644919659466 } from '@/migrations/1644919659466-Invite';
import { logger } from '@/utils/logger';

export const migrate = async (): Promise<void> => {
  const migrations = [
    User1644882348395,
    ResetToken1644882378203,
    AccessOption1644882438474,
    Order1644882492723,
    Invite1644919659466,
  ];

  const connection = await createConnection({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    migrations,
  });

  const hasMigrations = await connection.showMigrations();
  if (hasMigrations) {
    const res = await connection.runMigrations({ transaction: 'each' });
    logger.log(res.map(item => item.name).join(', '), 'Migrations');
  }
  await connection.close();
};
