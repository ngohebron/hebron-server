// import { drizzle } from "drizzle-orm/mysql2";
// export const db = drizzle(process.env.DATABASE_URL);

import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
const url = new URL(dbUrl);

const pool = mysql.createPool({
  host: url.hostname,
  port: url.port,
  user: url.username,
  password: url.password,
  database: url.pathname.replace("/", ""),
});

export const db = drizzle(pool);
