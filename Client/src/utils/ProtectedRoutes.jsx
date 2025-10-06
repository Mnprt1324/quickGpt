import { Navigate } from "react-router-dom";
import AppContext from "./AppContex";
import { useContext } from "react";
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticate } = useContext(AppContext);

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticate } = useContext(AppContext);

  if (isAuthenticate) {
    return <Navigate to="/" replace />;
  }

  return children;
};
