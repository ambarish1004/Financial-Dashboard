import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  Button,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SettingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(false);
  const [language, setLanguage] = useState("en");
  const [message, setMessage] = useState("");

  const { token } = useAuth();

  // ✅ Load settings from backend on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("https://financial-dashboard-w2d7.onrender.com/api/user/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const s = res.data;
        setDarkMode(s.darkMode);
        setEmailNotif(s.emailNotif);
        setSmsNotif(s.smsNotif);
        setSessionTimeout(s.sessionTimeout);
        setLanguage(s.language || "en");
      } catch (err) {
        console.error("Failed to load settings", err);
      }
    };

    fetchSettings();
  }, [token]);

  // ✅ Save settings to backend
  const handleSave = async () => {
    try {
      await axios.put(
        "https://financial-dashboard-w2d7.onrender.com/api/user/settings",
        {
          darkMode,
          emailNotif,
          smsNotif,
          sessionTimeout,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Settings updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Update failed", err);
      setMessage("❌ Failed to update settings.");
    }
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          backgroundColor: "#282C35",
          color: "#fff",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Typography variant="h5" gutterBottom>
          ⚙️ Settings
        </Typography>

        {message && (
          <Alert
            severity={message.includes("❌") ? "error" : "success"}
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        {/* Dark Mode Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          }
          label="Enable Dark Mode"
        />

        <Divider sx={{ my: 3, borderColor: "#334155" }} />

        {/* Notifications */}
        <Typography variant="subtitle1" mb={1}>
          🔔 Notification Preferences
        </Typography>
        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
              />
            }
            label="Email Alerts"
          />
          <FormControlLabel
            control={
              <Switch
                checked={smsNotif}
                onChange={(e) => setSmsNotif(e.target.checked)}
              />
            }
            label="SMS Alerts"
          />
        </Stack>

        <Divider sx={{ my: 3, borderColor: "#334155" }} />

        {/* Session Timeout */}
        <Typography variant="subtitle1" mb={1}>
          🕒 Auto Logout
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.checked)}
            />
          }
          label="Enable Auto Logout After 10 Minutes"
        />

        <Divider sx={{ my: 3, borderColor: "#334155" }} />

        {/* Language */}
        <Typography variant="subtitle1" mb={1}>
          🌍 Preferred Language
        </Typography>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ width: 200, backgroundColor: "#1f2937", color: "#fff" }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="mr">Marathi</MenuItem>
        </Select>

        <Box mt={4}>
          <Button variant="contained" color="success" onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default SettingPage;
