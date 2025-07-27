import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import $http from '../../axiosInstance';
import GoBackArrow from '../../components/global/GoBackArrow';
import CategorySelect from '../../components/toolboxHeader/CategorySelect';
import { backgroundTextColor } from '../../utils/backgroundTextColor.ts';
import WarningSimilarItems from '../../components/global/WarningSimilarItems';
import ItemName from '../../components/editItem/ItemName';
import ItemImage from '../../components/editItem/ItemImage';
import UndoButton from '../../components/editItem/UndoButton';
import Favourite from '../../components/svgs/Favourite';
import ThreeDots from '../../components/svgs/ThreeDots';
import LoadingSpinner from '../../components/global/LoadingSpinner';
import Header from '../../components/global/Header';

const EditIngredientPage = () => {
  const location = useLocation();
  const ingredient = location.state?.ingredient;

  const [formData, setFormData] = useState({
    name: ingredient?.name || '',
    category: ingredient?.category.id || 0,
    image: ingredient?.image || null,
    bgColor: ingredient?.bgColor || '#FAFAFA'
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const [displayCategoryError, setDisplayCategoryError] = useState(false);
  const [displayNameError, setDisplayNameError] = useState(false);

  const [similarIngredients, setSimilarIngredients] = useState([]);
  const [displaySimilarWarning, setDisplaySimilarWarning] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $http.get('/ingredient-category');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  if (loadingCategories) {
    return;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    if (name === "name") {
      setDisplayNameError(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // store image for cloudinary upload
      setImageFile(file);

      // store local link for ingredient image preview
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
      const updatedFormData = {
        ...formData,
        image: null,
      }
      setFormData(updatedFormData);
    }
  };

  const handleCategoryChange = (value) => {
    const updatedFormData = {
      ...formData,
      category: value
    };
    setFormData(updatedFormData);
    setDisplayCategoryError(false);
  };

  const getImageSource = () => {
    const baseSource = "https://res.cloudinary.com/dd50khgyk/image/upload/";

    // if preview image uploaded, use it
    if (previewImage && previewImage.length) {
      return previewImage;
    }
    // if it's an ingredient update, and we have an image, use it
    if (formData.image && formData.image.length) {
      return baseSource + formData.image;
    }
    // else, if we have an ingredient category, use its placeholder
    if (formData.category) {
      return baseSource + categories[formData.category - 1].image;
    }
    // default, recover rotten placeholder
    return baseSource + "placeholders/ikaqizn0ejqtmidebibc";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length === 0) {
      setDisplayNameError(true);
      return;
    }
    setDisplayNameError(false);

    if (!formData.category) {
      setDisplayCategoryError(true);
      return;
    }
    setDisplayCategoryError(false);

    // ONLY FOR NEW INGREDIENT
    if (!ingredient) {
      // check if there is no similar names
      try {
        const result = await $http.post(`/ingredient/similar/${formData.name}`, {
          bearer: localStorage.getItem('authToken')
        });
        if (!result.data || !result.data.length) {
          await editIngredient();
        }
        // if there are similar ingredients, show warning message
        else {
          setSimilarIngredients(result.data);
          setDisplaySimilarWarning(true);
        }
      }
      catch (e) {
        throw e;
      }
    }
    // FOR INGREDIENT EDITION
    else {
      await editIngredient();
    }
  };

  const editIngredient = async () => {
    setDisplaySimilarWarning(false);
    setIsSubmitting(true);
    try {
      let dataToSubmit = { ...formData };

      // create cloudinary image if needed
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        const result = await $http.post('/cloudinary/ingredients', imageFormData);
        dataToSubmit = { ...dataToSubmit, image: result.data };
      }

      if (ingredient) {
        await $http.put(`/ingredient/${ingredient.id}`, dataToSubmit);
      } else {
        await $http.post('/ingredient', dataToSubmit);
      }
      navigate('/ingredients');
    }
    catch (error) {
      setIsSubmitting(false);
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  }

  return (
    <div className="flex flex-col h-svh items-center justify-center">

      <Header />

      <div className="max-[768px]:p-4 flex flex-col flex-1 overflow-hidden max-w-xl w-full md:py-2 md:pb-3">

        <LoadingSpinner
          isLoading={isSubmitting}
        />

        <WarningSimilarItems
          newItemName={formData.name}
          displayWarning={displaySimilarWarning}
          setDisplayWarning={setDisplaySimilarWarning}
          createItem={editIngredient}
          similarItems={similarIngredients}
        />

        <GoBackArrow to={'/ingredients'} />

        <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 max-[768px]:mt-1 text-center">
          {ingredient ? 'Modifier l\'ingrédient' : 'Nouvel ingrédient'}
        </h1>

        {/* Scrollable Content */}
        <div className="w-full flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex justify-center">

            {/* FORMULA INPUTS */}
            <form className="w-full py-4 bg-gray-100 rounded-md max-[768px]:p-4">

              {/* PREVISUALISATION */}
              <div className="w-full md:px-6 m-auto text-sm md:text-md text-black mb-6 max-[768px]:ml-0 max-[768px]:mb-4">
                <h2 className="mb-1 text-md md:text-lg">
                  Prévisualisation
                </h2>
                <div className="rounded-md mb-2 md:mb-3">
                  <div className="selected-card flex items-center p-1.5 rounded-lg shadow-lg w-full md:w-2/3 h-16 md:h-20">
                    <img
                      src={getImageSource()}
                      alt="ingrédient"
                      className={`
                        w-12 h-12 md:w-16 md:h-16 object-cover mr-4
                        ${formData.image 
                          ? 'rounded-md' 
                          : backgroundTextColor(formData.bgColor) === "#FFFFFF" && !imageFile ? "invert" : "rounded-md"}
                      `}
                    />
                    <h2 className="font-semibold flex items-center justify-between w-full">
                      {formData.name.length ? formData.name : 'Nouvel ingrédient'}
                      <span className="flex">
                        <Favourite
                          isItemLiked={true}
                        />
                        <div className="relative ml-[-0.5rem] mb-1">
                            <ThreeDots />
                          </div>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* ************* INPUTS ZONE ************* */}
              <div className="md:flex md:px-4 md:gap-4 md:space-y-0 space-y-2">

                <div className="w-full md:pl-2 m-auto">

                  {/* ***** ITEM NAME INPUT ZONE ***** */}
                  <div className="mb-4 flex items-center gap-0.5">
                    <ItemName
                      name={formData.name}
                      placeholder={ingredient?.name}
                      handleInputChange={handleInputChange}
                      displayNameError={displayNameError}
                    />
                    <div className="ml-1 mt-7">
                      <UndoButton
                        handleUndo={() => {
                          // recover current category
                          const updatedFormData = {
                            ...formData,
                            name: ingredient?.name || '',
                          };
                          setFormData(updatedFormData);
                        }}
                      />
                    </div>
                  </div>
                  {/* ***** END OF ITEM NAME INPUT ZONE ***** */}

                  {/* ***** ITEM CATEGORY INPUT ZONE ***** */}
                  <div className="mb-4 flex items-center gap-0.5">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-md max-[768px]:text-sm">
                          Catégorie
                          <span className="error-text"> * </span>
                        </label>
                        <span
                          className={`${displayCategoryError ? 'visible' : 'invisible'} error-text md:text-sm text-xs`}>
                          Veuillez saisir une catégorie !
                        </span>
                      </div>

                      <CategorySelect
                        defaultCategoryName={'Choisir une catégorie'}
                        selectedCategory={formData.category}
                        onCategoryChange={handleCategoryChange}
                      />
                    </div>
                    <div className="ml-1 mt-7">
                      <UndoButton
                        handleUndo={() => {
                          // recover current category
                          const updatedFormData = {
                            ...formData,
                            category: ingredient?.category.id || 0,
                          };
                          setFormData(updatedFormData);
                        }}
                      />
                    </div>
                  </div>
                  {/* ***** END OF ITEM CATEGORY INPUT ZONE ***** */}

                  {/* ***** ITEM IMAGE INPUT ZONE ***** */}
                  <div className="flex items-center">
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
                          const updatedFormData = {
                            ...formData,
                            image: ingredient?.image || null,
                          };
                          setFormData(updatedFormData);
                        }}
                      />
                    </div>
                  </div>
                  {/* ***** END OF ITEM IMAGE INPUT ZONE ***** */}

                </div>
              </div>
              {/* ************* END OF INPUTS ZONE ************* */}

              <div className="w-full mt-4 px-3 max-[768px]:px-0">
                <p className="text-xs md:text-sm text-gray-400 font-normal italic text-right">
                  Les champs marqués d'une <span className="error-text">*</span> sont obligatoires
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="sticky bottom-0 bg-white pt-2 pb-1">
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => navigate('/ingredients')}
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
              {ingredient ? "Modifier" : "Créer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIngredientPage;