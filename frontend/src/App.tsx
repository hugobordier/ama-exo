import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeDetails from "./components/RecipeDetails"

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" Component={RecipeList} />
          <Route path="/recipes/new" Component={RecipeForm} />
          <Route path="/recipes/:id/edit" Component={RecipeForm} />
          <Route path="/recipes/:id" Component={RecipeDetails} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
