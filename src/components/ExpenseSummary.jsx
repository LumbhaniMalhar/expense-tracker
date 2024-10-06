import React from 'react';
import { useSelector } from 'react-redux';

const ExpenseSummary = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <h2>Total Expenses: ${total}</h2>
    </div>
  );
};

export default ExpenseSummary;
