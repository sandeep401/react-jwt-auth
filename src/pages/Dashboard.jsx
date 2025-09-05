// src/pages/Dashboard.jsx
import React from "react";
import LogoutButton from "../components/LogoutButton";
import { Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" mb={3}>Welcome to Dashboard</Typography>
      <LogoutButton />
    </Box>
  );
}
