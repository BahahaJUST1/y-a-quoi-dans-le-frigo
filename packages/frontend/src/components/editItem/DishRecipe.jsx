const DishRecipe = ({ recipe, handleRecipeChange }) => {
  return (
    <div>
      <div>Recette</div>
      <textarea
        value={recipe ?? ''}
        onChange={handleRecipeChange}
        className="mt-1 w-full h-60 border rounded-md outline-0 resize-none px-2 py-1"
      />
    </div>
  )
}

export default DishRecipe;