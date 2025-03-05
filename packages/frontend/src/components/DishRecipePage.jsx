import { useState, useEffect } from 'react';
import $http from '../axiosInstance';
import { useParams } from 'react-router-dom';

const DishRecipePage = () => {
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

  // Si les données sont en cours de chargement
  if (loadingDish || loadingDishIngredients) {
    return <p>Chargement du plat...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{dish.name}</h1>
        <img
          src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image}`}
          alt={dish.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h2 className="text-3xl font-bold mb-6">Ingrédients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {dishIngredients.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
              <img
                src={`https://res.cloudinary.com/dd50khgyk/image/upload/${item.ingredient.image}`}
                alt={item.ingredient.name}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{item.ingredient.name}</p>
                <p>{item.quantity} {item.unit.name}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6">Recette</h2>
        <p className="whitespace-pre-line">{dish.recipe}</p>
      </div>
    </div>
  );
};

export default DishRecipePage;