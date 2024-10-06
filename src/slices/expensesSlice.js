import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadExpensesFromLocalStorage, saveExpenseToLocalStorage } from '../utils/localStorage';

// Thunk action creators
export const addExpenseAsync = createAsyncThunk(
  'expenses/addExpense',
  async (expense, { dispatch }) => {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const newExpense = { ...expense, id: Date.now() };
    saveExpenseToLocalStorage([...loadExpensesFromLocalStorage(), newExpense]);
    return newExpense;
  }
);

export const editExpenseAsync = createAsyncThunk(
  'expenses/editExpense',
  async ({ id, updatedExpense }, { getState }) => {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const state = getState();
    const updatedExpenses = state.expenses.expenses.map(exp =>
      exp.id === id ? updatedExpense : exp
    );
    saveExpenseToLocalStorage(updatedExpenses);
    return { id, updatedExpense };
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/deleteExpense',
  async (id, { getState }) => {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const state = getState();
    const updatedExpenses = state.expenses.expenses.filter(exp => exp.id !== id);
    saveExpenseToLocalStorage(updatedExpenses);
    return id;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: loadExpensesFromLocalStorage(),
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addExpenseAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses.push(action.payload);
      })
      .addCase(addExpenseAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editExpenseAsync.fulfilled, (state, action) => {
        const { id, updatedExpense } = action.payload;
        const index = state.expenses.findIndex(exp => exp.id === id);
        if (index !== -1) {
          state.expenses[index] = updatedExpense;
        }
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
      });
  },
});

export default expensesSlice.reducer;