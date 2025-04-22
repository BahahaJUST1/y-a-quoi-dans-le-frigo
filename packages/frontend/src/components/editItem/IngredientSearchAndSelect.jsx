import Select from 'react-select';
import { useState, useMemo } from 'react';
import { reactIngredientNameSelectCustomStyle } from '../../styles/react-select';
import DropDown from '../svgs/DropDown';

const IngredientSearchAndSelect = ({
  ingredients,
  currentIngredient,
  handleIngredientChange,
  dishIngredients
}) => {

  const [searchTerm, setSearchTerm] = useState('');

  // filter ingredients that are not currently in the recipe
  const availableIngredients = useMemo(() => {
    const currentIngredientIds = dishIngredients.map(di => di.ingredient.id);
    return ingredients.filter(ingredient => !currentIngredientIds.includes(ingredient.id));
  }, [ingredients, dishIngredients]);

  // filter ingredients according to search term
  const filteredIngredients = useMemo(() => {
    if (!searchTerm) return availableIngredients;
    return availableIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableIngredients, searchTerm]);

  const ingredientOptions = filteredIngredients.map(ingredient => ({
    value: ingredient.id,
    label: ingredient.name
  }));

  const DropdownIndicator = () => (
    <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DropDown />
    </div>
  );

  return (
    <div className="w-[97%]">
      <Select
        styles={reactIngredientNameSelectCustomStyle}
        options={ingredientOptions}
        value={{
          value: currentIngredient.id,
          label: currentIngredient.name.length ? currentIngredient.name : "Sélectionner un ingrédient..."
        }}
        onChange={(option) => {
          if (option) {
            const newIngredientSelected = ingredients.find(ing => ing.id === option.value);
            handleIngredientChange(
              currentIngredient?.id ?? null,
              newIngredientSelected
            );
          }
        }}
        onInputChange={(inputValue) => setSearchTerm(inputValue)}
        isSearchable={true}
        menuPlacement="bottom"
        components={{ DropdownIndicator }}
      />
    </div>
  );
};

export default IngredientSearchAndSelect;