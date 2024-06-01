import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/api';
import { Loading } from './Loading';

interface Recipe {
  id: number;
  name: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    getRecipes().then(res => setRecipes(res));
  }, []);

  if (!recipes) return <Loading/>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <Link to="/recipes/new" className="text-blue-500">Add New Recipe</Link>
      <ul className="list-disc pl-5 mt-4">
        {recipes.length && recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} className="text-blue-500">{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
