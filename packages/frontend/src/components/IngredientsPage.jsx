import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

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
        console.error(err);
      } finally {
        setLoadingIngredients(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await $http.get('http://localhost:3000/ingredient-category');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchIngredients();
    fetchCategories();
  }, []);

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

  if (loadingIngredients) {
    return <p>Chargement des ingrédients...</p>;
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
            onClick={displayFavouritesIngredients}
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
                className={`flex items-center p-4 rounded-lg shadow-lg cursor-pointer transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-70'}`}
                style={isSelected ? { backgroundColor: ingredient.bgColor, borderColor: 'darkgray', borderWidth: '1px' } : { borderColor: 'lightgray', borderWidth: '1px' }}
                onClick={() => toggleIngredientSelection(ingredient.id)}
              >
                <img
                  src={ingredient.image
                    ? `https://res.cloudinary.com/dd50khgyk/image/upload/${ingredient.image}`
                    : `https://res.cloudinary.com/dd50khgyk/image/upload/${ingredient.category.image}`}
                  alt={`photo-${ingredient.name.split(' ').join('-').toLowerCase()}`}
                  className={`w-16 h-16 object-cover ${ingredient.image ? "rounded-md" : ""} mr-4`}
                />
                <h2 className="text-xl font-semibold flex items-center justify-between w-full">
                  {ingredient.name}
                  <span className="ml-2">
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={ingredient.favourite ? "#EF4444" : "none"}
                      stroke={
                        isSelected
                          ? ingredient.favourite ? "#EF4444" : "red"
                          : "red"
                      }
                      strokeWidth={isSelected ? '1' : '0.5'}
                      className="transition-transform duration-200 hover:scale-110"
                      onClick={(event) => {
                        event.stopPropagation();
                        likeIngredient(ingredient.id);
                      }}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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