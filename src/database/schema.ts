import { sql } from "drizzle-orm";
import * as s from "drizzle-orm/sqlite-core";

export const users = s.sqliteTable("users", {
  id: s.text().primaryKey(),
  username: s.text().notNull().unique(),
  email: s.text().notNull().unique(),
  password: s.text().notNull(),
  createdAt: s
    .integer({ mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: s
    .integer({ mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const session = s.sqliteTable("session", {
  id: s.text().primaryKey(),
  userId: s
    .text()
    .notNull()
    .references(() => users.id),
  expiresAt: s.integer({ mode: "timestamp" }).notNull(),
});

export type Users = typeof users.$inferSelect;
export type Session = typeof session.$inferSelect;
