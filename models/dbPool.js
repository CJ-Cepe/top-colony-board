import { Pool } from "pg";
import process from "node:process";

const dbPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432 || process.env.DB_PORT,

  //connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
});

export default dbPool;
