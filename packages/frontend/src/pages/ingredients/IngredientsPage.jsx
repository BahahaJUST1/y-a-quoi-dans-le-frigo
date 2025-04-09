import { useState, useEffect, useRef } from 'react';
import $http from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { backgroundTextColor } from '../../utils/backgroundTextColor.ts';
import CategorySelect from '../../components/toolboxHeader/CategorySelect';
import FavouritesDisplayBtn from '../../components/toolboxHeader/FavouritesDisplayBtn';
import SearchBar from '../../components/toolboxHeader/SearchBar';
import EditItem from '../../components/toolboxHeader/EditItem';
import OwnerBubbleIcon from '../../components/OwnerBubbleIcon';

const IngredientsPage = () => {
  const [likedGlobalIngredients, setLikedGlobalIngredients] = useState([]);
  const [loadingLikedGlobalIngredients, setLoadingLikedGlobalIngredients] = useState(true);

  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);

  const [userRole, setUserRole] = useState(null);
  const [loadingUserRole, setLoadingUserRole] = useState(true);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [displayFavourites, setDisplayFavourites] = useState(false);
  const [displayIngredientsCategory, setDisplayIngredientsCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [showMenuForIngredient, setShowMenuForIngredient] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await $http.get('/ingredient');
        setIngredients(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingIngredients(false);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    const fetchLikedGlobalIngredients = async () => {
      try {
        const response = await $http.post('/liked-global-item/find-all', {
          itemType: "ingredient"
        });
        setLikedGlobalIngredients(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingLikedGlobalIngredients(false);
      }
    };

    fetchLikedGlobalIngredients();
  }, []);

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
        setShowMenuForIngredient(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loadingIngredients || loadingLikedGlobalIngredients || loadingUserRole) {
    return;
  }

  const toggleIngredientSelection = (ingredientId, ingredientName) => {
    // recover current selected ingredients
    let currentSelectedIngredients = [
      ...selectedIngredients
    ];
    // if new one is already selected -> remove it from array
    const ingredientAlreadySelected = currentSelectedIngredients.some(ingredient => ingredient.id === ingredientId);
    if (ingredientAlreadySelected) {
      currentSelectedIngredients = currentSelectedIngredients.filter(ingredient => ingredient.id !== ingredientId);
    }
    // if new one is not already selected -> select it
    else {
      currentSelectedIngredients.push({ id: ingredientId, name: ingredientName });
    }
    setSelectedIngredients(currentSelectedIngredients);
  };

  const navigateToDishesAccordingToIngredients = () => {
    navigate('/dishes', {
      state: { selectedIngredients }
    });
  };

  const displayFavouritesIngredients = () => {
    setDisplayFavourites(!displayFavourites);
  }

  const handleCategoryChange = (categoryId) => {
    setDisplayIngredientsCategory(categoryId);
  };

  const handleTextTyping = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const isIngredientLiked = (ingredient) => {
    if (ingredient.isGlobalItem) {
      /* none of global ingredients have been liked */
      if (!likedGlobalIngredients || !likedGlobalIngredients.length) {
        return false;
      }
      const potentialLikedGlobalIngredient = likedGlobalIngredients.find(item => item.itemId === ingredient.id);
      /* there is some liked global ingredients but the current one has never been liked */
      if (!potentialLikedGlobalIngredient) {
        return false;
      }
      /* global ingredient has been liked once, check if it's still the case */
      return potentialLikedGlobalIngredient.deletedAt === null;
    }
    else {
      return ingredient.favourite
    }
  }

  const likeIngredient = async (ingredientId) => {
    // recover ingredient from its id
    const ingredientToLike = ingredients.find((ing) => ing.id === ingredientId);

    /* Toggle the favourite state locally for immediate changes */
    if (ingredientToLike.isGlobalItem) {
      // if ingredient has been liked once
      const currentLikedGlobalIngredients = likedGlobalIngredients.map((likedGlobalIng) => {
        if (likedGlobalIng.itemId === ingredientId) {
          return { ...likedGlobalIng, deletedAt: likedGlobalIng.deletedAt === null ? new Date() : null };
        }
        return likedGlobalIng;
      });
      // if ingredient not in list, add it
      const potentialCurrentLikedGlobalIngredient = currentLikedGlobalIngredients.find(ing => ing.itemId === ingredientId);
      if (!potentialCurrentLikedGlobalIngredient) {
        currentLikedGlobalIngredients.push({
          itemId: ingredientId,
          deletedAt: null,
        });
      }
      setLikedGlobalIngredients(currentLikedGlobalIngredients);
    }
    else {
      const currentIngredients = ingredients.map((ingredient) => {
        if (ingredient.id === ingredientId) {
          return { ...ingredient, favourite: !ingredient.favourite };
        }
        return ingredient;
      });
      setIngredients(currentIngredients);
    }

    /* Toggle the nest request to handle the change in database */
    // like ingredient from db
    if (ingredientToLike.isGlobalItem) {
      await $http.post(`/liked-global-item`, {
        itemType: "ingredient",
        itemId: ingredientToLike.id
      });
    }
    else {
      await $http.put(`/ingredient/like/${ingredientId}`);
    }
  };

  const handleMenuClick = (e, ingredientId, element) => {
    e.stopPropagation();
    const fullIngredient = ingredients.find(i => i.id === ingredientId);
    const rect = element.getBoundingClientRect();
    setMenuPosition({
      x: rect.right - 192, // 192px = width of menu (48 * 4)
      y: fullIngredient.isGlobalItem ? rect.top -60 : rect.top - 100 // 100px = approximate height of menu
    });
    setShowMenuForIngredient(showMenuForIngredient === ingredientId ? null : ingredientId);
  };

  const handleEditClick = (e, ingredient) => {
    e.stopPropagation();
    navigate("/ingredients/edit", { state: { ingredient } })
  };

  const handleDeleteClick = async (e, ingredientIdToDelete) => {
    e.stopPropagation();
    try {
      // recover ingredient from its id
      const ingredientToDelete = ingredients.find((ing) => ing.id === ingredientIdToDelete);

      // remove ingredient from db
      if (ingredientToDelete.isGlobalItem) {
        await $http.post(`/deleted-global-item`, {
          itemType: "ingredient",
          itemId: ingredientToDelete.id
        });
      }
      else {
        await $http.delete(`/ingredient/${ingredientToDelete.id}`);
      }
      // remove it from current ingredients list
      setIngredients(ingredients.filter(ing => ing.id !== ingredientToDelete.id));
    } catch (err) {
      console.error(err);
    }
    setShowMenuForIngredient(null);
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden max-[768px]:mx-8">
      <div className="max-w-6xl w-full p-6 py-4 max-[768px]:p-4 bg-white shadow-lg rounded-2xl flex flex-col h-[90vh] max-[768px]:h-[92vh] relative">

        <h1 className="text-3xl font-bold mb-3 max-[768px]:mt-1 text-center">
          Mes Ingrédients
        </h1>

        <div className="z-20 bg-gray-100 max-[768px]:p-2 p-3 rounded-xl mb-5 mt-1 shadow-sm">

          {/* DESKTOP VERSION */}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-4 md:w-full">
            <CategorySelect
              defaultCategoryName={"Toutes les catégories"}
              selectedCategory={displayIngredientsCategory}
              onCategoryChange={handleCategoryChange}
              width={"w-1/4"}
            />

            <FavouritesDisplayBtn
              displayFavourites={displayFavourites}
              onButtonClick={displayFavouritesIngredients}
            />

            <SearchBar
              searchTerm={searchTerm}
              onTextTypingHandler={handleTextTyping}
            />

            <EditItem />
          </div>

          {/* MOBILE VERSION */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-end gap-2">
                <CategorySelect
                  defaultCategoryName={"Toutes les catégories"}
                  selectedCategory={displayIngredientsCategory}
                  onCategoryChange={handleCategoryChange}
                  width={"w-full"}
                />

                <FavouritesDisplayBtn
                  displayFavourites={displayFavourites}
                  onButtonClick={displayFavouritesIngredients}
                />
              </div>

              <div className="relative flex gap-2">
                <SearchBar
                  searchTerm={searchTerm}
                  onTextTypingHandler={handleTextTyping}
                />

                <EditItem />
              </div>
            </div>
          </div>
        </div>

        <div className="pb-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-[768px]:gap-2 overflow-y-auto flex-grow scrollbar-hide content-start">
          {
            ingredients.length === 0
              ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <p className="text-center text-gray-500">
                    Vous n'avez pas encore enregistré d'ingrédients
                  </p>
                </div>
              )
              : (
                ingredients.filter((ingredient) => {
                  return ingredient.name
                  .toLowerCase()
                  .split(' ')
                  .join('')
                  .includes(
                    searchTerm
                    .toLowerCase()
                    .split(' ')
                    .join('')
                  );
                }).map((ingredient) => {
                  const isSelected = selectedIngredients.some(selectedIngredient => ingredient.id === selectedIngredient.id);
                  if (displayFavourites && !ingredient.favourite) {
                    return null;
                  }
                  if (displayIngredientsCategory && ingredient.category.id !== displayIngredientsCategory) {
                    return null;
                  }
                  return (
                    <div
                      key={ingredient.id}
                      className={`flex items-center p-2 rounded-lg shadow-lg max-[768px]:shadow-md cursor-pointer transition-opacity duration-300 w-full h-20 ${isSelected ? 'opacity-100' : 'opacity-70'}`}
                      style={
                        isSelected
                          ? ingredient.bgColor
                            ? { color: backgroundTextColor(ingredient.bgColor), backgroundColor: ingredient.bgColor, borderColor: 'darkgray', borderWidth: '1px' }
                            : { backgroundColor: '#fafafa', borderColor: 'darkgray', borderWidth: '1px' }
                          : { borderColor: 'lightgray', borderWidth: '1px' }
                      }
                      onClick={() => toggleIngredientSelection(ingredient.id, ingredient.name)}
                    >
                      <img
                        src={ingredient.image
                          ? `https://res.cloudinary.com/dd50khgyk/image/upload/${ingredient.image}`
                          : `https://res.cloudinary.com/dd50khgyk/image/upload/${ingredient.category.image}`}
                        alt={`photo-${ingredient.name.split(' ').join('-').toLowerCase()}`}
                        className={`
                          w-16 h-16 object-cover mr-4 
                          ${ingredient.image // if we have a placeholder image and ingredient is selected, switch it to white if bgColor is dark
                            ? "rounded-md"
                            : isSelected
                              ? backgroundTextColor(ingredient.bgColor) === "#000000" ? "" : "invert"
                              : ""}
                        `}
                      />
                      <h2 className="text-xl max-[768px]:text-lg font-semibold flex items-center justify-between w-full">
                        {ingredient.name}
                        <span className="ml-2 flex">
                          <svg
                            width="35"
                            height="35"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isIngredientLiked(ingredient) ? "#EF4444" : "none"}
                            stroke={
                              isSelected
                                ? isIngredientLiked(ingredient) ? "#EF4444" : "red"
                                : "red"
                            }
                            strokeWidth={isSelected ? '1' : '0.5'}
                            className="transition-transform duration-200 hover:scale-110 mt-2"
                            onClick={(event) => {
                              event.stopPropagation();
                              likeIngredient(ingredient.id);
                            }}
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <div className="relative ml-[-0.5rem] mb-1">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="gray"
                              stroke="gray"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform duration-200 hover:scale-110 mt-2 cursor-pointer"
                              onClick={(e) => handleMenuClick(e, ingredient.id, e.currentTarget)}
                            >
                              <circle cx="12" cy="7" r="1" />
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="17" r="1" />
                            </svg>
                          </div>
                        </span>
                      </h2>
                    </div>
                  );
                })
              )
          }
        </div>

        {showMenuForIngredient && (
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
                item={ingredients.find(i => i.id === showMenuForIngredient)}
                itemType="ingredient"
              />
              <button
                className={`
                  flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50
                  ${ingredients.find(i => i.id === showMenuForIngredient).isGlobalItem 
                    ? userRole === "admin"
                      ? 'visible'
                      : 'hidden'
                    : 'visible'}
                `}
                onClick={(e) => handleEditClick(e, ingredients.find(i => i.id === showMenuForIngredient))}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="gray"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Modifier
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                onClick={(e) => handleDeleteClick(e, showMenuForIngredient)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M3 6h18"></path>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                  <path d="M9 10v8"></path>
                  <path d="M12 10v8"></path>
                  <path d="M15 10v8"></path>
                </svg>
                Supprimer
              </button>
            </div>
          </div>
        )}

        <button
          onClick={navigateToDishesAccordingToIngredients}
          className="z-20 max-[768px]:bg-[#ffe394] bg-[#FFEBB3] text-black hover:bg-[#FFE394] mt-4 max-[768px]:mt-4 w-full py-3 max-[768px]:py-2 rounded-lg text-lg transition"
          type="button"
        >
          Voir les plats
        </button>
      </div>
    </div>
  );
};

export default IngredientsPage;