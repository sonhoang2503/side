export * from './env.validate';
import server from './server.config';
import database from './database.config';
import google from './google.config';

export const config = [server, database, google];
