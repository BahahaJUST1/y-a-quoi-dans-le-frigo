import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useParams } from 'react-router-dom';
import GoBackArrow from '../components/GoBackArrow';
import { getNoRecipeText } from '../utils/noRecipeText.ts';

const RecipePage = () => {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [dishIngredients, setDishIngredients] = useState([]);

  const [loadingDish, setLoadingDish] = useState(true);
  const [loadingDishIngredients, setLoadingDishIngredients] = useState(true);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await $http.get(`http://localhost:3000/dish/${id}`);
        setDish(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDish(false);
      }
    };

    const fetchDishIngredients = async () => {
      try {
        const response = await $http.get(`http://localhost:3000/dish-ingredient/dish/${id}`);
        setDishIngredients(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDishIngredients(false);
      }
    };

    fetchDish();
    fetchDishIngredients();
  }, [id]);

  if (loadingDish || loadingDishIngredients) {
    return;
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden max-[768px]:mx-8">
      <div className="relative max-w-6xl w-full p-6 py-4 max-[768px]:p-4 bg-white shadow-lg rounded-2xl flex flex-col h-[90vh] max-[768px]:h-[92vh]">

        <GoBackArrow to={"/dishes"} state={{ selectedIngredients: [] }} />

        <h1 className="w-[90%] mx-auto text-3xl font-bold mb-6 text-center sticky top-0 bg-white z-10">
          {dish.name}
        </h1>
        
        <div className="overflow-y-auto flex-grow scrollbar-hide">
          <img
            src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image ? dish.image : "placeholders/g2dkz5ae3ce3u5gde5cz"}`}
            alt={dish.name}
            className="w-full h-96 max-[768px]:h-64 object-cover rounded-lg mb-6"
          />

          <h2 className="text-1xl font-bold mb-6">
            <div className={`${dish.preparationTime ? '' : 'hidden' } flex items-center mt-1`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>Temps de préparation : {dish.preparationTime}min</span>
            </div>
          </h2>

          <h2 className="text-3xl font-bold mb-6">Ingrédients</h2>
          <div className="text-1xl font-bold mb-6" >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5c-3.5 0-6.5 2.5-6.5 5.5v1h13v-1c0-3-3-5.5-6.5-5.5zM12 12a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              Recette pour {dish.numberOfPeople} personnes
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-[768px]:gap-2 mb-6">
            {dishIngredients.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-2 border rounded-lg shadow-sm">
                <img
                  src={item.ingredient.image
                    ? `https://res.cloudinary.com/dd50khgyk/image/upload/${item.ingredient.image}`
                    : `https://res.cloudinary.com/dd50khgyk/image/upload/${item.ingredient.category.image}`}
                  alt={item.ingredient.name}
                  className={`w-20 h-20 max-[768px]:w-16 max-[768px]:h-16 object-cover ${item.ingredient.image ? "rounded-full" : ""}`}
                />
                <div>
                  <p className="text-lg font-semibold">{item.ingredient.name}</p>
                  <p>{item.quantity} {item.unit.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFFEE5] border mb-1 p-6 pb-4 max-[768px]:p-4 max-[768px]:pb-2 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Recette</h2>
            {
              dish.recipe
                ? <p className="whitespace-pre-line pb-3">{dish.recipe}</p>
                : <p className="whitespace-pre-line pb-3">{getNoRecipeText()}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;