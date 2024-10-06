import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button, TextField, MenuItem, ToggleButton, ToggleButtonGroup,
  Typography, Autocomplete, Box, Divider
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { addExpenseAsync } from '../slices/expensesSlice';
import { expenseCategories, incomeCategories, validateForm, commonDescriptions } from '../utils/constants';
import { useSnackBar } from '../hooks/useSnackBar';

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    expenseType: 'Expense',
    description: '',
    amount: '',
    category: '',
    date: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackBar();

  const handleChange = (value, type) => {
    setExpense((prev) => ({
      ...prev,
      [type]: value,
    }));
    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: '' }));
    }
  };

  const handleSubmit = () => {
    if (validateForm(expense, setErrors)) {
      const expenseData = {
        ...expense,
        amount: parseFloat(expense.amount),
        date: expense.date ? expense.date : new Date().toISOString().split('T')[0],
      };
      dispatch(addExpenseAsync(expenseData));
      setExpense({
        expenseType: 'Expense',
        description: '',
        amount: '',
        category: '',
        date: '',
      });
      showSnackbar('Expense added successfully!', 'success');
    } else {
      showSnackbar('Please fill in all required fields', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Grid container spacing={2.5} direction="column">
          <Grid item>
            <Typography variant="h5" gutterBottom color='primary' sx={{ fontWeight: 'bold' }}>
              Add New {expense.expenseType}
            </Typography>
          </Grid>

          <Grid item>
            <ToggleButtonGroup
              color='primary'
              value={expense.expenseType}
              exclusive
              onChange={(e, value) => value && setExpense({ ...expense, expenseType: value, category: '' })}
              aria-label="expense type"
              size="small"
            >
              <ToggleButton value="Expense">Expense</ToggleButton>
              <ToggleButton value="Income">Income</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" gutterBottom required>
              Amount <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            <TextField
              size="small"
              fullWidth
              type="number"
              value={expense.amount}
              onChange={(e) => handleChange(e.target.value, 'amount')}
              error={!!errors.amount}
              helperText={errors.amount}
              slotProps={{
                input: {
                  startAdornment: <Box sx={{ color: 'text.secondary', mr: 1 }}>$</Box>,
                }
              }}
            />
          </Grid>

          <Grid item>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" gutterBottom required>
              Category <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={expense.category}
              onChange={(e) => handleChange(e.target.value, 'category')}
              error={!!errors.category}
              helperText={errors.category}
            >
              {expense?.expenseType === 'Income' && incomeCategories.map((ic) => (
                <MenuItem key={ic.category} value={ic.category}>{ic.category}</MenuItem>
              ))}
              {expense?.expenseType === 'Expense' && expenseCategories.map((ec) => (
                <MenuItem key={ec.category} value={ec.category}>{ec.category}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" gutterBottom required>
              Description <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            <Autocomplete
              freeSolo
              options={commonDescriptions}
              value={expense.description}
              onChange={(_, newValue) => handleChange(newValue, 'description')}
              onInputChange={(_, newValue) => handleChange(newValue, 'description')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  error={!!errors.description}
                  helperText={errors.description}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" gutterBottom>
              Date
            </Typography>
            <TextField
              size="small"
              type="date"
              fullWidth
              value={expense.date}
              onChange={(e) => handleChange(e.target.value, 'date')}
              error={!!errors.date}
              helperText={errors.date}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          <Grid item>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSubmit}
              >
                Add {expense.expenseType}
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ExpenseForm;