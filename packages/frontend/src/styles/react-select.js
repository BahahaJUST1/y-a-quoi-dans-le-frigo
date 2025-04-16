export const checkIfMobile = () => {
  return window.matchMedia('(max-width: 768px)').matches;
};

export const reactCategorySelectCustomStyle = {
  control: (baseStyles) => ({
    ...baseStyles,
    padding: checkIfMobile() ? '2px 0' : '2px 1px',
    borderRadius: '0.5rem',
    borderColor: '#D1D5DB',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9CA3AF'
    }
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    zIndex: 50
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    borderBottom: '0.5px solid #f0f0f0',
    backgroundColor: isSelected
      ? '#FFEBB3' // color when option is currently selected
      : isFocused
        ? '#FFF5D6' // hover color
        : null,
    color: 'black',
    '&:active': {
      backgroundColor: '#FFE394' // color on option click
    }
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#D1D5DB',
      borderRadius: '20px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#9CA3AF'
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#D1D5DB transparent'
  })
};

export const reactUnitSelectCustomStyle = {
  control: (baseStyles) => ({
    ...baseStyles,
    minHeight: '26px',
    height: '26px',
    borderColor: '#E5E7EB',
    '&:hover': {
      borderColor: '#E5E7EB'
    },
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0px',
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    height: '24px',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: isSelected
      ? '#E5E7EB' // color when option is currently selected
      : isFocused
        ? '#F3F4F6' // hover color
        : 'white',
    color: 'black',
    '&:active': {
      backgroundColor: '#D1D5DB' // color on option click
    }
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    zIndex: 50,
    marginTop: '2px',
    borderRadius: '0px',
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    borderRadius: '0px',
    padding: '0',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#D1D5DB',
      borderRadius: '0px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#9CA3AF'
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#D1D5DB transparent'
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    height: '24px',
    display: 'flex',
    alignItems: 'center',
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    height: '100%',
    margin: 0,
    backgroundColor: '#E5E7EB'
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: '0',
    color: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    height: '24px',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  })
};