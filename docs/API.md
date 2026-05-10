# API Documentation

This document describes the REST API endpoints of the Book Club application.

## Base URL

```text
/api
```

## Authentication

### POST `/auth/register`

Registers a new user account and returns a JWT token.

**Access:** Public

**Request body:**

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret"
}
```

**Success response:** `201 Created`

```json
{
  "user": {
    "id": "1",
    "username": "john",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt-token"
}
```

---

### POST `/auth/login`

Authenticates a registered user and returns a JWT token.

**Access:** Public

**Request body:**

```json
{
  "email": "john@example.com",
  "password": "secret"
}
```

**Success response:** `200 OK`

```json
{
  "user": {
    "id": "1",
    "username": "john",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt-token"
}
```

---

## Bookclubs

### GET `/bookclubs`

Returns all bookclubs.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Success response:** `200 OK`

---

### GET `/bookclubs/my`

Returns the bookclubs where the logged-in user is a member.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Success response:** `200 OK`

---

### GET `/bookclubs/:id/books`

Returns the books of a selected bookclub.

Supports optional filtering by category.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Query parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `categoryId` | string | No | Filters books by category ID |

**Example:**

```text
GET /api/bookclubs/1/books?categoryId=2
```

**Success response:** `200 OK`

---

### GET `/bookclubs/:id`

Returns one bookclub by ID.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Success response:** `200 OK`

---

### POST `/bookclubs`

Creates a new bookclub.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Request body:**

```json
{
  "name": "The Reading Circle",
  "description": "A friendly book club for readers."
}
```

**Success response:** `201 Created`

---

### PUT `/bookclubs/:id`

Updates an existing bookclub.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Request body:**

```json
{
  "name": "Updated Bookclub Name",
  "description": "Updated description"
}
```

**Success response:** `200 OK`

---

### DELETE `/bookclubs/:id`

Deletes a bookclub.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Success response:** `204 No Content`

---

### POST `/bookclubs/:id/members`

Adds a member to a bookclub.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Request body:**

```json
{
  "userId": "1"
}
```

**Success response:** `200 OK`

---

### DELETE `/bookclubs/:id/members/:userId`

Removes a member from a bookclub.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Success response:** `200 OK`

---

### POST `/bookclubs/:id/books`

Adds a book to a bookclub.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Request body:**

```json
{
  "title": "The Martian",
  "author": "Andy Weir",
  "categoryId": "3",
  "publishedAt": "2011-02-24"
}
```

**Success response:** `200 OK`

---

## Categories

### GET `/categories`

Returns all categories.

**Access:** Public

**Success response:** `200 OK`

---

### GET `/categories/:id`

Returns one category by ID.

**Access:** Public

**Success response:** `200 OK`

---

### POST `/categories`

Creates a new category.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Request body:**

```json
{
  "name": "Science Fiction",
  "description": "Books related to science fiction."
}
```

**Success response:** `201 Created`

---

### PUT `/categories/:id`

Updates an existing category.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Request body:**

```json
{
  "name": "Updated Category",
  "description": "Updated description"
}
```

**Success response:** `200 OK`

---

### DELETE `/categories/:id`

Deletes a category.

**Access:** Admin only

**Middleware:** `authMiddleware` → `roleMiddleware('admin')`

**Success response:** `204 No Content`

---

## Ratings

### GET `/ratings`

Returns all ratings.

**Access:** Public

**Success response:** `200 OK`

---

### GET `/ratings/:id`

Returns a single rating by ID.

**Access:** Public

**Success response:** `200 OK`

---

### POST `/ratings`

Creates a new rating for a book.

**Access:** Registered users only

**Middleware:** `authMiddleware` → `roleMiddleware('user')`

**Request body:**

```json
{
  "bookId": "1",
  "bookclubId": "1",
  "score": 5,
  "comment": "Excellent book."
}
```

**Notes:**

- The `userId` field is automatically assigned from the authenticated user (`req.user.id`).
- The score must be an integer between 1 and 5.

**Success response:** `201 Created`

---

### PUT `/ratings/:id`

Updates an existing rating.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Notes:**

- Users can update only their own ratings.
- Administrators are not allowed to update ratings.

**Request body:**

```json
{
  "score": 4,
  "comment": "After reconsideration, I would rate it slightly lower."
}
```

**Success response:** `200 OK`

---

### DELETE `/ratings/:id`

Deletes a rating.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Notes:**

- Administrators can delete any rating.
- Regular users cannot delete ratings through the client application.

**Success response:** `204 No Content`

---

## Users

### GET `/users`

Returns all users.

**Access:** Public

**Success response:** `200 OK`

---

### GET `/users/:id`

Returns one user by ID.

**Access:** Public

**Success response:** `200 OK`

---

### POST `/users`

Creates a new user.

**Access:** Public

**Notes:**

- This endpoint is primarily intended for administrative use.
- In the application, normal user registration is performed through `POST /auth/register`.

**Request body:**

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret",
  "role": "user"
}
```

**Success response:** `201 Created`

---

### PUT `/users/:id`

Updates an existing user.

**Access:** Public

**Request body:**

```json
{
  "username": "updated_username",
  "email": "updated@example.com"
}
```

**Success response:** `200 OK`

---

### DELETE `/users/:id`

Deletes a user account.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Success response:** `204 No Content`

---

### POST `/users/:id/change-password`

Changes the password of the authenticated user.

**Access:** Authenticated users

**Middleware:** `authMiddleware`

**Request body:**

```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

**Notes:**

- Users can change only their own password.
- The current password must be provided and validated.
- Passwords are stored as bcrypt hashes.

**Success response:** `200 OK`

```json
{
  "message": "Password successfully updated."
}
```