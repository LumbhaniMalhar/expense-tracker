import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Typography, IconButton, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  useMediaQuery, useTheme, Chip, Tooltip, InputAdornment, Pagination
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { editExpenseAsync, deleteExpenseAsync } from '../slices/expensesSlice';
import { expenseCategories, incomeCategories, itemsPerPage, validateForm } from '../utils/constants';

const ViewExpenses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'All',
    searchTerm: '',
    expenseType: 'All'
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [errors, setErrors] = useState({});

  const handleEditExpense = (expense) => {
    setEditingExpense({ ...expense });
  };

  const handleSaveEdit = () => {
    if (editingExpense && validateForm(editingExpense, setErrors)) {
      dispatch(editExpenseAsync({
        id: editingExpense.id,
        updatedExpense: { ...editingExpense, date: editingExpense.date ? editingExpense.date : new Date().toISOString().split('T')[0] }
      }));
      setEditingExpense(null);
    }
  };

  const handleDeleteExpense = (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      dispatch(deleteExpenseAsync(deleteConfirmation));
      setDeleteConfirmation(null);
    }
  };

  const filteredExpenses = useMemo(() => {
    const sortedExpenses = expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedExpenses.filter(expense => {
      const matchesCategory = filters.category === 'All' || expense.category === filters.category;
      const matchesSearch = expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesType = filters.expenseType === 'All' || expense.expenseType === filters.expenseType;
      const matchesDateRange = (!filters.startDate || expense.date >= filters.startDate) &&
        (!filters.endDate || expense.date <= filters.endDate);

      return matchesCategory && matchesSearch && matchesType && matchesDateRange;
    });
  }, [expenses, filters]);

  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExpenses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredExpenses, currentPage]);

  const pageCount = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const FilterSection = () => (
    <motion.div
      initial={isMobile ? { height: 0 } : false}
      animate={{ height: showFilters ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden' }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, mt: 2 }}>
        <TextField
          size="small"
          select
          label="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          sx={{ minWidth: 120 }}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  style: { maxHeight: 300 },
                },
              }
            },
          }}
        >
          <MenuItem key={`all`} value={'All'}>All</MenuItem>
          {[...expenseCategories, ...incomeCategories].map((ec, index) => (
            <MenuItem key={`${ec.category}-${index}`} value={ec.category}>{ec.category}</MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          select
          label="Type"
          value={filters.expenseType}
          onChange={(e) => setFilters({ ...filters, expenseType: e.target.value })}
          sx={{ minWidth: 120 }}
        >
          {['All', 'Expense', 'Income'].map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          type="date"
          label="Start Date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { max: filters.endDate },
          }}
        />

        <TextField
          size="small"
          type="date"
          label="End Date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { min: filters.startDate },
          }}
        />
      </Box>
    </motion.div>
  );

  const MobileExpenseCard = ({ expense }) => (
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
            <IconButton size="small" onClick={() => handleEditExpense(expense)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => handleDeleteExpense(expense.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip
            label={expense.category}
            size="small"
            sx={{ backgroundColor: [...expenseCategories, ...incomeCategories]?.find(c => c?.category == expense?.category)?.color || 'pink' }}
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

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [filters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3
        }}>
          <Typography variant="h5" color='primary' style={{ fontWeight: 'bold' }}>Expenses & Income</Typography>
          <Box>
            <TextField
              size="small"
              placeholder="Search description..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }
              }}
              sx={{ mr: 1 }}
            />
            <Button
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "contained" : "outlined"}
            >
              Filters
            </Button>
          </Box>
        </Box>

        <FilterSection />

        {isMobile ? (
          <AnimatePresence>
            {paginatedExpenses.map(expense => (
              <MobileExpenseCard key={expense.id} expense={expense} />
            ))}
          </AnimatePresence>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <AnimatePresence>
                <TableBody>
                  {paginatedExpenses.map((expense) => (
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
                        <Chip
                          label={expense.category}
                          size="medium"
                          sx={{ backgroundColor: [...expenseCategories, ...incomeCategories]?.find(c => c?.category == expense?.category)?.color || 'pink' }}
                        />
                      </TableCell>
                      <TableCell align="center">{expense.date}</TableCell>
                      <TableCell align="center">
                        <Typography
                          color={expense.expenseType === 'Expense' ? 'error' : 'success'}
                        >
                          ${expense.amount}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton size="small" color='primary' onClick={() => handleEditExpense(expense)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color='error' onClick={() => handleDeleteExpense(expense.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </AnimatePresence>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

        <Dialog
          open={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          maxWidth="sm"
          fullWidth
        >
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
              <TextField
                label="Description"
                value={editingExpense?.description || ''}
                error={!!errors.description}
                helperText={errors.description}
                onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })}
              />
              <TextField
                label="Amount"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount}
                value={editingExpense?.amount || ''}
                onChange={(e) => setEditingExpense({ ...editingExpense, amount: parseFloat(e.target.value) })}
              />
              <TextField
                select
                label="Category"
                error={!!errors.category}
                helperText={errors.category}
                value={editingExpense?.category || ''}
                onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
              >
                {editingExpense?.expenseType === 'Income' && incomeCategories.map((ic) => (
                  <MenuItem key={ic.category} value={ic.category}>{ic.category}</MenuItem>
                ))}
                {editingExpense?.expenseType === 'Expense' && expenseCategories.map((ec) => (
                  <MenuItem key={ec.category} value={ec.category}>{ec.category}</MenuItem>
                ))}
              </TextField>
              <TextField
                type="date"
                label="Date"
                value={editingExpense?.date || (new Date()).toISOString().split('T')[0]}
                onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setEditingExpense(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={!!deleteConfirmation}
          onClose={() => setDeleteConfirmation(null)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this expense?
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setDeleteConfirmation(null)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default ViewExpenses;