import axios from 'axios';
import  { useState } from 'react';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [isSentToken, setIsSentToken] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${backendUrl}/pharmacist/forgot-password1`, { email });
      toast.success(res.data.message);
      setIsSentToken(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleTokenValidate = async () => {
    try {
        console.log(token);
        
      const res = await axios.post(`${backendUrl}/pharmacist/forgot-password2`, {
        resetToken: token,
        password,
        confirmPassword
      });
      toast.success(res.data.message || "Password changed successfully");
      onSwitch(); // Redirect back to login
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid token or password mismatch");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

        <input  
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSentToken} 
          placeholder="Enter your email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Token
        </button>

        {isSentToken && (
          <div className="mt-6">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter received token"
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleTokenValidate}
              className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Reset Password
            </button>
          </div>
        )}

        <p className="text-sm text-center mt-4 text-blue-600 cursor-pointer hover:underline" onClick={onSwitch}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
