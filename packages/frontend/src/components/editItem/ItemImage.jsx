import React, { useState } from 'react';

const ItemImage = ({ handleImageChange, imageDisplayed }) => {
  const [selectedFileName, setSelectedFileName] = useState("Aucun fichier choisi");

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(e);
      setSelectedFileName(file.name);
    }
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
      <div className="flex items-center gap-1">
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
          className="p-1 rounded hover:scale-105"
          title="Supprimer l'image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
            <path d="M9 10v8"></path>
            <path d="M12 10v8"></path>
            <path d="M15 10v8"></path>
          </svg>
        </button>
      </div>
      <p className="mt-0.5 ml-0.5 text-sm text-gray-600">{imageDisplayed.length ? selectedFileName : "Aucun fichier choisi"}</p>
    </div>
  );
};

export default ItemImage;