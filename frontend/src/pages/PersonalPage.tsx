import { Box, TextField, Typography, Button, Divider, Alert } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PersonalPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const { token } = useAuth();

  const handleSave = async () => {
  if (password && password !== confirm) {
    setMessage("❌ Passwords do not match.");
    return;
  }

  try {
    if (name || email) {
      await axios.put(
        "http://localhost:5000/api/user/update-profile",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    if (password) {
      await axios.put(
        "http://localhost:5000/api/user/update-password",
        { newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setMessage("✅ Profile updated successfully");
    setPassword("");
    setConfirm("");
  } catch (err) {
    console.error(err);
    setMessage("❌ Update failed");
  }
};


  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName(res.data.name || "");
      setEmail(res.data.email || "");
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  };

  fetchProfile();
}, []);


  return (
    <DashboardLayout>
      <Box sx={{ backgroundColor: "#282C35", color: "#fff", p: 3, minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom>👤 Personal Profile</Typography>

        <Box sx={{ mt: 3, maxWidth: 500 }}>
          {message && (
            <Alert severity={message.includes("❌") ? "error" : "success"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <TextField
            label="Full Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            sx={{ input: { color: "white" }, label: { color: "#cbd5e1" } }}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            sx={{ input: { color: "white" }, label: { color: "#cbd5e1" } }}
          />

          <Divider sx={{ my: 4, borderColor: "#334155" }} />

          <Typography variant="subtitle1" gutterBottom>
            🔒 Change Password
          </Typography>

          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={{ input: { color: "white" }, label: { color: "#cbd5e1" } }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            margin="normal"
            sx={{ input: { color: "white" }, label: { color: "#cbd5e1" } }}
          />

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default PersonalPage;
