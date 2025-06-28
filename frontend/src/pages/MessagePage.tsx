import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";

const messages = [
  { from: "Support", text: "Your account was verified successfully!" },
  { from: "Admin", text: "Export feature has been updated." },
];

const MessagePage = () => {
  return (
    <DashboardLayout>
      <Box sx={{ backgroundColor: "#282C35", color: "#fff", p: 3, minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom>📩 Messages</Typography>
        <List sx={{ mt: 2, backgroundColor: "#1e293b", borderRadius: 2 }}>
          {messages.map((msg, i) => (
            <div key={i}>
              <ListItem>
                <ListItemText
                  primary={msg.from}
                  secondary={msg.text}
                  secondaryTypographyProps={{ color: "#cbd5e1" }}
                />
              </ListItem>
              {i !== messages.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Box>
    </DashboardLayout>
  );
};

export default MessagePage;
