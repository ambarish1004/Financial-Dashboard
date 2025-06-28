import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
};

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://financial-dashboard-w2d7.onrender.com/api/transactions", {
      params: {
        page: page + 1,
        limit: rowsPerPage,
        search,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTransactions(res.data.transactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, search]);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const getStatusColor = (status: string) =>
    status === "Paid" ? "success" : status === "Pending" ? "warning" : "default";

  return (
    <Paper elevation={3} sx={{ mt: 4, background: "#111827", color: "#fff" }}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          All Transactions
        </Typography>
        <TextField
          label="Search"
          fullWidth
          variant="outlined"
          sx={{ background: "#fff", mb: 2 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>User</TableCell>
                <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                <TableCell sx={{ color: "#fff" }}>Amount</TableCell>
                <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell sx={{ color: "#cbd5e1" }}>{txn.user_id}</TableCell>
                  <TableCell sx={{ color: "#cbd5e1" }}>
                    {new Date(txn.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1" }}>
                    ${txn.amount.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1" }}>{txn.category}</TableCell>
                  <TableCell>
                    <Chip label={txn.status} color={getStatusColor(txn.status)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </Box>
    </Paper>
  );
};

export default TransactionsTable;
