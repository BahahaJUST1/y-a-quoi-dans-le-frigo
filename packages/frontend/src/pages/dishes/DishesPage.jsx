import { useState, useEffect, useRef } from 'react';
import $http from '../../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import GoBackArrow from '../../components/global/GoBackArrow';
import FavouritesDisplayBtn from '../../components/toolboxHeader/FavouritesDisplayBtn';
import SearchBar from '../../components/toolboxHeader/SearchBar';
import AddItemButton from '../../components/toolboxHeader/AddItemButton';
import PreparationTimeInput from '../../components/toolboxHeader/PreparationTimeInput';
import Time from '../../components/svgs/Time';
import Favourite from '../../components/svgs/Favourite';
import ThreeDots from '../../components/svgs/ThreeDots';
import OwnerBubbleIcon from '../../components/global/OwnerBubbleIcon';
import Edit from '../../components/svgs/Edit';
import Delete from '../../components/svgs/Delete';
import DeleteConfirmation from '../../components/global/DeleteConfirmation';

const DishesPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [loadingUserRole, setLoadingUserRole] = useState(true);

  const [dishes, setDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);

  const [displayFavourites, setDisplayFavourites] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [timeValue, setTimeValue] = useState(180);

  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  const [showMenuForDish, setShowMenuForDish] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        // create an array with only the ingredients ids
        const ingredientIdsList = location.state?.selectedIngredients.length
          ? location.state?.selectedIngredients.map(ingredient => ingredient.id)
          : []
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

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await $http.post('/user', {});
        setUserRole(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUserRole(false);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuForDish(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Gestionnaire d'événement pour fermer le menu lors du défilement du document
    const handleDocumentScroll = () => {
      if (showMenuForDish !== null) {
        setShowMenuForDish(null);
      }
    };

    // Gestionnaire d'événement pour fermer le menu lors du défilement du conteneur
    const handleContainerScroll = () => {
      if (showMenuForDish !== null) {
        setShowMenuForDish(null);
      }
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener('scroll', handleDocumentScroll, { passive: true });

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleContainerScroll, { passive: true });
    }

    // Supprimer les écouteurs d'événements lors du démontage du composant
    return () => {
      document.removeEventListener('scroll', handleDocumentScroll);

      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleContainerScroll);
      }
    };
  }, [showMenuForDish]);

  if (loadingDishes || loadingUserRole) {
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

  const handleMenuClick = (e, dishId, element) => {
    e.stopPropagation();
    const fullDish = dishes.find(i => i.id === dishId);
    const rect = element.getBoundingClientRect();
    setMenuPosition({
      x: rect.right - 192, // 192px = width of menu (48 * 4)
      y: fullDish.isGlobalItem && userRole === "user" ? rect.top -60 : rect.top - 100 // 100px = approximate height of menu
    });
    setShowMenuForDish(showMenuForDish === dishId ? null : dishId);
  };

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

  const handleEditClick = (e, dish) => {
    e.stopPropagation();
    navigate("/dishes/edit", { state: { dish } })
  };

  const handleDeleteBeforeConfirmation = (e, dishIdToDelete) => {
    e.stopPropagation();

    // recover dish from its id
    const dishToDeleteRecovered = dishes.find((dish) => dish.id === dishIdToDelete);
    setDishToDelete(dishToDeleteRecovered);

    setShowMenuForDish(false);
    setDisplayDeleteConfirmation(true);
  }

  const handleDeleteSubmission = async () => {
    setDisplayDeleteConfirmation(false);

    try {
      // remove ingredient from db
      if (dishToDelete.isGlobalItem) {
        await $http.post(`/deleted-global-item`, {
          itemType: "dish",
          itemId: dishToDelete.id
        });
      }
      else {
        await $http.delete(`/dish/${dishToDelete.id}`);
      }
      // remove it from current ingredients list
      setDishes(dishes.filter(d => d.id !== dishToDelete.id));
    } catch (err) {
      console.error(err);
    }
    setShowMenuForDish(null);
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden max-[768px]:mx-8">
      <div className="relative max-w-6xl w-full p-6 py-4 max-[768px]:p-4 bg-white shadow-lg rounded-2xl flex flex-col h-[90vh] max-[768px]:h-[92vh]">

        <GoBackArrow to={"/ingredients"} />

        <DeleteConfirmation
          itemToDelete={dishToDelete}
          displayDeleteConfirmation={displayDeleteConfirmation}
          setDisplayDeleteConfirmation={setDisplayDeleteConfirmation}
          deleteItem={handleDeleteSubmission}
        />

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

            <AddItemButton />
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
                <AddItemButton />
              </div>

            </div>
          </div>
        </div>

        <div className={`
          ${location.state?.selectedIngredients.length === 0 || !location.state?.selectedIngredients ? 'hidden' : 'visible'}
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
                ref={scrollContainerRef}
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
                            <div className={`flex items-center mt-1 ${dish.preparationTime ? '' : 'hidden'} `}>
                              <Time />
                              <span className="ml-[-2px]">{dish.preparationTime} min</span>
                            </div>
                          </div>
                          <span className="flex">
                          <Favourite
                            isItemLiked={dish.favourite}
                            handleLike={() => likeDish(dish.id)}
                          />
                          <div className="relative ml-[-0.5rem] mb-1">
                            <ThreeDots
                              handleClick={handleMenuClick}
                              itemId={dish.id}
                            />
                          </div>
                          </span>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            )
        }

        {showMenuForDish && (
          <div
            ref={menuRef}
            className="fixed bg-white rounded-md shadow-lg border z-[9999]"
            style={{
              top: menuPosition.y,
              left: menuPosition.x,
              width: '192px'
            }}
          >
            <div className="py-1 relative">
              <OwnerBubbleIcon
                item={dishes.find(i => i.id === showMenuForDish)}
                itemType="ingredient"
              />
              <button
                className={`
                  flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50
                  ${dishes.find(i => i.id === showMenuForDish).isGlobalItem
                  ? userRole === "admin"
                    ? 'visible'
                    : 'hidden'
                  : 'visible'}
                `}
                onClick={(e) => handleEditClick(e, dishes.find(i => i.id === showMenuForDish))}
              >
                <Edit />
                Modifier
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                onClick={(e) => handleDeleteBeforeConfirmation(e, showMenuForDish)}
              >
                <Delete />
                <span className="ml-1.5">Supprimer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishesPage;