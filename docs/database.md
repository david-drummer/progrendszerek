# Database Design

This document describes the physical MongoDB database structure used by the Book Club application.

## Database Overview

- Database Management System: MongoDB
- Database Name: `bookclub_db`
- Initialization Script: `server/docker-init/mongo-init.js`

## Collections

### users

- Description: Stores registered users and administrators.
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
  - A unique index is recommended on the `email` field.

---

### categories

- Description: Stores book categories used to classify books.
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

- Description: Stores book clubs, including embedded members and embedded books.
- Example source: `server/repositories/bookclubRepository.js`
- Fields:
  - `_id` (ObjectId)
  - `id` (string)
  - `name` (string)
  - `description` (string)
  - `monthlyBookId` (string) — references `books.id`
  - `members` (array of embedded documents)
  - `books` (array of embedded documents)

- Embedded member fields:
  - `userId` (string) — references `users.id`
  - `joinedAt` (Date / ISO timestamp)

- Embedded book fields:
  - `id` (string)
  - `title` (string)
  - `author` (string)
  - `categoryId` (string) — references `categories.id`
  - `publishedAt` (Date)
  - `createdAt` (Date / ISO timestamp)

- Notes:
  - Members are embedded inside the bookclub document.
  - Books are embedded inside the bookclub document.
  - `monthlyBookId` points to one of the embedded books.

---

### ratings

- Description: Stores ratings given by users to books within book clubs.
- Example source: `server/repositories/ratingRepository.js`
- Fields:
  - `_id` (ObjectId)
  - `id` (string)
  - `userId` (string) — references `users.id`
  - `bookId` (string) — references `bookclubs.books.id`
  - `bookclubId` (string) — references `bookclubs.id`
  - `score` (number) — integer between 1 and 5
  - `comment` (string)
  - `createdAt` (Date / ISO timestamp)

- Notes:
  - A rating belongs to one user.
  - A rating belongs to one book.
  - A rating belongs to one bookclub.
  - The score must be an integer between 1 and 5.
  - Indexes are recommended on `bookId` and `userId`.

---

## Relationships

- `bookclubs.members.userId` → `users.id`
- `bookclubs.books.categoryId` → `categories.id`
- `bookclubs.monthlyBookId` → `bookclubs.books.id`
- `ratings.userId` → `users.id`
- `ratings.bookId` → `bookclubs.books.id`
- `ratings.bookclubId` → `bookclubs.id`

---

## Embedded Documents

The `bookclubs` collection contains two embedded arrays:

- `members`
- `books`

This design reduces the need for joins when retrieving complete book club details.

---

## Seed Data

The database is initialized automatically using `server/docker-init/mongo-init.js`, which inserts:

- default users
- book categories
- sample book clubs
- sample ratings

---

## Index Recommendations

- `users.email` (unique)
- `ratings.bookId`
- `ratings.userId`
- `bookclubs.members.userId`