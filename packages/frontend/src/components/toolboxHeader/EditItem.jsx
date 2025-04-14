import { useLocation, useNavigate } from 'react-router-dom';

const EditItem = ({ itemToUpdate }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black"
           strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  )
}

export default EditItem;