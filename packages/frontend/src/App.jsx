import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DishesPage from './pages/DishesPage';
import IngredientsPage from './pages/IngredientsPage';
import RecipePage from './pages/RecipePage';

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
