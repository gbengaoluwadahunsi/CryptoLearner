import { useState } from "react";
import axios from "axios";
import { APIUSERS_URL } from "../api/users";
import { useNavigate ,useParams } from "react-router-dom";



const ResetPassword = () => {
    
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const {token} = useParams();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
     
      const response = await axios.post(
        `${APIUSERS_URL }/reset-password/${token}`,
        { password }
      );
      if (response.status === 200){
        setSuccess('Password reset successful!');
        setTimeout(() => navigate("/signin"), 2000); // Navigate after 2 seconds
      }
      console.log(response.data)
      
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your new password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block  mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
