// lib/dbConnect.js
import { Client } from '@planetscale/database';

let client;

export async function connectToDatabase() {
  if (client) {
    return client;
  }

  client = new Client({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

  return client;
}
