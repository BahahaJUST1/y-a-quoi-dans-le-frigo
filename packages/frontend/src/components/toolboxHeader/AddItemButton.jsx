import { useLocation, useNavigate } from 'react-router-dom';
import Add from '../svgs/Add';

const AddItemButton = ({ itemToUpdate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToItemEdition = () => {
    if (location.pathname.includes("ingredients")) {
      navigate("/ingredients/edit", { state: { ingredient: itemToUpdate ?? null } });
    }
    else if (location.pathname.includes("dishes")) {
      console.log("item", itemToUpdate);
      navigate("/dishes/edit", { state: { dish: itemToUpdate ?? null } });
    }
  }

  return (
    <button
      className="bg-white hover:bg-[#FFE394] border border-gray-300 font-bold rounded-lg w-[42px] h-[42px] flex items-center justify-center flex-shrink-0"
      onClick={navigateToItemEdition}
      type="button"
      title="Ajouter un nouvel ingrédient"
    >
      <Add />
    </button>
  )
}

export default AddItemButton;