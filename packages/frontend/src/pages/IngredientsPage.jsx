import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { backgroundTextColor } from '../utils/backgroundTextColor.ts';
import Select from 'react-select';
import { reactSelectCustomStyle } from '../styles/react-select';
import GoBackArrow from '../components/GoBackArrow';

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [displayFavourites, setDisplayFavourites] = useState(false);
  const [displayIngredientsCategory, setDisplayIngredientsCategory] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

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

  if (loadingIngredients || loadingCategories) {
    return;
  }

  const toggleIngredientSelection = (ingredientId) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredientId)
        ? prevSelected.filter((id) => id !== ingredientId)
        : [...prevSelected, ingredientId]
    );
  };

  const navigateToDishesAccordingToIngredients = () => {
    navigate('/dishes', {
      state: { selectedIngredients }
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

  const displayIngredientsByCategory = (categoryId) => {
    if (!categoryId) {
      setDisplayIngredientsCategory(0);
    }
    else {
      setDisplayIngredientsCategory(parseInt(categoryId));
    }
  }

  const categoryOptions = [
    { value: "", label: "Toutes les catégories" },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden max-[768px]:mx-8">
      <div className="max-w-6xl w-full p-6 py-4 max-[768px]:p-4 bg-white shadow-lg rounded-2xl flex flex-col h-[90vh] max-[768px]:h-[92vh] relative">

        <GoBackArrow to={"/"} />

        <h1 className="text-3xl font-bold mb-3 max-[768px]:mt-1 text-center">
          Mes Ingrédients
        </h1>

        <div className="bg-gray-100 max-[768px]:p-2 p-3 rounded-xl mb-5 mt-1 shadow-sm">

          {/* DESKTOP VERSION */}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-4 md:w-full">
            <div className="w-1/4">
              <Select
                classNames="focus:outline-0"
                styles={reactSelectCustomStyle}
                options={categoryOptions}
                value={categoryOptions.find(option => option.value === displayIngredientsCategory) || categoryOptions[0]}
                onChange={(option) => displayIngredientsByCategory(option.value)}
                isSearchable={false}
                menuPlacement="bottom"
              />
            </div>

            <button
              className={`${
                displayFavourites
                  ? "bg-red-500 border border-red-400 text-white hover:bg-red-400"
                  : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
              } py-2 px-4 rounded-lg text-base font-medium h9 flex items-center gap-1 flex-shrink-0`}
              onClick={displayFavouritesIngredients}
              type="button"
            >
              <svg className="mt-1 ml-[-3px]" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={displayFavourites ? "white" : "none"} stroke={displayFavourites ? "white" : "red"} strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Favoris
            </button>

            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un ingrédient..."
                className="focus:outline-0 border border-gray-300 rounded-lg py-2 pl-10 pr-3 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
          </div>

          {/* MOBILE VERSION */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <Select
                    classNames="focus:outline-0"
                    styles={reactSelectCustomStyle}
                    options={categoryOptions}
                    value={categoryOptions.find(option => option.value === displayIngredientsCategory) || categoryOptions[0]}
                    onChange={(option) => displayIngredientsByCategory(option.value)}
                    isSearchable={false}
                    menuPlacement="bottom"
                  />
                </div>

                <button
                  className={`${
                    displayFavourites
                      ? "bg-red-500 border border-red-400 text-white hover:bg-red-400"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
                  } py-2 px-4 rounded-lg text-base font-medium h-10 flex items-center gap-1`}
                  onClick={displayFavouritesIngredients}
                  type="button"
                >
                  <svg className="mt-1 ml-[-3px]" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={displayFavourites ? "white" : "none"} stroke={displayFavourites ? "white" : "red"} strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Favoris
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un ingrédient..."
                  className="focus:outline-0 border border-gray-300 rounded-lg py-2 pl-10 pr-3 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pb-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-[768px]:gap-2 overflow-y-auto flex-grow scrollbar-hide content-start">
          {
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
              const isSelected = selectedIngredients.includes(ingredient.id);
              if (displayFavourites && !ingredient.favourite) {
                return null;
              }
              if (displayIngredientsCategory && ingredient.category.id !== displayIngredientsCategory) {
                return null;
              }
              return (
                <div
                  key={ingredient.id}
                  className={`flex items-center p-2 rounded-lg shadow-lg cursor-pointer transition-opacity duration-300 w-full h-20 ${isSelected ? 'opacity-100' : 'opacity-70'}`}
                  style={
                    isSelected
                      ? { color: backgroundTextColor(ingredient.bgColor), backgroundColor: ingredient.bgColor, borderColor: 'darkgray', borderWidth: '1px' }
                      : { borderColor: 'lightgray', borderWidth: '1px' }
                  }
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
                        className="transition-transform duration-200 hover:scale-110 mt-2"
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
            })
          }
        </div>

        <button
          onClick={navigateToDishesAccordingToIngredients}
          className="max-[768px]:bg-[#ffe394] bg-[#FFEBB3] text-black hover:bg-[#FFE394] mt-4 max-[768px]:mt-4 w-full py-3 max-[768px]:py-2 rounded-lg text-lg transition"
          type="button"
        >
          Voir les plats
        </button>
      </div>
    </div>
  );
};

export default IngredientsPage;