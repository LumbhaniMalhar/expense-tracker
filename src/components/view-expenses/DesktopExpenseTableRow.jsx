import React from 'react';
import { TableCell, TableRow, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { expenseCategories, incomeCategories } from '../../utils/constants';
import { motion } from 'framer-motion';
const DesktopExpenseTableRow = ({ expense, handleEditExpense, handleDeleteExpense }) => {
  return (
    <motion.tr
      key={expense.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      component={TableRow}
    >
      <TableCell align="left">{expense.description}</TableCell>
      <TableCell align="center">
        <Chip label={expense.category} size="medium" sx={{ backgroundColor: [...expenseCategories, ...incomeCategories]?.find(c => c?.category === expense?.category)?.color || 'pink' }}
        />
      </TableCell>
      <TableCell align="center">{expense.date}</TableCell>
      <TableCell align="center">
        <Typography color={expense.expenseType === 'Expense' ? 'error' : 'success'} >${expense.amount}</Typography>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Edit">
          <IconButton size="small" color='primary' onClick={() => handleEditExpense(expense)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color='default' onClick={() => handleDeleteExpense(expense.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </motion.tr>
  )
};

export default DesktopExpenseTableRow;
