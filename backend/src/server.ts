import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import sequelize from "./config/database";
import Recipe from './models/recipes';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import upload from "./midlewares/upload";
dotenv.config();



const app = express();
app.use(express.json());// ca manipule du json et que du json
app.use(cors()) ;
const port = 3000;



app.get("/", (req, res) => {
    res.send(`le serveur tourne sur ${port}`);
});



app.get('/recipes', async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);//params c pour les truc sprecifier donc avec:
        if(isNaN(id)){
            return res.status(400).json({erreur:"l'identifiant n'est pas un nombre"})
        }
        const recipes = await Recipe.findByPk(id);
        if (!recipes)
            {
                return res.status(404).json({ message: "Recipe not found" });
            }
        res.json(recipes);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/recipes', async (req: Request, res: Response) => { // post pour cree
    try {
        console.log("body", req.body);
        const { name, description, instruction,ingredients,imageUrl } = req.body; //req.body c le json envoye donc avec les name et tt et la il le met sous la forme demande en json

        if (!name || !ingredients || !instruction || !description) {
            return res.status(400).json({ error: 'Veuillez fournir un titre, des ingrédients et des instructions pour la recette.' });
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

app.put('/recipes/:id', async (req: Request, res: Response) => { //put pourmodif
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "L'identifiant n'est pas un nombre" });
        }

        const { name, description, instruction, ingredients ,imageUrl} = req.body;

        const recipe = await Recipe.findByPk(id); //pour que recipe soit la bonne recette a modif
        if (!recipe) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        // Mise à jour de la recette
        recipe.name = name ?? recipe.name;  //si varname n'est pas vide on met varname sinon on met le name de la recette
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


app.delete('/recipes/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const recipe = await Recipe.findByPk(id); // ca renvoie une promesse aussi

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

app.post('/upload', upload.single('file'), async (req, res) => {// midleware :upload.single('imageUrl')
    try {
        console.log("popo")
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
    const { path } = req.file;
    const imageUrl = `http://localhost:3000/${path}`;
    res.json({ imageUrl});
    } catch (error) {
        console.log('test',error);
        res.status(500).json({ error: 'Erreur lors de l\'upload de la photo' });
    }
});

app.use('/uploads',express.static('uploads'));

sequelize.sync().then(() => { //sequelize.sync() return une promesse d'ou le then
    console.log('Base de données synchronisée');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    }).catch((err) => {
    console.error('Erreur de synchronisation de la base de données:', err);
    });

