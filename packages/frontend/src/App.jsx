import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DishesPage from './components/DishesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dishes" element={<DishesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
