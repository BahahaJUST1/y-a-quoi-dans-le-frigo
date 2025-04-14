import Delete from '../svgs/Delete';
import Undo from '../svgs/Undo';

const DishIngredientsList = ({ dishIngredients, updateQuantity, updateUnit, removeDishIngredient, undoDishIngredient }) => {
  return (
    <div className="mt-2 mb-6">

      {/* COLUMN TITLES */}
      <div className="flex justify-between p-1 px-4 bg-[#FFEBB3] font-semibold">
        <span className="w-[60%]">
          Nom
        </span>

        <span className="w-[10%] text-center">
          Quantité
        </span>

        <span className="w-[20%] text-center">
          Unité
        </span>

        <span className="w-[5%]"></span>
        <span className="w-[5%]"></span>
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
              <span className="w-[60%]">
                {dishIngredient.ingredient.name}
              </span>

              <input
                className="w-[10%] flex justify-center"
                type="number"
                value={dishIngredient.quantity}
                min={0}
                max={999}
                onChange={(e) => {
                  e.preventDefault();
                  updateQuantity(dishIngredient.ingredient.id, e.target.value);
                }}
              />

              <span className="w-[20%] flex justify-center">
                {dishIngredient.unit.name}
              </span>

              <span
                className="w-[5%] flex justify-end hover:scale-105 cursor-pointer pt-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  removeDishIngredient(dishIngredient);
                }}
              >
                <Delete />
              </span>

              <span
                className="w-[5%] flex justify-end hover:scale-105 cursor-pointer pt-0.5"
                onClick={(e) => {
                  e.preventDefault();
                  undoDishIngredient(dishIngredient);
                }}
              >
                <Undo />
              </span>
            </div>
          )
        })
      }
    </div>
  )
}

export default DishIngredientsList;