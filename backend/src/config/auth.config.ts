import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET ?? 'development-secret',
  expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as StringValue,
}));