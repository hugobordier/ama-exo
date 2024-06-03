# Recipe App
This is a full-stack recipe application that allows users to create, read, update, and delete (CRUD) recipes. The frontend is built using React with TypeScript and Vite, while the backend is built using Node.js with TypeScript and Sequelize as the ORM for MySQL.

# Features
- Create new recipes with a name, description, ingredients, instructions, and image.
- View a list of all recipes, with the ability to search and filter by name.
- View the details of a specific recipe, including its name, description, ingredients, instructions, and image.
- Update the details of an existing recipe, including its name, description, ingredients, instructions, and image.
- Delete an existing recipe.

# Getting Started
## Prerequisites
- Node.js and npm installed on your machine.
- MySQL server installed and running on your machine.

## Backend Setup
- Clone the repository and navigate to the backend directory.
- Install the required dependencies by running `npm install`.
- Create a `.env` file in the backend directory and add the following variables, replacing the placeholders with your MySQL credentials:
  - `DB_NAME=<your_database_name>`
  - `DB_USER=<your_database_user>`
  - `DB_PASSWORD=<your_database_password>`
- Start the backend server by running `npm start`. The server will be running on http://localhost:3000.

## Frontend Setup
- Clone the repository and navigate to the frontend directory.
- Install the required dependencies by running `npm install`.
- Start the frontend development server by running `npm run dev`. The application will be available at http://localhost:5173.

# Built With
- React - Frontend library for building user interfaces.
- TypeScript - Statically-typed superset of JavaScript that adds type safety to the codebase.
- Vite - Frontend build tool that provides a fast and efficient development experience.
- Node.js - Backend runtime environment for executing JavaScript code on the server-side.
- Sequelize - Promise-based Node.js ORM for MySQL that provides an easy-to-use and powerful API for interacting with the database.
- MySQL - Popular open-source relational database management system.


# License
This project is licensed under the MIT License.
