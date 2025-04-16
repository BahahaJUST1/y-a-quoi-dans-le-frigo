import Delete from '../svgs/Delete';
import Undo from '../svgs/Undo';
import UnitSelect from './UnitSelect';
import Add from '../svgs/Add';

const DishIngredientsList = ({
    ingredientsList,
    dishIngredients,
    updateQuantity,
    updateUnit,
    addDishIngredient,
    removeDishIngredient,
    undoDishIngredient,
    errorText,
    displayError
  }) => {

  return (
    <div className="mt-2 mb-6">

      <div className="flex mb-1">
        <div className="flex text-md max-[768px]:text-sm">Ingrédients <span className="error-text ml-1">*</span></div>
        <div className={`text-right text-sm mt-0.5 w-full ml-1.5 error-text ${displayError ? 'visible' : 'invisible'}`}>
          { errorText }
        </div>
      </div>

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
                className="border w-[10%] flex justify-center text-center outline-none custom-arrows"
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
                <UnitSelect
                  selectedUnit={dishIngredient.unit.id}
                  onUnitChange={(newUnit) => {
                    updateUnit(dishIngredient.ingredient.id, newUnit);
                  }}
                />
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
                className={`w-[5%] flex justify-end hover:scale-105 cursor-pointer pt-0.5 ${typeof dishIngredient.ingredient.id === 'string' ? 'invisible' : 'visible'}`}
                onClick={(e) => {
                  e.preventDefault();
                  undoDishIngredient(dishIngredient);
                }}
              >
                <Undo />
              </span>
            </div>
          );
        })
      }

      {/* ADD NEW ROW BUTTON */}
      <button
        className="bg-white px-2 pb-0.5 rounded-[3px] border text-gray-500 ml-1 mt-1 flex"
        onClick={(e) => {
          e.preventDefault();
          addDishIngredient();
        }}
      >
        <span className="mt-1 mb-0.5 pt-[0.1rem] mr-2 border border-gray-400 rounded-sm">
          <Add color="#6B7280" />
        </span>
        <span>
          Ajouter un nouvel ingrédient
        </span>
      </button>
    </div>
  )
}

export default DishIngredientsList;