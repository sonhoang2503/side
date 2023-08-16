import { registerAs } from '@nestjs/config';

export default registerAs(
  'google',
  (): Record<string, any> => ({
    oauth: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://side.cc:1111/auth/google/callback',
      scope: ['profile', 'email'],
    },
  }),
);
