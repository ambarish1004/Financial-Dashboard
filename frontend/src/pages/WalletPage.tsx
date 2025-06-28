import { Box, Card, Typography } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";

const WalletPage = () => {
  return (
    <DashboardLayout>
      <Box sx={{ backgroundColor: "#282C35", color: "#fff", p: 3, minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom>💳 Wallet Overview</Typography>
        <Card sx={{ backgroundColor: "#1f2937", p: 3, mt: 2 }}>
          <Typography variant="h6">Balance</Typography>
          <Typography variant="h4" color="#4ade80">₹ 12,500.00</Typography>
        </Card>
        <Typography mt={3}>💡 Tip: You can link bank accounts in future versions.</Typography>
      </Box>
    </DashboardLayout>
  );
};

export default WalletPage;
