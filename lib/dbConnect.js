// lib/dbConnect.js
import { createConnection } from '@planetscale/database';

let connection;

export async function connectToDatabase() {
  if (connection) {
    return connection;
  }

  connection = await createConnection({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  return connection;
}
