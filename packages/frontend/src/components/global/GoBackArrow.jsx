import { useNavigate } from 'react-router-dom';
import BackArrow from '../svgs/BackArrow';

const GoBackArrow = ({ to = '/' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`z-40 absolute left-6 max-[768px]:left-4 md:top-3 top-2.5 p-1.5 primary-bg-color-hover hover:scale-110 rounded-full transition-colors`}
    >
      <BackArrow />
    </button>
  );
};

export default GoBackArrow;