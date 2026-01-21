import { Pool } from 'pg';
import { DB_URL } from '../config/env';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';

if (!DB_URL)
  throw new Error('DB_URL is not defined in the environment variables');

// initialize the postgresql connection pool
const pool = new Pool({
  connectionString: DB_URL
});

pool.on('connect', () => {
  console.log('PostgreSQL connected successfully ✅');
});

pool.on('error', err => {
  console.error('PostgreSQL connection failed ❌', err);
});

export const db = drizzle({ client: pool, schema });
