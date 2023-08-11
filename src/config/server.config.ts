import { registerAs } from '@nestjs/config';

export default registerAs(
  'server',
  (): Record<string, any> => ({
    name: process.env.APP_NAME || 'side',
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST,
    port: process.env.PORT,
    globalPrefix: '/',
    cors: {},
    rateLimit: {},
  }),
);
