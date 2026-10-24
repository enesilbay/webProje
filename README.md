# Course Center — Online Course Management Platform

A full-stack web application for browsing, enrolling in and managing online courses. Students can register, enroll in courses and follow their content, while administrators manage courses and categories from an admin panel.

The repository contains two applications:

| Folder | Description | Stack |
| --- | --- | --- |
| `kurs-backend` | REST API with JWT authentication and Swagger docs | NestJS 11, TypeORM, PostgreSQL |
| `kurs-frontend` | Single-page client | React 19, React Router 7, Axios, Bootstrap 5 |

## Features

- Registration and login with **JWT** authentication and password hashing (bcrypt)
- **Role-based access control** (`student` and `admin`) enforced by guards on the API and protected routes on the client
- Course catalog with categories
- Student enrollment: enroll in and leave courses, "My Courses" page, course content page
- Admin panel for creating and managing courses
- Interactive API documentation via **Swagger** at `/api`

## Project Structure

```
kurs-backend/src
├── auth/          # JWT strategy, roles guard, login/register
├── users/         # User entity and endpoints
├── courses/       # Course entity and endpoints
├── categories/    # Category entity and endpoints
└── enrollments/   # Enroll / leave / list user enrollments

kurs-frontend/src
├── pages/         # Home, Login, Register, MyCourses, CourseContent, Admin and Student pages
├── components/    # Navbar
└── api/ services/ # Axios instance and API calls
```

## Getting Started

**Prerequisites:** Node.js 18+ and a PostgreSQL database.

### Backend

```bash
cd kurs-backend
npm install
# Configure the PostgreSQL connection in src/app.module.ts
# (prefer environment variables so credentials are never committed)
npm run start:dev
```

The API runs on `http://localhost:3001` (or `PORT`) and Swagger on `http://localhost:3001/api`.

### Frontend

```bash
cd kurs-frontend
npm install
npm start
```

The client runs on `http://localhost:3000`.

## License

This project was developed for learning and portfolio purposes.
