import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export const databaseConfig = registerAs('database', () => ({
  type: get('DATABASE_TYPE').default('postgres').asString(),
  host: get('DATABASE_HOST').default('localhost').asString(),
  port: get('DATABASE_PORT').default(5432).asPortNumber(),
  username: get('DATABASE_USERNAME').default('postgres').asString(),
  password: get('DATABASE_PASSWORD').default('').asString(),
  database: get('DATABASE_NAME').default('postgres').asString(),
  synchronize: get('NODE_ENV').default('development').asString() !== 'production',
  autoLoadEntities: true,
}));
