import { defineConfig } from "drizzle-kit";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export default defineConfig({
  schema: "./src/db/schema",

  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
  dialect: "sqlite",
});
