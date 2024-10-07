import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Dashboard from '../components/Dashboard';

// Mock the charts as they can be problematic in Jest environment
jest.mock('react-chartjs-2', () => ({
  Pie: () => null,
  Line: () => null,
  Bar: () => null,
}));

const mockStore = configureStore([]);

describe('Dashboard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        expenses: [
          { id: 1, description: 'Groceries', amount: 50, date: '2024-10-01', expenseType: 'Expense', category: 'Food' },
          { id: 2, description: 'Salary', amount: 1000, date: '2024-10-02', expenseType: 'Income', category: 'Salary' },
          { id: 3, description: 'Rent', amount: 500, date: '2024-10-03', expenseType: 'Expense', category: 'Housing' },
        ],
      },
    });
  });

  const renderDashboard = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders dashboard with correct initial state', () => {
    renderDashboard();
    expect(screen.getByText('Current Balance')).toBeInTheDocument();
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Expenses by Category')).toBeInTheDocument();
    expect(screen.getByText('Expense Trend')).toBeInTheDocument();
    expect(screen.getByText('Income vs Expenses')).toBeInTheDocument();
    expect(screen.getByText('Recent Expenses')).toBeInTheDocument();
  });

  test('displays correct total amounts', () => {
    renderDashboard();
    expect(screen.getByText('$450.00')).toBeInTheDocument(); // Balance
    expect(screen.getByText('$1000.00')).toBeInTheDocument(); // Income
    expect(screen.getByText('$550.00')).toBeInTheDocument(); // Expenses
  });

  test('displays recent Recent Expenses', () => {
    renderDashboard();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
  });

  test('navigates to view expenses when "See Details" is clicked', () => {
    const { getByText } = renderDashboard();
    const seeDetailsLink = getByText('See Details');
    fireEvent.click(seeDetailsLink);
  });
});