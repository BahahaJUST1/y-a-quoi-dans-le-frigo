import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [loadingIngredientCategories, setLoadingIngredientCategories] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [preparationTime, setPreparationTime] = useState(180);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await $http.get('http://localhost:3000/ingredient');
        setIngredients(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des ingrédients.');
        console.error(err);
      } finally {
        setLoadingIngredients(false);
      }
    };

    const fetchIngredientCategories = async () => {
      try {
        const response = await $http.get('http://localhost:3000/ingredient-category');
        setIngredientCategories(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des catégories d'ingrédients.");
        console.error(err);
      } finally {
        setLoadingIngredientCategories(false);
      }
    };

    fetchIngredients();
    fetchIngredientCategories();
  }, []);

  const getIngredientCategoryPlaceholder = (ingredientCategoryId) => {
    const category = ingredientCategories.find((ingredientCategory) => ingredientCategory.id === ingredientCategoryId);
    return category?.image;
  };

  const toggleIngredientSelection = (ingredientId) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredientId)
        ? prevSelected.filter((id) => id !== ingredientId)
        : [...prevSelected, ingredientId]
    );
  };

  const navigateToDishesAccordingToIngredients = () => {
    navigate('/dishes', {
      state: {
        selectedIngredients,
        preparationTime
      }
    });
  };

  if (loadingIngredients || loadingIngredientCategories) {
    return <p>Chargement des ingrédients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Ingrédients</h1>

        <div className="mb-6">
          <label htmlFor="time-slider" className="block text-lg font-semibold mb-2">Temps de préparation : {preparationTime} min</label>
          <input
            id="time-slider"
            type="range"
            min="0"
            max="180"
            value={preparationTime}
            onChange={(e) => setPreparationTime(Number(e.target.value))}
            className="w-1/3"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            return (
              <div
                key={ingredient.id}
                className={`flex items-center p-4 rounded-lg shadow-lg cursor-pointer transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
                style={{ backgroundColor: ingredient.bgColor }}
                onClick={() => toggleIngredientSelection(ingredient.id)}
              >
                <img
                  src={ingredient.image
                    ? `https://res.cloudinary.com/dd50khgyk/image/upload/${ingredient.image}`
                    : `https://res.cloudinary.com/dd50khgyk/image/upload/${getIngredientCategoryPlaceholder(ingredient.category)}`}
                  alt={`photo-${ingredient.name.split(' ').join('-').toLowerCase()}`}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <h2 className="text-xl font-semibold">{ingredient.name}</h2>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigateToDishesAccordingToIngredients()}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Voir les plats
        </button>
      </div>
    </div>
  );
};

export default IngredientsPage;