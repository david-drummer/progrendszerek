# Book Club Application

**Programrendszerek fejlesztése gyakorlat**  
**2026 Spring Semester**

---

## 1. Introduction

The Book Club Application is a MEAN stack based web application that allows users to join book clubs, browse books, and rate books within specific book clubs. The purpose of the project is to demonstrate the technologies covered during the course through a complete CRUD application with authentication and role-based authorization.

The system distinguishes two user roles: administrator and regular user. The administrator account is pre-created as seed data, while regular users can register through the application.

### 1.1. Technology Stack

- **MongoDB** – NoSQL database
- **Express.js** – Server-side web framework
- **Angular** – Client-side framework
- **Node.js** – JavaScript runtime environment

---

## 2. Roles

### 2.1. Administrator

The administrator has a pre-registered account and the following permissions:

- Browse book clubs
- View book club details
- View books within book clubs
- Create, update, and delete categories
- Create, update, and delete book clubs
- Add and remove books in book clubs
- Add and remove members in book clubs
- View ratings for books
- Delete any rating

### 2.2. User

Registered users have the following permissions:

- Register and log in
- Browse book clubs
- View book club details
- View books within book clubs
- View ratings for books
- Create ratings for books
- Edit their own ratings
- View their profile data 
- Change their password
- Delete their profile

---

## 3. Functional Requirements

1. Users can register with username, email address, and password.
2. Users can log in using email and password and receive a JWT token.
3. Administrators can cretate, update, and delete categories.
4. Administrators can create, update, and delete book clubs.
5. Administrators can add books to book clubs.
6. Administrators can add and remove members from book clubs.
7. Users can browse all book clubs.
8. Users can view detailed information about a selected book club.
9. Users can view books belonging to a book club.
10. Users can view ratings for a selected book.
11. Users can create ratings with a score between 1 and 5 and an optional comment.
12. Users can edit only their own ratings.
13. Administrators can delete any rating.
14. Users can change their own password.
15. Users can view their profile data.
16. Users can delete their profile.
17. The database contains demonstration data inserted during initialization.

---

## 4. Non-Functional Requirements

1. Passwords are stored using bcrypt hashes.
2. Authentication is based on JWT tokens with expiration time.
3. Role-based access control is implemented using Express middleware.
4. CORS is configured to enable communication between client and server.
5. The server returns meaningful HTTP status codes and error messages.
6. The user interface is responsive and built with Angular Material.
7. The application supports seed data initialization through MongoDB scripts.

---

## 5. Client-Side Views

### 5.1. Public Views

- Login
- Registration

### 5.2. Authenticated User Views

- Book Club List
- Book Club Details
- Book Ratings
- Profile Management

### 5.3. Administrator Views

- Category Management
- Book Club Management
- Rating Moderation

---

## 6. Installation and Execution

The application can be run locally using Node.js, Angular CLI, and MongoDB.

Prerequisites:

- Node.js (v24)
- MongoDB
- Angular CLI (v21)

---

## 7. Project Structure

| Directory / File | Description |
|------------------|-------------|
| `/server` | Express.js backend source code |
| `/client` | Angular frontend source code |
| `/docs` | Project documentation |
| `README.md` | Installation and usage guide |