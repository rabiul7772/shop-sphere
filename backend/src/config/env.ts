import { config } from 'dotenv';

config({ path: '.env', quiet: true });

export const {
  PORT,
  NODE_ENV,
  DB_URL,
  CLERK_SECRET_KEY,
  CLERK_PUBLISHABLE_KEY,
  FRONTEND_URL
} = process.env;
