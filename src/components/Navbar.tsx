import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";



const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setIsAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node )) {
        closeNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between w-full items-center h-20 p-4 lg:px-8">
      <NavLink to="/">
        <h2 className="font-extrabold text-2xl p-2">
          Crypto<span className="text-amber-500">Learner</span>
        </h2>
      </NavLink>
      <nav
        className="cursor-pointer lg:hidden text-3xl"
        onClick={toggleNav}
      >
        {isOpen ? <FaTimes /> : <HiOutlineMenuAlt2 />}
      </nav>
      <nav
        ref={navRef}
        className={`nav-mobile lg:basis-[60%] flex justify-start lg:justify-end items-start lg:items-center py-24 px-32 lg:p-0 top-20 lg:top-0 left-0 flex-col lg:flex-row text-lg gap-8  bg-slate-600 lg:bg-transparent lg:gap-8 font-semibold lg:font-bold ${
          isOpen ? "block" : "hidden"
        } lg:flex`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""
          }
          onClick={closeNav}
        >
          Home
        </NavLink>
        <NavLink
          to="/todo"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""
          }
          onClick={closeNav}
        >
          ToDo
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""
          }
          onClick={closeNav}
        >
          CryptoInfo
        </NavLink>

        {isAuthenticated ? (
          <button
            onClick={() => {
              handleLogout();
              closeNav();
            }}
            className="py-1 px-6 shadow-lg bg-black shadow-amber-600 rounded-full"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 py-1 px-6 shadow-sm bg-black shadow-amber-600 rounded-full"
                : "py-1 px-6 shadow-lg bg-black shadow-amber-600 rounded-full"
            }
            onClick={closeNav}
          >
            <button className="">Login</button>
          </NavLink>
        )}

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
};

export default Navbar;
