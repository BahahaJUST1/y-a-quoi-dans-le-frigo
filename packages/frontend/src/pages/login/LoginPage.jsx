import { useState } from 'react';
import $http from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let response;

      if (isLogin) {
        response = await $http.post('/auth/login', {
          email,
          password,
        });
      }
      else {
        response = await $http.post('/auth/register', {
          firstName,
          lastName,
          email,
          password,
        });
      }
      localStorage.setItem('authToken', response.data);
      navigate('/ingredients');
    }
    catch (err) {
      if (isLogin) {
        setError("Email ou mot de passe incorrect");
      }
      else {
        setError("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-svh">
      <div className="flex md:w-1/3 w-3/4">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="secondary-text-color text-4xl max-[768px]:text-2xl mb-6 text-center title-font">
            Y'a quoi dans le frigo ?
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {!isLogin && (
            <div className="flex mb-2">
              <div className="mr-2 flex-1">
                <label className="block mt-1 text-sm">PRENOM :</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-2 autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#7EC0C4]"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="font-courage block mt-1 text-sm">NOM :</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mb-2 autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#7EC0C4]"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block mt-1 text-sm">EMAIL :</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-1 autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#7EC0C4]"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mt-1 text-sm">MOT DE PASSE :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#7EC0C4]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full primary-bg-color primary-bg-color-hover py-2 px-4 rounded"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>

          <div className="flex justify-center">
            <button
              type="button"
              className="font-normal inline-block mt-1 rounded group"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              <p>
                <span className="text-black">{isLogin ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}</span>
                <span className="font-medium primary-text-color group-hover:underline group-hover:decoration-[#7EC0C4] max-[768px]:underline max-[768px]:decoration-[#7EC0C4]">{isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}</span>
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;