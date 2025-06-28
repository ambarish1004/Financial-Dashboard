import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  user_id: string;
  user_profile: string;
  amount: number;
  category: "Revenue" | "Expense";
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://financial-dashboard-w2d7.onrender.com/api/transactions/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    };

    fetchRecent();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, background: "#111827", color: "#fff" }}>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <List>
        {transactions.map((txn) => (
          <ListItem key={txn.id} sx={{ pl: 0 }} component="div">
            <ListItemAvatar>
              <Avatar src={txn.user_profile} />
            </ListItemAvatar>
            <ListItemText
              primary={`Transfer to ${txn.user_id}`}
              secondary={txn.category}
              sx={{ color: "#cbd5e1" }}
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: txn.category === "Revenue" ? "#4ade80" : "#f97316",
              }}
            >
              ${txn.amount.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentTransactions;
