import React from 'react';
import { Box, Typography, Paper, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { expenseCategories, incomeCategories } from '../../utils/constants';

const MobileExpenseCard = ({ expense, handleEditExpense, handleDeleteExpense }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{expense.description}</Typography>
        <Box>
          <IconButton size="small" color='primary' onClick={() => handleEditExpense(expense)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color='default' onClick={() => handleDeleteExpense(expense.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Chip
          label={expense.category}
          size="small"
          sx={{ backgroundColor: [...expenseCategories, ...incomeCategories]?.find(c => c?.category === expense?.category)?.color || 'pink' }}
        />
        <Typography
          color={expense.expenseType === 'Expense' ? 'error' : 'success'}
          fontWeight="bold"
        >
          ${expense.amount}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {expense.date}
      </Typography>
    </Paper>
  </motion.div>
);

export default MobileExpenseCard;
