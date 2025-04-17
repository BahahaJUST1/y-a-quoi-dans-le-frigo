const ThreeDots = ({ handleClick, itemId }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="gray"
      stroke="gray"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 hover:scale-110 mt-2 cursor-pointer"
      onClick={(e) => handleClick(e, itemId, e.currentTarget)}
    >
      <circle cx="12" cy="7" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="17" r="1" />
    </svg>
  )
}

export default ThreeDots;