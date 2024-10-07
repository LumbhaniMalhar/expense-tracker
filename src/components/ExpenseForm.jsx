import React from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  Button, TextField, MenuItem, ToggleButton, ToggleButtonGroup,
  Typography, Autocomplete, Box, Divider
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { addExpenseAsync } from '../slices/expensesSlice';
import { expenseCategories, incomeCategories, commonDescriptions } from '../utils/constants';
import { useSnackBar } from '../hooks/useSnackBar';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackBar();
  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      expenseType: 'Expense',
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    }
  }); // Set default values for the form fields

  // Watch the expenseType field to dynamically change the category options
  const expenseType = watch('expenseType');

  const onSubmit = (data) => {
    const expenseData = {
      ...data,
      amount: parseFloat(data.amount),
      date: data.date ? data.date : new Date().toISOString().split('T')[0],
    };
    dispatch(addExpenseAsync(expenseData));
    reset();
    showSnackbar('Expense added successfully!', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5} direction="column">
            <Grid item>
              <Typography variant="h5" gutterBottom color='primary' sx={{ fontWeight: 'bold' }}>
                Add New {expenseType}
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                name="expenseType"
                control={control}
                render={({ field }) => (
                  <ToggleButtonGroup
                    {...field}
                    exclusive
                    onChange={(_, value) => {
                      if (value) {
                        field.onChange(value);
                        setValue('category', '');
                      }
                    }}
                    aria-label="expense type"
                    size="small"
                  >
                    <ToggleButton value="Expense">Expense</ToggleButton>
                    <ToggleButton value="Income">Income</ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" gutterBottom required>
                Amount <Box component="span" sx={{ color: 'error.main' }}>*</Box>
              </Typography>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: 'Amount is required',
                  validate: (value) => value > 0 || 'Amount must be greater than 0',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    type="number"
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(value >= 0 ? value : 0);
                    }}
                    slotProps={{
                      input: {
                        startAdornment: <Box sx={{ color: 'text.secondary', mr: 1 }}>$</Box>,
                        min: 0,
                        step: 0.01,
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Divider sx={{ my: 1 }} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" gutterBottom required>
                Category <Box component="span" sx={{ color: 'error.main' }}>*</Box>
              </Typography>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    size="small"
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  >
                    {expenseType === 'Income' && incomeCategories.map((ic) => (
                      <MenuItem key={ic.category} value={ic.category}>{ic.category}</MenuItem>
                    ))}
                    {expenseType === 'Expense' && expenseCategories.map((ec) => (
                      <MenuItem key={ec.category} value={ec.category}>{ec.category}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" gutterBottom required>
                Description <Box component="span" sx={{ color: 'error.main' }}>*</Box>
              </Typography>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    options={commonDescriptions}
                    onChange={(_, newInputValue) => field.onChange(newInputValue)}
                    onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" gutterBottom>
                Date
              </Typography>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    type="date"
                    fullWidth
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    slotProps={{
                      inputLabel: { shrink: true },
                      htmlInput: { max: new Date().toISOString().split('T')[0] },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                >
                  Add {expenseType}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </motion.div>
  );
};

export default ExpenseForm;