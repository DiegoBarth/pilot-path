import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';

export default registerAs('auth', () => {
  const environment = process.env.NODE_ENV ?? 'development';
  const secret = process.env.JWT_SECRET;

  if (!secret && environment === 'production') {
    throw new Error('JWT_SECRET is required in production');
  }

  return {
    secret: secret ?? 'development-secret',
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as StringValue,
  };
});
