import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAuth } from "../context/AuthContext";



const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setIsAdmin } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/');
  }
  return (
    <header className="flex justify-between  w-full items-center   h-20 p-4 lg:px-8 ">
      <NavLink to="/">
        <h2 className="font-extrabold text-2xl 0 p-2 ">Crypto<span className="text-amber-500">Learner</span></h2>
      </NavLink>
      <nav className=" basis-[60%]  justify-end items-center flex text-lg gap-8 font-bold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""

          }
        >
          Home
        </NavLink>
        <NavLink
          to="/todo"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""
          }
        >
          ToDo
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""
          }
        >
          Learn
        </NavLink>
        <NavLink
          to="/market-news"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : ""
          }
        >
          Market-News
        </NavLink>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
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
