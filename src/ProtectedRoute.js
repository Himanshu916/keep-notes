import { useEffect } from "react";
import { useAuth } from "./Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) navigate("/");
  }, [state.isAuthenticated, navigate]);

  return state.isAuthenticated ? children : null;
}
