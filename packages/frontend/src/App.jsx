import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import DishesPage from './pages/dishes/DishesPage';
import IngredientsPage from './pages/ingredients/IngredientsPage';
import RecipePage from './pages/recipes/RecipePage';
import EditIngredientPage from './pages/ingredients/EditIngredientPage';
import EditDishPage from './pages/dishes/EditDishPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/dishes/edit" element={<EditDishPage />} />
        <Route path="/dish/:id" element={<RecipePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/ingredients/edit" element={<EditIngredientPage />} />
      </Routes>
    </Router>
  );
};

export default App;
