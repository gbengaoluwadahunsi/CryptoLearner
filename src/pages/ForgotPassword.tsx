import { useState } from "react";
import axios from "axios";
import { APIUSERS_URL } from "../api/users";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
  
      const response = await axios.post(`${APIUSERS_URL}/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        setMessage("A reset link has been sent to your email.");
      } else {
        setError("Failed to send reset link. Please try again.");
      }
      
    } catch (err: unknown) {
      // Check if err is an instance of Error and has a message property
      if (err instanceof Error) {
        setError(err.message || "An error occurred. Please try again later.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
