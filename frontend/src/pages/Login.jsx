import axios from 'axios';
import { useContext, useState } from 'react';
import AppContext from '../context/appContext';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = ({ onSwitch }) => {
  const [email, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setEmail } = useContext(AppContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = async () => {
    if (isClicked) return; // prevent double click

    setIsClicked(true);
    try {
      const response = await axios.post(`${backendUrl}/pharmacist/login`, { email, password });

      setToken(response.data.token);
      setEmail(email);

      toast.success(response.data.message);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed");
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login to Your Account</h2>

        <input
          type="text"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail1(e.target.value)}
          value={email}
        />

        <input 
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          onClick={handleSubmit}
          disabled={isClicked}
          className={`w-full text-white font-semibold py-2 rounded-lg transition duration-200 ${
            isClicked ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-indigo-500'
          }`}
        >
         {isClicked ? <span className="loader"></span> : "Login"}

        </button>

        <p className="text-sm text-center mt-4 text-indigo-500 cursor-pointer hover:underline" onClick={onSwitch}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Login;
