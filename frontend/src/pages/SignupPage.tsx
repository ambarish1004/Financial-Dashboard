import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSignup = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
        name,
      });
      const { token } = res.data;
      login(token);
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("User already exists");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box mt={2}>
          <Button variant="contained" fullWidth onClick={handleSignup}>
            Signup
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
