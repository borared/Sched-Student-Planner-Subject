# 📅 Sched

Sched is a minimalist full-stack Study Planner web application designed to help students organize their tasks, manage deadlines, and track study progress in a simple and user-friendly way.

---

## 🎯 Objective

The main objective of this project is to:

- Help users plan and manage their study tasks efficiently  
- Provide a clean and distraction-free interface  
- Practice full-stack development using modern technologies  
- Understand real-world application structure (frontend + backend + database)  

---

## 📌 Scope

Sched focuses on core productivity features:

- User authentication (Register / Login)
- Task management (Create, Read, Update, Delete)
- Mark tasks as completed
- Subject organization
- Deadline tracking
- Basic progress tracking

This project is designed to be **minimalist**, avoiding unnecessary complexity while still covering essential features of a real-world application.

---

## 🛠️ Technologies Used

### 🔹 Frontend
- React.js
- Vite
- JavaScript
- CSS (or Tailwind CSS if used)

### 🔹 Backend
- Node.js
- Express.js
- JavaScript

### 🔹 Database
- MongoDB (with Mongoose)

### 🔹 Other Tools
- JWT (Authentication)
- bcrypt (Password hashing)
- dotenv (Environment variables)

---

## 🧩 Project Structure

The project is divided into two main parts:
Sched/
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Application pages (Dashboard, Tasks, etc.)
│ │ ├── services/ # API calls to backend
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.html
│
├── server/ # Backend (Node.js + Express)
│ ├── config/ # Database configuration
│ ├── models/ # Mongoose models (User, Task, Subject)
│ ├── controllers/ # Business logic
│ ├── routes/ # API routes
│ ├── middleware/ # Authentication middleware
│ └── server.js # Entry point
│
└── README.md


---

## 🚀 Features Overview

### 🔐 Authentication
- User registration and login
- Secure password hashing
- JWT-based authentication

### ✅ Task Management
- Create, edit, delete tasks
- Mark tasks as completed
- Assign deadlines

### 📚 Subjects
- Organize tasks by subject
- Simple categorization system

### 📊 Dashboard
- View today's tasks
- Track progress
- See upcoming deadlines

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/sched.git
cd sched

```frontend
cd frontend
npm install
npm run dev

```backend
cd backend
npm install
npm run dev
