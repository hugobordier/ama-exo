import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Initialize Sequelize with database credentials from environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME as string, // Database name
    process.env.DB_USER as string, // Database user
    process.env.DB_PASSWORD as string, // Database password
    {
        host: "localhost", // Database host
        dialect: 'mysql', // Database dialect
    }
);

export default sequelize; // Export the Sequelize instance
