import Select from 'react-select';
import { reactSelectCustomStyle } from '../../styles/react-select';
import $http from '../../axiosInstance';
import { useEffect, useState } from 'react';

const CategorySelect = ({ defaultCategoryName, selectedCategory, onCategoryChange }) => {
  
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $http.get('/ingredient-category');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  if (loadingCategories) {
    return;
  }

  const categoryOptions = [
    { value: "", label: defaultCategoryName },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];

  return (
    <div className="w-full md:w-1/4">
      <Select
        classNames="focus:outline-0"
        styles={reactSelectCustomStyle}
        options={categoryOptions}
        value={categoryOptions.find(option => option.value === selectedCategory) || categoryOptions[0]}
        onChange={(option) => onCategoryChange(option.value ? parseInt(option.value) : 0)}
        isSearchable={false}
        menuPlacement="bottom"
      />
    </div>
  )
}

export default CategorySelect;