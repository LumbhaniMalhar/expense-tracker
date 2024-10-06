import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';  // Change this line
import expensesReducer from './slices/expensesSlice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;