// pages/Dashboard.js
import React from 'react';
import Users from '../../components/Dashbord-component/Users';
import LearningModules from '../../components/Dashbord-component/LearningModules';
import TodoManagement from '../../components/Dashbord-component/TodoManagement';

const Dashboard = () => {
  return (
    <div className=" bg-gray-900 min-h-screen p-8 lg:px-16">
      <h1 className="text-3xl font-bold my-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 shadow rounded-lg">
          <Users />
        </div>
        
        <div className="bg-gray-800 p-4 shadow rounded-lg">
          <LearningModules />
        </div>
        <div className="bg-gray-800 p-4 shadow rounded-lg">
          <TodoManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
