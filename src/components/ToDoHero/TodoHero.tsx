import React from "react";

interface Todo {
  _id: string;
  text: string;
  date: string;
  is_completed: boolean;
}

interface TodoProps {
  todo_completed: number;
  todos: Todo[]; // Correct type
}

const TodoHero: React.FC<TodoProps> = ({ todo_completed, todos }) => {
  const todos_total = todos.length;
  return (
    <section className="border-2 border-green-200 h-40 rounded-lg justify-around items-center flex">
      <div>
        <p className="text-xl font-semibold">Task Done</p>
        <p className="text-xl font-semibold">Keep it up</p>
      </div>
      <div className="w-32 h-32 rounded-full flex justify-center text-3xl font-bold items-center text-slate-800 bg-green-500">
        {todo_completed}/{todos_total}
      </div>
    </section>
  );
};

export default TodoHero;
