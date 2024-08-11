// components/LearningModules.js
import React from 'react';

const LearningModules = () => {
  // Mock data, replace with actual module data
  const modules = [
    { id: 1, title: 'Introduction to Cryptocurrency', progress: 80 },
    { id: 2, title: 'Advanced Blockchain Concepts', progress: 45 },
    // More modules...
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Learning Modules</h2>
      <ul>
        {modules.map((module) => (
          <li key={module.id} className="flex justify-between py-2">
            <span>{module.title}</span>
            <span>{module.progress}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningModules;
