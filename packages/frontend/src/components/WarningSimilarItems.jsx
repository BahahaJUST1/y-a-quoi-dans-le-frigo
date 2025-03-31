import { useLocation } from 'react-router-dom';

const WarningSimilarItems = ({ newItemName, displayWarning, setDisplayWarning, createItem, similarItems }) => {
  const location = useLocation();

  const getItemType = () => {
    let itemType = location.pathname.includes("ingredients") ? "ingrédient" : "plat";
    if (similarItems.length > 1) {
      return `Attention, certains ${itemType}s avec un nom similaire existent déjà :`;
    }
    return `Attention, un ${itemType} avec un nom similaire existe déjà :`
  }

  if (!displayWarning) return null;

  return (
    <>
      {/* Overlay that cover the whole app */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="p-8 bg-white rounded-lg border-2 border-gray-400 max-w-md w-full mx-4">
          <div className="font-semibold mb-2">{getItemType()}</div>
            {similarItems.map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
            ))}
          <p>
            Voulez-vous toujours ajouter
            <span className="bg-gray-300 mx-1 px-1 pb-1 rounded-sm">{newItemName}</span>
            à la liste des {location.pathname.includes("ingredients") ? "ingrédients" : "plats"} ?
          </p>
          <div className="mt-8 flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setDisplayWarning(false)}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Non
            </button>
            <button
              onClick={createItem}
              className="flex-1 py-2 px-4 rounded-md transition max-[768px]:bg-[#ffe394] bg-[#FFEBB3] text-black hover:bg-[#FFE394]"
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WarningSimilarItems;