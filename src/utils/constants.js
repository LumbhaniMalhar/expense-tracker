import {
  Dashboard as DashboardIcon,
  ViewList as ViewExpensesIcon,
  AddCircleOutline as AddExpenseIcon,
} from '@mui/icons-material';

export const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'View Expenses', icon: ViewExpensesIcon, path: '/view-expenses' },
  { text: 'Add Expense', icon: AddExpenseIcon, path: '/add-expenses' },
];

export const itemsPerPage = 10;

export const expenseCategories = [
  { category: 'Food & Drinks', color: '#FF5733' }, // Red-Orange
  { category: 'Transport', color: '#4285F4' },     // Blue
  { category: 'Entertainment', color: '#FFC300' }, // Yellow
  { category: 'Health', color: '#FF8C00' },        // Dark Orange
  { category: 'Shopping', color: '#E91E63' },      // Pink
  { category: 'Utilities', color: '#4CAF50' },     // Green
  { category: 'Subscriptions', color: '#9C27B0' }, // Purple
  { category: 'Household Supplies', color: '#FF9800' }, // Orange
  { category: 'Education', color: '#673AB7' },     // Deep Purple
  { category: 'Fitness', color: '#009688' },       // Teal
  { category: 'Insurance', color: '#795548' },     // Brown
  { category: 'Investments', color: '#3F51B5' },   // Indigo
  { category: 'Donations', color: '#F44336' },     // Red
  { category: 'Pets', color: '#00BCD4' },          // Cyan
  { category: 'General', color: '#9E9E9E' },       // Gray
];

export const incomeCategories = [
  { category: 'Salary', color: '#4CAF50' },        // Green
  { category: 'Freelance', color: '#FF5722' },     // Deep Orange
  { category: 'Investments', color: '#3F51B5' },   // Indigo
  { category: 'Other', color: '#9E9E9E' },         // Gray
  { category: 'Pension', color: '#673AB7' },       // Deep Purple
  { category: 'Tax Refund', color: '#8BC34A' },    // Light Green
  { category: 'Business', color: '#2196F3' },      // Blue
  { category: 'Bonuses', color: '#FFC107' },       // Amber
];

export const validateForm = (expense, setErrors) => {
  const newErrors = {};
  if (!expense.description.trim()) newErrors.description = 'Description is required';
  if (!expense.amount) newErrors.amount = 'Amount is required';
  if (!expense.category) newErrors.category = 'Category is required';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const commonDescriptions = [
  'Games', 'Movies', 'Music', 'Sports', 'Restaurant', 'Groceries', 'Liquor', 'Furniture',
  'Mortgage', 'Rent', 'Car Payment', 'Gas', 'Utilities', 'Phone Bill',
  'Internet', 'Coffee', 'Gym Membership', 'Shopping', 'Public Transport',
  'Medical Expenses', 'Salary', 'Freelance Work', 'Bus', 'Uber', 'Lyft', 'Wifi',
  'Electricity', 'Water', 'Gas Bill', 'Netflix', 'Spotify', 'Apple Music', 'Disney+', 'Youtube',
  'Dominos', 'McDonalds', 'Burger King', 'Subway', 'KFC', 'Pizza Hut', 'Wendys',
  'IKEA', 'Ashley Furniture', 'Rooms To Go', 'Wayfair', 'Best Buy', 'Target', 'Walmart',
  'Amazon', 'Ebay', 'Etsy', 'AliExpress', 'Alibaba', 'Dollar Tree', 'Dollar General',
  'Tissue Paper', 'Toilet Paper', 'Paper Towels', 'Paper Plates', 'Paper Cups', 'Paper Bags',
  'Milk', 'Eggs', 'Bread', 'Butter', 'Cheese', 'Yogurt', 'Cereal', 'Oatmeal', 'Granola',
  'Bananas', 'Apples', 'Oranges', 'Grapes', 'Strawberries', 'Blueberries', 'Raspberries',
  'Tomatoes', 'Lettuce', 'Spinach', 'Kale', 'Carrots', 'Broccoli', 'Cauliflower', 'Cucumbers',
  'Pizza', 'Pasta', 'Rice', 'Beans', 'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Crab',
  'Lobster', 'Scallops', 'Mussels', 'Clams', 'Oysters', 'Squid', 'Octopus', 'Calamari',
  'Movies', 'Standup comic', 'Concert', 'Theater', 'Musical', 'Opera', 'Ballet', 'Circus',
  'Football', 'Basketball', 'Baseball', 'Soccer', 'Hockey', 'Tennis', 'Golf', 'Bowling',
];