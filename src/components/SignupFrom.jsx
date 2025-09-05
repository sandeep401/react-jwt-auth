import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom"; // For protected route redirect
import api from "../api/api";

export default function SignupForm() {
  const { values, errors, handleChange, handleSubmit, setErrors } = useForm(
    { username: "", email: "", password: "", confirmPassword: "" },
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
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      // Replace with your backend endpoint
      const response = await api.post("https://your-api.com/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Assuming backend returns a JWT token
      const token = response.data.token;
      localStorage.setItem("token", token); // store securely

      setSnackbar({
        open: true,
        message: "Signup successful!",
        severity: "success",
      });

      // Redirect to protected route (e.g., dashboard)
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors || {};
        setErrors(serverErrors);
        setSnackbar({
          open: true,
          message: "Signup failed. Check form fields.",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Network error. Try again later.",
          severity: "error",
        });
      }
      console.error("Error:", error);
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
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 450 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(submitForm)} noValidate>
          {["username", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <TextField
                key={index}
                fullWidth
                label={
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                name={field}
                type={
                  field.includes("password") && !showPassword
                    ? "password"
                    : "text"
                }
                value={values[field]}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field]}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-error": {
                    animation: "shake 0.3s",
                  },
                  "@keyframes shake": {
                    "0%": { transform: "translateX(0px)" },
                    "25%": { transform: "translateX(-5px)" },
                    "50%": { transform: "translateX(5px)" },
                    "75%": { transform: "translateX(-5px)" },
                    "100%": { transform: "translateX(0px)" },
                  },
                }}
                InputProps={{
                  endAdornment: field.includes("password") ? (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            )
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Submitting..." : "Submit"}
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
