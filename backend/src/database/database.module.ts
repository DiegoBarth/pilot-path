import { Module } from '@nestjs/common';
import { Pool } from 'pg';

@Module({})
export class DatabaseModule {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    pool
      .query('SELECT NOW()')
      .then(() => {
        console.log('Database connected successfully');
      })
      .catch((error) => {
        console.error('Database connection failed', error);
      });
  }
}