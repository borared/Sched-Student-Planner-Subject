# Study Planner Backend

This is the backend API for the Study Planner application, built with Node.js, Express.js, and MongoDB.

## Features

* **User Authentication:** Registration, login, and secure route protection using JSON Web Tokens (JWT).
* **Task Management:** Create, read, update, and delete study tasks. Tasks can have deadlines and be marked as completed.
* **Subject Management:** Create and delete study subjects. Tasks can optionally be linked to a specific subject.

## Tech Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/) ODM)
* **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## Project Structure

The project is organized in a standard MVC (Model-View-Controller) inspired architecture:

```
backend/
├── config/
│   └── db.js                 # Mongoose connection setup to MongoDB
├── controllers/
│   ├── authController.js     # Logic for user registration and login endpoints
│   ├── subjectController.js  # Logic for subject CRUD operations
│   └── taskController.js     # Logic for task CRUD operations
├── middleware/
│   └── authMiddleware.js     # Middleware to verify JWT tokens and protect routes
├── models/
│   ├── Subject.js            # Mongoose schema for Subjects
│   ├── Task.js               # Mongoose schema for Tasks
│   └── User.js               # Mongoose schema for Users (includes password hashing hook)
├── routes/
│   ├── authRoutes.js         # API routes for authentication (/api/auth)
│   ├── subjectRoutes.js      # API routes for subjects (/api/subjects)
│   └── taskRoutes.js         # API routes for tasks (/api/tasks)
├── .env                      # Environment variables mapping (MUST NOT in version control)
├── .gitignore                # Specifies intentionally untracked files to ignore
├── package.json              # Project metadata and dependencies
└── server.js                 # Entry point: Initializes Express, connects to DB, sets up middleware and routes
```

### Flow of Request
1. **`server.js`** receives the incoming HTTP request.
2. The request is routed to the appropriate file in the **`routes/`** directory.
3. If the route is protected, the request passes through the **`middleware/authMiddleware.js`** to verify the user's token.
4. The route then calls the corresponding function in the **`controllers/`** directory.
5. The controller interacts with MongoDB using the schemas defined in the **`models/`** directory to perform databases operations.
6. The controller sends a JSON response back to the client.

## Getting Started

### Prerequisites

* Node.js installed
* MongoDB installed locally or access to a MongoDB Atlas cluster

### Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   * The project expects a `.env` file in the root of the `backend` directory.
   * Provide valid values for `MONGO_URI` and `JWT_SECRET`.
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/study-planner
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   ```

4. Start the server:
   ```bash
   # For development (auto-restarts on code changes)
   npm run dev

   # For production
   npm start
   ```

## API Endpoints

### Authentication
* **POST** `/api/auth/register` - Register a new user
* **POST** `/api/auth/login` - Authenticate user and get token

### Tasks (Requires Authentication)
* **GET** `/api/tasks` - Get all tasks for logged in user
* **POST** `/api/tasks` - Create a new task
* **PUT** `/api/tasks/:id` - Update a task
* **DELETE** `/api/tasks/:id` - Delete a task

### Subjects (Requires Authentication)
* **GET** `/api/subjects` - Get all subjects for logged in user
* **POST** `/api/subjects` - Create a new subject
* **DELETE** `/api/subjects/:id` - Delete a subject
