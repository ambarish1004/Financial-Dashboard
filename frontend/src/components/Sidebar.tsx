import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TableChartIcon from "@mui/icons-material/TableChart";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../assets/Logo.svg";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Transactions", icon: <TableChartIcon />, path: "/transactions" },
  { label: "Wallet", icon: <AccountBalanceWalletIcon />, path: "/wallet" },
  { label: "Analytics", icon: <InsightsIcon />, path: "/analytics" },
  { label: "Personal", icon: <PersonIcon />, path: "/personal" },
  { label: "Message", icon: <MailIcon />, path: "/message" },
  { label: "Setting", icon: <SettingsIcon />, path: "/setting" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={logo} alt="Penta" width={100} />
        </Box>
      </Toolbar>

      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={isActive}
                sx={{
                  position: "relative",
                  "&.Mui-selected": {
                    backgroundColor: "#1e293b",
                    color: "#4ade80",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      right: 0,
                      top: 12,
                      bottom: 12,
                      width: 5,
                      backgroundColor: "#facc15",
                      borderRadius: "4px 0 0 4px",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#4ade80" : "#cbd5e1",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
