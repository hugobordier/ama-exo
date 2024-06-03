import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import sequelize from "./config/database"; // Import Sequelize instance
import Recipe from './models/recipes'; // Import Recipe model
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer'; // Import multer for file uploads
import upload from "./midlewares/upload"; // Import middleware for handling file uploads
dotenv.config(); // Load environment variables from .env file

// Initialize Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing
const port = 3000; // Define port for the server

// Route to check if server is running
app.get("/", (req, res) => {
    res.send(`Server is running on port ${port}`);
});

// Route to get all recipes
/**
 * Route to get all recipes from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
app.get('/recipes', async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get a specific recipe by ID
/**
 * Route to get a specific recipe by its ID.
 * @param {Request} req - Express request object containing the recipe ID.
 * @param {Response} res - Express response object.
 */
app.get('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID provided" });
        }
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Route to create a new recipe
/**
 * Route to create a new recipe in the database.
 * @param {Request} req - Express request object containing recipe data.
 * @param {Response} res - Express response object.
 */
app.post('/recipes', async (req: Request, res: Response) => {
    try {
        const { name, description, instruction, ingredients, imageUrl } = req.body;

        // Validation checks for required fields
        if (!name || !ingredients || !instruction || !description) {
            return res.status(400).json({ error: 'Please provide a name, ingredients, instruction, and description for the recipe.' });
        }

        const newRecipe = await Recipe.create({
            name,
            description,
            ingredients,
            instruction,
            imageUrl
        });

        res.status(201).json(newRecipe);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Route to update an existing recipe
/**
 * Route to update an existing recipe in the database.
 * @param {Request} req - Express request object containing updated recipe data.
 * @param {Response} res - Express response object.
 */
app.put('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID provided" });
        }

        const { name, description, instruction, ingredients, imageUrl } = req.body;

        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Update recipe fields
        recipe.name = name ?? recipe.name;
        recipe.description = description ?? recipe.description;
        recipe.ingredients = ingredients ?? recipe.ingredients;
        recipe.instruction = instruction ?? recipe.instruction;
        recipe.imageUrl = imageUrl ?? recipe.imageUrl;

        await recipe.save();

        res.status(200).json(recipe);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a recipe by ID
/**
 * Route to delete a recipe from the database by its ID.
 * @param {Request} req - Express request object containing the recipe ID.
 * @param {Response} res - Express response object.
 */
app.delete('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const recipe = await Recipe.findByPk(id);

        if (recipe) {
            await recipe.destroy();
            res.status(200).send({ message: 'Recipe deleted successfully' });
        } else {
            res.status(404).send({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Route to handle file uploads
/**
 * Route to handle file uploads.
 * @param {Request} req - Express request object containing the uploaded file.
 * @param {Response} res - Express response object.
 */
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        const { path } = req.file;
        const imageUrl = `http://localhost:3000/${path}`;
        res.json({ imageUrl });
    } catch (error) {
        console.log('Error uploading photo:', error);
        res.status(500).json({ error: 'Error uploading photo' });
    }
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Sync Sequelize models with database and start server
sequelize.sync().then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error('Error syncing database:', err);
});
