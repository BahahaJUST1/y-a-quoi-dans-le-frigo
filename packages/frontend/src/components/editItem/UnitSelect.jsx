import Select from 'react-select';
import { useEffect, useState } from 'react';
import $http from '../../axiosInstance';
import { reactUnitSelectCustomStyle } from '../../styles/react-select';

const UnitSelect = ({ selectedUnit, onUnitChange }) => {
  const [units, setUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await $http.get('/unit');
        setUnits(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUnits();
  }, []);

  const returnUnit = (option) => {
    return onUnitChange(units.find((unit) => unit.id === option.value));
  }

  if (loadingUnits) {
    return;
  }

  const unitOptions = [
    ...units.map(unit => ({
      value: unit.id,
      label: unit.name
    }))
  ];

  const DropdownIndicator = () => (
    <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );

  return (
    <div className="w-full ml-3 mr-1">
      <Select
        styles={reactUnitSelectCustomStyle}
        options={unitOptions}
        value={unitOptions.find(option => option.value === selectedUnit) || unitOptions[0]}
        onChange={(option) => returnUnit(option)}
        isSearchable={false}
        menuPlacement="bottom"
        components={{ DropdownIndicator }}
      />
    </div>
  )
}

export default UnitSelect;