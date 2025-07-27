import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Quit from '../svgs/Quit';

const DeleteConfirmation = ({ itemToDelete, displayDeleteConfirmation, setDisplayDeleteConfirmation, deleteItem }) => {
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDisplayDeleteConfirmation(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setDisplayDeleteConfirmation]);

  if (!displayDeleteConfirmation) {
    return null;
  }

  return (
    <>
      {/* Overlay that cover the whole app */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative p-4 bg-white rounded-lg border-2 border-primary-hover md:max-w-md md:w-full w-2/3 mx-4">
          <button
            onClick={() => setDisplayDeleteConfirmation(false)}
            className="absolute top-1.5 right-1.5 text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <Quit />
          </button>
          <p className="mb-2 mt-6 text-center text-red-600">
            Attention, voulez-vous vraiment supprimer
            {location.pathname.includes('ingredients') ? " l'ingrédient" : " le plat"}
            <span className="border border-gray-300 text-gray-800 mx-1 px-1 pb-1 rounded-sm">{itemToDelete.name}</span>
            ?
            <br />
            <span className="underline">Cette action est irréversible !</span>
          </p>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setDisplayDeleteConfirmation(false)}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Non
            </button>
            <button
              onClick={deleteItem}
              className="flex-1 py-2 px-4 rounded-md transition primary-bg-color primary-bg-color-hover text-black hover:bg-[#FFE394]"
            >
              Oui
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;