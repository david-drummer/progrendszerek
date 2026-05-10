# Book Club Application

This project is a MEAN stack web application developed for the **Programrendszerek fejlesztése** course.

The application allows users to:

- Register and log in
- Browse book clubs
- View books within book clubs
- Rate books and edit their own ratings

Administrators can:

- Manage categories
- Manage book clubs
- Add books to book clubs
- Add and remove members
- Delete ratings

---

## AI Usage Declaration

This project was developed with the assistance of artificial intelligence tools, including **ChatGPT** and **GitHub Copilot**.

Due to time constraints, the prompts and detailed interactions used during development were not documented.

---

## Project Structure

| Directory | Description |
|----------|-------------|
| `server/` | Express.js backend application |
| `client/` | Angular frontend application |
| `docs/` | Project documentation |
| `docker-compose.yml` | Docker configuration for MongoDB and backend |

---

## Starting the Server

Open a terminal in the root `progrendszerek` directory and run:

```bash
docker-compose up -d


This command starts:

- MongoDB
- Express.js backend server

---

## Starting the Client

Open a second terminal, navigate to the `client` directory, and run:

```bash
ng serve
```

This starts the Angular development server.

---

## Accessing the Application

Once the server and client are running, open your browser and navigate to:

```text
http://localhost:4200/auth/login
```

---

## Demo Accounts

### Administrator

- Email: `admin@book.hu`
- Password: `admin`

### Demo User

- Email: `dummy_user@book.hu`
- Password: `dummy_user`

---

## Technology Stack

- MongoDB
- Express.js
- Angular
- Node.js
- Angular Material
- Docker
- JWT Authentication
- bcrypt Password Hashing

---

## Documentation

Additional project documentation can be found in the `docs/` directory:

- `bookclub_specification.md`
- `permission_matrix.md`
- `domain_model.md`
- `database.md`
- `api.md`