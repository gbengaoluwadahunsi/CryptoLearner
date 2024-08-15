
import  TodoList from '../components/TodoList'
import  todo from '../../src/assets/images/tailwind.webp'

const Todo = () => {
  return (
    <div className='min-h-screen  bg-slate-700  flex justify-around items-center p-4 lg:px-8'>
      <div className='shadow-lg shadow-gray-800 hidden lg:block'>
        <img src={todo} alt="todo list" className='rounded-lg shadow-md  size-80' />
      </div>

     <div className='h-full flex flex-col gap-6'>
     <h1 className=' text-xl lg:text-5xl font-extrabold  w-fit'>Learning To Do List</h1>
     
     
     <TodoList _id={''} text={''} date={''} is_completed={false}   />
     </div>
    </div>
  )
}

export default Todo

