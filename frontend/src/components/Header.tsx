import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ ml: 30, width: `calc(100% - 240px)` }}>
      <Toolbar sx={{ backgroundColor: "#1f2937" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box>
          <Avatar
            alt="Admin"
            // src="https://i.pravatar.cc/40"
            sx={{ cursor: "pointer" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => navigate("/personal")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
