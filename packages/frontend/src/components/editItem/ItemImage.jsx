import React, { useState } from 'react';
import Delete from '../svgs/Delete';

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
    <div className="mb-6">
      <label className="block mb-1 text-md max-[768px]:text-sm">Image</label>

      {/* Container with relative positioning */}
      <div className="relative flex items-center gap-1">
        <div className="relative">
          <label
            htmlFor="image"
            className="text-md max-[768px]:text-sm bg-gray-200 border border-gray-300 px-3 py-1.5 rounded cursor-pointer inline-block"
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
          <Delete />
        </button>

        {/* File name displayed above */}
        <div className="absolute left-0 top-full mt-0.5">
          <p className="text-sm max-[768px]:text-xs text-gray-600 rounded whitespace-nowrap z-10">
            {imageDisplayed.length ? selectedFileName : "Aucun fichier choisi"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemImage;
