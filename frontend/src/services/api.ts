import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

const api = axios.create({
    baseURL: BASE_URL,

})

// Fonction pour obtenir toutes les recettes
async function getRecipes() {
    try {
        const response = await api.get(`recipes`);
        return response.data; //await pour attendre la reponse de get
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getRecipeById(id: number){
    try {
        const reponse = await api.get( `recipes/${id}`);
        return reponse.data; //(axios).data pour prendre que les data de axios donc que la liste de recette 
    } catch (error) {
        console.error(error);
    }
}


async function createRecipe(recipeData: any ) {
    try {
        console.log(recipeData);
        const response = await api.post(`recipes`, recipeData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function updateRecipe(id : number, recipeData : any) {
    try {
        const response = await api.put(`recipes/${id}`, recipeData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
async function deleteRecipe(id: number) {
    try {
        
        const response = await api.delete(`recipes/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}






export { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}