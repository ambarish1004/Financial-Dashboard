import { Box, Paper, Typography } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const iconMap: any = {
  balance: <AccountBalanceWalletIcon sx={{ fontSize: 32, color: "#00FFC2" }} />,
  revenue: <MonetizationOnIcon sx={{ fontSize: 32, color: "#00FFC2" }} />,
  expense: <MoneyOffIcon sx={{ fontSize: 32, color: "#00FFC2" }} />,
  savings: <SavingsIcon sx={{ fontSize: 32, color: "#00FFC2" }} />,
};

const titleMap: any = {
  balance: "Balance",
  revenue: "Revenue",
  expense: "Expense",
  savings: "Savings",
};

const StatsCard = ({ type, amount }: { type: string; amount: number }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        flex: 1,
        background: "#111827",
        color: "#fff",
        borderRadius: 3,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{titleMap[type]}</Typography>
        {iconMap[type]}
      </Box>
      <Typography variant="h5" mt={2}>
        ${amount.toLocaleString()}
      </Typography>
    </Paper>
  );
};

export default StatsCard;
