import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useSnackBar } from '../../hooks/useSnackBar';

const DeleteConfirmationDialog = ({ deleteConfirmation, confirmDelete, setDeleteConfirmation }) => {
  const { showSnackbar } = useSnackBar();
  const handleClose = () => {
    setDeleteConfirmation(null);
  };
  const handleConfirmDelete = () => {
    confirmDelete();
    handleClose();
    showSnackbar('Expense deleted successfully', 'error');
  };
  return (
    <Dialog open={!!deleteConfirmation} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this expense?</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  )
};

export default DeleteConfirmationDialog;
