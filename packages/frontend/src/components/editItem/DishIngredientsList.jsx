import Delete from '../svgs/Delete';

const DishIngredientsList = ({ dishIngredients, removeDIshIngredient }) => {
  return (
    <div className="mt-2 mb-6">

      {/* COLUMN TITLES */}
      <div className="flex justify-between p-1 px-4 bg-[#FFEBB3] font-semibold">
        <span className="w-6/12">
          Nom
        </span>

        <span className="w-2/12">
          Quantité
        </span>

        <span className="w-3/12">
          Unité
        </span>

        <span className="w-1/12"></span>
      </div>

      {/* DISH-INGREDIENTS COLUMNS */}
      {
        dishIngredients.map((dishIngredient, index) => {
          return (
            <div
              key={`dish-ingredient-${index}`}
              className={`
                ${index % 2 === 0 ? 'bg-amber-50' : 'bg-amber-100'}
                flex justify-between p-1 px-4
              `}
            >
              <span className="w-6/12">
                {dishIngredient.ingredient.name}
              </span>

              <span className="w-2/12">
                {dishIngredient.quantity}
              </span>

              <span className="w-3/12">
                {dishIngredient.unit.name}
              </span>

              <span
                className="w-1/12 flex justify-end hover:scale-105 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  removeDIshIngredient(dishIngredient);
                }}
              >
                <Delete />
              </span>
            </div>
          )
        })
      }
    </div>
  )
}

export default DishIngredientsList;