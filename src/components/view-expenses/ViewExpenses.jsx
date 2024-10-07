import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, Typography, TextField, Button, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Pagination, useTheme, useMediaQuery
} from '@mui/material';
import { FilterList as FilterIcon, Search as SearchIcon } from '@mui/icons-material';
import { deleteExpenseAsync } from '../../slices/expensesSlice';
import { itemsPerPage } from '../../utils/constants';
import FilterSection from './FilterSection';
import MobileExpenseCard from './MobileExpenseCard';
import DesktopExpenseTableRow from './DesktopExpenseTableRow';
import ExpenseDialog from './ExpenseDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import NoExpenses from '../NoExpenses';

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (!expenses.length) {
    return <NoExpenses />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, }}>
          <Typography variant="h5" color='primary' style={{ fontWeight: 'bold' }}>Expenses & Income</Typography>
          <Box>
            <TextField size="small" placeholder="Search description..." value={filters.searchTerm} onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })} sx={{ mr: 1 }} InputProps={{ startAdornment: (<SearchIcon />) }} />
            <Button startIcon={<FilterIcon />} onClick={() => setShowFilters(!showFilters)} variant={showFilters ? "contained" : "outlined"}>Filters</Button>
          </Box>
        </Box>

        <FilterSection filters={filters} setFilters={setFilters} showFilters={showFilters} />

        {isMobile ? (
          <AnimatePresence>
            {paginatedExpenses.map(expense => <MobileExpenseCard key={expense.id} expense={expense} handleEditExpense={setEditingExpense} handleDeleteExpense={setDeleteConfirmation} />)}
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
                  {paginatedExpenses.map(expense => <DesktopExpenseTableRow key={expense.id} expense={expense} handleEditExpense={setEditingExpense} handleDeleteExpense={setDeleteConfirmation} />)}
                </TableBody>
              </AnimatePresence>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={pageCount} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" />
        </Box>

        <ExpenseDialog editingExpense={editingExpense} setEditingExpense={setEditingExpense} errors={errors} setErrors={setErrors} dispatch={dispatch} />

        <DeleteConfirmationDialog deleteConfirmation={deleteConfirmation} confirmDelete={() => dispatch(deleteExpenseAsync(deleteConfirmation))} setDeleteConfirmation={setDeleteConfirmation} />
      </Box>
    </motion.div>
  );
};

export default ViewExpenses;
