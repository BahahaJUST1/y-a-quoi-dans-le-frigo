import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import DishesPage from './pages/dishes/DishesPage';
import IngredientsPage from './pages/ingredients/IngredientsPage';
import RecipePage from './pages/recipes/RecipePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/dish/:id" element={<RecipePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
