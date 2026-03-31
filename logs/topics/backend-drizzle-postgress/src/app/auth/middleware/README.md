# /auth/me Route Flow

This document explains how the `GET /auth/me` request is processed in the current codebase.

## Endpoint

- Method: `GET`
- Path: `/auth/me`
- Route registration: `src/app/auth/routes.ts`

## High-Level Flow

1. Request enters Express app in `src/app/index.ts`.
2. Global middleware `authenticationMiddleware()` runs first for every request.
3. If `Authorization` header is present and valid, user payload is attached to `req.user`.
4. Router-level middleware `restrictToAuthenticatedUser()` runs for `/auth/me`.
5. If `req.user` is missing, request is rejected with `401`.
6. Controller `handleMe()` reads `id` from `req.user`.
7. Controller fetches the user by `id` from database (`userTable`).
8. Controller returns public user fields (`firstName`, `lastName`, `email`).

## Detailed Step-by-Step

### 1) Global auth middleware

File: `src/app/auth/middleware/auth.middleware.ts`

- Reads `authorization` header.
- If header is not present: skips auth parsing and calls `next()`.
- If header exists but does not start with `Bearer`: returns `400`.
- Extracts token part after `Bearer `.
- Verifies token using `verifyUserToken(token)`.
- Stores decoded payload on `req.user`.

### 2) Route guard

File: `src/app/auth/middleware/auth.middleware.ts`

- `restrictToAuthenticatedUser()` checks `req.user`.
- If not present: returns

```json
{
	"error": "Authentication Required"
}
```

with status `401`.

### 3) Controller execution

File: `src/app/auth/controller.ts`

- `handleMe()` reads `id` from `req.user`.
- Queries DB:

```ts
db.select().from(userTable).where(eq(userTable.id, id))
```

- Returns:

```json
{
	"firstName": "...",
	"lastName": "...",
	"email": "..."
}
```

## Expected Request Format

```http
GET /auth/me HTTP/1.1
Host: localhost:8080
Authorization: Bearer <jwt_token>
```

## Possible Responses

- `200 OK`: valid token and user found (fields returned).
- `401 Unauthorized`: no authenticated user available at guard step.
- `400 Bad Request`: malformed authorization header when provided.

## Notes

- Authentication parsing is global (`app.use(authenticationMiddleware())`).
- Access control for `/auth/me` is enforced at route level with `restrictToAuthenticatedUser()`.
