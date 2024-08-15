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
    <section className="border-2 border-green-200 h-20 lg:h-40 rounded-lg   justify-between px-2 lg:justify-around items-center flex">
      <div>
        <p className="text-xl font-semibold">Task Done</p>
        <p className="text-xl font-semibold">Keep it up</p>
      </div>
      <div className=" p-6 lg:w-32 lg:h-32 rounded-full flex justify-center text-xl lg:text-3xl font-bold items-center text-slate-800 bg-green-500">
        {todo_completed}/{todos_total}
      </div>
    </section>
  );
};

export default TodoHero;
