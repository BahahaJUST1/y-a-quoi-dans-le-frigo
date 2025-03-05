import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DishesPage from './components/DishesPage';
import IngredientsPage from './components/IngredientsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
