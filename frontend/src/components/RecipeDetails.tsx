import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { deleteRecipe, getRecipeById } from '../services/api';
import { Loading } from './Loading';

// Define the Recipe interface
interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  instruction: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// RecipeDetails Component
const RecipeDetails = () => {
  // State declaration using useState
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams<{ id: string }>(); // Get the 'id' parameter from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation within the application

  // Fetch recipe data on component mount
  useEffect(() => {
    // Check if 'id' exists
    if (id) {
      const NumberId = parseInt(id);
      // Check if 'id' is a number
      if (isNaN(NumberId)) {
        navigate('/404'); // Navigate to 404 page if 'id' is not a number
      } else {
        // Fetch recipe by id
        getRecipeById(NumberId)
          .then(response => setRecipe(response))
          .catch(error => console.error(error));
      }
    } else {
      navigate('/404'); // Navigate to 404 page if 'id' is not provided
    }
  }, [id, navigate]);

  // Function to handle recipe deletion
  const handleDelete = () => {
    // Check if 'id' exists
    if (id) {
      const NumberId = parseInt(id);
      // Check if 'id' is a number
      if (isNaN(NumberId)) {
        navigate('/404'); // Navigate to 404 page if 'id' is not a number
      } else {
        // Delete recipe by id
        deleteRecipe(NumberId)
          .then(response => setRecipe(response))
          .catch(error => console.error(error));
      }
    } else {
      navigate('/404'); // Navigate to 404 page if 'id' is not provided
    }
  };

  // Render the RecipeDetails component
  if (!recipe) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold flex justify-center mb-4">{recipe.name}</h1>
      <img src={recipe.imageUrl} alt='recipe' className='h-64 w-full object-cover rounded-md mb-4'></img>
      <p className="text-lg mb-4">{recipe.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Ingredients:</h2>
        <p>{recipe.ingredients}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Instructions:</h2>
        <p>{recipe.instruction}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Created At: {new Date(recipe.createdAt).toLocaleString()}</p>
        <p className="text-gray-600">Updated At: {new Date(recipe.updatedAt).toLocaleString()}</p>
      </div>
      <div className="flex space-x-4">
        <Link to={`/recipes/${id}/edit`} className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md">Edit</Link>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md">Delete</button>
        <Link to={`/`} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md">BACK</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
