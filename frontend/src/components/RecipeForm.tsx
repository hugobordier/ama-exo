import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createRecipe, getRecipeById, updateRecipe } from '../services/api';
import axios from 'axios';

// Define the Recipe interface
interface Recipe {
  name: string;
  description: string;
  ingredients: string;
  instruction: string;
  imageUrl: any;
}

// RecipeForm Component
const RecipeForm = () => {
  // State declaration using useState
  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    description: '',
    ingredients: '',
    instruction: '',
    imageUrl: ''
  });
  const [file, setFile] = useState<Blob>();
  const { id } = useParams<{ id: string }>(); // Get the 'id' parameter from the URL

  // Use useNavigate for navigation within the application
  const navigate = useNavigate();

  // Fetch recipe data if editing an existing recipe
  useEffect(() => {
    if (id) {
      const NumberId = parseInt(id);
      if (isNaN(NumberId)) {
        navigate('/404');
      }
      getRecipeById(NumberId).then(response => setRecipe(response))
        .catch(error => console.error(error));
    }
  }, [id]);

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecipe({ ...recipe, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) { // If editing an existing recipe
      const NumberId = parseInt(id);
      if (isNaN(NumberId)) {
        navigate('/404');
      }
      const formData = new FormData();
      if (!file) {
        throw new Error('Please select an image');
      }
      formData.append('file', file);
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.imageUrl;
      setRecipe({ ...recipe, imageUrl: imageUrl });
      const recipeData = { ...recipe, imageUrl: imageUrl };
      updateRecipe(NumberId, recipeData).then(() => navigate(`/recipes/${id}`))
        .catch(error => console.error(error));
    } else { // If creating a new recipe
      try {
        const formData = new FormData();
        if (!file) {
          throw new Error('Please select an image');
        }
        formData.append('file', file);
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const imageUrl = response.data.imageUrl;
        setRecipe({ ...recipe, imageUrl: imageUrl });
        const recipeData = { ...recipe, imageUrl: imageUrl };
        createRecipe(recipeData)
          .then(() => navigate('/'))
          .catch(error => console.error(error));
      } catch (error) {
        console.error('Error uploading photo', error);
      }
    }
  };

  // Render the RecipeForm component
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Instructions</label>
        <textarea
          name="instruction"
          value={recipe.instruction}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Photo</label>
        <input
          name="imageUrl"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          accept="image/*"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between items-center">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save
        </button>
        <Link to={`/`} className="bg-black px-4 py-2 text-white rounded-md hover:bg-gray-900">
          BACK
        </Link>
      </div>
    </form>
  );
};

export default RecipeForm;
