const ItemName = ({ name, placeholder, handleInputChange, displayNameError }) => {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor="name" className="block">
          Nom <span className="error-text">*</span>
        </label>
        <span className={`${displayNameError ? 'visible' : 'invisible'} error-text md:text-sm text-xs`}>
          Veuillez saisir un nom !
        </span>
      </div>

      <input
        type="text"
        id="name"
        name="name"
        placeholder={`${placeholder ?? "Nouvel ingrédient"}`}
        value={name}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        required
      />
    </div>
  )
}

export default ItemName;