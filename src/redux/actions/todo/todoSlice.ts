import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../../api';

interface Todo {
  _id: string;
  text: string;
  date: string;
  is_completed: boolean
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTodosThunk = createAsyncThunk<Todo[]>(
  'todos/fetchTodos',
  async () => {
    const todos = await fetchTodos();
    return todos;
  }
);

export const createTodoThunk = createAsyncThunk<Todo, { text: string; date: string ; is_completed:boolean}>(
  'todos/createTodo',
  async ({ text, date, is_completed }) => {
    const todo = await createTodo({ text, date, is_completed });
    return todo;
  }
);

export const updateTodoThunk = createAsyncThunk<Todo, { id: string; text: string; date: string ; is_completed : boolean}>(
  'todos/updateTodo',
  async ({ id, text, date, is_completed }) => {
    const updatedTodo = await updateTodo(id, { text, date , is_completed});
    return updatedTodo;
  }
);

export const deleteTodoThunk = createAsyncThunk<string, string>(
  'todos/deleteTodo',
  async (id) => {
    await deleteTodo(id);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.unshift(action.payload);
      })
      .addCase(updateTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export const { resetError } = todoSlice.actions;
export default todoSlice.reducer;
