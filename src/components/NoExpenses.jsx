import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function NoExpenses() {
  const navigate = useNavigate();
  const handleAddExpense = () => {
    navigate('/add-expenses');
  };
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        You have no expense records
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Please start by adding an expense/income to see some analytics.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddExpense}>
        Add Expense/Income
      </Button>
    </Container>
  );
};

export default NoExpenses;