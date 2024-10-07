import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewExpenses from '../components/view-expenses/ViewExpenses';

// Mock the Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

// Mock the framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>,
    tr: ({ children, ...props }) => <tr data-testid="motion-tr" {...props}>{children}</tr>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock Material-UI's useMediaQuery
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => false,
}));

// Mock the snackbar hook
jest.mock('../hooks/useSnackBar', () => ({
  useSnackBar: () => ({
    showSnackbar: jest.fn(),
  }),
}));

describe('ViewExpenses Component', () => {
  const mockExpenses = [
    { id: 1, description: 'Groceries', amount: 50, date: '2024-10-01', expenseType: 'Expense', category: 'Food' },
    { id: 2, description: 'Salary', amount: 1000, date: '2024-10-02', expenseType: 'Income', category: 'Salary' },
    { id: 3, description: 'Rent', amount: 500, date: '2024-10-03', expenseType: 'Expense', category: 'Housing' },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the useSelector hook to return our mock expenses
    require('react-redux').useSelector.mockImplementation(selector =>
      selector({
        expenses: {
          expenses: mockExpenses
        }
      })
    );
  });

  test('displays correct amounts for expenses and income', () => {
    render(<ViewExpenses />);

    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });
});