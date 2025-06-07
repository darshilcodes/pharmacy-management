import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const { email } = useContext(AppContext);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    console.log('email changed:', email);
  }, [email]);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error('Both password fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/pharmacist/change-password`, {
        email,
        password,
        confirmPassword
      });

      toast.success(res.data.message || 'Password changed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
      console.error("Change password error:", error);
    }
  };

  return (
    <div className="max-w-md m-4 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-indigo-500"
      >
        Change Password
      </button>
    </div>
  );
};

export default Settings;
