# Book Club – CRUD Permission Matrix

## Roles

| Symbol | Role | Description |
|--------|------|-------------|
| **Admin** | Administrator | Pre-registered account created as seed data |
| **User** | Registered User | Account created through the registration form |


## Symbols

- ✅ – Full access
- 🔒 – Own resource only
- ❌ – No access

---

## 1. Categories (`/api/categories`)

| Operation | Admin | User | Guest |
|----------|-------|------|-------|
| **Create** – Create a new category | ✅ | ❌ | ❌ |
| **Read** – List categories | ✅ | ✅ | ❌ |
| **Update** – Update a category | ✅ | ❌ | ❌ |
| **Delete** – Delete a category | ✅ | ❌ | ❌ |

> Middleware: `authMiddleware` + `roleMiddleware('admin')` for Create, Update, and Delete operations.

---

## 2. Book Clubs (`/api/bookclubs`)

| Operation | Admin | User | Guest |
|----------|-------|------|-------|
| **Create** – Create a new book club | ✅ | ❌ | ❌ |
| **Read** – List and view book clubs | ✅ | ✅ | ❌ |
| **Update** – Update a book club | ✅ | ❌ | ❌ |
| **Delete** – Delete a book club | ✅ | ❌ | ❌ |
| **Add book** – Add a book to a book club | ✅ | ❌ | ❌ |
| **Add member** – Add a member to a book club | ✅ | ❌ | ❌ |
| **Remove member** – Remove a member from a book club | ✅ | ❌ | ❌ |

> Middleware: `authMiddleware` + `roleMiddleware('admin')` for management operations.

---

## 3. Ratings (`/api/ratings`)

| Operation | Admin | User | Guest |
|----------|-------|------|------|
| **Create** – Create a rating for a book | ❌ | ✅ | ❌ |
| **Read** – View ratings | ✅ | ✅ | ❌ |
| **Update** – Update a rating | ❌ | 🔒 | ❌ |
| **Delete** – Delete a rating | ✅ | ❌ | ❌ |

> **Admin**: can moderate ratings by deleting them, but cannot create or update ratings.  
> **User**: can create ratings and update only their own ratings.  
> Middleware: `authMiddleware` for Create, Update, and Delete operations. Ownership checks are handled in the service layer.

---

## 4. Users (`/api/users`)

| Operation | Admin | User | Guest |
|----------|-------|------|------|
| **Read** – List own user data | ✅ | ✅ | ❌ |
| **Delete** – Delete own profile | ✅ | ✅ | ❌ |
| **Change password** | ✅ | ✅ | ❌ |

> Admin users can manage user accounts. Regular users can view their own profile-related data and change their own password. 

---

## 5. Authentication (`/api/auth`)

| Operation | Admin | User | Guest |
|----------|-------|------|-------|
| **Register** – Create a new account | ❌ | ❌ | ✅ |
| **Login** – Authenticate and receive a JWT token | ✅ | ✅ | ❌ |

> Registration is available for guests. Login is available for registered users and administrators.

---

## Middleware Summary

| Endpoint | Middleware chain |
|---------|------------------|
| `GET /api/categories` | authMiddleware |
| `POST /api/categories` | `authMiddleware` → `roleMiddleware('admin')` |
| `PUT /api/categories/:id` | `authMiddleware` → `roleMiddleware('admin')` |
| `DELETE /api/categories/:id` | `authMiddleware` → `roleMiddleware('admin')` |
| `GET /api/bookclubs` | `authMiddleware` |
| `GET /api/bookclubs/:id` | `authMiddleware` |
| `POST /api/bookclubs` | `authMiddleware` → `roleMiddleware('admin')` |
| `PUT /api/bookclubs/:id` | `authMiddleware` → `roleMiddleware('admin')` |
| `DELETE /api/bookclubs/:id` | `authMiddleware` → `roleMiddleware('admin')` |
| `POST /api/bookclubs/:id/books` | `authMiddleware` → `roleMiddleware('admin')` |
| `POST /api/bookclubs/:id/members` | `authMiddleware` → `roleMiddleware('admin')` |
| `DELETE /api/bookclubs/:id/members/:userId` | `authMiddleware` → `roleMiddleware('admin')` |
| `GET /api/ratings` | authMiddleware |
| `GET /api/ratings/:id` | authMiddleware |
| `POST /api/ratings` | `authMiddleware` → `roleMiddleware('user')` |
| `PUT /api/ratings/:id` | `authMiddleware` → owner check |
| `DELETE /api/ratings/:id` | `authMiddleware` → admin check |
| `POST /api/auth/register` | Public |
| `POST /api/auth/login` | Public |