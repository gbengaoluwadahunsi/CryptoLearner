// components/TodoManagement.js
import React from 'react';

const TodoManagement = () => {
  // Mock data, replace with actual tasks data
  const tasks = [
    { id: 1, task: 'Review user feedback', completed: false },
    { id: 2, task: 'Update learning module content', completed: true },
    // More tasks...
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">To-Do List Management</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between py-2">
            <span>{task.task}</span>
            <button className={task.completed ? 'text-green-500' : 'text-red-500'}>
              {task.completed ? 'Completed' : 'Incomplete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoManagement;
