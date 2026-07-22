import { registerAs } from '@nestjs/config';
import packageJson from '../../package.json';

export default registerAs('app', () => ({
  name: 'pilot-path-api',
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  version: packageJson.version,
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}));
