import { int, mysqlTable, serial, varchar, text, timestamp, } from 'drizzle-orm/mysql-core';



export const events = mysqlTable("events", {
  event_id: int("event_id").primaryKey().autoincrement(),

  title: text("title").notNull(),
  description: text("description"),
  output: text("output"),

  created_at: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updated_at: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export const event_images = mysqlTable("event_images", {
  image_id: int("image_id").primaryKey().autoincrement(),

  event_id: int("event_id")
    .notNull()
    .references(() => events.event_id, { onDelete: "cascade" }),

  image_url: varchar("image_url", { length: 500 }).notNull(),
  caption: text("caption"),

  created_at: timestamp("created_at")
    .defaultNow()
    .notNull(),
});