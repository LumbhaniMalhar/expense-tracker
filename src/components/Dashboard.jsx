import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Select, MenuItem, useTheme, List, ListItem, ListItemText, Link, useMediaQuery } from '@mui/material';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { AttachMoney, CreditCard, AccountBalance, ArrowForward } from '@mui/icons-material';
import NoExpenses from './NoExpenses';

// Register ChartJS elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const expenses = useSelector((state) => state.expenses.expenses);
  const [timeframe, setTimeframe] = useState('month');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // Calculate totals based on timeframe
  useEffect(() => {
    const calculateTotals = () => {
      const now = new Date();

      const filtered = expenses?.filter((expense) => {
        const expenseDate = new Date(expense?.date);
        switch (timeframe) {
          case 'today':
            const oneDayAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            return expenseDate >= oneDayAgo;
          case 'week':
            const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            return expenseDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return expenseDate >= monthAgo;
          default:
            return true;
        }
      });

      const income = filtered?.reduce((sum, exp) => exp?.expenseType === 'Income' ? sum + exp?.amount : sum, 0);
      const expensesTotal = filtered.reduce((sum, exp) => exp?.expenseType === 'Expense' ? sum + exp?.amount : sum, 0);
      const balance = expenses?.reduce((sum, exp) => exp?.expenseType === 'Income' ? sum + exp?.amount : sum, 0) - expenses?.reduce((sum, exp) => exp?.expenseType === 'Expense' ? sum + exp?.amount : sum, 0);

      setFilteredExpenses(filtered);
      setTotalIncome(income);
      setTotalExpenses(expensesTotal);
      setTotalBalance(balance);
    };

    calculateTotals();
  }, [expenses, timeframe]);

  const generatePieChartData = () => {
    const categories = [...new Set(filteredExpenses
      ?.filter(exp => exp?.expenseType === 'Expense')
      .map(exp => exp?.category))];

    const generateColor = () => {
      const minBrightness = 0x888888;
      const randomColor = Math.floor(Math.random() * (0xFFFFFF - minBrightness) + minBrightness);
      return '#' + randomColor.toString(16);
    };
    const colors = categories?.map(() => generateColor());

    const data = categories?.map(category =>
      filteredExpenses
        ?.filter(exp => exp?.category === category && exp?.expenseType === 'Expense')
        .reduce((sum, exp) => sum + exp.amount, 0)
    );

    return {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: colors,
      }],
    };
  };

  const pieChartData = generatePieChartData(filteredExpenses);

  const lineChartData = (() => {
    // Filter expenses and sort by date
    const sortedExpenses = filteredExpenses
      ?.filter(exp => exp?.expenseType === 'Expense')
      .sort((a, b) => new Date(a?.date) - new Date(b?.date));

    return {
      labels: sortedExpenses?.map(exp => new Date(exp?.date).toLocaleDateString()),
      datasets: [{
        label: 'Expenses',
        data: sortedExpenses.map(exp => exp?.amount),
        borderColor: theme.palette.primary.main,
        tension: 0.1,
      }],
    };
  })();

  const barChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      label: 'Amount',
      data: [totalIncome, totalExpenses],
      backgroundColor: [theme.palette.success.main, theme.palette.error.main],
    }],
  };

  const recentExpenses = expenses
    .filter(exp => exp?.expenseType === 'Expense')
    .sort((a, b) => new Date(b?.date) - new Date(a?.date))
    .slice(0, 5);

  const handleSeeDetails = () => {
    navigate('/view-expenses');
  };

  // If there are no expenses, show a message to add expenses
  if (!expenses?.length) {
    return <NoExpenses />;
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

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        <Card sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', md: 200 } }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#19346b', color: 'white' }}>
            <AccountBalance sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6" component="div">Current Balance</Typography>
              <Typography variant="h5" component="div">
                ${totalBalance?.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', md: 200 } }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ fontSize: 40, color: theme.palette.success.main, mr: 2 }} />
            <Box>
              <Typography variant="h6" component="div">Income</Typography>
              <Typography variant="h5" component="div">${totalIncome?.toFixed(2)}</Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', md: 200 } }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <CreditCard sx={{ fontSize: 40, color: theme.palette.error.main, mr: 2 }} />
            <Box>
              <Typography variant="h6" component="div">Expenses</Typography>
              <Typography variant="h5" component="div">${totalExpenses?.toFixed(2)}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {filteredExpenses.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Card sx={{
            flexGrow: 1,
            width: {
              xs: '100%',
              md: isLargeScreen ? 'calc(33.333% - 16px)' : 'calc(50% - 8px)',
              lg: 'calc(33.333% - 16px)'
            },
            maxWidth: { xs: '100%', md: isLargeScreen ? 'calc(33.333% - 16px)' : 'calc(50% - 8px)' },
            minHeight: 400
          }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>Expenses by Category</Typography>
              <Box sx={{ height: 350 }}>
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            flexGrow: 1,
            width: {
              xs: '100%',
              md: isLargeScreen ? 'calc(33.333% - 16px)' : 'calc(50% - 8px)',
              lg: 'calc(33.333% - 16px)'
            },
            maxWidth: { xs: '100%', md: isLargeScreen ? 'calc(33.333% - 16px)' : 'calc(50% - 8px)' }
          }}>
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>Expense Trend</Typography>
                <Box sx={{ height: 150 }}>
                  <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>Income vs Expenses</Typography>
                <Box sx={{ height: 150 }}>
                  <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Card sx={{
            flexGrow: 1,
            width: {
              xs: '100%',
              md: isLargeScreen ? 'calc(33.333% - 16px)' : '100%',
              lg: 'calc(33.333% - 16px)'
            },
            maxWidth: { xs: '100%', md: isLargeScreen ? 'calc(33.333% - 16px)' : '100%' },
            minHeight: 400
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="div">Recent Expenses</Typography>
                <Link
                  onClick={handleSeeDetails}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                  }}
                >
                  <Typography variant="body2" component="span" sx={{ mr: 0.5 }}>
                    See Details
                  </Typography>
                  <ArrowForward fontSize="small" />
                </Link>
              </Box>
              <List>
                {recentExpenses.map((expense) => (
                  <ListItem key={expense.id} divider>
                    <ListItemText
                      primary={expense.description}
                      secondary={new Date(expense.date).toLocaleDateString()}
                    />
                    <Typography variant="body2" color="error">
                      -${expense?.amount?.toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;