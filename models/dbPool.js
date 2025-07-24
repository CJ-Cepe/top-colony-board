import { Pool } from "pg";
import process from "node:process";
let dbPool;

if (process.env.NODE_ENV === "production") {
  console.log("Connecting to PostgreSQL in PRODUCTION environment...");
  dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  console.log("Connecting to PostgreSQL in DEVELOPMENT environment...");
  dbPool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    ssl: false,
  });
}

dbPool.on("connect", () => {
  console.log("Database connected successfully!");
});

dbPool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default dbPool;
