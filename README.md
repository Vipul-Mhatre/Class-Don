# Project Assignment Management System

## Overview
The Project Assignment Management System is a full-stack web application that allows users to manage project assignments, track progress, and calculate scores dynamically. The application includes:

1. A backend API built using Node.js and SQLite.
2. A React-based frontend interface with an interactive and user-friendly design.
3. Dynamic data visualization using charts to display project progress and summary statistics.

---

## Features

### Core Features
- **Project Management**:
  - View a list of assigned projects.
  - Update project progress dynamically.
  - Track scores associated with task completion.

- **Interactive Progress Controls**:
  - Increment or decrement project progress using arrow buttons.
  - Manual input for progress percentage (validated between 0% and 100%).

- **Dynamic Data Visualization**:
  - Real-time graphs displaying total progress and average scores using Chart.js.

- **Responsive UI**:
  - Clean, user-friendly design optimized for desktop and tablet screens.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Vipul-Mhatre/Class-Don.git
   cd Class-Don/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with sample data:
   ```bash
   node seed.js
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   By default, the backend server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

## Project Structure

### Backend (`/backend`):
- **`server.js`**: Entry point for the backend server.
- **`routes/`**: Contains API route definitions.
- **`db.js`**: SQLite database setup and connection.
- **`seed.js`**: Script to populate the database with initial data.

### Frontend (`/frontend`):
- **`src/components/`**: Contains React components like tables, forms, and charts.
- **`src/App.js`**: Main React component.
- **`src/App.css`**: Styles for the frontend.

---

## API Endpoints

### Base URL: `http://localhost:5000`

#### Projects
- **`GET /api/projects`**: Fetch all projects.
- **`PUT /api/projects/:id/progress`**: Update progress for a specific project. Requires a request body:
  ```json
  {
    "progress": 50
  }
  ```

- **`GET /api/projects/summary`**: Fetch total progress and average score.

---

## Technology Stack used

### Frontend:
- **React.js**: For building a dynamic and interactive user interface.
- **Chart.js**: For rendering charts and visualizing data.
- **CSS**: For styling and layout.

### Backend:
- **Node.js**: For building the server-side API.
- **Express.js**: For creating RESTful API routes.
- **SQLite**: For database management and storage.

### Other Tools:
- **Axios**: For making HTTP requests from the frontend to the backend.
- **ESLint & Prettier**: For code formatting and linting.

---

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

---

## License
This project is licensed under the MIT License.