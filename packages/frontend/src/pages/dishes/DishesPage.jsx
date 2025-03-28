import { useState, useEffect } from 'react';
import $http from '../../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import GoBackArrow from '../../components/GoBackArrow';
import FavouritesDisplayBtn from '../../components/toolboxHeader/FavouritesDisplayBtn';
import SearchBar from '../../components/toolboxHeader/SearchBar';
import CreateItem from '../../components/toolboxHeader/CreateItem';
import PreparationTimeInput from '../../components/toolboxHeader/PreparationTimeInput';

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
        // create an array with only the ingredients ids
        const ingredientIdsList = location.state?.selectedIngredients.map(ingredient => ingredient.id);
        const response = await $http.post('/dish/ingredients', {
          ingredientIdsList
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
    await $http.put(`/dish/like/${dishId}`);
  };

  const displayFavouritesDishes = () => {
    setDisplayFavourites(!displayFavourites);
  }

  const handleTimeChange = (increment) => {
    setTimeValue(prev => {
      const newValue = prev + increment;
      return Math.min(Math.max(newValue, 5), 180);
    });
  };

  const handleTextTyping = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

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

            <PreparationTimeInput
              timeValue={timeValue}
              handleTimeChange={handleTimeChange}
            />

            <FavouritesDisplayBtn
              displayFavourites={displayFavourites}
              onButtonClick={displayFavouritesDishes}
            />

            <SearchBar
              searchTerm={searchTerm}
              onTextTypingHandler={handleTextTyping}
            />

            <CreateItem />
          </div>

          {/* MOBILE VERSION */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-2">

              <div className="flex justify-between gap-2">
                <PreparationTimeInput
                  timeValue={timeValue}
                  handleTimeChange={handleTimeChange}
                />

                <FavouritesDisplayBtn
                  displayFavourites={displayFavourites}
                  onButtonClick={displayFavouritesDishes}
                />
              </div>

              <div className="flex justify-between gap-2">
                <SearchBar
                  searchTerm={searchTerm}
                  onTextTypingHandler={handleTextTyping}
                />
                <CreateItem />
              </div>

            </div>
          </div>
        </div>

        <div className={`
          ${location.state?.selectedIngredients.length === 0 ? 'hidden' : 'visible'}
          ml-1 mt-[-0.5rem] mb-1.5 text-gray-400 font-normal italic
        `}>
          <span>{location.state?.selectedIngredients.length > 1 ? "Ingrédients sélectionnés : " : "Ingrédient sélectionné : "}</span>
          <span>{location.state?.selectedIngredients.map((ingredient) => ingredient.name).join(', ')}</span>
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
                            <div className={`flex items-center mt-1 ${dish.preparationTime ? '' : 'hidden' } `}>
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
