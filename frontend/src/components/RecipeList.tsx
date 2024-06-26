import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRecipe, getRecipes } from '../services/api';
import { Loading } from './Loading';
import "../index.css";

// Define the Recipe interface
interface Recipe {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// RecipeList Component
const RecipeList = () => {
  // State declaration using useState
  const [recipes, setRecipes] = useState<Recipe[] | null>(null); // List of recipes
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term

  // Use useEffect to load recipes on component mount
  useEffect(() => {
    getRecipes().then(res => setRecipes(res)); // Call getRecipes function to fetch recipes
  }, []);

  // Use useNavigate for navigation within the application
  const navigate = useNavigate();

  // Function to handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update search term
  };

  // Filter recipes based on search term
  const filteredRecipes = recipes?.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display a loading component if recipes are not loaded
  if (!recipes) return <Loading />;

  // Render the RecipeList component
  return (
    <div className="container py-5 h-full">
      <div className="flex justify-center items-center">
        <div className="lg:w-11/12 xl:w-12/12">
          <div className="rounded-3 shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-center text-7xl font-bold my-3 pb-3 font-roboto">RECIPES LIST</h2>
              <div className="flex flex-wrap justify-center items-center gap-3 mb-4 pb-2">
                <div className="w-full lg:w-auto">
                  {/* Search input */}
                  <input
                    className="form-input text-center mt-1 block py-2 rounded-full w-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter a task here"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="w-full lg:w-auto">
                  {/* Button to get tasks */}
                  <button className="bg-yellow-500 text-white py-2 px-4 rounded" type="button">
                    Get tasks
                  </button>
                </div>
              </div>
              {/* Button to create a new recipe */}
              <div className="flex justify-center items-center self-center place-self-center content-center py-5">
                <button className="flex bg-green-500 text-white py-2 px-4 rounded self-center place-self-center" type="button" onClick={() => navigate("/recipes/new")}>
                  Create Recipes
                </button>
              </div>
              {/* Table displaying recipes */}
              <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PICTURE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name/Desc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecipes?.length ? filteredRecipes.map(recipe => (
                    <tr key={recipe.id} className='btn-custom hover:cursor-pointer hover:bg-gray-200' onClick={() => navigate(`/recipes/${recipe.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={recipe.imageUrl} alt='recipe' className="h-28" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className='flex flex-col'>
                          {/* Recipe name */}
                          <Link to={`/recipes/${recipe.id}`} className="font-bold hover:underline">{recipe.name}</Link>
                          {/* Recipe description */}
                          <Link to={`/recipes/${recipe.id}`} className="hover:underline whitespace-pre-line">{recipe.description}</Link>
                        </div>
                      </td>
                      <td className="px-6 justify-center py-4 whitespace-nowrap flex rounded">
                        {/* Button to delete recipe */}
                        <button className="bg-red-500 text-white py-2 px-4 rounded mr-1" type="button" onClick={async () => {
                          await deleteRecipe(recipe.id);
                          setRecipes(await getRecipes());
                        }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )) : (// Otherwise, display a message indicating no recipes found
                    <tr>
                      <td colSpan={3} className="text-center py-4">No recipes found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
