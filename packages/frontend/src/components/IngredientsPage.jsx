import { useState, useEffect } from 'react';
import $http from '../axiosInstance';

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [loadingIngredientCategories, setLoadingIngredientCategories] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await $http.get('http://localhost:3000/ingredient');
        setIngredients(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des ingrédients.');
        console.error(err);
      } finally {
        setLoadingIngredients(false);
      }
    };

    const fetchIngredientCategories = async () => {
      try {
        const response = await $http.get('http://localhost:3000/ingredient-category');
        setIngredientCategories(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des catégories d\'ingrédients.');
        console.error(err);
      } finally {
        setLoadingIngredientCategories(false);
      }
    };

    fetchIngredients();
    fetchIngredientCategories();
  }, []);

  const getIngredientCategoryPlaceholder = (ingredientCategoryId) => {
    const category = ingredientCategories.find((ingredientCategory) => ingredientCategory.id === ingredientCategoryId);
    return category.image;
  }

  if (loadingIngredients || loadingIngredientCategories) {
    return <p>Chargement des ingrédients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Ingrédients</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex items-center p-4 rounded-lg shadow-lg"
              style={{ backgroundColor: ingredient.bgColor }}
            >
              <img
                src={ingredient.image
                  ? `https://res.cloudinary.com/dd50khgyk/image/upload/${ingredient.image}`
                  : `https://res.cloudinary.com/dd50khgyk/image/upload/${getIngredientCategoryPlaceholder(ingredient.category)}`}
                alt={`photo-${ingredient.name.split(' ').join('-').toLowerCase()}`}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <h2 className="text-xl font-semibold">{ingredient.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
