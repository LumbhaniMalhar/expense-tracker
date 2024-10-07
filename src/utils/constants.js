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
  { category: 'Food & Drinks', color: '#FFD1DC' },  // Light Pink
  { category: 'Transport', color: '#AEC6CF' },      // Light Blue
  { category: 'Entertainment', color: '#FFE5B4' },  // Light Peach
  { category: 'Health', color: '#E0FFFF' },         // Light Cyan
  { category: 'Shopping', color: '#FFC0CB' },       // Pink
  { category: 'Utilities', color: '#F7B48F' },      // Pale red
  { category: 'Subscriptions', color: '#DDA0DD' },  // Plum
  { category: 'Household Supplies', color: '#FFDAB9' }, // Peach Puff
  { category: 'Education', color: '#E6E6FA' },      // Lavender
  { category: 'Fitness', color: '#AFEEEE' },        // Pale Turquoise
  { category: 'Insurance', color: '#F0E68C' },      // Khaki
  { category: 'Investments', color: '#B0E0E6' },    // Powder Blue
  { category: 'Donations', color: '#FFA07A' },      // Light Salmon
  { category: 'Pets', color: '#98FF98' },           // Mint Green
  { category: 'General', color: '#D3D3D3' },        // Light Gray
];

export const incomeCategories = [
  { category: 'Salary', color: '#90EE90' },         // Light Green
  { category: 'Freelance', color: '#FFB6C1' },      // Light Pink
  { category: 'Investments', color: '#ADD8E6' },    // Light Blue
  { category: 'Other', color: '#F0F0F0' },          // Light Gray
  { category: 'Pension', color: '#E6E6FA' },        // Lavender
  { category: 'Tax Refund', color: '#98FB98' },     // Pale Green
  { category: 'Business', color: '#87CEFA' },       // Light Sky Blue
  { category: 'Bonuses', color: '#FAFAD2' },        // Light Goldenrod Yellow
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