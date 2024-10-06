import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ViewExpenses from '../components/ViewExpenses';

const mainRoutes = [
  {
    path: '/',
    component: <Dashboard />,
  },
  {
    path: '/view-expenses',
    component: <ViewExpenses />,
  },
  {
    path: '/add-expenses',
    component: <ExpenseForm />,
  },
];

export default mainRoutes;
