import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, Grid, Select, MenuItem, useTheme } from '@mui/material';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { AttachMoney, CreditCard, AccountBalance } from '@mui/icons-material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard = () => {
  const theme = useTheme();
  const expenses = useSelector((state) => state.expenses.expenses);
  const [timeframe, setTimeframe] = useState('month');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      const now = new Date();

      const filtered = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        switch (timeframe) {
          case 'today':
            return expenseDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            return expenseDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
            return expenseDate >= monthAgo;
          default:
            return true;
        }
      });

      const income = filtered.reduce((sum, exp) => exp.expenseType === 'Income' ? sum + exp.amount : sum, 0);
      const expensesTotal = filtered.reduce((sum, exp) => exp.expenseType === 'Expense' ? sum + exp.amount : sum, 0);
      const balance = income - expensesTotal;

      setFilteredExpenses(filtered);
      setTotalIncome(income);
      setTotalExpenses(expensesTotal);
      setTotalBalance(balance);
    };

    calculateTotals();
  }, [expenses, timeframe]);

  const pieChartData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Health', 'Other'],
    datasets: [{
      data: [
        filteredExpenses.filter(exp => exp.category === 'Food' && exp.expenseType === 'Expense').reduce((sum, exp) => sum + exp.amount, 0),
        filteredExpenses.filter(exp => exp.category === 'Transport' && exp.expenseType === 'Expense').reduce((sum, exp) => sum + exp.amount, 0),
        filteredExpenses.filter(exp => exp.category === 'Entertainment' && exp.expenseType === 'Expense').reduce((sum, exp) => sum + exp.amount, 0),
        filteredExpenses.filter(exp => exp.category === 'Health' && exp.expenseType === 'Expense').reduce((sum, exp) => sum + exp.amount, 0),
        filteredExpenses.filter(exp => exp.category === 'Other' && exp.expenseType === 'Expense').reduce((sum, exp) => sum + exp.amount, 0),
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }],
  };

  const lineChartData = {
    labels: filteredExpenses.filter(exp => exp.expenseType === 'Expense').map(exp => new Date(exp.date).toLocaleDateString()),
    datasets: [{
      label: 'Expenses',
      data: filteredExpenses.filter(exp => exp.expenseType === 'Expense').map(exp => exp.amount),
      borderColor: theme.palette.primary.main,
      tension: 0.1,
    }],
  };

  const barChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      label: 'Amount',
      data: [totalIncome, totalExpenses],
      backgroundColor: [theme.palette.success.main, theme.palette.error.main],
    }],
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">Last 7 Days</MenuItem>
          <MenuItem value="month">Last 30 Days</MenuItem>
          <MenuItem value="all">All Time</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ fontSize: 40, color: theme.palette.success.main, mr: 2 }} />
              <Box>
                <Typography variant="h6" component="div">Income</Typography>
                <Typography variant="h4" component="div">${totalIncome.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <CreditCard sx={{ fontSize: 40, color: theme.palette.error.main, mr: 2 }} />
              <Box>
                <Typography variant="h6" component="div">Expenses</Typography>
                <Typography variant="h4" component="div">${totalExpenses.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalance sx={{ fontSize: 40, color: totalBalance >= 0 ? theme.palette.success.main : theme.palette.error.main, mr: 2 }} />
              <Box>
                <Typography variant="h6" component="div">Total Balance</Typography>
                <Typography variant="h4" component="div" color={totalBalance >= 0 ? 'success.main' : 'error.main'}>
                  ${Math.abs(totalBalance).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>Expenses by Category</Typography>
              <Pie data={pieChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>Expense Trend</Typography>
              <Line data={lineChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>Income vs Expenses</Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;