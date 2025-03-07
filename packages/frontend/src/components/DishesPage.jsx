import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [displayFavourites, setDisplayFavourites] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [location.state.preparationTime, location.state.selectedIngredients]);

  const likeDish = async (dishId) => {
    // Toggle the favourite state locally for immediate changes
    const currentDishes = dishes.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, favourite: !dish.favourite };
      }
      return dish;
    });
    setDishes(currentDishes);

    // Toggle the nest request to handle the change in database
    await $http.put(`http://localhost:3000/dish/like/${dishId}`);
  };

  const displayFavouritesDishes = () => {
    setDisplayFavourites(!displayFavourites);
  }

  if (loading) {
    return <p>Chargement des plats...</p>;
  }

  const openDishRecipe = (dishId) => {
    navigate(`/dish/${dishId}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Plats</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            className="border rounded-lg p-2 w-full"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">[Espace disponible]</h2>
          <button
            className={`${displayFavourites ? "bg-red-500 text-white hover:bg-red-400" : "border text-gray-800 hover:bg-gray-50"} py-2 px-4 rounded-lg text-lg font-semibold`}
            onClick={displayFavouritesDishes}
          >
            Plats favoris
          </button>
        </div>

        {
          dishes.length === 0
            ? (
                <p className="text-center text-gray-500">Aucun plat disponible en fonction des ingrédients et du temps de
                  préparation sélectionnés
                </p>
              )
            : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {
                    dishes.filter((dish) => {
                      return dish.name
                        .toLowerCase()
                        .split(' ')
                        .join('')
                        .includes(
                          searchTerm
                            .toLowerCase()
                            .split(' ')
                            .join('')
                        );
                    }).map((dish) => {
                      if (displayFavourites && !dish.favourite) {
                        return null;
                      }
                      return (
                        <div
                          key={dish.id}
                          onClick={() => openDishRecipe(dish.id)}
                          className="p-4 border rounded-lg shadow-lg cursor-pointer relative"
                        >
                          <img
                            src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image ? dish.image : "placeholders/g2dkz5ae3ce3u5gde5cz"}`}
                            alt={`photo-${dish.name.split(' ').join('-').toLowerCase()}`}
                            className="w-full h-auto rounded-lg"
                          />
                          <div className="flex justify-between items-center mt-2 mx-1">
                            <div className="flex flex-col">
                              <h2 className="text-xl font-semibold">{dish.name}</h2>
                              <div className="flex items-center mt-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="black"
                                  className="w-5 h-5 mr-1"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6l4 2"
                                  />
                                  <circle cx="12" cy="12" r="9" />
                                </svg>
                                <span>{dish.preparationTime} min</span>
                              </div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill={dish.favourite ? "currentColor" : "none"}
                              viewBox="0 0 24 24"
                              strokeWidth="1"
                              stroke="currentColor"
                              className="w-7 h-7 text-red-500 hover:scale-110"
                              onClick={(event) => {
                                event.stopPropagation();
                                likeDish(dish.id);
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
            )
        }
      </div>
    </div>
  );
};

export default DishesPage;
