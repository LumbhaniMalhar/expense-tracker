export const loadExpensesFromLocalStorage = () => {
  try {
    const expenseState = localStorage.getItem('expenses');
    return expenseState ? JSON.parse(expenseState) : [];
  } catch (e) {
    console.warn('Failed to load expenses from local storage:', e);
    return [];
  }
};

export const saveExpenseToLocalStorage = (expense) => {
  try {
    const expenseState = JSON.stringify(expense);
    localStorage.setItem('expenses', expenseState);
  } catch (e) {
    console.warn('Failed to save expenses to local storage:', e);
  }
};
