import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );
  // const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (token && tokenExpiry && Date.now() > tokenExpiry) refreshAccessToken();
  }, []);

  const login = (
    accessToken,
    refreshTokenValue,
    expiresIn = 3600,
    rememberMe = false
  ) => {
    setToken(accessToken);
    setRefreshToken(refreshTokenValue);

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshTokenValue);

    const expiryTime = rememberMe
      ? Date.now() + expiresIn * 1000 * 24
      : Date.now() + expiresIn * 1000;
    localStorage.setItem("tokenExpiry", expiryTime);

    if(navigate) navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiry");
    if(navigate) navigate("/login");
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/refresh-token", { refreshToken });
      const { token: newToken, expiresIn } = response.data;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      localStorage.setItem("tokenExpiry", Date.now() + expiresIn * 1000);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, refreshToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
