// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  return <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>;
}
