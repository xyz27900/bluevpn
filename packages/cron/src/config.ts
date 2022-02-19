import { parseNumber, parseString } from '@xyz27900/bluevpn-common/dist/cjs/utils/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = parseString(process.env.DB_HOST);
export const DB_PORT = parseNumber(process.env.DB_PORT, 5432);
export const DB_USER = parseString(process.env.DB_USER);
export const DB_PASSWORD = parseString(process.env.DB_PASSWORD);
export const DB_NAME = parseString(process.env.DB_NAME);
/* ------ */
export const REDIS_HOST = parseString(process.env.REDIS_HOST);
export const REDIS_PORT = parseNumber(process.env.REDIS_PORT, 6379);
export const REDIS_PASSWORD = parseString(process.env.REDIS_PASSWORD);
/* ------ */
export const QUEUE_NAME = parseString(process.env.QUEUE_NAME);
