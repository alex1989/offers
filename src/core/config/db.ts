import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';

export default registerAs('db', () => {
  const host = getEnv('DB_HOST', 'localhost');
  const port = getEnvNumber('DB_PORT', 3306);
  const username = getEnv('DB_USERNAME', 'root');
  const password = getEnv('DB_PASSWORD', 'root');
  const database = getEnv('DB_NAME', 'offers');
  const logging = process.env.NODE_ENV !== 'production';
  return {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    logging,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migration/*.js'],
  };
});
