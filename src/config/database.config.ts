import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    mongodb: {
      uri: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10) || 27017,
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
      name: process.env.MONGODB_DATABASE || 'Side',
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: process.env.REDIS_TTL,
    },
  }),
);
