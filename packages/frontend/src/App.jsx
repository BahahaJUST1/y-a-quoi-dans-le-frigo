import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<h1>Bienvenue sur le Dashboard</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
