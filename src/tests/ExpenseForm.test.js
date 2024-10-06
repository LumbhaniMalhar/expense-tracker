import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ExpenseForm from '../components/ExpenseForm';
import expensesReducer from '../slices/expensesSlice';

// Create a real store for testing
const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

// Mock the snackbar hook
jest.mock('../hooks/useSnackBar', () => ({
  useSnackBar: () => ({
    showSnackbar: jest.fn(),
  }),
}));

describe('ExpenseForm Component', () => {
  test('renders ExpenseForm component', () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    // Check if the form title is rendered
    expect(screen.getByText(/Add New Expense/i)).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument();
  });
});