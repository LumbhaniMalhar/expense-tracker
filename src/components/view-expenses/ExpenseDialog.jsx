import React from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Box } from '@mui/material';
import { expenseCategories, incomeCategories } from '../../utils/constants';
import { validateForm } from '../../utils/constants';
import { editExpenseAsync } from '../../slices/expensesSlice';
import { useSnackBar } from '../../hooks/useSnackBar';

const ExpenseDialog = ({ editingExpense, setEditingExpense, errors, setErrors }) => {

  const dispatch = useDispatch();
  const { showSnackbar } = useSnackBar();

  const handleClose = () => {
    setEditingExpense(null);
  };

  const handleSave = () => {
    if (editingExpense && validateForm(editingExpense, setErrors)) {
      dispatch(editExpenseAsync({
        id: editingExpense.id,
        updatedExpense: { ...editingExpense, date: editingExpense.date ? editingExpense.date : new Date().toISOString().split('T')[0], amount: parseFloat(editingExpense.amount) }
      }));
      handleClose();
      showSnackbar('Expense updated successfully');
    }
  };

  return (
    <Dialog open={!!editingExpense} onClose={handleClose} maxWidth="sm" fullWidth >
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            select
            label="Type"
            value={editingExpense?.expenseType || ''}
            onChange={(e) => setEditingExpense({ ...editingExpense, expenseType: e.target.value, category: '' })}
          >
            {['Expense', 'Income'].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField label="Description" value={editingExpense?.description || ''} onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })} fullWidth margin="normal" error={!!errors.description} helperText={errors.description} />
          <TextField select label="Category" value={editingExpense?.category || ''} onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })} fullWidth margin="normal" error={!!errors.category} helperText={errors.category}>
            {[...expenseCategories, ...incomeCategories].map((cat, idx) => (
              <MenuItem key={idx} value={cat.category}>{cat.category}</MenuItem>
            ))}
          </TextField>
          <TextField type="number" label="Amount" value={editingExpense?.amount || ''} onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })} fullWidth margin="normal" error={!!errors.amount} helperText={errors.amount} />
          <TextField type="date" label="Date" value={editingExpense?.date || ''} onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })} fullWidth margin="normal" error={!!errors.date} helperText={errors.date} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDialog;
