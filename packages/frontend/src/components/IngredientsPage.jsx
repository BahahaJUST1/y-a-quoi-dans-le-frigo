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
  const [displayFavourites, setDisplayFavourites] = useState(false);
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

  const likeIngredient = async (ingredientId) => {
    // Toggle the favourite state locally for immediate changes
    const currentIngredients = ingredients.map((ingredient) => {
      if (ingredient.id === ingredientId) {
        return { ...ingredient, favourite: !ingredient.favourite };
      }
      return ingredient;
    });
    setIngredients(currentIngredients);

    // Toggle the nest request to handle the change in database
    await $http.put(`http://localhost:3000/ingredient/like/${ingredientId}`);
  };

  const displayFavouritesIngredients = () => {
    setDisplayFavourites(!displayFavourites);
  }

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

        <div className="mb-6 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <label htmlFor="time-slider" className="block text-lg font-semibold mb-2">Temps de préparation : {preparationTime} min</label>
            <input
              id="time-slider"
              type="range"
              min="0"
              max="180"
              value={preparationTime}
              onChange={(e) => setPreparationTime(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            className={`${displayFavourites ? "bg-red-500 text-white hover:bg-red-400" : "border text-gray-800 hover:bg-gray-50" } py-2 px-4 rounded-lg text-lg font-semibold`}
            onClick={() => {displayFavouritesIngredients()}}
          >
            Ingrédients favoris
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            if (displayFavourites && !ingredient.favourite) {
              return null;
            }
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
                <h2 className="text-xl font-semibold flex items-center justify-between w-full">
                  {ingredient.name}
                  <span className="ml-2">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={ingredient.favourite ? "red" : "none"}
                      stroke={"black"}
                      strokeWidth={0.5}
                      className="transition-transform duration-200 hover:scale-125"
                      onClick={(event) => {
                        event.stopPropagation();
                        likeIngredient(ingredient.id);
                      }}
                    >
                      <path d="M16 29s-13-8.14-13-17A8 8 0 0 1 16 5a8 8 0 0 1 13 7c0 8.86-13 17-13 17z" />
                    </svg>
                  </span>
                </h2>
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