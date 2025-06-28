import { Box, Button, Typography, Avatar, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatsCard from "../components/StatsCard";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import RecentTransactions from "../components/RecentTransactions";
import TransactionsTable from "../components/TransactionsTable";
import ExportModal from "../components/ExportModal";

const DashboardPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [openExport, setOpenExport] = useState(false);

  const stats = {
    balance: 3500,
    revenue: 5200,
    expense: 1700,
    savings: 1800,
  };

  if (!token) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        sx={{ backgroundColor: "#282C35", color: "#fff" }}
      >
        <Avatar
          sx={{ width: 72, height: 72, mb: 2 }}
          src="https://i.pravatar.cc/150?img=3"
        />
        <Typography variant="h5" gutterBottom>
          You’re not logged in
        </Typography>
        <Typography color="gray" mb={3}>
          Please log in or sign up to view your dashboard.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/signup")}>
            Signup
          </Button>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <DashboardLayout>
      <Box
        sx={{
          backgroundColor: "#282C35",
          minHeight: "100vh",
          width: "100%",
          padding: 3,
          // overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          gap={3}
          flexWrap="wrap"
          mb={3}
        >
          {Object.entries(stats).map(([key, value]) => (
            <Box key={key} flex="1" minWidth="220px">
              <StatsCard type={key} amount={value} />
            </Box>
          ))}
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
          <Box
            flex="2"
            minWidth="300px"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="stretch"
          >
            <IncomeExpenseChart />
          </Box>
          <Box flex="1" minWidth="250px">
            <RecentTransactions />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
              All Transactions
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#cbd5e1",
                background: "#1e293b",
                px: 2,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              10 Aug - 20 Aug
            </Typography>
          </Box>
          <Box>
            <TransactionsTable />
            <Box
              display="flex"
              justifyContent="flex-end"
              mt={2}
              pr={2}
              pb={2}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenExport(true)}
                sx={{
                  minWidth: "180px",
                  background: "#1f2937",
                  color: "#fff",
                  borderColor: "#4ade80",
                  "&:hover": {
                    background: "#22c55e",
                    color: "#000",
                  },
                }}
              >
                EXPORT CSV
              </Button>
            </Box>
          </Box>
        </Box>

        <ExportModal open={openExport} onClose={() => setOpenExport(false)} />
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
