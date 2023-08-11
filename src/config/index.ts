export * from './env.validate';
import server from './server.config';
import database from './database.config';

export const config = [server, database];
