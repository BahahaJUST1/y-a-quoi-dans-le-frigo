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
import Header from '../../components/global/Header';

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
      x: rect.right - 30, // 192px = width of menu (48 * 4)
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
    <div className="flex flex-col h-screen items-center justify-center">

      <Header />

      <div className="max-[768px]:p-4 flex flex-col flex-1 overflow-hidden max-w-6xl w-full md:py-2 md:pb-3">

        <GoBackArrow to={"/ingredients"} />

        <DeleteConfirmation
          itemToDelete={dishToDelete}
          displayDeleteConfirmation={displayDeleteConfirmation}
          setDisplayDeleteConfirmation={setDisplayDeleteConfirmation}
          deleteItem={handleDeleteSubmission}
        />

        <h1 className="text-3xl font-bold md:mb-1 mb-2 max-[768px]:mt-0 ml-1 md:py-2">
          Mes Plats
        </h1>

        <div className="ml-1 mb-3 third-text-color">
          <div className="text-justify">
            {location.state?.selectedIngredients.length
              ? "Voici la liste des plats que vous pouvez cuisiner en fonction des ingrédients que vous avez sélectionné."
              : "Voici la liste de tous les plats que vous pouvez cuisiner."}
          </div>
          <span className={`${location.state?.selectedIngredients.length ? 'visible' : 'hidden'}`}>
            {location.state?.selectedIngredients.length > 1 ? "Ingrédients sélectionnés : " : "Ingrédient sélectionné : "}
          </span>
          <span className="primary-text-color text-justify max-[768px]:text-center">{location.state?.selectedIngredients.map((ingredient) => ingredient.name).join(', ')}</span>
        </div>

        <div className="z-20 bg-gray-100 p-2 rounded-xl mb-2">

          {/* DESKTOP VERSION */}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-2 md:w-full">

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
                className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-3 mb-2 max-[768px]:my-1 overflow-y-auto flex-grow scrollbar-hide content-start">
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
                        className="p-2 border rounded-lg shadow-md cursor-pointer relative flex flex-col"
                      >
                        <div className="relative">
                          <img
                            src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image ? dish.image : 'placeholders/g2dkz5ae3ce3u5gde5cz'}`}
                            alt={`photo-${dish.name.split(' ').join('-').toLowerCase()}`}
                            className="w-full md:h-auto h-32 object-cover rounded-lg"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent rounded-lg"></div>
                        </div>

                        <div className="absolute rounded-md top-0 pt-1.5 pr-1.5 right-0">
                          <Favourite
                            color={'white'}
                            isItemLiked={dish.favourite}
                            handleLike={() => likeDish(dish.id)}
                          />
                        </div>

                        <div className="absolute bg-white rounded-md top-0 pt-0 pb-1.5 left-1">
                          <ThreeDots
                            handleClick={handleMenuClick}
                            itemId={dish.id}
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-1 mt-2 mx-1">
                          <h2 className="text-xl max-[768px]:text-lg font-semibold text-left">{dish.name}</h2>
                          <div
                            className={`text-third flex items-center self-start ${dish.preparationTime ? '' : 'hidden'} `}>
                            <Time />
                            <span className="ml-[-2px]">{dish.preparationTime} min</span>
                          </div>
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
              width: '192px',
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