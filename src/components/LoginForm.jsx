import React, { useState, useContext } from "react";
import { useForm } from "./useForm";
import { validate } from "./validate";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "./AuthContext";
import api from "../api/api";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const { values, errors, handleChange, handleSubmit, setErrors } = useForm(
    { email: "", password: "" },
    validate
  );

  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
 
  const [rememberMe, setRememberMe] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      const response = await api.post("https://your-api.com/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      const expiresIn = response.data.expiresIn || 3600; // optional from backend
      const refreshToken = response.data.refreshToken;

      login(token, refreshToken, expiresIn, rememberMe);
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
        setSnackbar({
          open: true,
          message: "Login failed!",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Network error!",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit(submitForm)} noValidate>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Remember Me"
        />
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
