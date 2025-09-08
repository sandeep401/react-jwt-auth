import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

function AuthProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
}

export default AuthProviderWithNavigate;