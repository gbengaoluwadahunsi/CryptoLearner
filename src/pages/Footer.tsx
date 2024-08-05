import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900  h-full lg:h-40 py-12 mt-20 text-white  ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Brand/Logo */}
        <NavLink to="/">
          <h2 className="font-extrabold text-2xl p-2">
            Crypto<span className="text-amber-500">Learner</span>
          </h2>
        </NavLink>

        {/* Navigation Links */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 md:py-0 text-lg font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-amber-500" : "hover:text-amber-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/todo"
            className={({ isActive }) =>
              isActive ? "text-amber-500" : "hover:text-amber-500"
            }
          >
            ToDo
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              isActive ? "text-amber-500" : "hover:text-amber-500"
            }
          >
            Learn
          </NavLink>
          <NavLink
            to="/market-news"
            className={({ isActive }) =>
              isActive ? "text-amber-500" : "hover:text-amber-500"
            }
          >
            Market-News
          </NavLink>
        </nav>

        {/* Contact/CTA */}
        <NavLink
          to="/contact"
          className="py-1 px-6  bg-black text-amber-500 shadow-lg shadow-amber-600 rounded-full hover:bg-gray-800 transition-colors"
        >
          Contact Us
        </NavLink>
      </div>

      {/* Bottom Bar */}
      <div className=" py-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CryptoLearner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
