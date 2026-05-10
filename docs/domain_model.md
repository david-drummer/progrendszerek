# Domain model

This document describes the current data model inferred from the in-memory repository files under server/repositories.

## Collections

### users

- Description: Application users with roles and authentication data.
- Example source: `server/repositories/userRepository.js`
- Fields:
  - `_id` (ObjectId) — MongoDB document ID
  - `id` (string) — optional application-level ID used by seeded users
  - `username` (string)
  - `email` (string)
  - `role` (string) — e.g. `admin`, `user`
  - `password` (string) — bcrypt hash
  - `createdAt` (Date / ISO timestamp)

- Notes:
  - Passwords must never be stored as plain text.
  - The API removes the password field from public responses.
  - Seeded users may have an `id` field, while newly registered users use MongoDB `_id`.

---

### categories

- Description: Book categories used to classify books.
- Example source: `server/repositories/categoryRepository.js`
- Fields:
  - `_id` (ObjectId)
  - `id` (string)
  - `name` (string)
  - `description` (string)

- Notes:
  - Books reference categories through `categoryId`.

---

### bookclubs

- Description: Book club groups containing members and books.
- Example source: `server/repositories/bookclubRepository.js`
- Fields:
  - `_id` (ObjectId)
  - `id` (string)
  - `name` (string)
  - `description` (string)
  - `monthlyBookId` (string Id)
  - `members` (array of string IDs and joinedAt Dates) — references users
  - `books` (array of book objects)

- Embedded book fields:
  - `id` (string)
  - `title` (string)
  - `author` (string)
  - `categoryId` (string) — references categories
  - `publishedAt` (Date)
  - `createdAt` (Date / ISO timestamp)

- Notes:
  - Books are embedded inside bookclubs.
  - Members are embedded inside bookclubs.
  - Members reference users by ID.
  - A book can be rated inside a specific bookclub.

---

### ratings

- Description: User ratings for books inside bookclubs.
- Example source: `server/repositories/ratingRepository.js`
- Fields:
  - `_id` (ObjectId)
  - `id` (string)
  - `userId` (string) — references users
  - `bookId` (string) — references an embedded book inside a bookclub
  - `bookclubId` (string) — references bookclubs
  - `score` (number) — integer between 1 and 5
  - `comment` (string)
  - `createdAt` (Date / ISO timestamp)

- Notes:
  - A rating belongs to one user.
  - A rating belongs to one book.
  - A rating is connected to a specific bookclub.
  - The score must be an integer between 1 and 5.

---

## Relationships

- A user can be a member of multiple bookclubs.
- A bookclub can have multiple members.
- A bookclub can contain multiple books.
- A book belongs to a category.
- A user can create ratings for books.
- A rating connects a user, a book, and a bookclub.

---

## Role-based behavior

### User

- Can view bookclubs.
- Can view books inside bookclubs.
- Can view ratings.
- Can create ratings.
- Can edit only their own ratings.

### Admin

- Can view bookclubs.
- Can view books inside bookclubs.
- Can view ratings.
- Can manage categories.
- Can manage bookclubs.
- Can delete ratings.


---

## Reference usage / recommendations

- The application currently uses both MongoDB `_id` and application-level `id` fields.
- Seeded data may use string IDs such as `"1"` and `"2"`.
- Newly created MongoDB documents receive an automatically generated `_id`.
- For consistent long-term development, references should use one ID strategy consistently.
- If MongoDB `_id` is used for relations, the frontend should send `_id` values to the backend.
- If application-level `id` is used, repositories must support lookup by that field as well.

---

## Collections-to-create mapping

- `users` — seeded with an admin and a demo user.
- `categories` — seeded with book categories.
- `bookclubs` — seeded with sample bookclubs, members, and embedded books.
- `ratings` — seeded with sample ratings for books inside bookclubs.