import { pgTable, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const serverTable = pgTable("servers", {
  id: text("id").primaryKey().notNull(),
  address: text("address").notNull().unique(),
  versions: text("versions").notNull(),
  description: text("description"),
});
