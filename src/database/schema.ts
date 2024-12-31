import { relations, sql } from "drizzle-orm";
import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";

// Utility for timestamps
const timestamps = {
  createdAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
};

export const users = sqliteTable("users", {
  id: integer().primaryKey(),
  username: text("username").notNull().unique(),
  avatarUrl: text("avatar_url").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isActive: integer({ mode: "boolean" }).default(true).notNull(),
  lastLogin: integer({ mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  ...timestamps,
});

export const session = sqliteTable("session", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
});

export const stores = sqliteTable(
  "stores",
  {
    id: integer().primaryKey(),
    ownerId: integer()
      .notNull()
      .references(() => users.id),
    name: text().notNull(),
    slug: text().notNull(),
    shortName: text("short_name").notNull(), // e.g., "17ave", "downtown"
    description: text().notNull(),
    tags: text().notNull(),
    photo: text().notNull(),
    status: text({ enum: ["active", "closed", "temporary_closed"] })
      .default("active")
      .notNull(),
    address: text()
      .notNull()
      .references(() => addresses.id),
    ...timestamps,
  },
  (table) => ({
    ownerIdx: index("owner_idx").on(table.ownerId),
    // Removed slugIdx since unique constraint already creates an index
    nameAddressIdx: index("name_address_idx").on(table.name, table.address),
    addressIdx: index("address_idx").on(table.address),
  })
);

export const addresses = sqliteTable("addresses", {
  id: integer().primaryKey(),
  address: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  country: text().notNull(),
  zip: text().notNull(),
  coordinates: text({ mode: "json" }).notNull(),
  ...timestamps,
});

export const reviews = sqliteTable(
  "reviews",
  {
    id: integer().primaryKey(),
    author: integer()
      .notNull()
      .references(() => users.id),
    store: integer()
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    title: text().notNull(),
    text: text().notNull(),
    rating: integer({ mode: "number" }).default(3).notNull(),
    helpful: integer({ mode: "boolean" }).default(false).notNull(),
    createdAt: integer({ mode: "timestamp" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    updatedAt: integer({ mode: "timestamp" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => ({
    storeAuthorIdx: index("store_author_idx").on(table.store, table.author),
  })
);

export const tags = sqliteTable(
  "tags",
  {
    id: integer().primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    color: text("color"), // Optional
  },
  (table) => ({
    nameIdx: index("name_idx").on(table.name),
    slugIdx: index("slug_idx").on(table.slug),
  })
);

export const storeTags = sqliteTable("store_tags", {
  id: integer().primaryKey(),
  storeId: integer()
    .notNull()
    .references(() => stores.id),
  tagId: integer()
    .notNull()
    .references(() => tags.id),
  ...timestamps,
});

//  relations

// Then define the relations
export const usersRelations = relations(users, ({ many }) => ({
  stores: many(stores),
  reviews: many(reviews),
  sessions: many(session),
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
  owner: one(users, {
    fields: [stores.ownerId],
    references: [users.id],
  }),
  reviews: many(reviews),
  address: one(addresses, {
    fields: [stores.address],
    references: [addresses.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  stores: many(storeTags),
}));

export const storeTagsRelations = relations(storeTags, ({ one }) => ({
  store: one(stores, {
    fields: [storeTags.storeId],
    references: [stores.id],
  }),
  tag: one(tags, {
    fields: [storeTags.tagId],
    references: [tags.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  store: one(stores, {
    fields: [reviews.store],
    references: [stores.id],
  }),
  author: one(users, {
    fields: [reviews.author],
    references: [users.id],
  }),
}));

export const addressesRelations = relations(addresses, ({ many }) => ({
  stores: many(stores),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.userId],
    references: [users.id],
  }),
}));

export type Users = typeof users.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Stores = typeof stores.$inferSelect;
export type Reviews = typeof reviews.$inferSelect;
export type Address = typeof addresses.$inferSelect;
