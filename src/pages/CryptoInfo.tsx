import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useAuth } from "../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";
import { HiMiniNewspaper } from "react-icons/hi2";
import Footer from "./Footer";
import CryptoInfoDashboard from "./LearnerComponent/CryptoInfoDashboard";
import Currencies from "./Dashboard/Currencies";
import { News } from "./Dashboard/News";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const { isAuthenticated, setIsAuthenticated, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "currencies":
        return <CryptocurrenciesContent />;
     
      case "news":
        return <NewsContent />;
      case "dashboard":
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex  flex-col lg:flex-row min-h-screen relative  ">
      <div className=" lg:w-64 lg:fixed lg:min-h-screen  bg-gray-900 px-4 py-6 lg:border-r-4  lg:border-r-black lg:overflow-y-auto">
        <div className="flex items-center justify-between">
        <NavLink to="/">
          <h2 className="font-extrabold lg:text-2xl  p-2 ">
            Crypto<span className="text-amber-500">Learner</span>
          </h2>
        </NavLink>
        <div className=" flex lg:hidden gap-6 items-center  mx-4  px-2 py-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
        </div>
        </div>
      
        
        <div className="flex lg:flex-col mt-4 flex-wrap  gap-2 lg:gap-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-2 px-2 mb-2 text-left flex gap-1 items-center ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-400 hover:text-white rounded`}
          >
            <MdDashboard color="black" />
            <span> Dashboard </span>
          </button>
          <button
            onClick={() => setActiveTab("currencies")}
            className={`py-2 px-2 mb-2 text-left flex gap-1 items-center ${
              activeTab === "currencies"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-400 hover:text-white rounded`}
          >
            <SiBlockchaindotcom color="black" />
            <span>Cryptocurrencies </span>
          </button>
         
          <button
            onClick={() => setActiveTab("news")}
            className={`py-2 px-2 mb-2 text-left flex gap-1 items-center ${
              activeTab === "news"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-400 hover:text-white rounded`}
          >
            <HiMiniNewspaper color="black" />
            <span>News</span>
          </button>
        </div>
        <div className=" hidden lg:flex  justify-between items-center  mx-4 absolute bottom-12 left-0 right-0 px-2 py-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
        </div>
      </div>
      <div className=" flex-grow flex flex-col  bg-gray-800 lg:ml-64 ">
        <div className="p-8  ">{renderContent()}</div>

        <Footer />
      </div>
    </div>
  );
};

const DashboardContent = () => <CryptoInfoDashboard />;
const CryptocurrenciesContent = () => <Currencies/>;
const NewsContent = () => <News/>;


export default Dashboard;
