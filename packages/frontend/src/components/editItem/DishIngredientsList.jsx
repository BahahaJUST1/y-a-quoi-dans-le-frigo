import Delete from '../svgs/Delete';
import Undo from '../svgs/Undo';
import UnitSelect from './UnitSelect';
import Add from '../svgs/Add';
import IngredientSearchAndSelect from './IngredientSearchAndSelect';

const DishIngredientsList = ({
    ingredientsList,
    dishIngredients,
    updateIngredient,
    updateQuantity,
    updateUnit,
    addDishIngredient,
    removeDishIngredient,
    undoDishIngredient,
    errorText,
    displayError
  }) => {

  return (
    <div className="md:mt-2 mb-6 max-[768px]:mb-4 max-[768px]:text-sm">

      <div className="flex mb-1">
        <div className="flex text-md max-[768px]:text-sm">Ingrédients <span className="error-text ml-1">*</span></div>
        <div className={`text-right text-sm max-[768px]:text-xs mt-0.5 w-full ml-1.5 error-text ${displayError ? 'visible' : 'invisible'}`}>
          { errorText }
        </div>
      </div>

      {/* COLUMN TITLES */}
      <div className="flex justify-between p-1 px-4 bg-gray-400 font-semibold">
        <span className="w-[60%] max-[768px]:hidden">
          Nom
        </span>

        <span className="w-[100%] md:hidden text-center">
          Nom, quantité et unité
        </span>

        <span className="w-[10%] text-center max-[768px]:hidden">
          Quantité
        </span>

        <span className="w-[20%] text-center max-[768px]:hidden">
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
                ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}
                flex flex-col md:flex-row justify-between p-1 px-4
              `}
            >
              <div className="w-full md:w-[60%] max-[768px]:mt-0.5 mb-1.5 md:mb-0">
                <IngredientSearchAndSelect
                  ingredients={ingredientsList}
                  currentIngredient={dishIngredient.ingredient}
                  handleIngredientChange={updateIngredient}
                  dishIngredients={dishIngredients}
                />
              </div>

              <div className="flex justify-between items-center w-full md:w-[40%]">
                <input
                  className="border w-[30%] flex justify-center text-center outline-none custom-arrows max-[768px]:h-[26px]"
                  type="number"
                  value={dishIngredient.quantity}
                  min={0}
                  max={999}
                  onChange={(e) => {
                    e.preventDefault();
                    updateQuantity(dishIngredient.ingredient.id, e.target.value);
                  }}
                />

                <span className="w-[40%] flex justify-center">
                  <UnitSelect
                    selectedUnit={dishIngredient.unit.id}
                    onUnitChange={(newUnit) => {
                      updateUnit(dishIngredient.ingredient.id, newUnit);
                    }}
                  />
                </span>

                <span
                  className="w-[15%] flex justify-end hover:scale-105 cursor-pointer pt-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    removeDishIngredient(dishIngredient);
                  }}
                >
                  <Delete
                    width={20}
                  />
                </span>

                <span
                  className={`w-[15%] flex justify-end hover:scale-105 cursor-pointer pt-0.5 ${typeof dishIngredient.ingredient.id === 'string' ? 'invisible' : 'visible'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    undoDishIngredient(dishIngredient);
                  }}
                >
                  <Undo />
                </span>
              </div>
            </div>
          );
        })
      }

      {/* ADD NEW ROW BUTTON */}
      <button
        className="bg-white px-2 pb-0.5 rounded-[3px] border text-gray-500 ml-1 mt-1 max-[768px]:mt-2.5 flex"
        onClick={(e) => {
          e.preventDefault();
          addDishIngredient();
        }}
      >
        <span className="max-[768px]:hidden mt-1 mb-0.5 pt-[0.1rem] mr-2 border border-gray-400 rounded-sm">
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