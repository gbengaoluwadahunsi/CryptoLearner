import axios from 'axios';


const API_URL = 'https://cryptolearner-server.onrender.com/todos'; // Replace with your actual API endpoint


export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (newTodo: { text: string; date: string ,is_completed: boolean}) => {
  try {
    const response = await axios.post(API_URL, newTodo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id: string, updatedTodo: { text: string; date: string, is_completed : boolean }) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

