import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

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
        response = await axios.post('http://localhost:3000/auth/login', {
          email,
          password,
        });
      }
      else {
        response = await axios.post('http://localhost:3000/auth/register', {
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
      setError("Erreur lors de l'authentification");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen max-[768px]:p-3">
      <div className="flex max-w-5xl bg-white p-8 rounded-xl shadow-lg max-[768px]:flex-col w-full max-[768px]:min-h-[calc(100vh-4rem)] max-[768px]:w-[calc(100%-3rem)]">
        <div className="flex-1 flex items-center justify-center mr-5 max-[768px]:mr-0 max-[768px]:mb-4">
          <img src={logo} alt="Logo" className={`${!isLogin ? "max-[768px]:mb-[1rem]" : ""} h-full max-[768px]:disabled:true max-[768px]:h-full max-[768px]:my-[-1rem]`} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-4xl mb-6 text-center title-font">Y'a quoi dans le frigo ?</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {!isLogin && (
              <div className="flex mb-2">
                <div className="mr-2 flex-1">
                  <label className="block mt-1 text-sm">PRENOM :</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mb-2 autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#FFE394]"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="font-courage block mt-1 text-sm">NOM :</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mb-2 autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#FFE394]"
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
                className="mb-1 autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#FFE394]"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mt-1 text-sm">MOT DE PASSE :</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="autofill-fix w-full p-2 border rounded focus:outline-1 focus:outline-[#FFE394]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFEBB3] text-black py-2 px-4 rounded hover:bg-[#ffe394]"
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>

            <div className="flex justify-center">
              <button
                type="button"
                className="inline-block text-[#ff8f0c] mt-1 rounded hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Pas encore de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;