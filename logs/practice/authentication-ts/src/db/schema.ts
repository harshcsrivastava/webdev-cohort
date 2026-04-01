import {
    uuid,
    pgTable,
    varchar,
    boolean,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

// user: id, firstName, lastName, email, password, salt, role, isEmailVerified
export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    firstName: varchar("first_name", { length: 45 }).notNull(),
    lastName: varchar("last_name", { length: 45 }),

    email: varchar("email", { length: 322 }).notNull().unique(),
    emailVerified: boolean("email_Verified").default(false).notNull(),

    password: varchar("password", { length: 66 }),
    salt: text("salt"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
