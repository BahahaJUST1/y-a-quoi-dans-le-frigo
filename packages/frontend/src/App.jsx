import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DishesPage from './components/DishesPage';
import IngredientsPage from './components/IngredientsPage';
import DishRecipePage from './components/DishRecipePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/dish/:id" element={<DishRecipePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
