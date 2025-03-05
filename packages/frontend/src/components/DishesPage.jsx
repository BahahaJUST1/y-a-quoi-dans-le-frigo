import { useState, useEffect } from 'react';
import $http from '../axiosInstance';

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await $http.get('http://localhost:3000/dish');
        setDishes(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des plats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Si les données sont en cours de chargement
  if (loading) {
    return <p>Chargement des plats...</p>;
  }

  // Si une erreur s'est produite
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Plats</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dishes.map((dish) => (
            <div key={dish.id} className="p-4 border rounded-lg shadow-lg">
              <img src={`https://res.cloudinary.com/dd50khgyk/image/upload/${dish.image}`} alt={`photo-${dish.name.split(' ').join('-').toLowerCase()}`} />
              <h2 className="text-xl font-semibold">{dish.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishesPage;
