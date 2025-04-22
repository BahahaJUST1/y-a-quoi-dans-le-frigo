import { useNavigate } from 'react-router-dom';
import BackArrow from '../svgs/BackArrow';

const GoBackArrow = ({ to = '/' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`z-40 absolute left-6 max-[768px]:left-4 top-5 p-2 hover:bg-gray-100 rounded-full transition-colors`}
    >
      <BackArrow />
    </button>
  );
};

export default GoBackArrow;