const checkIfMobile = () => {
  return window.matchMedia('(max-width: 768px)').matches;
};

export const reactSelectCustomStyle = {
  control: (baseStyles) => ({
    ...baseStyles,
    padding: checkIfMobile() ? '1px 0' : '2px 1px',
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
}