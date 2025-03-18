import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import GoBackArrow from '../components/GoBackArrow';

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);

  const [displayFavourites, setDisplayFavourites] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [timeValue, setTimeValue] = useState(180);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await $http.post('http://localhost:3000/dish/ingredients', {
          ingredientIdsList: location.state?.selectedIngredients || []
        });
        setDishes(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDishes(false);
      }
    };

    fetchDishes();
  }, [location.state?.selectedIngredients]);

  if (loadingDishes) {
    return;
  }

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

  const handleTimeChange = (increment) => {
    setTimeValue(prev => {
      const newValue = prev + increment;
      return Math.min(Math.max(newValue, 0), 180);
    });
  };

  const startTimeInterval = (increment) => {
    const intervalId = setInterval(() => {
      handleTimeChange(increment);
    }, 200);
    return intervalId;
  };

  const handleMouseDown = (increment) => {
    handleTimeChange(increment);
    const intervalId = startTimeInterval(increment);
    return intervalId;
  };

  const handleMouseUp = (intervalId) => {
    clearInterval(intervalId);
  };

  const openDishRecipe = (dishId) => {
    navigate(`/dish/${dishId}`)
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden max-[768px]:mx-8">
      <div className="relative max-w-6xl w-full p-6 py-4 max-[768px]:p-4 bg-white shadow-lg rounded-2xl flex flex-col h-[90vh] max-[768px]:h-[92vh]">

        <GoBackArrow to={"/ingredients"} />

        <h1 className="text-3xl font-bold mb-3 max-[768px]:mt-1 text-center">
          Mes Plats
        </h1>

        <div className="z-20 bg-gray-100 max-[768px]:p-2 p-3 rounded-xl mb-5 mt-1 shadow-sm">

          {/* DESKTOP VERSION */}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-4 md:w-full">
            <div className="flex items-center gap-2">
              <div className="mr-2 flex items-center border border-gray-300 rounded-lg bg-white">
                <button
                  onMouseDown={() => {
                    const intervalId = handleMouseDown(-5);
                    const cleanup = () => handleMouseUp(intervalId);
                    document.addEventListener('mouseup', cleanup, { once: true });
                  }}
                  onTouchStart={() => {
                    const intervalId = handleMouseDown(-5);
                    const cleanup = () => handleMouseUp(intervalId);
                    document.addEventListener('touchend', cleanup, { once: true });
                  }}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="text"
                  value={`${timeValue}min`}
                  onChange={(e) => setTimeValue(Math.min(Math.max(parseInt(e.target.value.split("min")[0]) || 0, 0), 180))}
                  className="w-20 text-center border-x border-gray-300 py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="0"
                  max="180"
                  step="5"
                />
                <button
                  onMouseDown={() => {
                    const intervalId = handleMouseDown(5);
                    const cleanup = () => handleMouseUp(intervalId);
                    document.addEventListener('mouseup', cleanup, { once: true });
                  }}
                  onTouchStart={() => {
                    const intervalId = handleMouseDown(5);
                    const cleanup = () => handleMouseUp(intervalId);
                    document.addEventListener('touchend', cleanup, { once: true });
                  }}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <button
                className={`${
                  displayFavourites
                    ? 'bg-red-500 border border-red-400 text-white hover:bg-red-400'
                    : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                } py-2 px-4 rounded-lg text-base font-medium h9 flex items-center gap-1 flex-shrink-0`}
                onClick={displayFavouritesDishes}
                type="button"
              >
                <svg className="mt-1 ml-[-3px]" width="16" height="16" viewBox="0 0 32 32"
                     xmlns="http://www.w3.org/2000/svg" fill={displayFavourites ? 'white' : 'none'}
                     stroke={displayFavourites ? 'white' : 'red'} strokeWidth="2">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Favoris
              </button>
            </div>

            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un plat..."
                className="focus:outline-0 border border-gray-300 rounded-lg py-2 pl-10 pr-3 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
          </div>

          {/* MOBILE VERSION */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between gap-2">
                <div className="h-[40px] flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    onTouchStart={() => {
                      const intervalId = handleMouseDown(-5);
                      const cleanup = () => handleMouseUp(intervalId);
                      document.addEventListener('touchend', cleanup, { once: true });
                    }}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={`${timeValue}min`}
                    onChange={(e) => setTimeValue(Math.min(Math.max(parseInt(e.target.value.split("min")[0]) || 0, 0), 180))}
                    className="w-20 border-x border-gray-300 h-full text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="0"
                    max="180"
                    step="5"
                  />
                  <button
                    onTouchStart={() => {
                      const intervalId = handleMouseDown(5);
                      const cleanup = () => handleMouseUp(intervalId);
                      document.addEventListener('touchend', cleanup, { once: true });
                    }}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  className={`${
                    displayFavourites
                      ? "bg-red-500 border border-red-400 text-white hover:bg-red-400"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
                  } py-2 px-4 rounded-lg text-base font-medium h-10 flex items-center gap-1`}
                  onClick={displayFavouritesDishes}
                  type="button"
                >
                  <svg className="mt-1 ml-[-3px]" width="16" height="16" viewBox="0 0 32 32"
                       xmlns="http://www.w3.org/2000/svg" fill={displayFavourites ? "white" : "none"}
                       stroke={displayFavourites ? "white" : "red"} strokeWidth="2">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Favoris
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un plat..."
                  className="focus:outline-0 border border-gray-300 rounded-lg py-2 pl-10 pr-3 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </div>
        </div>

        {
          dishes.length === 0
            ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="max-[768px]:w-[90%] text-center text-gray-500">
                  Aucun plat disponible en fonction des ingrédients et/ou du temps de préparation sélectionné
                </p>
              </div>
            )
            : (
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3 mb-2 max-[768px]:my-1 overflow-y-auto flex-grow scrollbar-hide content-start">
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
                    if (dish.preparationTime > timeValue) {
                      return null;
                    }
                    return (
                      <div
                        key={dish.id}
                        onClick={() => openDishRecipe(dish.id)}
                        className="p-3 border rounded-lg shadow-lg cursor-pointer relative"
                      >
                        <img
                          src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image ? dish.image : "placeholders/g2dkz5ae3ce3u5gde5cz"}`}
                          alt={`photo-${dish.name.split(' ').join('-').toLowerCase()}`}
                          className="w-full md:h-auto h-32 object-cover rounded-lg"
                        />
                        <div className="flex justify-between items-center mt-2 mx-1">
                          <div className="flex flex-col">
                            <h2 className="text-xl max-[768px]:text-lg font-semibold">{dish.name}</h2>
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
