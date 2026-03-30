import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

// export const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   age: integer().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// });

export const userTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),

    firstName: varchar('first_name', { length: 45}).notNull(),
    lastName: varchar('last_name', { length: 45}),

    email: varchar('email', {length: 322}).notNull().unique(), 
    emailVerified: boolean('email_verified').default(false).notNull(),

    password: varchar('password', {length: 66}),
    salt: text('salt'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

// ORM - JS(camelCase)  -- DB me snake_case
// DB me varchar firstName => first_name
// notNull = required
// email length kitni rakhe? it was 320 + 2 buffer
// <username>@<domain.com> => 322 length
// password => sha256 - 50 + 16 for buffer & notNull - not required, cause google login
// salt kitna bhi bada hota hai, therefore text type