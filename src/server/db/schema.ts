// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  bigint,
  index,
  mysqlTableCreator,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `pop_modeler_${name}`);

export const user_table = createTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
    rememberToken: text("rememberToken"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
export type DB_UserType = typeof user_table.$inferSelect;