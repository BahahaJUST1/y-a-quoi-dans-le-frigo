import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const WarningSimilarItems = ({ newItemName, displayWarning, setDisplayWarning, createItem, similarItems }) => {
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDisplayWarning(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setDisplayWarning]);

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
        <div className="relative p-4 bg-white rounded-lg border-2 border-gray-400 md:max-w-md md:w-full w-2/3 mx-4">
          <button
            onClick={() => setDisplayWarning(false)}
            className="absolute top-1.5 right-1.5 text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <svg className="md:w-6 md:h-6 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center mt-3 mb-6 md:text-lg text-md font-semibold">{getItemType()}</div>
            {similarItems.map((item, index) => (
              <p key={index} className={`${index === 0 ? "border-t-1" : "border-t-0"} text-gray-800 text-center mx-8 border border-gray-300`}>{item}</p>
            ))}
          <p className="mb-2 mt-6 text-center">
            Voulez-vous toujours ajouter
            <span className="border border-gray-300 text-gray-800 mx-1 px-1 pb-1 rounded-sm">{newItemName}</span>
            à la liste des {location.pathname.includes("ingredients") ? "ingrédients" : "plats"} ?
          </p>
          <div className="flex gap-4 pt-4">
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