import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import {
  fetchTodosThunk,
  createTodoThunk,
  updateTodoThunk,
  deleteTodoThunk,
} from '../redux/actions/todo/todoSlice';
import TodoHero from './ToDoHero/TodoHero';


interface Todo {
  _id: string;
  text: string;
  date: string;
  is_completed: boolean;
}

const TodoForm: React.FC<Todo>= () => {
  const [newTodo, setNewTodo] = useState('');
  const [newDate, setNewDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editId) {
      if (!newTodo) {
        alert('Please fill out both the todo text and date.');
        return;
      }
      dispatch(updateTodoThunk({ id: editId, text: newTodo, date: newDate, is_completed: completed }));
      setEditId(null);
    } else {
      if (!newTodo || !newDate) {
        alert('Please fill out both the todo text and date.');
        return;
      }
      dispatch(createTodoThunk({ text: newTodo, date: newDate, is_completed: completed }));
    }
    setNewTodo('');
    setNewDate('');
  };

  const handleDelete = (id: string) => {
    alert("You are about to John Wick this list");
    dispatch(deleteTodoThunk(id));
  };

  const handleEdit = (id: string, text: string, date: string, is_completed: boolean) => {
    setEditId(id);
    setNewTodo(text);
    setNewDate(date);
    setCompleted(is_completed);
  };

  const handleToggleComplete = (todo: Todo) => {
    dispatch(updateTodoThunk({
      id: todo._id,
      text: todo.text,
      date: todo.date,
      is_completed: !todo.is_completed
      

    }))
  }

  return (
    <section className='flex flex-col gap-4'>
      <TodoHero todo_completed={todos.filter(todo => todo.is_completed).length} todos={todos} />
      <form onSubmit={handleSubmit} className='flex gap-4 justify-center items-center'>
        <label htmlFor="todotext">
          <input
            type="text"
            name="todotext"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            id="todo"
            placeholder="Write down your plan...."
            className='bg-slate-800 py-2 rounded text-white px-4 placeholder-white'
          />
        </label>

        <label htmlFor="date">
          <input
            type="date"
            name="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            id="date"
            className='bg-slate-800 py-2 rounded text-white px-4 placeholder-white'
          />
        </label>
        <button type="submit" className={`rounded-lg px-4 py-2 ${editId ? "bg-green-300" : "bg-green-600"}`}>
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div className='pt-4 '>
        <ul>
          {todos && todos.length > 0 ? (todos.map((todo) => (
            <li key={todo._id} className='p-2 flex my-3 justify-between items-center text border-2 border-green-200 gap-4'>
              <span
                className={`w-6 h-6 border-4 p-1 rounded-full  border-green-500 cursor-pointer ${todo.is_completed ? 'bg-green-500' : ''}`}
                onClick={() => handleToggleComplete(todo)}
              ></span>
              <span className='basis-[56%]'>{todo.text}</span>
              <span className='text-amber-300 font-semibold'>{todo.date}</span>
              <div className='flex gap-1'>
                <button className='py-2 rounded-lg' onClick={() => handleEdit(todo._id, todo.text, todo.date, todo.is_completed)}><FaEdit /></button>
                <button onClick={() => handleDelete(todo._id)}><AiTwotoneDelete /></button>
              </div>
            </li>
          ))) : (<p className='font-bold text-lg'>Seems lonely in here, what are you up to?</p>)}
        </ul>
      </div>
    </section>
  );
};

export default TodoForm;
