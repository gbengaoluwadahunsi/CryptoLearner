import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

interface FormData {
  username?: string; // Optional if not in use
  email: string;
  password: string;
  confirmPassword?: string; // Optional if not in use
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleAuthMode = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const dataToSend = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

    axios
      .post(`https://cryptolearner-server.onrender.com/auth/${isLogin ? "signin" : "signup"}`, dataToSend)
      .then((res) => {
        if (res.status === 200 && isLogin) {
          alert("Login Successful!");
          setIsAuthenticated(true);
          
          // Check if the user is an admin
          axios.post('https://cryptolearner-server.onrender.com/admin/emails', { email: formData.email })
            .then((response) => {
              const { isAdmin } = response.data;
              setIsAdmin(isAdmin);
              navigate("/");
            })
            .catch((adminCheckError) => {
              console.error("Admin check failed:", adminCheckError);
              setIsAdmin(false);
            });
        } else if (res.status === 201 && !isLogin) {
          alert("Sign Up Successful!");
          setIsLogin(true);
        }
      })
      .catch((e) => {
        console.error(e.message);
        // Display error message based on response
        if (e.response && e.response.data && e.response.data.error) {
          // Directly set the error message from the response
          setError(e.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
      }).finally(() => {
        setIsSubmitting(false);
        })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className=" text-center text-white text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {isLogin ? (
          //Login form
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                className="w-full p-3 text-gray-900 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                autoComplete="email"
                required
                value={formData.email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-white text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                className="w-full p-3 text-gray-900 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                id="password"
                name="password"
                type="password"
                placeholder="******"
                onChange={handleChange}
                 autoComplete="password"
                required
                value={formData.password}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              
       
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? "Logging in..." : "Login"
                
              }
            </button>
            <Link  to = "/forgot-password" className="text-indigo-500 text-md hover:underline-offset-1 cursor-pointer "> Forgot Password?</Link>
            <div className="my-4 flex gap-2">
              <h3>Not Registered? </h3>
              <span
                onClick={toggleAuthMode}
                className=" text-indigo-500 font-semibold hover:underline-offset-1 cursor-pointer"
              >
                Sign Up
              </span>
            </div>
          </form>
        ) : (
          //Sign-up form
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-white text-sm font-bold mb-2 "
              >
                Username
              </label>
              <input
                className="w-full p-3 text-gray-900 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                onChange={handleChange}
                required
                value={formData.username}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-3 text-gray-900 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                value={formData.email}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full p-3 text-gray-900 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                id="password"
                name="password"
                type="password"
                placeholder="******"
                onChange={handleChange}
                pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}"
                title="Password must be at least 6 characters long, contain at least one uppercase letter and one special character."
                required
                value={formData.password}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full p-3 text-gray-900 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="******"
                pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}"
                title="Password must be at least 6 characters long, contain at least one uppercase letter and one special character."
                onChange={handleChange}
                required
                value={formData.confirmPassword}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
                
              
            </button>
            <div className="my-4 flex gap-2">
              <h3>Already Registered? </h3>
              <span
                onClick={toggleAuthMode}
                className=" text-indigo-500 font-semibold hover:underline-offset-1 cursor-pointer"
              >
                Login
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
