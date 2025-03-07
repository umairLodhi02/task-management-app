# Task Management App
    A full-stack task management application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Ant Design for the frontend UI. The app supports user authentication, task creation, editing, and deletion.

# Features
    User Authentication:
      Sign up, log in, and log out functionality.
      JWT-based authentication for secure sessions.

    Task Management:
      Create, read, update, and delete tasks.
      Filter tasks by status (Pending, In Progress, Completed).

    UI Components:
      Built with Ant Design for a clean and responsive UI.
      Modals for adding/editing tasks.
      Tags for task statuses.

    Backend:
      RESTful API built with Express.js.
      MongoDB database with Mongoose for data modeling.

# Technologies Used
    Frontend
      React (Vite)
      Ant Design
      React Query
      React Router DOM

    Backend
      Node.js
      Express.js
      MongoDB
      Mongoose
      JSON Web Tokens (JWT) for authentication

# Setup Instructions
    Prerequisites
      Node.js: Ensure you have Node.js installed (v16 or higher).
      MongoDB: Ensure you have MongoDB installed and running locally or provide a connection string for a remote database.

    1. Clone the Repository
          git clone https://github.com/your-username/task-management-app.git
          cd task-management-app
    2. Set Up the Backend
          1. Navigate to the backend folder:
             cd backend
          2. Install dependencies:
             npm install
          3. Start the backend server:
              npm start
    The backend will run on http://localhost:5000.
    3. Set Up the Frontend
          1. Navigate to the frontend folder:
              cd ../frontend
          2. Install dependencies:
              npm install
           3. Start the frontend development server:
              npm run dev
    The frontend will run on http://localhost:3000.

# Project Structure
    Backend
    
      backend/
      ├── models/
      │   ├── User.js
      │   └── Task.js
      ├── routes/
      │   ├── auth.js
      │   └── tasks.js
      ├── middleware/
      │   └── auth.js
      ├── .env
      ├── server.js
      └── package.json
    Frontend
    
    frontend/
      ├── src/
      │   ├── api/
      │   │   ├── auth.js
      │   │   └── tasks.js
      │   ├── components/
      │   │   ├── Auth/
      │   │   │   ├── Login.js
      │   │   │   └── Register.js
      │   │   ├── Tasks/
      │   │   │   ├── TaskList.js
      │   │   │   ├── TaskForm.js
      │   │   │   └── TaskItem.js
      │   │   └── Layout/
      │   │       └── Header.js
      │   ├── pages/
      │   │   ├── Dashboard.js
      │   │   ├── Login.js
      │   │   └── Register.js
      │   ├── App.js
      │   ├── main.jsx
      │   └── index.css
      ├── .env
      └── package.json

# API Endpoints
    Authentication
    POST /api/auth/signup: Register a new user.
    
    POST /api/auth/login: Log in an existing user.
    
    Tasks
    GET /api/tasks: Fetch all tasks (optional status query parameter for filtering).
    
    POST /api/tasks: Create a new task.
    
    PATCH /api/tasks/:id: Update an existing task.
    
    DELETE /api/tasks/:id: Delete a task.

# Contributing
    Contributions are welcome! If you'd like to contribute, please follow these steps:
    
    Fork the repository.
    
    Create a new branch (git checkout -b feature/your-feature).
    
    Commit your changes (git commit -m 'Add some feature').
    
    Push to the branch (git push origin feature/your-feature).
    
    Open a pull request.

# License
    This project is licensed under the MIT License. See the LICENSE file for details.

# Contact
    For any questions or feedback, feel free to reach out:
    
    Name: Umair Nadeem
    
    Email: umairlodhi02@gmail.com
    
    GitHub: umairLodhi02
    
    Enjoy using the Task Management App! 🚀
