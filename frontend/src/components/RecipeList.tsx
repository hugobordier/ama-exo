import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRecipe, getRecipes } from '../services/api';
import { Loading } from './Loading';
import "../index.css" ;


interface Recipe {
  id: number;
  name: string;
  description: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    getRecipes().then(res => setRecipes(res));
  }, []);

  const navigate = useNavigate();


  if (!recipes) return <Loading/>

  return (
  
  <div className="container py-5 h-full">
    <div className="flex justify-center items-center">
      <div className="lg:w-11/12 xl:w-12/12">
        <div className="rounded-3 shadow-md bg-white">
          <div className="p-4">
            <h4 className="text-center my-3 pb-3">RECIPES LIST</h4>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4 pb-2">
              <div className="w-full lg:w-auto">
                <input
                  className="form-input mt-1 block w-full"
                  placeholder="Enter a task here"
                  type="text"
                />
              </div>
              <div className="w-full lg:w-auto">
              </div>
              <div className="w-full lg:w-auto">
                <button className="bg-yellow-500 text-white py-2 px-4 rounded" type="submit">
                  Get tasks
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center self-center place-self-center content-center py-5">
              <button className="flex bg-green-500 text-white py-2 px-4 rounded self-center place-self-center" type="submit" onClick={() => navigate("/recipes/new")}>
                  Create Recupes
                </button>
              </div>
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
                
                {recipes.length && recipes.map(recipe => (
                  
                <tr key={recipe.id} className='btn-custom hover:cursor-pointer hover:bg-gray-200' onClick={() => navigate(`/recipes/${recipe.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/recipes/${recipe.id}`} className="font-bold hover:underline">{recipe.name}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className='flex flex-col'>
                      <Link to={`/recipes/${recipe.id}`} className=" font-bold hover:underline">{recipe.name}</Link>
                      <Link to={`/recipes/${recipe.id}`} className="hover:underline">{recipe.description}</Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex rounded">
                    <button className="bg-red-500 text-white py-2 px-4 rounded mr-1" type="submit" onClick={async () =>
                    {
                      await deleteRecipe(recipe.id);
                      navigate("/");
                    } 

                    }>
                      Delete
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded" type="submit">
                      Finished
                    </button>
                  </td>
                  </tr>
                      ))}
                  
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

    {/*<div>
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <Link to="/recipes/new" className="text-blue-500">Add New Recipe</Link>
      <ul className="list-disc pl-5 mt-4">
        {recipes.length && recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} className="text-blue-500">{recipe.name}</Link>
          </li>
        ))}
      </ul>
      </div>*/}