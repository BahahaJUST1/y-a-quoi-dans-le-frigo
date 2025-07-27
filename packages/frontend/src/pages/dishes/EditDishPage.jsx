import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import $http from '../../axiosInstance';
import GoBackArrow from '../../components/global/GoBackArrow';
import WarningSimilarItems from '../../components/global/WarningSimilarItems';
import ItemName from '../../components/editItem/ItemName';
import ItemImage from '../../components/editItem/ItemImage';
import UndoButton from '../../components/editItem/UndoButton';
import Time from '../../components/svgs/Time';
import Person from '../../components/svgs/Person';
import PreparationTimeInput from '../../components/toolboxHeader/PreparationTimeInput';
import NumberOfPeopleInput from '../../components/editItem/NumberOfPeopleInput';
import DishRecipe from '../../components/editItem/DishRecipe';
import DishIngredientsList from '../../components/editItem/DishIngredientsList';
import LoadingSpinner from '../../components/global/LoadingSpinner';
import Header from '../../components/global/Header';

const EditDishPage = () => {
  const location = useLocation();
  const dishToEdit = location.state?.dish;

  const previousPageLocation = location.state?.prevLocation;

  const [dishData, setDishData] = useState({
    name: dishToEdit?.name || '',
    preparationTime: dishToEdit?.preparationTime || null,
    numberOfPeople: dishToEdit?.numberOfPeople || 2,
    recipe: dishToEdit?.recipe || null,
    image: dishToEdit?.image || null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const [displayNameError, setDisplayNameError] = useState(false);

  const [similarDishes, setSimilarDishes] = useState([]);
  const [displaySimilarWarning, setDisplaySimilarWarning] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);

  const [dishIngredients, setDishIngredients] = useState([]);
  const [initialDishIngredients, setInitialDishIngredients] = useState([]);
  const [loadingDishIngredients, setLoadingDishIngredients] = useState(true);
  const [newDishIngredientsNumber, setNewDishIngredientsNumber] = useState(0);

  const [dishIngredientsErrorText, setDishIngredientsErrorText] = useState('');
  const [displayNotEnoughIngredientsError, setDisplayNotEnoughIngredientsError] = useState(false);
  const [displayInvalidIngredients, setDisplayInvalidIngredients] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const fetchDishIngredients = async () => {
      try {
        if (dishToEdit) {
          const response = await $http.get(`/dish-ingredient/dish/${dishToEdit.id}`);
          setDishIngredients(response.data);
          setInitialDishIngredients(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDishIngredients(false);
      }
    };

    fetchDishIngredients();
  }, [dishToEdit]);

  const handleNameChange = (e) => {
    const updatedDishData = {
      ...dishData,
      name: e.target.value
    };
    setDishData(updatedDishData);
    setDisplayNameError(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // store image for cloudinary upload
      setImageFile(file);

      // store local link for dish image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    else {
      // remove preview image
      setImageFile(null);
      setPreviewImage('');

      // remove current image
      const updatedDishData = {
        ...dishData,
        image: null,
      }
      setDishData(updatedDishData);
    }
  };

  const getImageSource = () => {
    const baseSource = "https://res.cloudinary.com/dd50khgyk/image/upload/";

    // if preview image uploaded, use it
    if (previewImage && previewImage.length) {
      return previewImage;
    }
    // if it's a dish update, and we have an image, use it
    if (dishData.image && dishData.image.length) {
      return baseSource + dishData.image;
    }
    // default, recover placeholder
    return baseSource + "placeholders/g2dkz5ae3ce3u5gde5cz";
  }

  const handleTimeChange = useCallback((increment) => {
    setDishData((prev) => {
      const newValue = prev.preparationTime + increment;
      return {
        ...prev,
        preparationTime: Math.min(Math.max(newValue, 5), 180),
      };
    });
  }, []);

  const handleNumberOfPeopleChange = (value) => {
    const futureNewValue = dishData.numberOfPeople + value;
    if (futureNewValue > 0 && futureNewValue <= 20) {
      const updatedDishData = {
        ...dishData,
        numberOfPeople: futureNewValue,
      }
      setDishData(updatedDishData);
    }
  }

  const handleUpdateDishIngredientIngredient = (previousIngredient, newIngredient) => {
    if (displayInvalidIngredients) {
      setDisplayInvalidIngredients(false);
    }
    const updatedDishIngredients = dishIngredients.map((di) => {
      if (di.ingredient.id === previousIngredient) {
        return {
          ...di,
          ingredient: newIngredient,
        }
      }
      return di;
    });
    setDishIngredients(updatedDishIngredients);
  }

  const handleUpdateDishIngredientQuantity = (ingredientId, newQuantity) => {
    if (displayInvalidIngredients) {
      setDisplayInvalidIngredients(false);
    }
    const updatedDishIngredients = dishIngredients.map((di) => {
      if (di.ingredient.id === ingredientId) {
        return {
          ...di,
          quantity: newQuantity,
        }
      }
      return di;
    });
    setDishIngredients(updatedDishIngredients);
  }

  const handleUpdateDishIngredientUnit = (ingredientId, newUnit) => {
    const updatedDishIngredients = dishIngredients.map((di) => {
      if (di.ingredient.id === ingredientId) {
        return {
          ...di,
          unit: newUnit,
        }
      }
      return di;
    });
    setDishIngredients(updatedDishIngredients);
  }

  const handleAddDishIngredient = () => {
    if (displayNotEnoughIngredientsError) {
      setDisplayNotEnoughIngredientsError(false);
    }
    setNewDishIngredientsNumber(newDishIngredientsNumber +1);

    setDishIngredients(dishIngredients.concat({
      dish: { id: dishToEdit?.id || undefined },
      ingredient: { id: `ndi-${newDishIngredientsNumber}`, name: '' },
      quantity: 0,
      unit: { id: 1 }
    }));
  }

  const handleRemoveDishIngredient = (dishIngredient) => {
    const updatedDishIngredients = dishIngredients.filter((di) => di.ingredient.id !== dishIngredient.ingredient.id);
    setDishIngredients(updatedDishIngredients);
  }

  const handleUndoDishIngredient = (dishIngredient) => {
    const initialDishIngredient = initialDishIngredients.find((di) => di.id === dishIngredient.id);
    if (initialDishIngredient) {
      const updatedDishIngredients = dishIngredients.map((di) => {
        if (di.id === initialDishIngredient.id) {
          return initialDishIngredient;
        }
        return di;
      });
      setDishIngredients(updatedDishIngredients);
    }
  }

  const handleRecipeChange = (e) => {
    const updatedDishData = {
      ...dishData,
      recipe: e.target.value
    };
    setDishData(updatedDishData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dishData.name.trim().length === 0) {
      setDisplayNameError(true);
      return;
    }
    setDisplayNameError(false);

    if (!dishIngredients.length) {
      setDishIngredientsErrorText("Veuillez saisir au moins 1 ingrédient !");
      setDisplayNotEnoughIngredientsError(true);
      return;
    }
    setDisplayNotEnoughIngredientsError(false);

    for (const di of dishIngredients) {
      let raiseError = false;
      if (!di.ingredient.name || !di.ingredient.name.length) {
        raiseError = true;
      }
      if (!di.quantity > 0) {
        raiseError = true;
      }
      if (raiseError) {
        setDishIngredientsErrorText("Au moins 1 ingrédient n'a pas correctement été saisi !");
        setDisplayInvalidIngredients(true);
        return;
      }
    }
    setDisplayInvalidIngredients(false);

    // ONLY FOR NEW DISH
    if (!dishToEdit) {
      // check if there is no similar names
      try {
        const result = await $http.post(`/dish/similar/${dishData.name}`, {
          bearer: localStorage.getItem('authToken')
        });
        if (!result.data || !result.data.length) {
          await editDish();
        }
        // if there are similar dishes, show warning message
        else {
          setSimilarDishes(result.data);
          setDisplaySimilarWarning(true);
        }
      }
      catch (e) {
        throw e;
      }
    }
    // FOR DISH EDITION
    else {
      await editDish();
    }
  };

  const editDish = async () => {
    setDisplaySimilarWarning(false);
    setIsSubmitting(true);
    try {
      let dataToSubmit = { ...dishData };

      // create cloudinary image if needed
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        const result = await $http.post('/cloudinary/dishes', imageFormData);
        dataToSubmit = { ...dataToSubmit, image: result.data };
      }

      if (dishToEdit) {
        await $http.put(`/dish/${dishToEdit.id}`, {
          dishData: dataToSubmit,
          dishIngredientsData: dishIngredients
        });
      } else {
        await $http.post('/dish/recipe', {
          dishData: dataToSubmit,
          dishIngredientsData: dishIngredients
        });
      }
      navigate(previousPageLocation ?? '/dishes');
    }
    catch (error) {
      setIsSubmitting(false);
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  }

  if (loadingIngredients || loadingDishIngredients) {
    return;
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">

      <Header />

      <div className="max-[768px]:p-4 flex flex-col flex-1 overflow-hidden max-w-3xl w-full md:py-2 md:pb-3">

        <LoadingSpinner
          isLoading={isSubmitting}
        />

        <WarningSimilarItems
          newItemName={dishData.name}
          displayWarning={displaySimilarWarning}
          setDisplayWarning={setDisplaySimilarWarning}
          createItem={editDish}
          similarItems={similarDishes}
        />

        <GoBackArrow to={previousPageLocation ?? '/dishes'} />

        <h1 className="text-3xl font-bold md:mb-1 mb-2 max-[768px]:mt-0 ml-1 md:py-2">
          {dishToEdit ? 'Modifier le plat' : 'Nouveau plat'}
        </h1>

        {/* ******* SCROLLABLE CONTENT ******* */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex justify-center">

            {/* *** FORMULA INPUTS *** */}
            <form className="w-full pb-4 bg-gray-100 rounded-md">

              <div className="flex flex-col p-6 max-[768px]:p-4">

                {/* ***** DISH NAME ***** */}
                <div className="mb-6 flex items-center gap-0.5">
                  <ItemName
                    name={dishData.name}
                    placeholder={dishToEdit?.name || "Nouveau plat"}
                    handleInputChange={handleNameChange}
                    displayNameError={displayNameError}
                  />
                  <div className="ml-1 mt-7">
                    <UndoButton
                      handleUndo={() => {
                        // recover current category
                        const updatedDishData = {
                          ...dishData,
                          name: dishToEdit?.name || '',
                        };
                        setDishData(updatedDishData);
                      }}
                    />
                  </div>
                </div>
                {/* ***** END OF DISH NAME ***** */}

                {/* ***** DISH IMAGE ***** */}
                <div className="flex items-center mb-6">
                  <img
                    src={getImageSource()} alt={"plat"}
                    className="w-20 h-20 max-[768px]:w-16 max-[768px]:h-16 rounded-md mr-3.5 max-[768px]:mr-2 border"
                  />
                  <ItemImage
                    handleImageChange={handleImageChange}
                    imageDisplayed={previewImage}
                  />
                  <div className="mt-0.5 md:mt-1.5">
                    <UndoButton
                      handleUndo={() => {
                        // remove preview image
                        setImageFile(null);
                        setPreviewImage('');

                        // recover current image
                        const updatedDishData = {
                          ...dishData,
                          image: dishToEdit?.image || null,
                        };
                        setDishData(updatedDishData);
                      }}
                    />
                  </div>
                </div>
                {/* ***** END OF DISH IMAGE ***** */}

                {/* ***** DISH INPUTS NUMBER ***** */}
                <div className="flex max-[768px]:flex-col max-[768px]:gap-3 md:justify-between mb-6">

                  {/* *** DISH PREPARATION TIME *** */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <Time />
                      <span>Temps de préparation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PreparationTimeInput
                        timeValue={dishData.preparationTime}
                        handleTimeChange={handleTimeChange}
                      />
                      <UndoButton
                        handleUndo={() => {
                          // recover current preparation time
                          const updatedDishData = {
                            ...dishData,
                            preparationTime: dishToEdit?.preparationTime || null,
                          };
                          setDishData(updatedDishData);
                        }}
                      />
                    </div>
                  </div>
                  {/* *** END OF DISH PREPARATION TIME *** */}

                  {/* *** DISH NUMBER OF PEOPLE *** */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center md:gap-2">
                      <span className="max-[768px]:hidden">Nombre de personnes</span>
                      <Person />
                      <span className="md:hidden">Nombre de personnes</span>
                    </div>
                    <div className="flex items-center">
                      <NumberOfPeopleInput
                        numberOfPeople={dishData.numberOfPeople}
                        handleNumberChange={handleNumberOfPeopleChange}
                      />
                      <UndoButton
                        handleUndo={() => {
                          // recover current number of people
                          const updatedDishData = {
                            ...dishData,
                            numberOfPeople: dishToEdit?.numberOfPeople || 2,
                          };
                          setDishData(updatedDishData);
                        }}
                      />
                    </div>
                  </div>
                  {/* *** END OF DISH NUMBER OF PEOPLE *** */}
                </div>
                {/* ***** END OF DISH INPUTS NUMBER ***** */}

                {/* ***** DISH INGREDIENTS ZONE ***** */}
                <DishIngredientsList
                  ingredientsList={ingredients}
                  dishIngredients={dishIngredients}
                  updateIngredient={handleUpdateDishIngredientIngredient}
                  updateQuantity={handleUpdateDishIngredientQuantity}
                  updateUnit={handleUpdateDishIngredientUnit}
                  addDishIngredient={handleAddDishIngredient}
                  removeDishIngredient={handleRemoveDishIngredient}
                  undoDishIngredient={handleUndoDishIngredient}
                  errorText={dishIngredientsErrorText}
                  displayError={displayNotEnoughIngredientsError || displayInvalidIngredients}
                />
                {/* ***** END OF DISH INGREDIENTS ZONE ***** */}

                {/* *** DISH RECIPE *** */}
                <div className="relative">
                  <DishRecipe
                    recipe={dishData.recipe}
                    handleRecipeChange={handleRecipeChange}
                  />
                  <div className="absolute bottom-2 right-1">
                    <UndoButton
                      handleUndo={() => {
                        // recover current number of people
                        const updatedDishData = {
                          ...dishData,
                          recipe: dishToEdit?.recipe || null,
                        };
                        setDishData(updatedDishData);
                      }}
                    />
                  </div>
                </div>
                {/* *** END OF DISH RECIPE *** */}
              </div>

              {/* *** REQUIRED INPUTS MESSAGE *** */}
              <div className="w-full mt-4 px-6 max-[768px]:px-0">
                <p className="max-[768px]:mr-4 text-xs md:text-sm text-gray-400 font-normal italic text-right">
                  Les champs marqués d'une <span className="error-text">*</span> sont obligatoires
                </p>
              </div>
            </form>
            {/* *** END OF FORMULA INPUTS *** */}
          </div>
        </div>
        {/* ******* END OF SCROLLABLE CONTENT ******* */}

        {/* ******* FIXED FOOTER WITH BUTTONS ******* */}
        <div className="sticky bottom-0 bg-white pt-2 pb-1">
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => navigate(previousPageLocation ?? '/dishes')}
              className="flex-1 py-1 md:py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-1 md:py-2 px-4 rounded-md transition secondary-bg-color secondary-bg-color-hover"
              disabled={isSubmitting}
            >
              {dishToEdit ? "Modifier" : "Créer"}
            </button>
          </div>
        </div>
        {/* ******* END OF FIXED FOOTER WITH BUTTONS ******* */}
      </div>
    </div>
  );
};

export default EditDishPage;