import { useLocation, useNavigate } from 'react-router-dom';
import Add from '../svgs/Add';

const AddItemButton = ({ itemToUpdate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isIngredientsPage = location.pathname.includes("ingredients");
  const isDishesPage = location.pathname.includes("dishes");

  const navigateToItemEdition = () => {
    if (isIngredientsPage) {
      navigate("/ingredients/edit", { state: { ingredient: itemToUpdate ?? null } });
    }
    else if (isDishesPage) {
      navigate("/dishes/edit", { state: { dish: itemToUpdate ?? null } });
    }
  }

  return (
    <button
      className="bg-white hover:bg-gray-50 border border-gray-300 font-bold rounded-lg w-[42px] h-[42px] flex items-center justify-center flex-shrink-0"
      onClick={navigateToItemEdition}
      type="button"
      title={`Ajouter un ${isIngredientsPage ? 'nouvel ingrédient' : 'nouveau plat'}`}
    >
      <Add />
    </button>
  )
}

export default AddItemButton;