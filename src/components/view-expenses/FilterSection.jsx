import React from 'react';
import { Box, TextField, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { expenseCategories, incomeCategories } from '../../utils/constants';
import { motion } from 'framer-motion';

const FilterSection = ({ filters, setFilters, showFilters }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
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
  )
};

export default FilterSection;
