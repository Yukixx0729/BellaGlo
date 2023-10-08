import { Pool } from "pg";

const db = new Pool({
  database: process.env.DB_NAME || "bellaglo",
});

export default db;
