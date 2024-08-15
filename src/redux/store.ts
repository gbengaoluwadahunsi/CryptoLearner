import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/actions/todo/todoSlice';
import { cryptoApi } from '../api/CryptoApi';
import { cryptoNewsApi } from '@/api/CryptoNewsApi';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
