import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  instruction: string;
  createdAt: string;
  updatedAt: string;
}

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/recipes/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instruction}</p>
      <p>Created At: {new Date(recipe.createdAt).toLocaleString()}</p>
      <p>Updated at: {new Date(recipe.updatedAt).toLocaleString()}</p>
      <Link to={`/recipes/${id}/edit`} className="text-blue-500">Edit</Link>
      <button onClick={handleDelete} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
      <Link to={`/`} className="bg-black ml-4 px-4 py-2  text-white rounded-md">BACK</Link>
    </div>
  );
};

export default RecipeDetails;
