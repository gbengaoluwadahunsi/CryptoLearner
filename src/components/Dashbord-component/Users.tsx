// components/Users.js
import React from 'react';

const Users = () => {
  // Mock data, replace with API call data
  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com' },
    { id: 2, username: 'jane_doe', email: 'jane@example.com' },
    // More users...
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between py-2">
            <span>{user.username} ({user.email})</span>
            <button className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
