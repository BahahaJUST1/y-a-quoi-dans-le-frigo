import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $http from '../../axiosInstance';
import GoBackArrow from '../../components/GoBackArrow';
import CategorySelect from '../../components/toolboxHeader/CategorySelect';
import { backgroundTextColor } from '../../utils/backgroundTextColor.ts';

const NewIngredientPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 0,
    image: null,
    bgColor: '#FAFAFA'
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
  };

  const handleCategoryChange = (value) => {
    const updatedFormData = {
      ...formData,
      category: value
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataToSubmit = { ...formData };

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        const result = await $http.post('/cloudinary/ingredients', imageFormData);
        dataToSubmit = { ...dataToSubmit, image: result.data };
      }

      await $http.post('/ingredient', dataToSubmit);
      navigate('/ingredients');
    } catch (error) {
      console.error('Erreur lors de la création de l\'ingrédient:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden max-[768px]:mx-8">
      <div className="max-w-6xl w-full p-6 py-4 max-[768px]:p-4 bg-white shadow-lg rounded-2xl flex flex-col h-[90vh] max-[768px]:h-[92vh] relative">
        <GoBackArrow to={"/ingredients"} />

        <h1 className="text-3xl font-bold mb-6 max-[768px]:mt-1 text-center">
          Nouvel Ingrédient
        </h1>

        <div className="flex flex-col h-full">

          {/* INGREDIENT PRE-VISUALISATION */}
          <div>
            <h2>
              Prévisualisation
            </h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <div
                className="flex items-center p-2 rounded-lg shadow-lg w-full md:w-2/5 h-20"
                style={{
                  color: backgroundTextColor(formData.bgColor),
                  backgroundColor: formData.bgColor,
                  borderColor: 'darkgray',
                  borderWidth: '1px',
                }}
              >
                <img
                  src={previewImage
                    ? previewImage
                    : formData.category
                      ? `https://res.cloudinary.com/dd50khgyk/image/upload/${categories[formData.category -1].image}`
                      : `https://res.cloudinary.com/dd50khgyk/image/upload/placeholders/ikaqizn0ejqtmidebibc`
                  }
                  alt="ingrédient"
                  className={`w-16 h-16 object-cover ${formData.image ? 'rounded-md' : ''} mr-4`}
                />
                <h2 className="text-xl max-[768px]:text-lg font-semibold flex items-center justify-between w-full">
                  {formData.name.length ? formData.name : "Nouvel ingrédient"}
                  <span className="ml-2">
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      fill='#EF4444'
                      stroke='#EF4444'
                      strokeWidth='1'
                      className="mt-2"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* NEW INGREDIENT FORMULA */}
          <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <label htmlFor="name" className="block text-xl font-medium text-gray-700 mb-2">
                Nom de l'ingrédient
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nouvel ingrédient"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>

              <CategorySelect
                defaultCategoryName={'Choisir une catégorie'}
                selectedCategory={formData.category}
                onCategoryChange={handleCategoryChange}
              />

            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700 mb-2">
                Couleur de fond
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  id="bgColor"
                  name="bgColor"
                  value={formData.bgColor}
                  onChange={handleInputChange}
                  className="w-20 h-10 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  readOnly={true}
                  value={formData.bgColor}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>

          <div className="flex gap-4 mt-auto pt-4">
            <button
              type="button"
              onClick={() => navigate('/ingredients')}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 px-4 rounded-md transition max-[768px]:bg-[#ffe394] bg-[#FFEBB3] text-black hover:bg-[#FFE394]"
            >
              Créer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIngredientPage;
