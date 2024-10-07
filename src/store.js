import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';  // Change this line
import expensesReducer from './slices/expensesSlice';

// Create a Redux store instance.
const store = configureStore({
  reducer: {
    expenses: expensesReducer, // Add the expenses reducer.
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;