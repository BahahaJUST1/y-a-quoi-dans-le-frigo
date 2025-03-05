import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await $http.post('http://localhost:3000/dish/ingredients', {
          ingredientIdsList: location.state.selectedIngredients,
          preparationTime: location.state.preparationTime
        });
        setDishes(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des plats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Si les données sont en cours de chargement
  if (loading) {
    return <p>Chargement des plats...</p>;
  }

  // Si une erreur s'est produite
  if (error) {
    return <p>{error}</p>;
  }

  const openDishRecipe = (dishId) => {
    navigate(`/dish/${dishId}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Plats</h1>

        {dishes.length === 0 ? (
          <p className="text-center text-gray-500">Aucun plat disponible en fonction des ingrédients et du temps de préparation sélectionnés</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => openDishRecipe(dish.id)}
                className="p-4 border rounded-lg shadow-lg cursor-pointer"
              >
                <img
                  src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image}`}
                  alt={`photo-${dish.name.split(' ').join('-').toLowerCase()}`}
                />
                <h2 className="text-xl font-semibold">{dish.name}</h2>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2"
                    />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span>{dish.preparationTime}min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DishesPage;
