import React, { useState } from 'react';

const ItemImage = ({ handleImageChange }) => {
  const [selectedFileName, setSelectedFileName] = useState("Aucun fichier choisi");

  const onImageChange = (e) => {
    handleImageChange(e);
    setSelectedFileName(e.target.files[0]?.name || "Aucun fichier choisi");
  };

  return (
    <div>
      <label htmlFor="image" className="block mb-1">Image</label>
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
      <p className="mt-0.5 ml-0.5 text-sm text-gray-600">{selectedFileName}</p>
    </div>
  );
};

export default ItemImage;
