import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer: React.FC = () => {
  const { isAdmin } = useAuth();


  // Helper function to generate nav link classes
  const getNavLinkClass = (isActive: boolean) =>
    isActive ? 'text-amber-500' : 'hover:text-amber-500';

  return (
    <footer className="bg-gray-900 h-full lg:h-40 py-12 text-white">
      <div className="container sm:mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Brand/Logo */}
        <NavLink to="/">
          <h2 className="font-extrabold text-2xl p-2">
            Crypto<span className="text-amber-500">Learner</span>
          </h2>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-12 lg:gap-6 justify-center items-center py-10 md:py-0 text-lg font-bold">
          <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/todo" className={({ isActive }) => getNavLinkClass(isActive)}>
            ToDo
          </NavLink>
          <NavLink to="/learn" className={({ isActive }) => getNavLinkClass(isActive)}>
            Learn
          </NavLink>
          <NavLink to="/market-news" className={({ isActive }) => getNavLinkClass(isActive)}>
            Market-News
          </NavLink>

          {isAdmin && (
            <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <NavLink
          to="/contact"
          className="py-1 px-6 bg-black text-amber-500 shadow-lg shadow-amber-600 rounded-full hover:shadow-md transition-colors"
        >
          Contact Us
        </NavLink>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CryptoLearner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
