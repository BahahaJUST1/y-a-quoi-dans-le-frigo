import React, { useState } from 'react';

const ItemImage = ({ handleImageChange }) => {
  const [selectedFileName, setSelectedFileName] = useState("Aucun fichier choisi");

  const onImageChange = (e) => {
    handleImageChange(e);
    setSelectedFileName(e.target.files[0]?.name || "Aucun fichier choisi");
  };

  const handleClearImage = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
      setSelectedFileName("Aucun fichier choisi");
      handleImageChange({ target: { files: [] } });
    }
  };

  return (
    <div>
      <label className="block mb-1">Image</label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <label
            htmlFor="image"
            className="bg-gray-200 border border-gray-300 px-3 py-1.5 rounded cursor-pointer inline-block"
          >
            Choisir un fichier
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </div>
          <button
            onClick={handleClearImage}
            type="button"
            className="bg-white border border-gray-300 p-1.5 rounded hover:bg-gray-50"
            title="Supprimer l'image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
      </div>
      <p className="mt-0.5 ml-0.5 text-sm text-gray-600">{selectedFileName}</p>
    </div>
  );
};

export default ItemImage;