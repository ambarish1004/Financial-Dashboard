import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", width: "100vw", overflow: "hidden" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#282C35",
          minHeight: "100vh",
          width: "calc(100vw - 240px)", 
          overflowX: "hidden",
        }}
      >
        <Header />
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
