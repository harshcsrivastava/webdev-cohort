import {
    uuid,
    pgTable,
    varchar,
    boolean,
    text,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";

// user: id, firstName, lastName, email, password, salt, emailVerified, role, refreshToken
const roleEnum = pgEnum("role", ["customer", "seller", "admin"]);
export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    firstName: varchar("first_name", { length: 45 }).notNull(),
    lastName: varchar("last_name", { length: 45 }),

    email: varchar("email", { length: 322 }).notNull().unique(),
    emailVerified: boolean("email_Verified").default(false).notNull(),

    password: varchar("password", { length: 66 }),
    salt: text("salt"),

    role: roleEnum("role").default("customer").notNull(),
    
    verificationToken: text("verification_token"),
    refreshToken: text("refresh_token"),
    resetPasswordToken: text("reset_password_token"),
    resetPasswordExpires: timestamp("reset_password_expires"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
