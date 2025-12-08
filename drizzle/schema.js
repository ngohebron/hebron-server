import { decimal } from 'drizzle-orm/gel-core';
import { int, mysqlTable, serial, varchar, text, timestamp, date, } from 'drizzle-orm/mysql-core';



export const events = mysqlTable("events", {
  event_id: int("event_id").primaryKey().autoincrement(),

  title: text("title").notNull(),
  description: text("description"),
  output: text("output"),
  event_date: date("event_date"), 

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

export const donner = mysqlTable("donner", {
  doner_id: int("doner_id").primaryKey().autoincrement(),

  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  pancard_no: text("pancard_no").notNull(),

  created_at: timestamp("created_at")
    .defaultNow()
    .notNull(),
});


export const donation = mysqlTable("donation", {
  donation_id: int("donation_id").primaryKey().autoincrement(),

  donor_id: int("donor_id")
    .notNull()
    .references(() => donner.doner_id, { onDelete: "cascade" }),

  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),

  currency: text("currency").notNull(),
  status: text("status").notNull(),

  payment_gateway: text("payment_gateway"),
  payment_order_id: text("payment_order_id"),
  payment_txn_id: text("payment_txn_id"),

  message: text("message"),

  created_at: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updated_at: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export const donation_receipts = mysqlTable("donation_receipts", {
  receipt_id: int("receipt_id").primaryKey().autoincrement(),

  donation_id: int("donation_id")
    .notNull()
    .references(() => donation.donation_id, { onDelete: "cascade" }),

  receipt_number: text("receipt_number").notNull(),
  receipt_url: text("receipt_url").notNull(),

  issued_on: timestamp("issued_on")
    .defaultNow()
    .notNull(),
});