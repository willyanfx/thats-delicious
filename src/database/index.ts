import { drizzle } from "drizzle-orm/better-sqlite3";
import { Database } from "limbo-wasm";

const sqlite = new Database("sqlite.db");
const db = drizzle({ client: sqlite });
