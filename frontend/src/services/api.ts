import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:3000/';

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL: BASE_URL,
})

// Function to fetch all recipes from the API
async function getRecipes() {
    try {
        const response = await api.get(`recipes`);
        return response.data; // Wait for the response from the GET request and return the data
    } catch (error) {
        console.error(error); // Log any errors that occur during the request
        return []; // Return an empty array if an error occurs
    }
}

// Function to fetch a recipe by its ID from the API
async function getRecipeById(id: number){
    try {
        const response = await api.get(`recipes/${id}`);
        return response.data; // Wait for the response from the GET request and return the data
    } catch (error) {
        console.error(error); // Log any errors that occur during the request
    }
}

// Function to create a new recipe via a POST request to the API
async function createRecipe(recipeData: any ) {
    try {
        const response = await api.post(`recipes`, recipeData);
        return response.data; // Wait for the response from the POST request and return the data
    } catch (error) {
        console.error(error); // Log any errors that occur during the request
    }
}

// Function to update an existing recipe via a PUT request to the API
async function updateRecipe(id : number, recipeData : any) {
    try {
        const response = await api.put(`recipes/${id}`, recipeData);
        return response.data; // Wait for the response from the PUT request and return the data
    } catch (error) {
        console.error(error); // Log any errors that occur during the request
    }
}

// Function to delete a recipe by its ID via a DELETE request to the API
async function deleteRecipe(id: number) {
    try {
        const response = await api.delete(`recipes/${id}`);
        return response.data; // Wait for the response from the DELETE request and return the data
    } catch (error) {
        console.error(error); // Log any errors that occur during the request
    }
}

// Export the API functions for use in other modules
export { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}
