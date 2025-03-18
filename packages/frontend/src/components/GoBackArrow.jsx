import { useNavigate } from 'react-router-dom';

const GoBackArrow = ({ to = '/' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`z-40 absolute left-6 max-[768px]:left-4 top-5 p-2 hover:bg-gray-100 rounded-full transition-colors`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
};

export default GoBackArrow;