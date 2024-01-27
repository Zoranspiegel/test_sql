import { Client } from 'pg';
import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);

export function getClient (): Client {
  if (process.env.POSTGRES_URL) {
    const client = new Client(process.env.POSTGRES_URL + '?sslmode=require');

    return client;
  } else {
    const client = new Client({
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      host: process.env.PG_HOST,
      database: process.env.PG_DB,
      port: Number(process.env.PG_PORT)
    });

    return client;
  }
}
