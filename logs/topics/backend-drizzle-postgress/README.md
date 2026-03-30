# ORM - Object Relational Mapper
We are writing in one language and it is converting to another language like a translator.
ORM (Object-Relational Mapper) is very common because it saves you from writing raw SQL and lets you interact with the database using objects and methods in your programming language.

- Drizzle - ORM in TS | it give you a syntax to write raw sql like thing
- typeORM
- kysely
- SQLOrm
- ObjectionJS - built on knex - offers eager loading(to join 3-4 table, etc)
- prisma ORM - doesn't tell how, control lelega and kam krdegi lekin pata nhi chlega kaise

---

# Drizzle
All the tables will be in ```/db/schema.ts``` [Setup Doc](https://orm.drizzle.team/docs/get-started/postgresql-new)

Always same format:d
DATABASE_URL=`postgres://<username>:<password>@localhost:5432/<db_name>`

Universally Unique Identifier (UUID) is a 128-bit label used in computer systems to uniquely identify information, such as database records, files, or sessions

DB_MIGRATION : never `npx drizzle-kit push`

    - "studio": "drizzle-kit studio",
    - "db:generate": "drizzle-kit generate", => pahle banao
    - "db:migrate": "drizzle-kit migrate" => then push

### Notes
- Uncomment     ```typescript // For nodejs:
    "lib": ["esnext"],
    "types": ["node"],
    // and npm install -D @types/node``` 
- For Docker, refer ```docker-compose.yml```
- tsconfig rone lagega if src ke bahar koi .ts hai, therefore .js krdo drizzle ko