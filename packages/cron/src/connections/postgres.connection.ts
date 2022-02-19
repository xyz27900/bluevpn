import { InjectionToken } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@/config';
import { User } from '@/entity/user.entity';

export const postgresConnection = createConnection({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User],
});

export const POSTGRES: InjectionToken<Connection> = Symbol('POSTGRES');
