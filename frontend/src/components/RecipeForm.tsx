import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { createRecipe, getRecipeById, updateRecipe } from '../services/api';

interface Recipe {
  name: string;
  description: string;
  ingredients: string;
  instruction: string;
}

const RecipeForm = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    description: '',
    ingredients: '',
    instruction: ''
  });
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const NumberId=parseInt(id);
      if(isNaN(NumberId)){
        navigate('/404');
      }
      getRecipeById(NumberId).then(response => setRecipe(response))
        .catch(error => console.error(error));
    }
    else {}
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      const NumberId=parseInt(id);
      if(isNaN(NumberId)){
        navigate('/404');
      }
      updateRecipe(NumberId,recipe).then(() => navigate(`/recipes/${id}`))
        .catch(error => console.error(error));
    } else {
      createRecipe(recipe)
        .then(() => navigate('/'))
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">{id ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required //oblige de remplir
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Ingredients </label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Instructions</label>
        <textarea
          name="instruction"
          value={recipe.instruction}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Save
      </button>
      <Link to={`/`} className="bg-black ml-4 px-4 py-2  text-white rounded-md">BACK</Link>
    </form>
  );
};

export default RecipeForm;
