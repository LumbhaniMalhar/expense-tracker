export const loadExpensesFromLocalStorage = () => {
  try {
    // Load expenses from local storage.
    const expenseState = localStorage.getItem('expenses');
    return expenseState ? JSON.parse(expenseState) : [];
  } catch (e) {
    console.warn('Failed to load expenses from local storage:', e);
    return [];
  }
};

export const saveExpenseToLocalStorage = (expense) => {
  try {
    // Save expenses to local storage.
    const expenseState = JSON.stringify(expense);
    localStorage.setItem('expenses', expenseState);
  } catch (e) {
    console.warn('Failed to save expenses to local storage:', e);
  }
};
