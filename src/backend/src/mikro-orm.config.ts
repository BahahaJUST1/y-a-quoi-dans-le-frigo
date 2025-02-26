import { MikroORM } from '@mikro-orm/core';

export default {
  entities: [],
  dbName: process.env.DB_NAME,
  type: 'mysql',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
} as Parameters<typeof MikroORM.init>[0];